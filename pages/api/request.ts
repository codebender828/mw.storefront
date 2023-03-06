import axios from "axios";
import userConfig from "@/userConfig.json";
import { toast } from "sonner";

declare let window: any;

const ifProduct = userConfig.xApiKey.length < 42;
let request: any = null;

import { MirrorWorld, ClusterEnvironment } from "@mirrorworld/web3.js";

const mirrorworld = new MirrorWorld({
  // devnet and mainnet
  //  @ts-ignore
  apiKey: userConfig.xApiKey,
  env:
    userConfig.network === "mainnet"
      ? ClusterEnvironment.mainnet
      : ClusterEnvironment.testnet, // Can be ClusterEnvionment.mainnet for mainnet
  staging: !ifProduct,
});

const getAUTH = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const auth = urlParams.get("auth");
  auth && window.localStorage.setItem("auth", auth);
  return auth;
};

const requestInterception = () => {
  if (request) return;
  request = axios.create({
    baseURL: ifProduct
      ? `https://api.mirrorworld.fun/v1/marketplace/`
      : `https://api-staging.mirrorworld.fun/v1/marketplace/`,
    headers: {
      Authorization: `Bearer ${getAUTH() || window?.localStorage?.auth}`,
      "x-api-key": userConfig.xApiKey,
    },
  });
  mirrorworld._api.client.defaults.headers.common.Authorization = `Bearer ${
    getAUTH() || window?.localStorage?.auth
  }`;
  mirrorworld._api.sso.defaults.headers.common.Authorization = `Bearer ${
    getAUTH() || window?.localStorage?.auth
  }`;
};
// Get collection info
export const getCollectionInfo = async () => {
  requestInterception();
  const data = await request.post("collections", {
    collections: userConfig.collections,
  });
  return data;
};

// get filter of collection Info
export const getCollectionFilter = async (collection: string) => {
  requestInterception();
  const data = await request.get(
    `collection/filter_info?collection=${collection}`
  );
  return data;
};

// get collection nfts
// {
//   "collection": "",
//   "page": 1,
//   "page_size": 20, // 最大 50
//   "order": {
//           "order_by": "price",
//           "desc": true
//       },
//   "filter": [
//       {
//           "filter_name": "Background",
//           "filter_type": "enum",
//           "filter_value": ["red", "blue"]  // 支持多个同时选择
//       },
//       {
//           "filter_name": "level",
//           "filter_type": "range",
//           "filter_range": [1, 10],    // 等级是 1 到 10 ，
//       }
//   ]
// }
export const getCollectionNfts = async (param: object) => {
  requestInterception();
  const data = await request.post(`nfts`, {
    ...param,
  });
  return data;
};

// Get search result
export const getNftSearch = async (search: string) => {
  requestInterception();
  const data = await request.post(`nft/search`, {
    //  @ts-ignore
    collections: userConfig.collections,
    search: search,
  });
  return data;
};

// Get search default
export const getNftRecommend = async (search: string) => {
  requestInterception();
  const data = await request.post(`nft/search/recommend`, {
    //  @ts-ignore
    collections: userConfig.collections,
  });
  return data;
};

// export const getNft = async (mintAddress: string)=> {
//   const nft = await mirrorworld.getNftDetails(mintAddress)
//   return nft
// }

export const getNft = async (mintAddress: string) => {
  requestInterception();
  const data = await request.get(`nft/${mintAddress}`);
  return data;
};

// buy nft
export const buyNFT = async (mint_address: string, price: number) => {
  requestInterception();
  if (!mirrorworld.user) {
    toast("Logging in");
    await mirrorworld.login();
  }
  const listing = await mirrorworld.buyNFT({
    mintAddress: mint_address,
    price: price,
  });
  // const data = await request.post(`https://api-staging.mirrorworld.fun/v1/devnet/solana/marketplace/buy
  // `, {
  //   "mint_address": mint_address,
  //   "price": price,
  //   // "confirmation": "finalized"
  // })
  // return data;
  return listing;
};

// get nft activities
export const getNftActivities = async (search: string, pageSize: number) => {
  requestInterception();
  const data = await request.post(`nft/events`, {
    mint_address: search,
    page: pageSize,
    page_size: 10, // max 50
  });
  return data;
};

// get user info
export const getUser = async () => {
  requestInterception();
  const user = await mirrorworld.fetchUser();
  return user;
};

// updateNFTListing
export const updateNFTListing = async (mint_address: string, price: number) => {
  requestInterception();
  if (!mirrorworld.user) {
    toast("Logging in");
    await mirrorworld.login();
  }
  const listing = await mirrorworld.updateNFTListing({
    mintAddress: mint_address,
    price: price, // Amount in SOL
  });
  return listing;
};

// cancelNFTListing
export const cancelNFTListing = async (mint_address: string, price: number) => {
  requestInterception();
  if (!mirrorworld.user) {
    toast("Logging in");
    await mirrorworld.login();
  }
  const listing = await mirrorworld.cancelNFTListing({
    mintAddress: mint_address,
    price: price, // Amount in SOL
    // confirmation: "finalized"
  });
  return listing;
};

// transferNFT
export const transferNFT = async (
  mintAddress: string,
  recipientAddress: string
) => {
  requestInterception();
  console.log(mintAddress, recipientAddress);
  if (!mirrorworld.user) {
    toast("Logging in");
    await mirrorworld.login();
  }
  const transactionResult = await mirrorworld.transferNFT({
    mintAddress: mintAddress,
    recipientAddress: recipientAddress,
  });

  return transactionResult;
};

// getprice

export const getPrice = async (price: number) => {
  requestInterception();
  const data = await request.post(`nft/real_price`, {
    price: price,
    //  @ts-ignore
    fee: userConfig.serviceFee * 1000, // 0.001% ～ 100% 对应 1 ～ 100000
  });
  return data;
};
