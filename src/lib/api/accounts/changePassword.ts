// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { IChangePasswordValidation } from "@/lib/validations/zod/auth/changePasswordValidation";

// const endpoint = "accounts/change_password";
// export type IChangePassword = IChangePasswordValidation;

// export type IChangePasswordResponse = {
//   message?: string;
//   error?: string;
// };

// export async function postChangePassword(body?: Record<string, string>): Promise<IChangePasswordResponse> {
//   return axiosClient.post(`${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`, body);
// }
