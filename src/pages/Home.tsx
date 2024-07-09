import { useDispatch } from "react-redux";
import { fetchBalance } from "../app/User/WalletStore";
import { AppDispatch } from "../app/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTokenAccounts } from "../utils/TokenAccounts";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { publicKey } = useWallet();
  const pubkey = publicKey?.toString();
  const { tokens, loading, error } = useTokenAccounts();

  const handleFetchBalance = () => {
    if (pubkey) {
      dispatch(fetchBalance({ publicKey: pubkey }));
      console.log(pubkey, "this is pubkey");
    }
  };

  return (
    <>
      <div className="btn btn-primary">
        <button onClick={handleFetchBalance}>
          Fetch Balance
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {tokens.map((token) => (
          <li key={token.mint}>
            {token.name} ({token.symbol}): {token.balance}
            {token.balance > 0 &&
              ` (${token.balance * Math.pow(10, token.decimals)} raw)`}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
