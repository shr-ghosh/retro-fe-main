export const dice_roll = {
  module_address:
    "0x2ad6df6efb64f7a13ebc13f4f93a03c857b8d432ee74c62dc21da24eebd78402",
  resource_address:
    "0x919819eb61ceb97077fec537a23301e95773061e0eb894851bc782c14e36e1d9",
  supported_coins: [
    {
      coin_address:
        "0xa9d210b09c69d13d8b4dabb9a95cf1f52f9749c62fd7d4561b5c3591609b42e8::GUI::GUI",
      decimals: 8,
    },
  ],
};

export const plinko = {
  module_address:
    "0xcfe66b0326b4194cd587234715ec9f6a81ec93321d50b3af042e771122b457af",
  resource_address:
    "0x671b1d8594a356212b21f02ada1529a7afb453bc4f3ded9bb0aa959fe1db6619",
  supported_coins: [
    {
      coin_address:
        "0xa9d210b09c69d13d8b4dabb9a95cf1f52f9749c62fd7d4561b5c3591609b42e8::GUI::GUI",
      decimals: 8,
    },
  ],
};

export const coin_flip = {
  module_address:
    "0xa9d210b09c69d13d8b4dabb9a95cf1f52f9749c62fd7d4561b5c3591609b42e8",
  resource_address:
    "0xa70d2c1b794134b5baaf49229ffd5dc78f8a3442f5fcbc96ed242cd51cc0a8ae",
  supported_coins: [
    {
      coin_address:
        "0xa9d210b09c69d13d8b4dabb9a95cf1f52f9749c62fd7d4561b5c3591609b42e8::GUI::GUI",
      decimals: 8,
    },
    {
      coin_address:
        "0xa9d210b09c69d13d8b4dabb9a95cf1f52f9749c62fd7d4561b5c3591609b42e8::FOMO::FOMO",
      decimals: 8,
    },
  ],
};

export const fortune_wheel = {
  module_address:
    "0xd21c40d0c0138f5e2904488c40ae5f01be47ba5a365f7412f53f146bd99cba04",
  resource_address:
    "0xdc26aba16290b37fe7fbf1f5d2f75525e3bdb899dab3c86083e668ca18d160c0",
  supported_coins: [
    {
      coin_address: "0x1::aptos_coin::AptosCoin",
      decimals: 8,
    },
  ],
};

const testnet_data = {
  dice_roll,
  plinko,
  coin_flip,
  fortune_wheel,
};

export default testnet_data;
export type TestnetDataType = keyof typeof testnet_data;
