// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { ISeatStatus } from "@/lib/containers/selectSeats/components/Seat";

// const endpoint = "seats";

// export type ISeat = {
//   id: number;
//   code: string;
//   status: ISeatStatus;
//   price: number;
//   created: string;
//   modified: string;
// };

// export type IGetSeatsResponse = {
//   payload: ISeat[];
// };

// export async function getSeats(): Promise<IGetSeatsResponse> {
//   return axiosClient.get(`${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`);
// }
