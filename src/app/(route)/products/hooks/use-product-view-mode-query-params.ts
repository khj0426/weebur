"use client";

import { useQueryState, parseAsStringEnum } from "nuqs";

export function useProductViewModeQueryParams() {
  const [productViewMode, setProductViewMode] = useQueryState(
    "productViewMode",
    parseAsStringEnum(["list", "grid"]).withDefault("grid")
  );

  return { productViewMode, setProductViewMode };
}
