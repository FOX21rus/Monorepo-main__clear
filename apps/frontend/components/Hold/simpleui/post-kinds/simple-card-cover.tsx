import { SimpleCardPost } from "../simple-card-post";

export const SimpleCardCover = ({ coverUrl, headingComponent }) => {
  return (
    <SimpleCardPost className={"pb-5"}>
      <div>
        <img src={coverUrl} />
      </div>
      <SimpleCardCoverOverlay />
      <div className={"relative px-10 text-dark"}>{headingComponent}</div>
    </SimpleCardPost>
  );
};

const SimpleCardCoverOverlay = () => {
  return (
    <div className={"-mb-24"}>
      <div
        className={
          "relative bg-gradient-to-b h-32 from-light/0 to-light -mt-32"
        }
      ></div>
      <div
        className={
          "relative bg-gradient-to-b h-28 from-light/0 to-light -mt-28"
        }
      ></div>
      <div
        className={
          "relative bg-gradient-to-b h-24 from-light/0 to-light -mt-24"
        }
      ></div>
    </div>
  );
};
