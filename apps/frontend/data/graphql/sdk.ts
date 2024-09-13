import { getSdkWithHooks, SdkFunctionWrapper } from "./sdk/graphql";
import { GraphQLClient } from "graphql-request";
import { BACKEND_URL } from "./config";

export const sdk = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const errorWrapper: SdkFunctionWrapper = async <T>(
    action: () => Promise<T>
  ): Promise<T> => {
    try {
      const result = await action();
      return result;
    } catch (e) {
      console.error((e as any)?.response?.errors?.[0]);
      return Promise.reject((e as any)?.response?.errors?.[0]);
    }
  };
  const client = new GraphQLClient(`${BACKEND_URL}/graphql`, {
    headers,
  });
  const getBearer = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) return "Bearer " + token;
    else return "";
  };
  if (process.browser) {
    client.setHeader("Authorization", getBearer());
  }

  return getSdkWithHooks(client, errorWrapper);
};
