// import { UseQueryResult } from "@tanstack/react-query";

// import { useQueryWrapper } from "../useBaseFetching";
// import { IGetSeatsResponse, getSeats } from "@/lib/api/seats/getSeats";

// /**
//  * Custom hook for fetching seats data.
//  *
//  * @param {IGetSeatsResponse} [seats] - Optional initial data for the query.
//  * @return {UseQueryResult<IGetSeatsResponse | undefined, Error | null>} The result of the query.
//  */

// const useGetSeats = (seats?: IGetSeatsResponse): UseQueryResult<IGetSeatsResponse | undefined, Error | null> =>
//   useQueryWrapper({
//     queryKey: ["getSeats"],
//     queryFn: getSeats,
//     initialData: seats,
//   });

// export default useGetSeats;
