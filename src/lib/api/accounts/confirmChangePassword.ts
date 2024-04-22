// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { IConfirmChangePasswordValidation } from "@/lib/validations/zod/auth/confirmChangePasswordValidation";

// const endpoint = "accounts/change_password/confirm";
// export type IConfirmChangePassword = Omit<IConfirmChangePasswordValidation, "confirmPassword">;

// export type IConfirmChangePasswordResponse = {
//   message?: string;
//   error?: string;
// };

// export async function postConfirmChangePasswordApi(body?: Record<string, string>): Promise<IConfirmChangePasswordResponse> {
//   return axiosClient.post(`${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`, body);
// }
