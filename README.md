# Mirror World Marketplace Storefront Template

This repo contains a plug n' play template for the Mirror World SDK Marketplace.

## Pre-requisites
1. Have a developer account on [Mirror World Developer Dashboard](https://app.mirrorworld.fun)
2. Project API Key (Copy from your project on dashboard)
3. Collection Addresses (Copy from your project on dashboard)

## Usage
### 1. Clone this template repo:
```sh
git clone git@github.com:mirrorworld-universe/marketplace-sdk.git
```

### 2. Install dependencies
```sh
yarn install
```

### 3. Setup storefront `userConfig.json` variables. Please put your API Key and Collection addresses in this config
Example config:
```json
{
  // Array of collection addresses
  "collections": [
    "DUuMbpmH3oiREntViXfGZhrLMbVcYBwGeBa4Wn9X8QfM"
  ],
  // API Key
  "xApiKey": "mw_testAmRKdRbBsBbIAw3CeMqS9GORmcG5BRUCU4D",
  // Marketplace commission fee in percentage
  "serviceFee": 4.25,
  // Marketplace storefront currency
  "currencyOption": "SOL",
  // Storefront Network
  "network": "mainnet"
}
```


###  4. Run dev server
```sh
yarn dev
```

### 5. That's it! Deploy your static site!
You can deploy yoru Next.js site using [Vercel](https://vercel.com) or [Netlify](https://netlify.com), or [Cloudflare Pages](https://pages.cloudflare.dev).

## LICENSE
MIT License
