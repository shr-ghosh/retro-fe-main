import useAptosPlay from "./aptos";
import { useState } from "react";
import { Transaction } from "@/interface/response.interface";
import { useToast } from "@/components/basic/Toast";
import testnet_data from "@/constants/testnet_data";
import { GameTypeMap } from "@/interface/game.interface";
import { TransactionEvent } from "@/interface/response.interface";

const usePlay = <T extends keyof GameTypeMap>(
  game: T,
  defaultArguments?: any[]
) => {
  type Config = GameTypeMap[T]["config"];
  type Response = GameTypeMap[T]["response"];
  type Reward = GameTypeMap[T]["reward"];

  const { addToast } = useToast();
  const [gameArguments, setGameArguments] = useState<any[]>(
    defaultArguments || []
  );
  const { configData, accountHasList, playGame, reward, claimRewards } =
    useAptosPlay<Config, Reward>(game);

  const triggerGame = async (): Promise<TransactionEvent<Response>[] | []> => {
    if (!configData) {
      addToast("No Config Data Found", "error");
      return [];
    }

    const gameResponse = (await playGame(gameArguments)) as Transaction;

    if (!gameResponse) {
      addToast("Transaction Failed", "error");
      return [];
    }

    console.log("Transaction Response", gameResponse);

    const acceptedResponse = gameResponse.events.filter((item) =>
      item.type.includes(testnet_data[game].module_address)
    ) as TransactionEvent<Response>[];

    return acceptedResponse;
  };

  const changeGameArguments = (newElemValue: any, index: number) => {
    setGameArguments((prevArgs) => {
      if (prevArgs[index] === newElemValue) return prevArgs;
      const newArgs = [...prevArgs];
      newArgs[index] = newElemValue;
      return newArgs;
    });
  };

  return {
    gameArguments,
    setGameArguments,
    changeGameArguments,
    configData,
    accountHasList,
    triggerGame,
    reward,
    claimRewards,
  };
};

export default usePlay;
