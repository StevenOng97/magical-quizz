// import { UseMutationResult } from "@tanstack/react-query";
// import { useMutationWrapper } from "../useBaseFetching";
// import { IChangePassword, IChangePasswordResponse, postChangePassword } from "@/lib/api/accounts/changePassword";

// /**
//  * Custom hook for when user want to change account's password.
//  *
//  * @return {UseMutationResult} The mutation object
//  */

// const useChangePassword = (): UseMutationResult<
//   IChangePasswordResponse,
//   Error | null,
//   IChangePassword,
//   unknown
// > => {
//   return useMutationWrapper({
//     mutationFn: (changePasswordData: IChangePassword) => {
//       return postChangePassword(changePasswordData);
//     },
//   });
// };
// export default useChangePassword;
