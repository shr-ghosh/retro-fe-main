import { NumberString } from "./game.interface";

export interface Reward {
  rewards_balance: {
    value: NumberString;
  };
}

export interface DiceRollReward extends Reward {
  num_plays: NumberString;
}

export interface CoinFlipReward extends Reward {}

export interface FortuneWheelReward {
  coin: {
    value: NumberString;
  };
}

export interface PlinkoReward extends Reward {}