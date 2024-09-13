export const SimplePageLayout = ({ children }) => {
  return (
    <div className={"bg-gray-100 min-h-screen"}>
      <div className={"inner max-w-2xl m-auto  min-h-screen"}>{children}</div>
    </div>
  );
};
