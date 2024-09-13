export const SimpleCardInnerTextWithIcon = ({ children }) => {
  return (
    <div className={"grid grid-cols-12 gap-5 items-center"}>
      <div className={"col-span-10 p-10 border"}>{children}</div>
      <div>icon</div>
    </div>
  );
};
