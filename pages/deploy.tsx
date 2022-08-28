import { useAddress, useMetamask, useSigner } from "@thirdweb-dev/react";
import { ContractType, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import {
  contractsToShowOnDeploy as contracts,
  contractTypeToDisplayNameMapping as nameMapping,
  contractTypeToImageMapping as imageMapping,
} from "../const/contractToDisplayMappings";
import { useRouter } from "next/router";

export default function Deploy() {
  const router = useRouter();
  const address = useAddress();
  const signer = useSigner();
  const connectWithMetamask = useMetamask();

  // Function to deploy the proxy contract
  async function deployContract(contractSelected: ContractType) {
    if (!address || !signer) {
      return;
    }

    if (contractSelected === "pack") {
      alert("Pack is not supported yet");
    }

    const thirdweb = new ThirdwebSDK(signer);

    const contractAddress = await thirdweb.deployer.deployBuiltInContract(
      // @ts-ignore - we're excluding custom contracts from the demo
      contractSelected,
      {
        name: `My ${contractSelected}`,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: `My awesome ${contractSelected} contract`,
        // Recipients are required when trying to deploy a split contract
        recipients: [
          {
            address,
            sharesBps: 100 * 100,
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);

    alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);

    router.push(`/`);
  }

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>LTL Custom Dashboard</h1>
        <p className={styles.explain}>
          LiveTheLifeTV is a web3 media company. Our art studio is powering the future of meta, digital, and traditional media. 
          We are shaping our brand through storytelling, experiences, and community. Photographers can count on help in digitizing their artworks, 
          creating beautiful NFTs to match their physical work, and having personal guidance in minting their custom creator contracts. 
          The artist can document their creative process on the LiveTheLifeTV Editorial. As with other NFT platforms, 
          photographers can determine whether the artwork is a single issue (ERC721) or if there will be multiple (ERC1155) copies of the artwork.  
          Dynamically create smart contracts using the thirdweb SDK
          and view all of the contracts you&apos;ve created, powered by our{" "}
          <b>
            <a
              href="https://thirdweb.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.purple}
            >
              LiveTheLifeTV dashboard
            </a>
          </b>
          .
        </p>

        <hr className={styles.divider} />

        <h2>What do you want to deploy?</h2>
        {!address ? (
          <>
            <p>
              <b>Connect Your Wallet to deploy a contract</b>
            </p>
            <button className={styles.mainButton} onClick={connectWithMetamask}>
              Connect Wallet
            </button>
          </>
        ) : (
          <>
            <div className={styles.contractBoxGrid}>
              {contracts.map((c) => (
                <div
                  className={styles.contractBox}
                  key={c}
                  onClick={() => deployContract(c as ContractType)}
                >
                  <div className={styles.contractImage}>
                    <img src={imageMapping[c as ContractType]} alt={c} />
                  </div>
                  <b className={styles.cardName}>
                    {nameMapping[c as ContractType]}
                  </b>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
