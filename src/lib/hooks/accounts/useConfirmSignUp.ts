// import { UseMutationResult } from "@tanstack/react-query";
// import { IConfirmSignUp, IConfirmSignUpResponse, postConfirmSignupApi } from "@/lib/api/accounts/confirmSignup";
// import { useMutationWrapper } from "../useBaseFetching";

// /**
//  * Custom hook for confirm sign up user's account.
//  *
//  * @return {UseMutationResult} The mutation object
//  */

// const useConfirmSignUp = (): UseMutationResult<IConfirmSignUpResponse, Error | null, IConfirmSignUp, unknown> => {
//   return useMutationWrapper({
//     mutationFn: (confirmPasswordData: IConfirmSignUp) => {
//       return postConfirmSignupApi(confirmPasswordData);
//     },
//   });
// };
// export default useConfirmSignUp;
