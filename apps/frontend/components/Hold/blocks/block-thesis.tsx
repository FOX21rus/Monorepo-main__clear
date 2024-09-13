export const BlockThesis = ({
  upper,
  title,
  text,
  className,
  onClick,
}: {
  upper?: string;
  title?: string;
  text?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className={className} onClick={onClick}>
      {upper && (
        <p className={"text-xs font-bold text-slate-500 -mt-0.5"}>{upper}</p>
      )}
      {title && <p className={"text-base font-medium"}>{title}</p>}
      {text && <p className={"text-sm text-slate-700"}>{text}</p>}
    </div>
  );
};
