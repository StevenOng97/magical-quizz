import cookie from "js-cookie";

const getCurrentUser: any = () => cookie.get("user") || null;

const setCurrentUser = (user: any): void => {
  cookie.set("user", user);
};

const storage = {
  getToken: () => cookie.get("token"),
  setToken: (token: string) => {
    const isSecure = process.env.NEXT_PUBLIC_APP_MODE !== "local";
    const options = {
      expires: 7,
      secure: isSecure,
      HttpOnly: isSecure,
    };
    cookie.set("token", token, options);
  },
  clearToken: () => cookie.remove("token"),
};

export { getCurrentUser, setCurrentUser, storage };
