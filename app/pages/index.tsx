import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = () => {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div className="flex flex-row">
        <div className="p-2 rounded-2xl mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <WalletMultiButton />
        </div>
      </div>
    );
  } else {
    return <div>Connected!</div>;
  }
};

export default Home;
