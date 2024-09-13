import { sdk } from "../../../../data/graphql/sdk";
import { formatTokenRate } from "../../../../utils/format-token-rate";
import dynamic from "next/dynamic";
import {useState} from "react";
import {InputText} from "../../../../modules/basic-components/elements/inputs/variants/input-text";
import {CrescoAnnotatedInput} from "../../../Hold/styled/cresco/inputs/cresco-input";

const CrescoPortfolioRatesPieChart = dynamic(
  () => import("./cresco-portfolio-rates-pie-chart"),
  { ssr: false }
);

export const CrescoPortfolioRatesLayout = ({
  currencies,
  share,
  onRowEdit,
    edited
}: {
  currencies: {
    coinName: string;
    rateUSDT: number;
    amount: number;
  }[];
  share: number;
  onRowEdit: any;
  edited?:boolean
}) => {
  const canEdit = !!onRowEdit;
  const [filter,setFilter] = useState("")
  const totalValue = currencies.reduce((p, c) => p + c.amount * c.rateUSDT, 0);
  const currenciesEnh = currencies
    .map((c) => ({ ...c, value: c.rateUSDT * c.amount }))
    .map((c) => ({
      coinName: c.coinName.toUpperCase(),
      rateUSDT: c.rateUSDT,
      value: c.value * share,
      amount: (c.amount * share).toFixed(3),
      percentage: `${(((c.value||0) / (totalValue||1)) * 100).toFixed(2)}%`,
      percent: c.value / (totalValue??1),
    }))
    .filter((c) => canEdit || c.value)
      .filter(c=>!canEdit||!filter||c.coinName.match(filter.toUpperCase()))
    .sort((c1, c2) => (Math.abs(c1.value) < Math.abs(c2.value) ? 1 : -1));

  return (
    <div>
      <div className={"my-10 mt-20 font-bold"}>
        {/*<p className={"text-5xl font-black text-cresco-green-600"}>*/}
        {/*  {formatTokenRate(currentUSDT * share, "USDT")}*/}
        {/*</p>*/}
        <p className={"text-xl mt-1"}>Portfolio Structure</p>
      </div>
      {!edited&&<CrescoPortfolioRatesPieChart
          data={currenciesEnh.map((c) => ({
            name: c.coinName,
            value: c.percent,
          }))}
      />}


      {canEdit&&<div className={"mb-5"}><CrescoAnnotatedInput type={"String"} value={filter} onChangeValue={setFilter}
                                                     annotation={{title: "Search"}}/></div>}

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Coin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rate to USDT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      USDT Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Percentage
                    </th>
                    {onRowEdit && (
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currenciesEnh.map((c) => (
                    <tr key={c.coinName}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {c.coinName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {c.rateUSDT}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {c.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTokenRate(c.value, "")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {c.percentage}
                      </td>
                      {onRowEdit && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mediu">
                          <a
                            onClick={() => onRowEdit(c.coinName)}
                            className="text-cresco-green cursor-pointer hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
