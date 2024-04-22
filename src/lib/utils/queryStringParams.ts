import { decamelizeKeys } from "humps";

export const QueryStringParams = (object: any, endpoint: string = "") => {
  if (object === undefined) return endpoint;

  let customEndpoint = endpoint;
  if (Object.keys(object).length > 0) {
    customEndpoint += `?${new URLSearchParams(
      decamelizeKeys(object)
    ).toString()}`;
  }
  return customEndpoint;
};
