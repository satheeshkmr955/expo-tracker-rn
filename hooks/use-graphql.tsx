import { print, type ExecutionResult } from "graphql";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  useQuery,
  type UseQueryResult,
  useMutation,
  type UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

import { axiosGraphQL } from "@/lib/fetcher";

/** Your custom fetcher function */
async function customFetcher<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables extends Record<string, never> ? {} : TVariables
): Promise<ExecutionResult<TResult>> {
  const responseAxios = await axiosGraphQL({
    data: {
      query: print(document),
      variables,
    },
  });

  if (responseAxios.status !== HttpStatusCode.Ok) {
    throw new Error(
      `Failed to fetch: ${responseAxios.statusText}. Body: ${responseAxios.request?.responseText}`
    );
  }

  return await responseAxios.data;
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables extends Record<string, never> ? {} : TVariables
): UseQueryResult<ExecutionResult<TResult>> {
  return useQuery({
    queryKey: [getCacheKey(document), variables],
    queryFn: () => customFetcher(document, variables!),
  });
}

export function useMutationGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables extends Record<string, never> ? {} : TVariables,
  mutateOptions?: UseMutationOptions<ExecutionResult<TResult>>
): UseMutationResult<ExecutionResult<TResult>, Error, void, unknown> {
  return useMutation({
    mutationKey: [getCacheKey(document), variables],
    mutationFn: () => customFetcher(document, variables),
    ...mutateOptions,
  });
}

export function getCacheKey<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>
) {
  return (document.definitions[0] as any).name.value;
}
