export interface CoinFlipResponse {
  amount_won: string;
  bet_amount: string;
  bet_multiplier_denominator: string;
  bet_multiplier_numerator: string;
  defy_coins_won: string;
  heads_coin: string;
  is_winner: boolean;
  outcome_side: string;
  player: string;
  selected_side: string;
  tales_coin: string;
}

export interface FortuneWheelResponse {
  player: string;
  reward_amount: string | number;
  reward_tier: string;
  reward_type: string;
  timestamp: string;
}

export interface DiceRollResponse {
  amount_won: string;
  bet_amounts: string[];
  bet_multiplier: string;
  bet_type: string;
  coin_type: string;
  defy_coins_won: string;
  dice_one_value: string;
  dice_two_value: string;
  player: string;
  side: boolean;
  sum: string;
  total_bet_amount: string;
}

export interface PlinkoResponse {
  amount_won: string;
  ball_path: string[];
  bet_amount: string;
  coin_type: string;
  defy_coins_won: string;
  multiplier: string;
  player: string;
}

export interface TransactionEvent<T> {
  data: T;
  guid: {
    creation_number: string;
    account_address: string;
  };
  sequence_number: string;
  type: string;
}

export interface Transaction {
  accumulator_root_hash: string;
  changes: object[];
  event_root_hash: string;
  events: TransactionEvent<any>[];
  expiration_timestamp_secs: string;
  gas_unit_price: string;
  gas_used: string;
  hash: string;
  max_gas_amount: string;
  payload: any;
  sender: string;
  sequence_number: string;
  signature: {
    public_key: string;
    signature: string;
    type: string;
  };
  state_change_hash: string;
  state_checkpoint_hash: null | string;
  success: boolean;
  timestamp: string;
  type: string;
  version: string;
  vm_status: string;
}
