// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { ILoginValidation } from "@/lib/validations/zod/auth/loginValidation";

// const endpoint = "accounts/login";
// export type ILogin = ILoginValidation;

// export type ILoginResponse = {
//   message: string;
//   payload: {
//     token: string;
//     isAdmin: true;
//   };
// };

// export async function postLoginApi(body?: Record<string, string>): Promise<ILoginResponse> {
//   return axiosClient.post(
//     `${process.env.NEXTAUTH_URL}${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`,
//     body
//   );
// }
