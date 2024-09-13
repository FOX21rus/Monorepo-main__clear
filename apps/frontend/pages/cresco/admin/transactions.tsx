import { useState } from "react";
import { sdk } from "../../../data/graphql/sdk";
import {
  CrescoTransaction,
  CrescoTransactionStatus,
  CrescoTransactionTypeEnum,
} from "../../../data/graphql/sdk/graphql";

import { classList } from "../../../utils/classList";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { useCrescoTabs } from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";

const CrescoPageCabinetTransactions = () => {
  const { propsCrescoTabs, activeTab } = useCrescoTabs(
    ["USD", "EUR", "RUB"],
    "USD"
  );

  const { data, mutate } = sdk().useCrescoAdminTransactionList();
  const list = data?.crescoAdminTransactionList ?? [];

  return (
    <CrescoLayoutCabinet title={"Transactions"} isAdmin={true}>
      <p className={"mb-3"}>Verify customer{"'"}s transactions here</p>
      {list.map((transaction) => (
        <CrescoAdminTransaction
          key={transaction._id}
          transaction={transaction}
          mutate={mutate}
        />
      ))}
    </CrescoLayoutCabinet>
  );
};

const CrescoAdminTransaction = ({
  transaction,
  mutate,
}: {
  transaction: CrescoTransaction;
  mutate;
}) => {
  const isBuy =
    transaction.transactionType === CrescoTransactionTypeEnum.ClientBuyTokens;

  const [link, setLink] = useState("");

  const checkEthStatus = () => {
    sdk()
      .crescoAdminTransactionCheckInEth({ transactionId: transaction._id })
      .then(
        (d) =>
          d.crescoAdminTransactionCheckInEth?.match("http") &&
          setLink(d?.crescoAdminTransactionCheckInEth)
      )
      .then((d) => mutate());
  };

  const verify = () => {
    sdk()
      .crescoAdminTransactionSetStatus({
        transactionId: transaction._id,
        status: CrescoTransactionStatus.Approved,
      })
      .then((d) => mutate());
  };
  const preApprove = () => {
    sdk()
      .crescoAdminTransactionSetStatus({
        transactionId: transaction._id,
        status: CrescoTransactionStatus.PreApproved,
      })
      .then((d) => mutate());
  };

  const decline = () => {
    sdk()
      .crescoAdminTransactionSetStatus({
        transactionId: transaction._id,
        status: CrescoTransactionStatus.Failed,
      })
      .then((d) => mutate());
  };

  return (
    <div
      className={classList(
        "mb-5 pb-5 border-l-8 pl-4",
        transaction.status === CrescoTransactionStatus.Approved &&
          "border-cresco-green-600",
        transaction.status === CrescoTransactionStatus.Failed &&
          "border-rose-400",
        transaction.status === CrescoTransactionStatus.Pending &&
          "border-gray-400",
        transaction.status === CrescoTransactionStatus.RobotApproved &&
          "border-gray-400",
        transaction.status === CrescoTransactionStatus.PreApproved &&
          "border-yellow-600"
      )}
    >
      <p>
        {!isBuy && (
          <span
            className={
              "bg-cresco-violet text-white py-0.5 text-sm px-1 rounded-sm mr-2"
            }
          >
            Client Sell Tokens
          </span>
        )}
        {isBuy && (
          <span
            className={
              "bg-cresco-green-600 text-white py-0.5 text-sm px-1 rounded-sm mr-2"
            }
          >
            Client Buy Tokens
          </span>
        )}

        {
          <span
            className={classList(
              " text-white py-0.5 text-sm px-1 rounded-sm mr-2",
              transaction.status === CrescoTransactionStatus.Approved &&
                "bg-cresco-green-600",
              transaction.status === CrescoTransactionStatus.Failed &&
                "bg-rose-400",
              transaction.status === CrescoTransactionStatus.Pending &&
                "bg-gray-400",
              transaction.status === CrescoTransactionStatus.RobotApproved &&
                "bg-gray-400",
              transaction.status === CrescoTransactionStatus.PreApproved &&
                "bg-yellow-600"
            )}
          >
            Status: {transaction.status}
          </span>
        }
      </p>
      <div className={"text-gray-600 text-xs"}>
        <div className={"text-base text-cresco-violet font-bold"}>
          {transaction.userUri?.replace("email://", "")}
        </div>
        <div>Amount USDT: {transaction.amountUSDT.toFixed(1)}</div>
        <div>Amount Cresco Tokens: {(transaction.amountCrescoTokens).toFixed(0)}</div>
        <div>From Wallet: {transaction.fromWallet}</div>
        <div>To Wallet: {transaction.toWallet}</div>
      </div>
      <div className={"flex"}>
        <CrescoButton
          variant={"LINK"}
          onClick={checkEthStatus}
          className={" text-gray-400 hover:text-gray-600"}
        >
          Check status
        </CrescoButton>

        {transaction.status !== CrescoTransactionStatus.Approved && (
          <div>
            <CrescoButton
              variant={"LINK"}
              onClick={verify}
              className={" text-cresco-green-600 hover:text-cresco-green-400 "}
            >
              Verify
            </CrescoButton>
          </div>
        )}
        {transaction.status !== CrescoTransactionStatus.PreApproved &&
          transaction.status !== CrescoTransactionStatus.Approved && (
            <div>
              <CrescoButton
                variant={"LINK"}
                onClick={preApprove}
                className={
                  " text-cresco-green-600 hover:text-cresco-green-400 "
                }
              >
                Pre-Approve
              </CrescoButton>
            </div>
          )}
        {transaction.status !== CrescoTransactionStatus.Failed &&
          transaction.status !== CrescoTransactionStatus.Approved && (
            <div>
              <CrescoButton
                variant={"LINK"}
                onClick={decline}
                className={" text-rose-400 hover:text-cresco-green-400 "}
              >
                Decline
              </CrescoButton>
            </div>
          )}
      </div>
      {link && (
        <a className="text-cresco-violet text-xs cursor-pointer " href={link}>
          Found Transaction {link}
        </a>
      )}
    </div>
  );
};

export default CrescoPageCabinetTransactions;
