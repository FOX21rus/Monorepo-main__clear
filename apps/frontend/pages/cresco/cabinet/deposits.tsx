import { sdk } from "../../../data/graphql/sdk";
import { useLocalStorage } from "../../../utils/hooks/use-local-storage";
import { useEffect, useState } from "react";
import {
  CrescoTabs,
  useCrescoTabs,
} from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";
import { CRESCO_WALLET_ADDRESS } from "../../../data/config";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";
import { CrescoPortfolioStateWidget } from "../../../components/cresco/modules/cresco-portfolio-state/cresc-portfolio-state.widget";

const CrescoPageCabinetDeposits = () => {
  const [agreementNo, setAgreementNo] = useLocalStorage("token", undefined);
  //ToDo: fix bad name. В поле где был номер договора вписан токен
  const [data, setData] = useState<any>();
  useEffect(() => {
    console.log({agreementNo});
    sdk()
      .crescoGetDepositInfoByAgreementNumber({ agreementNo })
      .then((d) => {
        d.crescoGetDepositInfoByAgreementNumber?.attributed?.sort((a, b) =>
          a.agreementNo < b.agreementNo ? 1 : -1
        );

        setData(d.crescoGetDepositInfoByAgreementNumber);
        // if (d?.crescoGetDepositInfoByAgreementNumber?.["USD"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("USD");
        // else if (d?.crescoGetDepositInfoByAgreementNumber?.["RUB"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("RUB");
        // else if (d?.crescoGetDepositInfoByAgreementNumber?.["EUR"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("EUR");
      });
  }, [agreementNo]);
  const tabsList = Object.keys(data ?? {}).filter(
    (d) => (data[d] as any)?.agreementNo
  );
  const { propsCrescoTabs, activeTab } = useCrescoTabs(tabsList, tabsList[0]);
  //
  const show = !!data?.fio;
  const fio = data?.attributed?.[0]?.fio;
  const attributed =
    data?.attributed
      ?.filter((d) => d.amountTotal !== null)
      ?.map((d) =>
        !(d.amountTotal > 0 && d.amountTotal === d.amountPercents)
          ? d
          : { ...d, amountTotal: 0 }
      ) ?? [];
  const getTotal = (ageementNo) => {
    return attributed
      ?.filter((a) => a.agreementNo === ageementNo)
      .reduce((p, c, i) => p + c.amountTotal, 0);
  };
  const getTotalPercents = (ageementNo) => {
    return attributed
      ?.filter((a) => a.agreementNo === ageementNo)
      .reduce((p, c, i) => p + c.amountPercents, 0);
  };

  console.log("attributed", attributed);

  const agreementNoFirst = attributed?.[0]?.agreementNo??"Не указан"

  return (
    <CrescoLayoutCabinet title={fio} isAdmin={false}>
      {data?.date && (
        <div className={"mt-5 text-sm"}>
          <p>Актуально по состоянию на {data?.date ?? ""}</p>
        </div>
      )}
      {attributed?.map((deposit, i) => (
        <div key={i}>
          <DepositCurrencyView
            currency={deposit.currency}
            data={deposit}
            hideTitle={
              attributed?.[i - 1]?.agreementNo === attributed?.[i]?.agreementNo
            }
          />
          {attributed?.[i - 1]?.agreementNo === attributed?.[i]?.agreementNo &&
            attributed?.[i + 1]?.agreementNo !==
              attributed?.[i]?.agreementNo && (
              <DepositCurrencyView
                currency={deposit.currency}
                data={{
                  ...deposit,
                  amountTotal:
                    getTotal(attributed?.[i]?.agreementNo),
                  amountPercents: getTotalPercents(
                    attributed?.[i]?.agreementNo
                  ),
                }}
                hideTitle={true}
                isTotal={true}
              />
            )}
        </div>
      ))}
      {/*<div className={"mb-5"}>*/}
      {/*  <CrescoAnnotatedInput*/}
      {/*    type={"String"}*/}
      {/*    value={agreementNo}*/}
      {/*    onChangeValue={setAgreementNo}*/}
      {/*    annotation={{*/}
      {/*      title: "Agreement Number",*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      {show && (
        <div>
          {/*<StatLine title={"Client Name"}>{data.fio}</StatLine>*/}
          {/*<StatLine title={"Agreement #"}>{data.agreementNo}</StatLine>*/}
          <div className={"mt-5"}>
            <CrescoTabs {...propsCrescoTabs} />
            <div className={"mt-5"}>
              <DepositCurrencyView
                currency={activeTab}
                data={data[activeTab]}
                hideTitle={false}
              />
            </div>
          </div>
        </div>
      )}
      {/*{attributed?.length>1?<div>*/}
      {/*  <p>*/}
      {/*    */}
      {/*  </p>*/}
      {/*</div>}*/}

      <div className={"m-7 "}>
        <div>
          <RequestFullReport agreementNo={agreementNoFirst}/>
        </div>
        <div className={"mt-5"}>
          <OpenUSDTDeposit />
        </div>
        {/*<div className={"ml-3"}>*/}
        {/*  <RequestWithdrawal />*/}
        {/*</div>*/}
      </div>

      <div className={"mt-10"}>
        {/*<p className={"mb-5"}>*/}
        {/*  You can order a detailed report by clicking on the "Request full*/}
        {/*  report" button.*/}
        {/*</p>*/}
        {/*<p className={"mb-5"}>*/}
        {/*  To deposit the account in USDT, go to the appropriate section. <br />*/}
        {/*  To withdraw funds and for all other questions, please contact your*/}
        {/*  manager. <br />*/}
        {/*  You will find contacts in the "Contact manager" section.*/}
        {/*</p>*/}
        {/*<p className={"mb-5"}>*/}
        {/*  Вы можете заказать детализированный отчет, нажав на кнопку "Запросить*/}
        {/*  полный отчет".*/}
        {/*</p>*/}
        {/*<p className={"mb-5"}>*/}
        {/*  Для пополнения депозита в USDT перейдите в соответствующий раздел.{" "}*/}
        {/*  <br />*/}
        {/*  Для вывода средств и по всем остальным вопросам, пожалуйста, свяжитесь*/}
        {/*  с вашим менеджером. <br />*/}
        {/*  Контакты Вы найдете в разделе "Контакты".*/}
        {/*</p>*/}
      </div>
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetDeposits;

const OpenUSDTDeposit = () => {
  const [wallet, setWallet] = useState("");
  const [buyAmount, setBuyAmount] = useState(10000);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [agreementNo] = useLocalStorage("agreementNo", "");
  const markSent = () => {
    sdk()
      .crescoCustomerClassicRequestUSDTDeposit({
        agreementNo,
        walletAddress: wallet,
        amount: buyAmount,
      })
      .then((d) => {
        setSent(true);
      });
  };
  if (sent)
    return (
      <p className={"mt-5 text-cresco-green-600"}>
        Спасибо за запрос на внесение USDT. Менеджер скоро свяжется с Вами
      </p>
    );
  if (!open)
    return (
      <p>
        <CrescoButton variant={"LINK"} onClick={() => setOpen(true)}>
          Пополнить счет в USDT
        </CrescoButton>
      </p>
    );
  return (
    <div className={"mt-5"}>
      <p>
        <CrescoAnnotatedInput
          type={"String"}
          value={wallet}
          onChangeValue={setWallet}
          annotation={{
            title: "Введите свой ERC20 адрес крипто-кошелька",
          }}
        />
        <CrescoAnnotatedInput
          type={"Int"}
          value={buyAmount}
          onChangeValue={setBuyAmount}
          annotation={{
            title: "Сколько USDT хотели бы внести?",
          }}
        />
      </p>
      {wallet && (
        <p className={"mt-5 mb-3"}>
          Для внесения USDT отправьте средства на <br />
          {CRESCO_WALLET_ADDRESS}{" "}
        </p>
      )}

      {wallet && (
        <CrescoButton variant={"BASIC"} onClick={markSent}>
          Да, я отправил USDT на этот адрес
        </CrescoButton>
      )}
    </div>
  );
};

const RequestFullReport = ({agreementNo}) => {
  const [sent, setSent] = useState(false);
  // const [agreementNo] = useLocalStorage("agreementNo", "");
  const markSent = () => {
    sdk()
      .crescoCustomerClassicRequestFullReport({
        agreementNo,
      })
      .then((d) => {
        setSent(true);
      });
  };
  if (sent)
    return <p className={"mt-5 text-cresco-green-600"}>Запрос отправлен</p>;
  return (
    <div>
      <CrescoButton variant={"BASIC"} onClick={() => markSent()}>
        Запросить полный отчет
      </CrescoButton>
    </div>
  );
};

const RequestWithdrawal = () => {
  const [sent, setSent] = useState(false);
  const [agreementNo] = useLocalStorage("agreementNo", "");
  const markSent = () => {
    sdk()
      .crescoCustomerClassicRequestWithdrawal({
        agreementNo,
      })
      .then((d) => {
        setSent(true);
      });
  };
  if (sent)
    return <p className={"mt-5 text-cresco-green-600"}>Запрос отправлен</p>;
  return (
    <div>
      <CrescoButton variant={"LINK"} onClick={() => markSent()}>
        Запросить вывод средств
      </CrescoButton>
    </div>
  );
};

const DepositCurrencyView = ({ currency, data, hideTitle, isTotal }: any) => {
  if (!data?.depositNo)
    return (
      <div>
        <p>У вас еще нет {currency} </p>
        {currency === "USDT" && <OpenUSDTDeposit />}
      </div>
    );
  if (data.amountTotal !== 0 && !data.amountTotal) return null; //<p>Нет такого де {currency}</p>;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const cleanRub = (str: string) => {
    return `${str.match("RUB") ? "₽" : ""}${str.replace("RUB", "").trim()}`;
  };

  const growthRate = `${data.percent}%`;
  return (
    <div className={hideTitle ? "-mt-10" : "mt-3"}>
      {!hideTitle && (
        <div className={"flex items-center"}>
          <span className={"text-cresco-violet-800 text-lg font-bold mb-2"}>
            Договор {data.agreementNo}{" "}
            {/*{data.period && <p>(Периодичность выплаты: {data.period})</p>}*/}
          </span>
          {/*<span className={"text-xs"}>Депозит #{data.depositNo}</span>*/}
        </div>
      )}
      {/*<StatLine title={"Initial amount"}>{data.amountInitial}</StatLine>*/}
      {/*<StatLine title={"Growth"}>{Math.round(data.growPercentage*10000)/100}%</StatLine>*/}
      {/*<StatLine title={"Earned"}>{data.amountPercents}</StatLine>*/}
      {/*<StatLine title={"Total"}>{data.amountTotal}</StatLine>*/}
      <div className="mt-3 bg-white sm:pb-16">
        <div className="relative">
          <div className="" />
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">

              <dl className="rounded-lg bg-white sm:grid sm:grid-cols-4">
                <div
                  className={`flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r ${
                    !isTotal && data.amountTotal === 0 ? "invisible" : ""
                  }`}
                >
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    {isTotal ? "Итого баланс" : "Сумма депозита"}
                  </dt>
                  <dd
                    className={`order-1 text-2xl lg:text-4xl font-extrabold ${
                      isTotal
                        ? "text-cresco-violet-600"
                        : "text-cresco-green-600"
                    }`}
                  >
                    {cleanRub(formatter.format(isTotal?data.amountTotal:data.amountInitial))}
                  </dd>
                </div>

                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    {isTotal ? "Итого %" : "Сумма %"}
                  </dt>
                  <dd
                    className={`order-1 text-2xl lg:text-4xl  font-extrabold ${
                      isTotal
                        ? "text-cresco-violet-600"
                        : "text-cresco-green-600"
                    }`}
                  >
                    {cleanRub(formatter.format(data.amountPercents))}
                  </dd>
                </div>

                {!isTotal && (
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      % Cтавка
                    </dt>
                    <dd
                      className={`order-1 text-2xl lg:text-4xl  font-extrabold text-cresco-green-600`}
                    >
                      {cleanRub(growthRate?.replace(",", "."))}
                    </dd>
                  </div>
                )}
                {!isTotal && (<div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Периодичность выплаты
                  </dt>
                  <dd
                      className={`order-1 text-2xl lg:text-4xl  font-extrabold ${
                          isTotal
                              ? "text-cresco-violet-600"
                              : "text-cresco-green-600"
                      }`}
                  >
                    {data.period}
                  </dd>
                </div>)}
              </dl>

              {/*<dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3 mt-10">*/}
              {/*  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">*/}
              {/*    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">*/}
              {/*      Deposit number*/}
              {/*    </dt>*/}
              {/*    <dd className="order-1 text-2xl font-extrabold text-gray-400">*/}
              {/*      {data.depositNo}*/}
              {/*    </dd>*/}
              {/*  </div>*/}

              {/*  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">*/}
              {/*    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">*/}
              {/*      Start Date*/}
              {/*    </dt>*/}
              {/*    <dd className="order-1 text-2xl font-extrabold text-gray-400">*/}
              {/*      {data.startDate}*/}
              {/*    </dd>*/}
              {/*  </div>*/}
              {/*  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">*/}
              {/*    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">*/}
              {/*      Finish Date*/}
              {/*    </dt>*/}
              {/*    <dd className="order-1 text-2xl font-extrabold text-gray-400">*/}
              {/*      {data.finishDate}*/}
              {/*    </dd>*/}
              {/*  </div>*/}
              {/*</dl>*/}
            </div>
          </div>
        </div>
      </div>
      {/*<StatLine title={"Deposit #"}>{data.depositNo}</StatLine>*/}
      {/*<StatLine title={"Deposit Start Date"}>{data.startDate}</StatLine>*/}
      {/*<StatLine title={"Deposit Finish Date"}>{data.finishDate}</StatLine>*/}
    </div>
  );
};

const StatLine = ({ title, children }) => {
  return (
    <p>
      <span className={"text-cresco-violet"}>{title}</span>
      {": "}
      <span className={"text-gray-500"}>{children}</span>
    </p>
  );
};
