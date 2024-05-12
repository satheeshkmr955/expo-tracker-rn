import type { CodegenConfig } from "@graphql-codegen/cli";

import { GRAPHQL_URL } from "./constants/api.constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.EXPO_PUBLIC_BASE_WEBVIEW_URL}${GRAPHQL_URL}`,
  documents: ["app/**/*{.tsx,.ts}"],
  ignoreNoDocuments: true,
  generates: {
    "gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
