import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { mintNFT, createMetadata, createMasterEdition, Creator } from '@metaplex/js';
import { programs } from '@metaplex/js';
const { metadata: { Metadata } } = programs;

const METADATA_URI = "https://link-to-your-metadata.json"; // Replace with your actual metadata URI
const IMAGE_URI = "https://link-to-your-image.png"; // Replace with your actual image URI

async function main() {
  const connection = new Connection("https://api.devnet.solana.com");
  const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(require('fs').readFileSync("/home/username/.config/solana/devnet.json", {encoding: 'utf8'}))));

  // Airdrop SOL to the wallet
  const airdropSignature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSignature);

  // Define metadata
  const metadata = {
    name: "",
    symbol: "",
    uri: METADATA_URI,
    sellerFeeBasisPoints: 500, // 5%
    creators: [
      new Creator({
        address: wallet.publicKey.toBase58(),
        verified: true,
        share: 100,
      })
    ]
  };

  // Mint the NFT
  const mintNFTResponse = await mintNFT({
    connection,
    wallet: wallet as any,
    uri: IMAGE_URI,
    maxSupply: 1,
  });

  const { mint, metadata: metadataPDA } = mintNFTResponse;

  // Create Metadata
  await createMetadata({
    connection,
    wallet: wallet as any,
    editionMint: mint,
    metadata,
  });

  // Create Master Edition
  await createMasterEdition({
    connection,
    wallet: wallet as any,
    editionMint: mint,
  });

  console.log(`NFT created with mint: ${mint.toBase58()}`);
}

main().catch(err => {
  console.error(err);
});
