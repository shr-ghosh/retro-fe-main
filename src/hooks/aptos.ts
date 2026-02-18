import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import resource, {
  type ResourceType,
  type ReturnType,
} from "@/constants/resource";
import testnet_data from "@/constants/testnet_data";
import { useEffect, useState } from "react";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import getNetwork from "@/lib/network";
import { useToast } from "@/components/basic/Toast";

const useAptosPlay = <T1, T2 extends {}>(game: ResourceType) => {
  const { addToast } = useToast();

  const network = getNetwork();
  const config = new AptosConfig({ network });
  const aptos = new Aptos(config);

  const [configData, setConfigData] = useState<T1>();
  const [accountHasList, setAccountHasList] = useState(false);
  const [reward, setReward] = useState<T2 | null>(null);

  const { wallet, connected, account, signAndSubmitTransaction } = useWallet();

  // constant definination
  const MODULE_ADDRESS = (
    network === Network.MAINNET
      ? wallet?.url
      : testnet_data[game].module_address
  ) as string;

  const RESOURCE_ADDRESS = testnet_data[game].resource_address;
  const SUPPORTED_COINS = testnet_data[game].supported_coins.map(
    (coins) => coins.coin_address
  );

  const executeTransaction = async (
    funString: ReturnType,
    typeArguments: string[],
    funArguments: any[]
  ) => {
    if (!connected) {
      addToast("Please Connect the Wallet", "error");
    }

    const transaction: InputTransactionData = {
      data: {
        function: funString,
        typeArguments: typeArguments,
        functionArguments: funArguments,
        // type: "entry_function_payload",
      },
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      const transactionResponse = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      if (transactionResponse.success) {
        await checkRewards();
        setAccountHasList(true);
      }

      return transactionResponse;
    } catch (error) {
      console.error("Sign And Submit Error", error);
    }
  };

  const playGame = async (gameArguments: any[]) => {
    const response = await executeTransaction(
      resource[game].play(MODULE_ADDRESS),
      [...SUPPORTED_COINS],
      [...gameArguments]
    );
    return response;
  };

  const checkRewards = async () => {
    try {
      const resp = await aptos.getAccountResource<T2>({
        accountAddress: account?.address as string,
        resourceType: resource[game].user_rewards(
          MODULE_ADDRESS,
          SUPPORTED_COINS[0]
        ),
      });

      console.log("Rewards", resp);
      if (resp) setReward(resp);
    } catch (error) {
      console.error("Error in checkRewards", error);
    }
  };

  const claimRewards = async () => {
    const modifiedCoins = [...SUPPORTED_COINS];
    const desiredLength = 5;
    modifiedCoins.length = desiredLength;
    modifiedCoins.fill(
      "0x1::string::String",
      SUPPORTED_COINS.length,
      desiredLength
    );

    const response = await executeTransaction(
      resource[game].claim(MODULE_ADDRESS),
      modifiedCoins,
      [String(SUPPORTED_COINS.length)]
    );
    if (response?.success && response?.vm_status)
      addToast(response?.vm_status, "success");
    else if (!response?.success) addToast("Transaction Unsuccessful", "error");

    await checkRewards();

    return response;
  };

  useEffect(() => {
    const fetchAccountResource = async (
      account_address: string,
      module_address: string,
      coin_addresses: string[]
    ) => {
      const accountAddress = account_address;
      const resourceType = resource[game].config(
        module_address,
        coin_addresses[0]
      );
      const accountResource = await aptos.getAccountResource({
        accountAddress,
        resourceType,
      });

      setConfigData(accountResource);
      await checkRewards();
    };

    fetchAccountResource(RESOURCE_ADDRESS, MODULE_ADDRESS, SUPPORTED_COINS);
  }, []);

  return { configData, accountHasList, playGame, reward, claimRewards };
};

export default useAptosPlay;
