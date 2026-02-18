import {
  CoinFlipResponse,
  FortuneWheelResponse,
  DiceRollResponse,
  PlinkoResponse,
} from "@/interface/response.interface";
import {
  CoinFlipReward,
  DiceRollReward,
  FortuneWheelReward,
  PlinkoReward,
} from "./reward.interface";

export type NumberString = `${number}` | number | string;
interface GameConfig {
  active: boolean;
}

interface CoinFlipConfig {
  defy_coins_exchange_rate_heads: string;
  defy_coins_exchange_rate_tails: string;
  max_bet_amount_heads: string;
  max_bet_amount_tails: string;
  min_bet_amount_heads: string;
  min_bet_amount_tails: string;
  win_multiplier_denominator: string;
  win_multiplier_numerator: string;
}

interface DiceRollConfig {
  active: true;
  coin_balance: {
    value: NumberString;
  };
  counter: NumberString;
  defy_coins_exchange_rate: NumberString;
  max_bet_amount: NumberString;
  min_bet_amount: NumberString;
}

interface FortuneWheelConfig extends GameConfig {
  coin_reward_tiers_amounts: NumberString[];
  spin_fee: NumberString;
}

interface PlinkoConfig extends GameConfig {
  //TODO
}

export type GameTypeMap = {
  coin_flip: {
    config: CoinFlipConfig;
    response: CoinFlipResponse;
    reward: CoinFlipReward;
  };
  fortune_wheel: {
    config: FortuneWheelConfig;
    response: FortuneWheelResponse;
    reward: FortuneWheelReward;
  };
  dice_roll: {
    config: DiceRollConfig;
    response: DiceRollResponse;
    reward: DiceRollReward;
  };
  plinko: {
    config: PlinkoConfig;
    response: PlinkoResponse;
    reward: PlinkoReward;
  };
};
