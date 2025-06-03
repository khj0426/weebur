"use client";

import useCookie from "react-use-cookie";
import { getRandomProductMode } from "../utils/random-product-mode";

export function useProductViewMode() {
  const [productViewModeRaw, setProductViewMode] = useCookie("productViewMode");

  const isInvalidMode = productViewModeRaw.length === 0;
  const productViewMode =
    productViewModeRaw === "list" || productViewModeRaw === "grid"
      ? productViewModeRaw
      : getRandomProductMode();

  return { productViewMode, setProductViewMode, isInvalidMode };
}
