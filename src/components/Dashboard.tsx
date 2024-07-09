import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const Dashboard: React.FC = () => {
  const { publicKey } = useWallet();
  const [holdings, setHoldings] = useState<any[]>([]);
  const [sentiment, setSentiment] = useState<string>('');

  useEffect(() => {
    if (publicKey) {
      // Fetch holdings and perform sentiment analysis
      // Replace these with actual API calls
      setHoldings([
        { name: 'Solana', amount: 100 },
        { name: 'Serum', amount: 500 },
        { name: 'Raydium', amount: 200},
        { name: 'SOLAPE', amount: 1000},
      ]);
      setSentiment('Positive');
    }
  }, [publicKey]);

  return (
    <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 mt-8">
      <h3 className="text-2xl font-semibold mb-4">Your Dashboard</h3>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Holdings</h4>
        <ul>
          {holdings.map((holding, index) => (
            <li key={index} className="mb-1">
              {holding.name}: {holding.amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-2">Sentiment Analysis</h4>
        <p>Current sentiment: <span className="font-bold">{sentiment}</span></p>
      </div>
    </div>
  );
};

export default Dashboard;