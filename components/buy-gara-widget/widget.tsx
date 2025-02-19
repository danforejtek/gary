"use client"

import { useEffect, useState } from "react"
import { isAddress, parseUnits } from "viem"
// @ts-ignore
import { useAccount, useBalance, useSendTransaction, useWalletClient, useWriteContract } from "wagmi"
// @ts-ignore
import { useAddRecentTransaction, useChainModal } from "@rainbow-me/rainbowkit"
import { ConnectButton } from "@/components/buy-gara-widget/connect-button"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { ethers } from "ethers"

import { CoinInput } from "@/components/buy-gara-widget/coin-input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn, formatAmount } from "@/lib/utils"
import { useForm, useWatch } from "react-hook-form"
import { getGaraEstimate, usdcToGara } from "@/app/api/gara/lib/utils"
import { useGaraStore } from "@/lib/store/provider"
import TransactionStatusModal from "@/components/buy-gara-widget/transaction-status-modal"
import { sendPayment } from "@/lib/send-payment"
import { CurrencySelect } from "@/components/buy-gara-widget/currency-select"
import { getTokenBalance } from "@/lib/get-balance"

import Arrow from "@/public/images/gara-coin/arrow.svg"
import Polygon from "@/public/images/gara-coin/pol.png"
import CountdownTimer from "@/components/countdown-timer"
import { Rounds } from "@/components/rounds"

// const COINGARAGE_CONTRACT_ADDRESS = "0xA4AC096554f900d2F5AafcB9671FA84c55cA3bE1" as `0x${string}`
const COINGARAGE_CONTRACT_ADDRESS = "0x3027691e9Fe28499DAB102e591a6BA9cc40d0Ead" as `0x${string}`
const TOKENS_SOLD = 647149
const TOTAL_TOKEN_AMOUNT = 99000000
const endDate = 1740787199
const firstRoundEndDate = 1735689599
const secondRoundEndDate = 1738367999
const polygonRpcUrl = "https://polygon-mainnet.g.alchemy.com/v2/vbBKw_KLTIW6P9CvewSXZrgbaAlhcg9r"
const ethRpcUrl = "https://eth-mainnet.g.alchemy.com/v2/dNMADuse_UiHTjTasg3_E2ezx8IpNcxF"
const bscRpcUrl = "https://bnb-mainnet.g.alchemy.com/v2/dNMADuse_UiHTjTasg3_E2ezx8IpNcxF"
const polygonProvider = new ethers.providers.JsonRpcProvider(polygonRpcUrl)
const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
const bscProvider = new ethers.providers.JsonRpcProvider(bscRpcUrl)
const contractAddress = "0x8ecE1A114ae4768545211Ec3f5Bb62987165cd79"
const ethAddress = "0x8ecE1A114ae4768545211Ec3f5Bb62987165cd79"
const polygonAddress = "0xAa0B637a5F94CCe6EA5EE11Ed8f00A80fd55a8Be"
const bscAddress = "0x3027691e9Fe28499DAB102e591a6BA9cc40d0Ead"
const handleWalletConnect = () => {
  console.log('wallet connect triggered')
  // Trigger Google Analytics event
  if (typeof gtag === "function") {
    gtag("event", "wallet");
  }

  // Trigger Facebook Pixel event
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }
};
const ethVaultAbi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "firstRoundEndDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "secondRoundEndDate", type: "uint256" },
    ],
    name: "SaleDatesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "tokenBalance", type: "uint256" }],
    name: "TokenBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
    ],
    name: "TokenPurchase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "ethWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdtWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdcWithdrawBalance", type: "uint256" },
    ],
    name: "Withdrawl",
    type: "event",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_FIRST_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_SECONDE_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_THIRD_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assist",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "enum ETHVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
    ],
    name: "buyTokenEthPay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
      { internalType: "enum ETHVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
    ],
    name: "calculateTokenAmountPay",
    outputs: [{ internalType: "uint256", name: "buyTokenAmountPay", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "firstRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract AggregatorV3Interface", name: "priceFeed", type: "address" }],
    name: "getLatestPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaleDatesAndBalance",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "initialize", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "secondRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_assist", type: "address" }],
    name: "setAssist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_usdt", type: "address" },
      { internalType: "address", name: "_usdc", type: "address" },
    ],
    name: "setStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_endSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_firstRoundEndDate", type: "uint256" },
      { internalType: "uint256", name: "_secondRoundEndDate", type: "uint256" },
    ],
    name: "updateSaleDates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenBalance", type: "uint256" }],
    name: "updateTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdt",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
]
const bscVaultAbi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "firstRoundEndDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "secondRoundEndDate", type: "uint256" },
    ],
    name: "SaleDatesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "tokenBalance", type: "uint256" }],
    name: "TokenBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
    ],
    name: "TokenPurchase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "bnbWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdtWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdcWithdrawBalance", type: "uint256" },
    ],
    name: "Withdrawl",
    type: "event",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_FIRST_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_SECONDE_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_THIRD_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assist",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "enum BNBVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
    ],
    name: "buyTokenBnbPay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
      { internalType: "enum BNBVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
    ],
    name: "calculateTokenAmountPay",
    outputs: [{ internalType: "uint256", name: "buyTokenAmountPay", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "firstRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract AggregatorV3Interface", name: "priceFeed", type: "address" }],
    name: "getLatestPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaleDatesAndBalance",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "initialize", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "secondRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_assist", type: "address" }],
    name: "setAssist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_usdt", type: "address" },
      { internalType: "address", name: "_usdc", type: "address" },
    ],
    name: "setStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_endSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_firstRoundEndDate", type: "uint256" },
      { internalType: "uint256", name: "_secondRoundEndDate", type: "uint256" },
    ],
    name: "updateSaleDates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenBalance", type: "uint256" }],
    name: "updateTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdt",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
]
const polVaultAbi = [
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "firstRoundEndDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "secondRoundEndDate", type: "uint256" },
    ],
    name: "SaleDatesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "tokenBalance", type: "uint256" }],
    name: "TokenBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
    ],
    name: "TokenPurchase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "polWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdtWithdrawBalance", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "usdcWithdrawBalance", type: "uint256" },
    ],
    name: "Withdrawl",
    type: "event",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_FIRST_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_SECONDE_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_PRICE_USD_THIRD_STAGE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assist",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "enum POLVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
    ],
    name: "buyTokenPolPay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "paymentAmount", type: "uint256" },
      { internalType: "enum POLVault.PaymentMethod", name: "paymentMethod", type: "uint8" },
    ],
    name: "calculateTokenAmountPay",
    outputs: [{ internalType: "uint256", name: "buyTokenAmountPay", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "firstRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract AggregatorV3Interface", name: "priceFeed", type: "address" }],
    name: "getLatestPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaleDatesAndBalance",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "initialize", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "secondRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_assist", type: "address" }],
    name: "setAssist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_usdt", type: "address" },
      { internalType: "address", name: "_usdc", type: "address" },
    ],
    name: "setStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_endSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_firstRoundEndDate", type: "uint256" },
      { internalType: "uint256", name: "_secondRoundEndDate", type: "uint256" },
    ],
    name: "updateSaleDates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenBalance", type: "uint256" }],
    name: "updateTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdc",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "usdt",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
]
const contractAbi = [
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
      { internalType: "uint256", name: "_startSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_endSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_firstRoundEndDate", type: "uint256" },
      { internalType: "uint256", name: "_secondRoundEndDate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endSaleDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "firstRoundEndDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "secondRoundEndDate", type: "uint256" },
    ],
    name: "SaleDateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "newBalance", type: "uint256" }],
    name: "TokenBalanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "TokensSoldUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "assist",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "firstRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEndSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStartSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getfirstRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getsecondRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "handleTokenPurchase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "secondRoundEndDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_assist", type: "address" }],
    name: "setAssist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_endSaleDate", type: "uint256" },
      { internalType: "uint256", name: "_firstRoundEndDate", type: "uint256" },
      { internalType: "uint256", name: "_secondRoundEndDate", type: "uint256" },
    ],
    name: "setSaleDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startSaleDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokensSoldPerUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vaultContractAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20", name: "_token", type: "address" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const formSchema = z.object({
  to: z.string().refine((value) => isAddress(value), {
    message: "Invalid Address",
  }),
  from: z.string().refine((value) => isAddress(value), {
    message: "Invalid Address",
  }),
  garaEstimate: z.string(),
  amount: z.string(),
  token: z.string(),
})
const calculateRound = () => {
  const currentTime = new Date().getTime()
  if (firstRoundEndDate * 1000 > Number(currentTime)) {
    return 1
  } else if (secondRoundEndDate * 1000 > Number(currentTime)) {
    return 2
  } else if (endDate * 1000 > Number(currentTime)) {
    return 3
  }
}

export function BuyGara({ className }: { className?: string }) {
  const t = useTranslations("GARA.main.buyGARA")
  const [tokenSold, setTokenSold] = useState(0)
  const [nativeUSD, setNativeUSD] = useState(0)
  const sepoliaContract = new ethers.Contract(ethAddress, ethVaultAbi, ethProvider)
  const bscContract = new ethers.Contract(bscAddress, bscVaultAbi, bscProvider)
  const polygonContract = new ethers.Contract(polygonAddress, polVaultAbi, polygonProvider)

  async function readContractFunction() {
    const contract = new ethers.Contract(contractAddress, contractAbi, polygonProvider)

    try {
      const tokenBalance = await contract.getTokenBalance()
      console.log("tokenBalance", Math.floor(tokenBalance))
      setTokenSold(TOTAL_TOKEN_AMOUNT - Math.floor(tokenBalance / 10 ** 6))
      // return Math.floor(tokenBalance/10**18)
    } catch (error) {
      console.error("Error reading contract function:", error)
    }
  }
  useEffect(() => {
    // Fetch data immediately when the component mounts
    readContractFunction()

    // Set up an interval to fetch data every second
    const interval = setInterval(readContractFunction, 5000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])
  const {
    transactionStatus,
    setTransactionStatus,
    setOutcomingTransaction,
    setIncomingTransaction,
    reset: resetState,
  } = useGaraStore((state) => state)
  const { address, chain } = useAccount()
  const { data, isLoading, error } = useQuery({
    queryKey: ["ethereumPrice"],
    queryFn: async () => {
      console.log("-----------")
      // let response = null;
      // if(chain?.id === 11155111){
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      // }else if(chain?.id === 97){
      //   response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
      // }else{
      //   response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
      // }

      const data = await response?.json()
      console.log("price:", data)
      return data
    },
  })
  useEffect(() => {
    const fetchPrice = async () => {
      if (chain?.id === 1) {
        const tokenBalance = await sepoliaContract.calculateTokenAmountPay(parseUnits("1", 18), 0)
        setNativeUSD(Number(ethers.utils.formatUnits(tokenBalance.toString(), 6)))
      } else if (chain?.id === 56) {
        const tokenBalance = await bscContract.calculateTokenAmountPay(parseUnits("1", 18), 0)
        setNativeUSD(Number(ethers.utils.formatUnits(tokenBalance.toString(), 6)))
      } else {
        const tokenBalance = await polygonContract.calculateTokenAmountPay(parseUnits("1", 18), 0)
        setNativeUSD(Number(ethers.utils.formatUnits(tokenBalance.toString(), 6)))
      }
    }
    fetchPrice()
  }, [chain])

  // const eth_usd = data?.ethereum?.usd

  const [open, setOpen] = useState(false)
  const [hasUnsufficientBalance, setHasUnsufficientBalance] = useState(false)
  const toggleOpen = () => setOpen(!open)
  const handleOnOpenChange = () => {
    setOpen(!open)
    resetState()
  }

  const { data: balance } = useBalance({ address })
  const { data: walletClient } = useWalletClient()
  const addRecentTransaction = useAddRecentTransaction()
  const { writeContract } = useWriteContract()
  const { openChainModal } = useChainModal()
  const { sendTransaction } = useSendTransaction()
  const chainTxUrl = `${chain?.blockExplorers?.default?.url}/tx/`

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    // resolver: zodResolver(formSchema),
    defaultValues: {
      garaEstimate: usdcToGara(10).toString(),
      amount: "10.000",
      to: COINGARAGE_CONTRACT_ADDRESS,
      from: address,
      token: "USDT",
    },
  })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form

  const amount = useWatch({
    control: form.control,
    name: "amount",
  })

  const token = useWatch({
    control: form.control,
    name: "token",
  })

  useEffect(() => {
    if (!address || !token || !chain) return
    if (token === "ETH" || token === "POL" || token === "BNB") {
      const isInsufficientBalance = Number(balance?.formatted) < Number(amount)

      if (isInsufficientBalance) {
        form.setError("amount", { message: "Insufficient balance" })
      } else {
        form.clearErrors("amount")
      }
      setHasUnsufficientBalance(isInsufficientBalance)
    } else {
      try {
        const fetchBalance = async () => {
          const balance = await getTokenBalance({
            walletAddress: address as string,
            token: token,
            chainName: chain?.name as string,
          })
          // console.log(balance)
          const isInsufficientBalance = balance?.humanReadableBalance < Number(amount)
          if (isInsufficientBalance) {
            form.setError("amount", { message: "Insufficient balance" })
          } else {
            form.clearErrors("amount")
          }
          setHasUnsufficientBalance(isInsufficientBalance)
        }

        fetchBalance()
      } catch (error) {
        console.error(error)
      }
    }
  }, [amount, address, balance, token, chain])

  useEffect(() => {
    const round = calculateRound()
    const garaEstimate = getGaraEstimate(
      round,
      token,
      Number(amount),
      !["USDT", "USDC"].includes(nativeUSD.toString()) ? nativeUSD : undefined
    )
    setValue(
      "garaEstimate",
      garaEstimate.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    )
  }, [amount, token, form])

  useEffect(() => {
    setValue("from", address as `0x${string}`)
  }, [address, form])

  useEffect(() => {
    if (chain?.name !== "Ethereum") {
      setValue("token", "USDT")
    }
    if (chain?.name === "Ethereum") {
      setValue("token", "ETH")
    }
  }, [chain])

  useEffect(() => {
    if (token === "ETH" && chain?.name !== "Ethereum") {
      if (typeof openChainModal === "function") {
        openChainModal()
      }
    }
  }, [token, chain, openChainModal])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { amount, token } = data
    console.log("onSubmit amount, token", amount, token, chain?.id)

    const to = COINGARAGE_CONTRACT_ADDRESS
    if (!address || !walletClient) {
      setTransactionStatus({ process: "sendPayment", status: "walletError" })
      return
      // handle state
    }
    handleOnOpenChange()
    setTransactionStatus({ process: "sendPayment", status: "submitting" })
    console.log("sendPayment call")
    console.log({
      token,
      chain,
      amount: amount,
      recipientAddress: to,
      senderAddress: address,
      walletClient,
    })
    const response = await sendPayment({
      token,
      chain,
      amount: amount,
      recipientAddress: to,
      senderAddress: address,
      walletClient,
      setTransactionStatus,
      setOutcomingTransaction,
      setIncomingTransaction,
      resetState,
      writeContract,
      sendTransaction,
    })
    if (!response?.txHash) {
      setTransactionStatus({
        process: "sendPayment",
        status: "transactionError",
      })
      return
    }
    addRecentTransaction({
      hash: response.txHash,
      description: "Exchange USDC to GARA",
    })

    setTransactionStatus({ process: "receivePayment", status: "pending" })

    // Successful deposit: Trigger purchase event
    const depositValue = parseFloat(amount).toFixed(2);

    console.log('buy button triggered')
    // Google Analytics
    if (typeof gtag === "function") {
      gtag("event", "purchase", {
        value: depositValue,
        currency: "USD",
      })
    }
    
    // Facebook Pixel
    if (typeof fbq === "function") {
      fbq("track", "Purchase", { value: depositValue, currency: "USD" });
    }


    // const garaTransactionResponse = await fetch("/api/gara/exchange", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     txHash: response.txHash,
    //     from: address,
    //     to: to,
    //     amount,
    //     chain: chain?.name,
    //     token,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // const responseData = await garaTransactionResponse.json()
    // console.log("GARA Transaction Response:", responseData)
    // if (!garaTransactionResponse.ok) {
    //   setTransactionStatus({
    //     process: "receivePayment",
    //     status: "transactionError",
    //   })
    //   setIncomingTransaction({ done: true, error: responseData.message })
    //   return
    // }
    addRecentTransaction({
      hash: response?.txHash,
      description: "Incoming GARA",
    })
    setIncomingTransaction({
      done: true,
      txHash: response?.txHash,
      // receipt: responseData?.status,
    })
    setTransactionStatus({ process: "receivePayment", status: "paymentSent" })
    reset()
  }

  return (
    <section
      id="buy-gara"
      className={cn(
        "relative mt-4 w-full max-w-full flex-1 rounded-t-2xl bg-gradient-to-b from-white to-[#CFEFFF] p-6 px-5 shadow-md",
        className
      )}
    >
      <h3 className="mb-6 text-center font-heading text-4xl font-bold text-gary-blue">{t("header")}</h3>
      <Table className="text-base">
        <TableBody className="text-base">
          <TableRow className="!border-none hover:bg-transparent">
            <TableCell className="max-w-[80px] !p-1 font-heading font-bold">{t("totalTokens")}</TableCell>
            <TableCell className="!p-1 text-end font-bold text-gary-pink">900M GARA</TableCell>
          </TableRow>
          <TableRow className="!border-none hover:bg-transparent">
            <TableCell className="!p-1 font-bold">{t("distributedTokens")}</TableCell>
            <TableCell className="!p-1 text-end font-bold text-gary-pink">99M GARA</TableCell>
          </TableRow>
          <TableRow className="!border-none hover:bg-transparent">
            <TableCell className="!p-1 font-bold">{t("soldTokens")}</TableCell>
            <TableCell className="!p-1 text-end font-bold text-gary-pink" suppressHydrationWarning>
              {formatAmount(tokenSold, 0)} GARA
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-4 grid grid-cols-[1fr_180px_1fr] gap-2">
        <div className="relative flex w-full flex-row items-center justify-center">
          <div className="h-[2px] w-full bg-black dark:bg-neutral-700"></div>
        </div>
        <p className="text-center font-heading font-bold">
          Time Left - {calculateRound()}
          <sup>st</sup> round
        </p>
        <div className="relative flex w-full flex-row items-center justify-center">
          <div className="h-[2px] w-full bg-black dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="my-4 flex flex-row justify-center">
        <CountdownTimer />
      </div>
      <div className="mt-8 grid grid-cols-[1fr_120px_1fr] gap-2">
        <div className="relative flex w-full flex-row items-center justify-center">
          <div className="h-[2px] w-full bg-black dark:bg-neutral-700"></div>
        </div>
        <p className="text-center font-heading font-bold">Rounds</p>
        <div className="relative flex w-full flex-row items-center justify-center">
          <div className="h-[2px] w-full bg-black dark:bg-neutral-700"></div>
        </div>
      </div>
      <Rounds />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-full">
        <div className="mt-4 grid w-full grid-cols-2 gap-2 md:grid-cols-[1fr_150px]">
          <CoinInput
            coin="USDC"
            type="number"
            placeholder="0.000"
            {...register("amount")}
            error={errors?.["amount"]?.message}
            showIcon={false}
          />
          <CurrencySelect name="token" form={form} />
        </div>
        <div className="mt-4">
          <CoinInput
            coin="GARA"
            type="text"
            placeholder="0.000"
            className="cursor-disabled pointer-events-none"
            {...register("garaEstimate")}
            readOnly
          />
        </div>
        <input type="hidden" {...register("from")} />
        <input type="hidden" {...register("to")} />
        <input type="hidden" name="chain" value={chain?.name} />

        <div className="mt-8 flex flex-col gap-4">
        <ConnectButton label={t("btnConnectWallet")} showBalance={false} onClick={handleWalletConnect} />
          <Button
            type="submit"
            variant={address ? "default" : "outlinePrimary"}
            disabled={!address || hasUnsufficientBalance}
            className="h-12 rounded-full bg-[#061022] text-xl font-bold text-[#FFAE17]"
          >
            {t("btnBuyGARA")}
          </Button>
        </div>
        <TransactionStatusModal
          open={open}
          toggleOpen={handleOnOpenChange}
          setOpen={setOpen}
          senderChainTxUrl={chainTxUrl}
        />
      </form>
      {/*
      <div className="mt-6 flex flex-row justify-between gap-2 px-4 font-bold">
        <Button variant="link" size="sm" className="p-0 font-bold text-foreground" asChild>
          <a
            href="https://trade.coingarage.io/exchange/GARA-EUR"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center"
          >
            {t("buyWith")}
            <span className="mx-2 inline-flex">
              <Image src="/icons/coins/eur.png" width="18" height="18" alt="EUR" />
            </span>
            EUR
          </a>
        </Button>
        <div className="flex items-center justify-center">
        </div>
        <Button variant="link" className="p-0 font-bold">
          <a href="https://trade.coingarage.io/exchange/GARA-EUR" target="_blank" rel="noreferrer noopener">
            {t("linkGoToLaunchapad")}
          </a>
        </Button>
      </div>
      */}
      <p className="my-4 flex items-center justify-center space-x-2">
        <span className="text-xl leading-none">{t("poweredBy")}</span>
        <span className="inline-flex items-center">
          <Image src={Polygon} alt="Polygon" width={80} height={40} />
        </span>
      </p>
    </section>
  )
}
