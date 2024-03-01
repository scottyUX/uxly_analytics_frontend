import React, { useState, useEffect } from "react";
import TruncatedText from "./TruncateText";
import "../displaywallet.css";

interface WalletData {
  address: string;
  networth: any;
  nft: any;
  transactions: any;
  transactionsData: any;
}

const DisplayNFTs: React.FC<{ walletData: WalletData }> = ({ walletData }) => {
  const videoExtensions = /\.(mp4|webm|ogg|ogv)$/i;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>NFTs:</span>
      <ul className="nft-container">
        {walletData.nft.map((obj: any, index: string) => (
          <div key={index} className="nft-item">
            <div className="text-container">
              <span className="large-text">{obj.name}</span>
              <span className="small-text">Amount: {obj.amount}</span>
            </div>
            {obj.image ? (
              obj.image.startsWith("ipfs://") ? (
                <img
                  src={`https://ipfs.io/ipfs/${obj.image.slice(7)}`}
                  alt={obj.name}
                  className="nft-image"
                />
              ) : videoExtensions.test(obj.image) ? (
                <video controls className="nft-video">
                  <source
                    src={obj.image}
                    type={`video/${obj.image.split(".").pop()}`}
                  />
                  Your browser does not support the video.
                </video>
              ) : (
                <img src={obj.image} alt={obj.name} className="nft-image" />
              )
            ) : (
              <p>Image not available</p>
            )}
            {obj.description ? (
              <span>
                {isMobile ? (
                  <span>...</span>
                ) : (
                  <TruncatedText
                    text={`Description: ${obj.description}`}
                    maxLength={25}
                  />
                )}
              </span>
            ) : (
              <TruncatedText text="No Description" maxLength={20} />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DisplayNFTs;
