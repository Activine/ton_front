import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { Lottery } from "../contracts/Lottery";
import { TokenMaster } from "../contracts/Master";
import { TokenWallet } from "../contracts/Wallet";
import { NftItem } from "../contracts/NftItem";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";
import { toNano, address, beginCell, Cell } from "@ton/core";
import { useTonAddress } from "@tonconnect/ui-react";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const userFriendlyAddress = useTonAddress();

  const lotteryContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Lottery(
      Address.parse("EQDeaZ1X1c0PZi4G68YHEzlV3i4GnbBu4RIZbesfnHFF3HRV") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Lottery>;
  }, [client]);

  const jettonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TokenMaster(
      Address.parse("EQD6cf_tfwgbt6sFX3fbv7C0z3dEtSyIvVrlCl7opl8JaGd_")
    );
    return client.open(contract) as OpenedContract<TokenMaster>;
  }, [client]);

  const userJettonContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TokenWallet(
      Address.parse("kQDrz2SzxK-nlUiQlyH_eYcPLJWVxINP5uQ-jgtKVM5HbeF7") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TokenWallet>;
  }, [client]);

  const userNftContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftItem(
      Address.parse("") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<NftItem>;
  }, [client]);

  useEffect(() => {
    async function getLotteryValue() {
      console.log("userFriendlyAddress", userFriendlyAddress);

      const userJettonAddress = await jettonContract.getGetWalletAddress(
        address(userFriendlyAddress)
      );

      console.log("userJettonAddress", userJettonAddress);
      console.log("jettonContract", jettonContract);

      const tokenBalance = (await userJettonContract.getGetWalletData())
        .balance;
      setTokenBalance(tokenBalance);
      console.log("tokenBalance", tokenBalance);
      await sleep(90000); // sleep 5 seconds and poll value again

      getLotteryValue();
    }
    getLotteryValue();
  }, [lotteryContract]);

  return {
    token_balance: tokenBalance,
    buyToken: async () => {
      return lotteryContract?.send(
        sender,
        { value: toNano("1.5") },
        {
          $$type: "BuyToken",
          query_id: 14n,
          amount: toNano("100"),
          destination: address(userFriendlyAddress),
          response_destination: address(userFriendlyAddress),
          custom_payload: beginCell().endCell(),
          forward_ton_amount: toNano("0.3"),
        }
      );
    },

    buyTicket: async () => {
      return lotteryContract?.send(
        sender,
        { value: toNano("1") },
        {
          $$type: "BuyTicket",
          query_id: 0n,
          amount: toNano("5"),
          destination: address(userFriendlyAddress),
          response_destination: address(userFriendlyAddress),
          custom_payload: beginCell().endCell(),
          forward_ton_amount: toNano("0.1"),
          contentNft: beginCell().endCell(),
          value: toNano("0.1"),
        }
      );
    },
    checkTicket: async (id: number) => {
      return lotteryContract?.send(
        sender,
        { value: toNano("0.1") },
        {
          $$type: "CheckTicket",
          query_id: 0n,
          index: id,
        }
      );
    },
  };
}
