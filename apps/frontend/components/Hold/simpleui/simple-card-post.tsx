import { classList } from "../../../utils/classList";

export const SimpleCardPost = ({ children, className }: any) => {
  return (
    <div className={classList("bg-light text-darkMilk", className)}>
      {children}
    </div>
  );
};
