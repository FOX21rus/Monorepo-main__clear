import { useState } from "react";
import { sdk } from "../../../data/graphql/sdk";
import { CrescoTransactionTypeEnum } from "../../../data/graphql/sdk/graphql";
import {
  CrescoTabs,
  useCrescoTabs,
} from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";
import { CRESCO_WALLET_ADDRESS } from "../../../data/config";
import { CrescoPortfolioStateWidget } from "../../../components/cresco/modules/cresco-portfolio-state/cresc-portfolio-state.widget";
import { formatTokenRate } from "../../../utils/format-token-rate";

const CrescoPageCabinetIndex = () => {
  const { activeTab, propsCrescoTabs } = useCrescoTabs(
    ["Buy tokens", "Sell tokens"],
    "Buy tokens"
  );
  const { data } = sdk().useCrescoCustomerGetMyProfile();
  const profile = data?.crescoCustomerGetMyProfile;
  const walletAddress = profile?.walletAddress;

  const { data: dataState, mutate } =
    sdk().useCrescoAdminGetLastPortfolioState();
  const state = dataState?.crescoAdminGetLastPortfolioState;

  const { data: cData } = sdk().useCrescoGetExternalCoinsRates();
  const rates = cData?.crescoGetExternalCoinsRates ?? [];
  const { data: dataRate } = sdk().useCrescoGetCurrentCrescoTokenRate();
  const rate = dataRate?.crescoGetCurrentCrescoTokenRate?.rateUSDT ?? 1;
  const share =
    (data?.crescoCustomerGetMyProfile?.crescoTokenBalance ?? 0) /
    (dataRate?.crescoGetCurrentCrescoTokenRate?.crescoTokensAmount ?? 1);
  const currentUSDT = rates.reduce(
    (p, rate) =>
      (state?.currenciesAmountsHashmap?.[rate.name as any] ?? 0) *
        (rate?.rate ?? 0) +
      p,
    0
  );
  const portfolioValue = currentUSDT * share ?? 0;

  const buyTokens = (amountCrescoTokens: number, customerWallet: string) => {
    sdk().crescoCustomerTransactionCreate({
      transactionType: CrescoTransactionTypeEnum.ClientBuyTokens,
      amountCrescoTokens,
      customerWallet,
    });
  };
  const sellTokens = (amountCrescoTokens: number, customerWallet: string) => {
    sdk().crescoCustomerTransactionCreate({
      transactionType: CrescoTransactionTypeEnum.ClientSellTokens,
      amountCrescoTokens,
      customerWallet,
    });
  };

  const { data: dataEstimation } =
    sdk().useCrescoCustomerGetCalculatedBalance();
  const estimation = dataEstimation?.crescoCustomerGetCalculatedBalance ?? 0;
  const { data: growthData } = sdk().useCrescoCustomerGetProfitability();
  const growth = `${(growthData?.crescoCustomerGetProfitability ?? 0)?.toFixed(
    2
  )}%`;

  const [buyAmount, setBuyAmountW] = useState("0");
  const [buyAmountUSDT, setBuyAmountUSDTW] = useState("0");
  const [sellAmount, setSellAmountW] = useState("0");
  const [sellAmountUSDT, setSellAmountUSDTW] = useState("0");
  const [rand, setRand] = useState(0);
  const setSellAmount = (val: any) => {
    setSellAmountW(val);
    setSellAmountUSDTW((rate * parseFloat(val)).toFixed(2));
    // setRand(Math.random())
    // setTimeout(()=>setSellAmountUSDTW((rate * parseFloat(sellAmount)).toString()),50)
  };
  const setBuyAmount = (val: any) => {
    console.log("setBuyAmount", val);
    setBuyAmountW(val);
    setBuyAmountUSDTW((rate * parseFloat(val)).toFixed(2));
    // setRand(Math.random())
    // setTimeout(()=>setBuyAmountUSDTW((rate * parseFloat(buyAmount)).toString()),50)
  };
  console.log("buyAmountUSDT", buyAmountUSDT);
  const setSellAmountUSDT = (val: any) => {
    setSellAmountW((parseFloat(val) / (rate ?? 1)).toFixed(2));
    setSellAmountUSDTW(val);
  };
  const setBuyAmountUSDT = (val: any) => {
    setBuyAmountW((parseFloat(val) / (rate ?? 1)).toFixed(2));
    setBuyAmountUSDTW(val);
  };
  const [wallet, setWallet] = useState("");
  const [check, setCheck] = useState(false);
  const usdtAmount = rate * parseFloat(buyAmount);
  const usdtAmountSell = rate * parseFloat(sellAmount);
  const crescoWallet = CRESCO_WALLET_ADDRESS;
  return (
    <CrescoLayoutCabinet title={"Current Portfolio State"} isAdmin={false}>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-50" />
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Your Cresco Tokens
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-cresco-green-600">
                    {formatTokenRate(profile?.crescoTokenBalance ?? 0, "")}
                  </dd>
                </div>

                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Current value
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-cresco-green-600">
                    {formatTokenRate(estimation, "USDT")}{" "}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Growth
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-cresco-green-600">
                    {growth}
                    {/*{(estimation*/}
                    {/*  ? 100 **/}
                    {/*    ((rate * (profile?.crescoTokenBalance ?? 0)) /*/}
                    {/*      (profile?.overallUSDTInvestments ?? 1) -*/}
                    {/*      1)*/}
                    {/*  : 0*/}
                    {/*).toFixed(2)}*/}
                    {/*%*/}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className={"mt-3"}>
        <CrescoTabs {...propsCrescoTabs} />
      </div>

      {activeTab === "Buy tokens" && !check && (
        <div className={"mt-5"}>
          {/*<CrescoAnnotatedInput*/}
          {/*  type={"Int"}*/}
          {/*  value={buyAmount}*/}
          {/*  onChangeValue={setBuyAmount}*/}
          {/*  annotation={{*/}
          {/*    title: "How many Cresco Tokens do you want to buy?",*/}
          {/*    description: "", //`1 Cresco Token = ${rate.toFixed(6)} USDT`,*/}
          {/*  }}*/}
          {/*/>*/}
          <CrescoAnnotatedInput
            type={"Int"}
            value={buyAmountUSDT}
            onChangeValue={setBuyAmountUSDT}
            annotation={{
              title: "How many USDT do you want to convert to Cresco Tokens?",
              description: "", //`1 USDT = ${(1 / rate).toFixed(6)} Cresco Tokens`,
            }}
          />
          {buyAmount !== "0" && (
            <div className={"mt-5"}>
              {!((walletAddress?.length ?? 0) > 10) && (
                <p>
                  <a
                    className={"text-cresco-green-600 underline"}
                    href={"/cresco/cabinet/profile"}
                  >
                    Fill in your ERC20 wallet address in profile first
                  </a>
                </p>
              )}
              {(walletAddress?.length ?? 0) > 10 && (
                <p>Your Wallet Address: {walletAddress}</p>
              )}
              {/*<CrescoAnnotatedInput*/}
              {/*  type={"String"}*/}
              {/*  value={wallet}*/}
              {/*  onChangeValue={setWallet}*/}
              {/*  annotation={{*/}
              {/*    title: "Enter YOUR ERC20 wallet address",*/}
              {/*    description: `And send ${usdtAmount.toFixed(*/}
              {/*      2*/}
              {/*    )} USDT from it to ${crescoWallet}`,*/}
              {/*  }}*/}
              {/*/>*/}
              <p></p>
              {(walletAddress?.length ?? 0) > 10 && (
                <CrescoButton
                  variant={"BASIC"}
                  className={"mt-2"}
                  onClick={() => {
                    setCheck(true);
                    buyTokens(parseFloat(buyAmount), walletAddress ?? "");
                  }}
                >
                  Yes, I&apos;ve transferred
                </CrescoButton>
              )}
            </div>
          )}
        </div>
      )}
      {activeTab === "Buy tokens" && check && (
        <div className={"mt-5 max-w-lg"}>
          <p className={"text-gray-500"}>
            Our managers will check your payment from wallet {walletAddress} to
            wallet {crescoWallet}
            {/*with amount of {usdtAmount} USDT for{" "}*/}
            {/*{buyAmount} Cresco Tokens. */}
            It can take up to 48 hours, you will be notified when the payment
            will be captured
          </p>
        </div>
      )}
      {activeTab === "Sell tokens" && !check && (
        <div className={"mt-5 max-w-lg"}>
          <CrescoAnnotatedInput
            type={"Float"}
            value={sellAmount}
            onChangeValue={setSellAmount}
            annotation={{
              title: "How many Cresco Tokens do you want to sell?",
              description: `1 Cresco Token ~ ${rate.toFixed(
                2
              )} USDT. Exact rate will be defined at the moment of deal confirmation.`,
            }}
          />
          {/*<CrescoAnnotatedInput*/}
          {/*  type={"Int"}*/}
          {/*  value={sellAmountUSDT}*/}
          {/*  onChangeValue={setSellAmountUSDT}*/}
          {/*  annotation={{*/}
          {/*    title: "How many USDT do you want to convert from Cresco Tokens?",*/}
          {/*    description: `1 USDT = ${(1 / rate).toFixed(2)} Cresco Tokens`,*/}
          {/*  }}*/}
          {/*/>*/}
          {sellAmount != "0" && (
            <div className={"mt-5"}>
              {!((walletAddress?.length ?? 0) > 10) && (
                <p>
                  <a
                    className={"text-cresco-green-600 underline"}
                    href={"/cresco/cabinet/profile"}
                  >
                    Fill in your ERC20 wallet address in profile first
                  </a>
                </p>
              )}
              {(walletAddress?.length ?? 0) > 10 && (
                <p>Your Wallet Address: {walletAddress}</p>
              )}
              {/*<CrescoAnnotatedInput*/}
              {/*  type={"String"}*/}
              {/*  value={wallet}*/}
              {/*  onChangeValue={setWallet}*/}
              {/*  annotation={{*/}
              {/*    title: "Enter YOUR ERC20 wallet address",*/}
              {/*    description: `We will send ${usdtAmountSell} USDT in 48 hours`,*/}
              {/*  }}*/}
              {/*/>*/}

              {(walletAddress?.length ?? 0) > 10 && (
                <CrescoButton
                  variant={"BASIC"}
                  className={"mt-2"}
                  onClick={() => {
                    sellTokens(parseFloat(sellAmount), walletAddress ?? "");
                    setCheck(true);
                  }}
                >
                  Request Withdrawal
                </CrescoButton>
              )}
            </div>
          )}
        </div>
      )}
      {activeTab === "Sell tokens" && check && (
        <div className={"mt-5 max-w-lg"}>
          <p className={"text-gray-500"}>
            Our managers will process your request
          </p>
        </div>
      )}
      <div className={"border-t my-10"} />
      {/*<p className={"text-3xl font-bold mt-10 -mb-5"}>*/}
      {/*  Current Portfolio State*/}
      {/*</p>*/}
      <CrescoPortfolioStateWidget canEdit={false} />
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetIndex;
