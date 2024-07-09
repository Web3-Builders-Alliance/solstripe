import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Dashboard from './Dashboard';

const Hero: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [hasNFT, setHasNFT] = useState<boolean | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      // Simulating NFT check
      const checkNFT = async () => {
        // Replace this with actual NFT checking logic
        const result = Math.random() > 0.5;
        setHasNFT(result);
      };

      checkNFT();
    } else {
      setHasNFT(null);
    }
  }, [connected, publicKey]);

  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Decentralized AI-Powered Analytics for Solana</h2>
        <p className="text-xl mb-8">Connect your wallet, analyze your holdings, and get daily reports with Solstripe</p>
        {!connected ? (
          <div>
            <p className="text-xl mb-4">Connect your wallet to get started</p>
            <WalletMultiButton className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300" />
          </div>
        ) : hasNFT === null ? (
          <p>Checking NFT ownership...</p>
        ) : hasNFT ? (
          <Dashboard />
        ) : (
          <div>
            <p className="text-xl mb-4">You need to purchase our NFT to access the dashboard.</p>
            <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
              Purchase NFT
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;