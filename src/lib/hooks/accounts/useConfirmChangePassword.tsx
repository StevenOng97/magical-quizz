// import { UseMutationResult } from "@tanstack/react-query";
// import { useMutationWrapper } from "../useBaseFetching";
// import { IConfirmChangePassword, IConfirmChangePasswordResponse, postConfirmChangePasswordApi } from "@/lib/api/accounts/confirmChangePassword";

// /**
//  * Custom hook for confirm account's password change action.
//  *
//  * @return {UseMutationResult} The mutation object
//  */

// const useConfirmChangePassword = (): UseMutationResult<IConfirmChangePasswordResponse, Error | null, IConfirmChangePassword, unknown> => {
//   return useMutationWrapper({
//     mutationFn: (confirmChangePasswordData: IConfirmChangePassword) => {
//       return postConfirmChangePasswordApi(confirmChangePasswordData);
//     },
//   });
// };
// export default useConfirmChangePassword;
