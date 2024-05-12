import axios from "axios";
import { GraphQLError } from "graphql";

import { GRAPHQL_URL } from "@/constants/api.constants";
// import { useSession } from "@/store/use-session";

export const axiosGraphQL = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BASE_WEBVIEW_URL}${GRAPHQL_URL}`,
  method: "POST",
  headers: { "content-type": "application/json" },
});

axiosGraphQL.interceptors.request.use(
  async function (config) {
    // const { session } = useSession((state) => state);

    // console.log("session.accessToken", session);

    // if (session) {
    //   config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosGraphQL.interceptors.response.use(
  function (response) {
    const isClient = typeof window === "object";

    if (response.data?.errors) {
      if (
        Array.isArray(response.data?.errors) &&
        response.data?.errors.length > 0 &&
        isClient
      ) {
        const errors: GraphQLError[] = response.data.errors;

        errors.forEach((error) => {
          // triggerToast(error.extensions?.toast as TriggerToastProps);
        });
      }

      return Promise.reject(response.data?.errors);
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
