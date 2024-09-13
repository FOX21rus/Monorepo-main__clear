import { useEffect, useState } from "react";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoAnnotatedInput } from "../../../Hold/styled/cresco/inputs/cresco-input";
import { CrescoButton } from "../../blocks/buttons/cresco-button";
import { CrescoCoinRateWidget } from "../cresco-coin-rate-chart/cresco-coin-rate.widget";
import { CrescoCurrency } from "../../../Hold/styled/cresco/cresco-currency/cresco-currency";
import {
  CrescoExternalCoinRate,
  CrescoPortfolioState,
} from "../../../../data/graphql/sdk/graphql";
import { FnMutateType } from "../../../../modules/basic-components/common-types/fn-mutate.type";
import { CrescoPortfolioRatesLayout } from "./cresco-portfolio-rates.layout";
import { formatTokenRate } from "../../../../utils/format-token-rate";

export const CrescoPortfolioStateLayout = ({
  canEdit,
  state,
  mutatePortfolioState,
  rates,
  share,
}: {
  canEdit: boolean;
  state: CrescoPortfolioState;
  rates: CrescoExternalCoinRate[];
  mutatePortfolioState: FnMutateType;
  share: number;
}) => {
  const currentUSDT = rates.reduce(
    (p, rate) =>
      (state?.currenciesAmountsHashmap?.[rate.name as any] ?? 0) *
        (rate?.rate ?? 0) +
      p,
    0
  );
  const portfolioValue = currentUSDT * share;

  const [val, setVal] = useState(0);
  const [crescoTokensOverallAmount, setCrescoTokensOverallAmount] = useState(
    state?.crescoTokensOverallAmount ?? 0
  );

  useEffect(() => {
    setCrescoTokensOverallAmount(state?.crescoTokensOverallAmount ?? 0);
  }, [state]);

  const [edited, setEdited] = useState("");
  const [changeList, setChangeList] = useState([] as any[]); // new state variable for change list

  console.log(val);
  const editValue = (value) => {
    console.log("editValue", edited, value, state?.currenciesAmountsHashmap);
    const existingChange = changeList.find(
      (change) => change.coinName === edited.toUpperCase()
    ); // find existing change for edited coin name

    if (existingChange) {
      // if there's an existing change, update the new amount
      existingChange.newAmount = value;
      setChangeList([...changeList]); // trigger re-render
    } else {
      // if there's no existing change, push a new change to the list
      setChangeList([
        ...changeList,
        {
          coinName: edited.toUpperCase(),
          oldAmount:
            state?.currenciesAmountsHashmap?.[edited?.toLowerCase()] ?? 0,
          newAmount: value,
        },
      ]); // push change to change list
    }

    setEdited("");
  };

  const saveChanges = () => {
    sdk()
      .crescoAdminCreateNewPortfolioState({
        coinBalances: {
          ...state?.currenciesAmountsHashmap,
          ...changeList.reduce((acc, { coinName, newAmount }) => {
            acc[(coinName as any).toLowerCase()] = newAmount;
            return acc;
          }, {}),
        },
        crescoTokensOverallAmount,
      })
      .then((d) => {
        mutatePortfolioState();
      });
    setChangeList([]);
  };

  const cancelChanges = () => {
    setChangeList([]);
  };

  return (
    <div>
      {/*<div className={"my-10"}>*/}
      {/*  <p className={"text-5xl font-black text-cresco-green-600"}>*/}
      {/*    {formatTokenRate(currentUSDT * share, "USDT")}*/}
      {/*  </p>*/}
      {/*  <p className={"text-xl mt-1"}>Portfolio Value</p>*/}
      {/*</div>*/}

      <CrescoCoinRateWidget />
      <div className={"my-7"} id={"widget"}>
        {edited && (
          <div className={"my-10 py-10 border-y"}>
            <CrescoAnnotatedInput
              readonly={false}
              type={"Float"}
              annotation={{
                title: `Set new Cresco Tokens overall amount`,
              }}
              value={crescoTokensOverallAmount}
              onChangeValue={(v) => setCrescoTokensOverallAmount(v)}
            />
            <CrescoAnnotatedInput
              readonly={false}
              type={"Float"}
              allowNegative={true}
              annotation={{
                title: `Set new amount of ${edited}`,
              }}
              value={val}
              onChangeValue={(v) => setVal(v)}
            />
            <CrescoButton
              variant={"BASIC"}
              className={"mt-1"}
              onClick={() => {
                editValue(val);
              }}
            >
              Save
            </CrescoButton>
          </div>
        )}

        {/* new change list section */}
        {changeList.length > 0 && (
          <div className={"my-7"}>
            <h3 className={"text-xl font-bold mb-10"}>Change List</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Coin Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Old Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    New Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {changeList.map(({ coinName, oldAmount, newAmount }, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {coinName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {oldAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {newAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={"flex justify-end mt-2"}>
              <CrescoButton variant={"BASIC"} onClick={cancelChanges}>
                Cancel
              </CrescoButton>
              <CrescoButton
                variant={"BASIC"}
                className={"ml-2"}
                onClick={saveChanges}
              >
                Save
              </CrescoButton>
            </div>
          </div>
        )}

        <CrescoPortfolioRatesLayout
          edited={!!edited}
          share={share}
          currencies={rates.map((r) => ({
            coinName: r.displayName as string,
            rateUSDT: r.rate as number,
            amount:
              state?.currenciesAmountsHashmap?.[
                (r.name as any).toLowerCase()
              ] ?? 0,
          }))}
          onRowEdit={
            canEdit &&
            ((coinName) => {
              canEdit && setEdited((coinName as string).toLowerCase());
              if (canEdit) {
                document.location.href = "#widget";
                setVal(
                  state?.currenciesAmountsHashmap?.[
                    (coinName as any).toLowerCase()
                  ] ?? 0
                );
              }
            })
          }
        />
      </div>
    </div>
  );
};
