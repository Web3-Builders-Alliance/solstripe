import { useDispatch } from "react-redux";
import { fetchBalance } from "../app/User/WalletStore";
import { AppDispatch } from "../app/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTokenAccounts } from "../utils/TokenAccounts";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useWallet();
  let pubkey = wallet.publicKey?.toString();
  console.log(wallet.publicKey?.toString(), "this is wallet");
  const { tokens, loading, error } = useTokenAccounts();

  return (
    <>
      <div className=" btn btn-primary">
        <button
          onClick={(e) => {
            dispatch(fetchBalance({ publicKey: pubkey }));
            console.log(pubkey, "this is pubkey");
          }}
        >
          asdfasf
        </button>
      </div>
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
