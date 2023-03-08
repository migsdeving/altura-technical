import NFTList from "@/components/NFTList";
import { OwnedNft } from "alchemy-sdk";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [NFTS, setNFTs] = useState<OwnedNft[]>();
  const [address, setAddress] = useState(
    "0x9bE85844800d5985E9ddbE19773B7BFB6dAC3251"
  );
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAddress(input);
  }

  useEffect(() => {
    console.log("fetching");

    fetch(`/api/get-nfts?address=${address}`)
      .then((res) => res.json())
      .then((NFTS) => {
        setNFTs(NFTS);
      });
  }, [address]);

  console.log(NFTS);

  return (
    <>
      <Head>
        <title>Altura Technical Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex flex-col items-center w-full">
        <form onSubmit={handleSubmit} className="p-10 w-5/6 md:w-1/2 xl:w-1/3">
          <input
            type="text"
            placeholder="ETH Address"
            className="input input-bordered input-primary w-full "
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </form>

        {NFTS && (
          <NFTList
            NFTS={NFTS}
            address={address}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </main>
    </>
  );
}
