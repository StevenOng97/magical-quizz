// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { IConfirmSignUpValidation } from "@/lib/validations/zod/auth/confirmSignUpValidation";

// const endpoint = "accounts/signup/confirm";
// export type IConfirmSignUp = Omit<IConfirmSignUpValidation, "confirmPassword">;

// export type IConfirmSignUpResponse = {
//   message?: string;
//   error?: string;
// };

// export async function postConfirmSignupApi(body?: Record<string, string>): Promise<IConfirmSignUpResponse> {
//   return axiosClient.post(`${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`, body);
// }
