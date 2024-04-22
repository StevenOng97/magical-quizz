// import { UseMutationResult } from "@tanstack/react-query";

// import {
//   ISignUp,
//   ISignUpResponse,
//   postSignUpApi,
// } from "@/lib/api/accounts/signup";
// import { useMutationWrapper } from "../useBaseFetching";

// /**
//  * Custom hook for sign up user's account.
//  *
//  * @return {UseMutationResult} The mutation object
//  */

// const useSignUp = (): UseMutationResult<
//   ISignUpResponse,
//   Error | null,
//   ISignUp,
//   unknown
// > => {
//   return useMutationWrapper({
//     mutationFn: (signUpData: ISignUp) => {
//       return postSignUpApi(signUpData);
//     },
//   });
// };
// export default useSignUp;
