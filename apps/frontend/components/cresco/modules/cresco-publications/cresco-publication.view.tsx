import { CrescoPublication } from "../../../../data/graphql/sdk/graphql";
import {useState} from "react";

export const CrescoPublicationView = (props: {
  publication: CrescoPublication;
}) => {
    const [zoom,setZoom]=useState(false)
  return (
    <div>
      <p className={"font-bold text-2xl text-cresco-green mb-1 "}>
        {props.publication.title}
      </p>
      <p className={"mb-2 text-xs text-gray-600"}>
        {new Date(props.publication.createdAt).toLocaleDateString()}
      </p>
      <p>
        {props.publication.imageUrl?.[0]?.url && (
          <img
            onClick={()=>setZoom(!zoom)}
            src={props.publication.imageUrl?.[0]?.url}
            className={!zoom?"float-left w-64 pr-3 pb-1 cursor-zoom-in":"w-full cursor-zoom-out m-3"}
          />
        )}
        {props.publication.text}
      </p>
    </div>
  );
};
