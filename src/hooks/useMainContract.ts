import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();

  const [balance, setBalance] = useState<null | number>(0);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse("EQDpnTstCh_Wqk-BVg2ZQii1iwBPVMiCDEWh3wjHeIBPpgkD") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);
  //   console.log(MainContract);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const val = await mainContract.getData();
      const balance = await mainContract.getBalance();
      setBalance(balance);
      setContractData({
        counter_value: val.number,
        recent_sender: val.recent_sender.toString(true, true, true),
        owner_address: val.owner_address.toString(true, true, true),
      });

      console.log(balance.number);
      console.log(val.recent_sender.toString(true, true, true));
      console.log(val.owner_address.toString(true, true, true));
      await sleep(10000); // sleep 5 seconds and poll value again
      getValue();
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance.number,
    ...contractData,
    sendIncrement: async (value: number) => {
      return mainContract?.sendIncrement(sender, toNano(0.05), value);
    },
    sendDeposit: async () => {
      return mainContract?.sendDeposit(sender, toNano(1));
    },
    sendWithdrawalRequest: async () => {
      return mainContract?.sendWithdrawalRequest(
        sender,
        toNano(0.05),
        toNano(0.5)
      );
    },
  };
}