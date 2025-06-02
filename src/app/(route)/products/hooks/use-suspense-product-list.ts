import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductQueryKey } from "../models/query-key";
import { api } from "@/app/services/api";
import {
  DEFAULT_PRODUCT_PAGINATION_SIZE,
  ProductListResponse,
} from "../models/server";
import { Pagination } from "@/app/server";

export function useSuspenseProductList(
  props: Pagination = { limit: DEFAULT_PRODUCT_PAGINATION_SIZE, skip: 0 }
) {
  return useSuspenseQuery({
    queryKey: ProductQueryKey.list(),
    queryFn: () =>
      api
        .get(`products?limit=${props.limit}&skip=${props.skip}`)
        .json<ProductListResponse>(),
  });
}
