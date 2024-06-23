import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
interface TokenMetadata {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
}
interface TokenBalance extends TokenMetadata {
  balance: number;
}

const SOLANA_TOKENS: TokenMetadata[] = [
  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
  },
  {
    symbol: "RAY",
    name: "Raydium",
    mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    decimals: 6,
  },
  {
    symbol: "SRM",
    name: "Serum",
    mint: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    decimals: 6,
  },
  {
    symbol: "SAMO",
    name: "Samoyedcoin",
    mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    decimals: 9,
  },
  {
    symbol: "ORCA",
    name: "Orca",
    mint: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
    decimals: 6,
  },
];

export const useTokenAccounts = () => {
  const { publicKey } = useWallet();
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAccounts = async () => {
      if (!publicKey) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const connection = new Connection(
          "https://api.devnet.solana.com",
          "confirmed"
        );

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: TOKEN_PROGRAM_ID,
          }
        );

        const tokenBalances: TokenBalance[] = [];

        for (const tokenMetadata of SOLANA_TOKENS) {
          const accountInfo = tokenAccounts.value.find(
            (account) =>
              account.account.data.parsed.info.mint === tokenMetadata.mint
          );

          if (accountInfo) {
            const parsedInfo = accountInfo.account.data.parsed.info;
            tokenBalances.push({
              ...tokenMetadata,
              balance: parsedInfo.tokenAmount.uiAmount,
            });
          } else {
            tokenBalances.push({
              ...tokenMetadata,
              balance: 0,
            });
          }
        }

        setTokens(tokenBalances);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching token accounts:", err);
        setError("Failed to fetch token accounts");
        setLoading(false);
      }
    };

    fetchTokenAccounts();
  }, [publicKey]);

  return { tokens, loading, error };
};
