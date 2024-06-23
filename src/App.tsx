// import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
          {/* Your app's components go here, nested within the context providers. */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
