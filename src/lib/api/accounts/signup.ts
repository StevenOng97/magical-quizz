// import { QueryStringParams } from "@/lib/utils";

// import axiosClient, { API_VERSION, DEFAULT_API_PATH } from "@/lib/api/base";
// import { ISignUpValidation } from "@/lib/validations/zod/auth/signUpValidation";

// const endpoint = "accounts/signup";
// export type ISignUp = ISignUpValidation;

// export type ISignUpResponse = {
//   message: string;
//   payload: {
//     otp_secret: string;
//     otp_url: string;
//   };
// };

// export async function postSignUpApi(body: ISignUp): Promise<ISignUpResponse> {
//   return axiosClient.post(`${DEFAULT_API_PATH}/${API_VERSION.v1}/${QueryStringParams(undefined, endpoint)}`, body);
// }
