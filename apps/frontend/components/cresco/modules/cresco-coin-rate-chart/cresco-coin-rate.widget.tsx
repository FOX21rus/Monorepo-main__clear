import dynamic from "next/dynamic";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoTokenRatesPeriod } from "../../../../data/graphql/sdk/graphql";
import { useState } from "react";

const CrescoCoinRateLayout = dynamic(
  () => import("./cresco-coin-rate.layout"),
  { ssr: false }
);

export const CrescoCoinRateWidget = () => {
  const [forPeriod, setForPeriod] = useState<CrescoTokenRatesPeriod>(
    CrescoTokenRatesPeriod.Day
  );
  const { data } = sdk().useCrescoGetCrescoTokenRateHistory({ forPeriod });
  const rates = data?.crescoGetCrescoTokenRateHistory ?? [];
  const className =
    "bg-cresco-green-400 text-white py-1 px-3 rounded-md hover:bg-cresco-green-600";
  const classNameSelected = "bg-cresco-violet text-white py-1 px-3 rounded-md ";
  return (
    <div>
      <CrescoCoinRateLayout rates={rates} period={forPeriod} />
      <div
        className={"mt-5 grid grid-cols-6 text-center  cursor-pointer mb-14"}
      >
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.Day
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.Day)}
          >
            24H
          </a>
        </div>
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.Week
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.Week)}
          >
            7D
          </a>
        </div>
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.Month
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.Month)}
          >
            1M
          </a>
        </div>
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.Month3
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.Month3)}
          >
            3M
          </a>
        </div>
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.Year
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.Year)}
          >
            1Y
          </a>
        </div>
        <div>
          <a
            className={
              forPeriod === CrescoTokenRatesPeriod.All
                ? classNameSelected
                : className
            }
            onClick={() => setForPeriod(CrescoTokenRatesPeriod.All)}
          >
            ALL
          </a>
        </div>
      </div>
    </div>
  );
};
