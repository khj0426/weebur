"use client";

import { useQueryState, parseAsStringEnum } from "nuqs";
import { getRandomProductMode } from "../utils/random-product-mode";

export function useProductViewModeQueryParams() {
  const [productViewMode, setProductViewMode] = useQueryState(
    "productViewMode",
    parseAsStringEnum(["list", "grid"]).withDefault(getRandomProductMode())
  );

  return { productViewMode, setProductViewMode };
}
