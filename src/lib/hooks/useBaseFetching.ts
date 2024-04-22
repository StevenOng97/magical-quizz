import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseMutationOptions,
  useMutation,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import useToast from "./useToast";

const errorSchema = z.object({
  error: z.string(),
});

/**
 * Custom hook use inside Wrapper to get error string in case an error occurred.
 *
 * @param reactQueryError - The error object after api called
 * @param skipToast - Whether to skip displaying toast for errors
 * @return Error code string or undefined if there are no error
 */
function useCheckQueryError<TError = Error>(
  reactQueryError: TError,
  skipToast: boolean
): string | undefined {
  const { showToast } = useToast();

  const error = useMemo(() => {
    const validatedErrorSchema = errorSchema.safeParse(reactQueryError);
    if (reactQueryError !== null && validatedErrorSchema.success) {
      return validatedErrorSchema.data.error;
    }

    return undefined;
  }, [reactQueryError]);

  useEffect(() => {
    if (error && !skipToast) {
      showToast({
        description: error,
      });
    }
  }, [error]);

  return error;
}

/**
 * Custom hook to wrap the useQuery hook and handle error display.
 *
 * @param {UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>} options - Options for the useQuery hook
 * @param {boolean} skipToast - Whether to skip displaying toast for errors
 * @return {object} The useQueryResult and errorCode
 */
export function useQueryWrapper<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  skipToast: boolean = false
) {
  // const { data: session } = useSession();
  // if (session?.user.dbToken)
  //   axiosClient.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${session?.user.dbToken}`;

  const useQueryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    options
  );
  const error = useCheckQueryError(useQueryResult.error, skipToast);

  return {
    ...useQueryResult,
    errorCode: error,
  };
}

/**
 * Custom wrapper for useMutation hook with error handling and toast notification.
 *
 * @param {UseMutationOptions<TQueryFnData, TError, TData>} options - Options for the useMutation hook
 * @param {boolean} skipToast - Flag to skip showing the toast notification
 * @return {object} The result of the useMutation hook with additional errorCode field
 */
export function useMutationWrapper<
  TMutationFnData = unknown,
  TError = Error,
  TData = TMutationFnData
>(
  options: UseMutationOptions<TMutationFnData, TError, TData>,
  skipToast: boolean = false
) {
  // const { data: session } = useSession();
  // if (session?.user.dbToken)
  //   axiosClient.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${session?.user.dbToken}`;

  const useMutationResult = useMutation<TMutationFnData, TError, TData>(
    options
  );
  const error = useCheckQueryError(useMutationResult.error, skipToast);

  return {
    ...useMutationResult,
    errorCode: error,
  };
}
