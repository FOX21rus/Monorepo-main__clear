export const classListComplex = (...classes: (string | { [key: string]: boolean })[]) => {
    return (
        classes &&
        classes
            .filter((cls) => typeof cls !== "undefined")
            .map((cls) => (typeof cls == "object" ? (cls[Object.keys(cls)[0]] ? Object.keys(cls)[0] : "undefined") : cls))
            .filter((c) => c != "undefined")
            .map((c) => c.toLowerCase())
            .join(" ")
    );
};

export const classList = (...args: any) => args.filter(Boolean).join(" ");
export const classNames = (...args: any) => args.filter(Boolean).join(" ");
