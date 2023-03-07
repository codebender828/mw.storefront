# Mirror World Marketplace Storefront Template

This repo contains a plug n' play template for the Mirror World SDK Marketplace. All features in this template were built using [Mirror World's SDK API](https://mirrorworld.fun/docs)

The stack:
- Frontend Framework - [Next.js](https://nextjs.org)
- UI Library - [Ant Design Mobile](https://mobile.ant.design/gallery/)
- Authentication & Marketplace APIs - [Mirror World SDK](https://mirrorworld.fun/docs)

> 
>This storefront template supports **Solana** at this time. Multi-chain support template is not yet available. Please ping us on [Discord](https://mirrorworld.fun/discord) for discussions about Multi chain support.
>
>- **Found a bug?** Please open an discussion or report on Discord
>- **Questions and Discussions?** - The fastest place to get a response in [Discord](https://mirrorworld.fun/discord). But for community visibility, please open a new [GitHub discussion](https://github.com/orgs/mirrorworld-universe/discussions).
>- **Contributions are welcome** - This template is open-source, so all positive contributions and improvements are welcome from the community.
>

## Pre-requisites
1. Developer account on [Mirror World Developer Dashboard](https://app.mirrorworld.fun)
2. Project API Key (Copy from your project on dashboard)
3. Collection Addresses (Copy from your project on dashboard)

## Usage
### 1. Clone this template repo:
```sh
git clone git@github.com:mirrorworld-universe/marketplace-storefront.git
```

### 2. Install dependencies
```sh
yarn install
```

### (🚨🚨🚨 IMPORTANT 🚨🚨🚨) 3. Configure your marketplace variables in the `userConfig.json` file in the root.
Example config:
```json
{
  // Array of collections
  "collections": [
    "CnFFwJ4V2RaNorLs7EdtNZqQ2uhgXp6X3gKEmLgxEBPZ"
  ],
  // API Key - Example API Key.
  "xApiKey": "mw_lCX2WHH7_d0nT_4ctuaL1y_us3_Th1s_l0L_JN0FAMIqM5",
  // Your marketplace service fee. Acquired from developer dashboard
  "serviceFee": "3",
  // Your marketplace settlement currency. Example
  // SOL: So11111111111111111111111111111111111111112
  // USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
  // 
  // 🚨 Important: This must match the currency you selected when creating the dashboard
  "currencyOption": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  // Name of the marketplace
  "name": "Demo Storefront",
  // Image URL for your marketplace
  "logo": "https://www.jbakebwa.dev/assets/images/jbakebwa-headshot.jpeg",
  // Network of your marketplace. Accepts either `mainnet` or `devnet`
  "network": "mainnet"
}
```


###  4. Run dev server
```sh
yarn dev
```

If you configured your marketplace correctly, you should be able to see a screen similar to this in the browser at `http://localhost:3000`:
![Storefront UI](docs/example.png)

>
> At this point you may make changes to your > marketplace storefront as you see fit.
>
> This is entirely up to you. You may change the > colors, fonts, and layouts until you're satisfied.
>

#### Some helpful resources
- [JavaScript SDK API Reference](https://mirrorworld.fun/docs/api-reference/js) 
- [SDK Development Guide](https://mirrorworld.fun/docs/overview/development-guide)
- [Full API Documentation](https://developer.mirrorworld.fun/)
- [Developer Discord Community](https://mirrorworld.fun/discord)

### 5. That's it! Deploy your static site!
You can deploy yoru Next.js site using [Vercel](https://vercel.com) or [Netlify](https://netlify.com), or [Cloudflare Pages](https://pages.cloudflare.dev).


## LICENSE
MIT License
