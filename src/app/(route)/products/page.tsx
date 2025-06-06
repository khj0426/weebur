"use client";
import { AsyncBoundary } from "@/app/components/async-boundary";
import { Result } from "@/app/components/ui/Result";

import { useSuspenseProductList } from "./hooks/use-suspense-product-list";
import { ProductCard } from "./components/product-card";
import { useProductViewMode } from "./hooks/use-product-view-mode";
import { Box, Button, DataList, Flex, Grid } from "@radix-ui/themes";
import { SwitchCase } from "@/app/components/switch-case";
import { ProductItem } from "./models/server";

import { getRandomProductMode } from "./utils/random-product-mode";
import { ClientGate } from "@/app/components/client-gate";
import { SkeletonCardList } from "./components/skeleton-card-list";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductPage() {
  const { productViewMode, isInvalidMode, setProductViewMode } =
    useProductViewMode();

  useEffect(() => {
    if (isInvalidMode === true) {
      setProductViewMode(getRandomProductMode(), {
        days: 1,
      });
    }
  }, [isInvalidMode, setProductViewMode]);

  return (
    <ClientGate>
      <AsyncBoundary
        fallback={<SkeletonCardList productListMode={productViewMode} />}
        errorFallback={({ error }) => (
          <Result type="error">
            {error?.message ??
              "서버 오류가 발생했습니다. 잠시 뒤 시도해주세요."}
          </Result>
        )}
      >
        <div className="my-2">
          <Button color="gray" variant="outline" size={"3"}>
            <Link href={"/products/new"}>상품 생성하러 가기</Link>
          </Button>
        </div>
        <Resolved productViewMode={productViewMode} />
      </AsyncBoundary>
    </ClientGate>
  );
}

function Resolved({ productViewMode }: { productViewMode: "grid" | "list" }) {
  const { data: allProducts } = useSuspenseProductList();

  return (
    <SwitchCase
      value={productViewMode}
      caseBy={{
        list: <ProductCardViewList products={allProducts.products} />,
        grid: <ProductCardViewGrid products={allProducts.products} />,
      }}
    />
  );
}

function ProductCardViewGrid({ products }: { products: ProductItem[] }) {
  return (
    <Grid columns={"4"} gap="4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} maxWidth={"300px"}>
          <ProductCard.Thumbnail />
          <ProductCard.Title />
          <ProductCard.Category />
          <ProductCard.Description />
          <ProductCard.Price />
          <ProductCard.Rating />
        </ProductCard>
      ))}
    </Grid>
  );
}

function ProductCardViewList({ products }: { products: ProductItem[] }) {
  return (
    <DataList.Root
      style={{
        width: "100%",
      }}
    >
      {products.map((product) => (
        <DataList.Item key={product.id}>
          <ProductCard {...product} maxWidth={"100%"}>
            <Flex gap="3" align="center">
              <Box
                style={{
                  width: "225px",
                }}
              >
                <ProductCard.Thumbnail />
              </Box>
              <Flex direction={"column"} gap="2" style={{ flex: 1 }} ml={"4"}>
                <ProductCard.Title />
                <ProductCard.Category />
                <ProductCard.Description />
                <ProductCard.Price />
                <ProductCard.Rating />
              </Flex>
            </Flex>
          </ProductCard>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}
