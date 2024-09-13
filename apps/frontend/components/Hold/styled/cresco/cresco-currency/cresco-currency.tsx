export const CrescoCurrency = ({ title, amount, current, onClick }) => {
  return (
    <div
      className={"flex max-w-md my-5 items-stretch cursor-pointer"}
      onClick={onClick}
    >
      <div className={"mr-1"}>
        <p className={"text-center text-3xl text-cresco-violet"}>
          {title.toUpperCase()}
        </p>
      </div>
      <div>
        <p className={"text-sm mb-1"}>
          {amount}
          <span className={"text-xs font-light"}>USDT</span>
        </p>
        {current > 0 && (
          <p className={" text-cresco-green-600 font-bold"}>{current}</p>
        )}
        {current == 0 && <p className={"text-gray-400 font-bold"}>{current}</p>}
      </div>
    </div>
  );
};
