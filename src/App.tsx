import "./App.css";
import { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
function App() {
  const [nftId, setNftId] = useState(0);
  const [nftAddress, setNftAddress] = useState<string>("");
  const {
    // contract_address,
    // counter_value,
    // recent_sender,
    // owner_address,
    // contract_balance,
    // sendIncrement,
    // sendDeposit,
    // sendWithdrawalRequest,
    checkTicket,
    token_balance,
    buyToken,
    buyTicket,
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <div>
      <div className="TonConnectButton">
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Token Balance</b>
          {token_balance && (
            <div className="Hint">{fromNano(token_balance)}</div>
          )}
        </div>
        <div className="Card">
          <b>NFT data</b>
          <div className="Hint">Lottery Numbers {fromNano(token_balance)}</div>
          <div className="Hint">Matches {fromNano(token_balance)}</div>
        </div>

        <div className="Actions">
          <input
            type="number"
            value={nftId}
            onChange={(e) => setNftId(Number(e.target.value))}
            className="input-field"
          />
          <input
            type="string"
            value={nftAddress}
            onChange={(e) => setNftAddress(e.target.value)}
            className="input-field"
          />
          <a
            onClick={() => {
              buyToken();
            }}
            className="action-button withdrawal-button"
          >
            Buy Token
          </a>
          <a
            onClick={() => {
              buyTicket();
            }}
            className="action-button withdrawal-button"
          >
            Buy Ticket
          </a>
          <a
            onClick={() => {
              checkTicket(nftId);
            }}
            className="action-button withdrawal-button"
          >
            Check Ticket
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
