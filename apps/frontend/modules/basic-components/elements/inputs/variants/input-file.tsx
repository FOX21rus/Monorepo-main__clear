import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../../../data/graphql/config";
import { InputProps } from "../types/input.props";
import { FileUrl } from "../../../../../data/graphql/sdk/graphql";
import { classList } from "../../../../../utils/classList";

export const InputFile = (
  props: InputProps & { image?: boolean; single?: boolean; readonly?: boolean }
) => {
  const removeUrl = (url: string) => {
    props.onChangeValue(props.value.filter((v) => v.url !== url));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e?.target?.files?.[0];
    if (f) {
      const formData = new FormData();

      formData.append("file", f, f.name);
      // formData.append("resizeImage", props.image ? "true" : "false");
      axios
        .post(
          props.image
            ? `${BACKEND_URL}/api/upload/resize`
            : `${BACKEND_URL}/api/upload`,
          formData
        )
        .then((d: any) => {
          console.log("uploaded");
          const file = { url: d?.data?.Location, name: f.name };
          props.onChangeValue(props.single ? file : [file]);
        });
    }
  };
  // const removeUrl = (url: string) => {
  //     field.onChange({
  //         target: {
  //             name: props.name,
  //             value: value.filter((v) => v.url !== url),
  //         },
  //     });
  // };
  const value = props.value ? (props.single ? [props.value] : props.value) : [];

  return (
    <div className={"mt-2"}>
      {/*{JSON.stringify(props.value)}*/}
      <div className={"grid gap-3 relative"}>
        {value?.map((v: FileUrl, i: number) => (
          <div key={i} className={"flex items-center"}>
            {!props.image && (
              <>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>{" "}
                <a
                  className={"ml-2 text-s underline cursor-pointer"}
                  href={v?.url}
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  {v?.name}
                </a>
              </>
            )}
            {props.image && (
              <div
                key={v.url}
                className={classList(
                  "w-24 h-24  bg-center mr-3 bg-no-repeat",
                  !v.url.match(".svg") && "bg-cover rounded-full"
                )}
                style={{ backgroundImage: `url(${v.url})` }}
              />
            )}
            {!props.readonly && (
              <svg
                onClick={() => removeUrl(v.url)}
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 text-red-500/50 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/*<div className={"relative block"}>*/}
      {/*  <label*/}
      {/*    className={*/}
      {/*      " block   w-56 text-center border-4 border-dashed mt-3 rounded-lg"*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <input type={"file"} className={"hidden"} />*/}
      {/*    <a className={"block  px-5 py-7 text-gray-500"}>Загрузить файл</a>*/}
      {/*  </label>*/}
      {/*</div>*/}

      {!props.readonly && (
        <div className={"relative mt-3"}>
          <label className={" inline-block "}>
            <input
              type={"file"}
              className={"hidden"}
              onChange={onChange}
              accept={props.image ? "image/*" : undefined}
            />
            <a className={"block text-gray-500 hover:text-sky-500"}>
              Upload file
            </a>
          </label>
        </div>
      )}
    </div>
  );
};
