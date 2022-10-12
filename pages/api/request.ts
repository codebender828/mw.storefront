import axios from 'axios'
import Cookies from 'js-cookie'
import {userConfig} from 'userConfig'

declare let window: any;

const ifProduct = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BRANCH_NAME !== 'staging';
let request:any = null;



import { MirrorWorld, ClusterEnvironment } from "@mirrorworld/web3.js"

const mirrorworld = new MirrorWorld({
  apiKey: userConfig.xApiKey,
  env: ClusterEnvironment.testnet, // Can be ClusterEnvionment.mainnet for mainnet
})


const getAUTH = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTYwOCwiZXRoX2FkZHJlc3MiOm51bGwsInNvbF9hZGRyZXNzIjoiM2J2cUppcmJyaThyd0VzbWNQalE3UGVzVkNHUzh3V2twVjcxbzloNDhvYjYiLCJlbWFpbCI6ImpvemUua29zbWVybEBnbWFpbC5jb20iLCJ3YWxsZXQiOnsiZXRoX2FkZHJlc3MiOm51bGwsInNvbF9hZGRyZXNzIjoiM2J2cUppcmJyaThyd0VzbWNQalE3UGVzVkNHUzh3V2twVjcxbzloNDhvYjYifSwiY2xpZW50X2lkIjoiYmRmYjRiMzgtMjgyZi0xMWVkLTliYzUtMGUxYmE3YWYxOTJkLmJkZmI0YjNkLm1pcnJvcndvcmxkLmZ1biIsImlhdCI6MTY2MzkxMDMzMCwiZXhwIjoxNjY2NTAyMzMwLCJqdGkiOiJhdXRoOjU2MDgifQ.4ZF58A9Qkq7IiZzGcfs7Zvd_3mHM7hDMTAUAAoVSif4";
}


const requestInterception = () => {
//  window.location.href = `${userConfig.loginUrl}?backurl=${window.location.href}`
request =  axios.create({
  baseURL: ifProduct ? 
  'https://api.mirrorworld.fun/v1/marketplace/'
  : 'https://api-staging.mirrorworld.fun/v1/marketplace/' ,
  headers: {
    // 'X-SSO-Token': Cookies.get('sso-t') || '',
    // 'Authorization': `Bearer ${getAUTH()}`,
    'x-api-key': userConfig.xApiKey
  },
});
 mirrorworld._api.client.defaults.headers.common.Authorization = `Bearer ${getAUTH()}`;
 mirrorworld._api.sso.defaults.headers.common.Authorization =  `Bearer ${getAUTH()}`;
}
// Get collection info
export const getCollectionInfo = async ()=>{
  requestInterception();
  const data =  await request.post('collections',  {
      collections: userConfig.collections
  })
  return data;
}

// get filter of collection Info
export const getCollectionFilter = async (collection: string) => {
  requestInterception();
  const data = await request.get(`collection/filter_info?collection=${collection}`);
  return data
}


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
      ...param
  })
  return data
}

// Get search result
export const getNftSearch = async (search: string) => {
  requestInterception();
  const data = await request.post(`nft/search`, {
      collections: userConfig.collections,
      search: search
  })
  return data
}


// Get search default
export const getNftRecommend = async (search: string) => {
  requestInterception();
  const data = await request.post(`nft/search/recommend`, {
      collections: userConfig.collections,
  })
  return data
}

// export const getNft = async (mintAddress: string)=> {
//   const nft = await mirrorworld.getNftDetails(mintAddress)
//   return nft
// }

export const getNft = async (mintAddress: string)=> {
  requestInterception();
  const data = await request.get(`nft/${mintAddress}`);
  return data
}

// buy nft 
export const buyNFT = async (mint_address:string, price:number) => {
  requestInterception();
  const listing = await mirrorworld.buyNFT({
    "mintAddress": mint_address,
    "price": price,
  })
  // const data = await request.post(`https://api-staging.mirrorworld.fun/v1/devnet/solana/marketplace/buy
  // `, {
  //   "mint_address": mint_address,
  //   "price": price,
  //   // "confirmation": "finalized"
  // })
  // return data;
  return listing;
}

// get nft activities 
export const getNftActivities = async (search: string,  pageSize: number) => {
  requestInterception();
  const data = await request.post(`nft/events`, {
    "mint_address": search,
    "page":  pageSize,
    "page_size": 10, // max 50
  })
  return data
}

// get user info 
export const getUser = async () => {
  requestInterception();
  const user = await mirrorworld.fetchUser();
  return user;
}

// updateNFTListing
export const updateNFTListing = async (mint_address: string, price: number) => {
  requestInterception();
  const listing = await mirrorworld.updateNFTListing({
    mintAddress: mint_address,
    price: price, // Amount in SOL
    // confirmation: "finalized"
  })
  return listing;
}

// cancelNFTListing
export const cancelNFTListing = async (mint_address: string, price: number) => {
  requestInterception();
  const listing = await mirrorworld.cancelNFTListing({
    mintAddress: mint_address,
    price: price, // Amount in SOL
    // confirmation: "finalized"
  })
  return listing;
}

// transferNFT
export const transferNFT = async ( mintAddress: string, recipientAddress: string) => {
  requestInterception();
  const transactionResult = await mirrorworld.transferNFT({
    mintAddress: mintAddress,
    recipientAddress:recipientAddress,
  })
  return transactionResult;
}

// getprice

export const getPrice = async (price:number) => {
  requestInterception();
  const data = await request.post(`nft/real_price`, {
    "price": price,
    "fee": userConfig.gasFee *1000  // 0.001% ～ 100% 对应 1 ～ 100000 
  })
  return data
}