// import { DefaultUser } from "next-auth";
// import NextAuth from "next-auth/next";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultUser & {
//       dbToken: string;
//       role: string;
//     };
//   }

//   interface User {
//     id: string;
//     name: string;
//     email: string;
//     dbToken: string;
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       dbToken: string;
//       role: string;
//     };
//   }
// }
