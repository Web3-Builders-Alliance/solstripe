import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

import { SocketProvider } from "./context/SocketContext";
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <SocketProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <Features />
                        <Pricing />
                      </>
                    } />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SocketProvider>
  );
}

export default App;