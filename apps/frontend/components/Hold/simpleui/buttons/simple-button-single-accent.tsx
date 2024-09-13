export const SimpleButtonSingleAccent = ({ children }) => {
  return (
    <div className={"my-2"}>
      <button
        className={
          "bg-accent text-light px-5 pt-1 pb-1.5 rounded-md hover:shadow-lg"
        }
      >
        {children}
      </button>
    </div>
  );
};
