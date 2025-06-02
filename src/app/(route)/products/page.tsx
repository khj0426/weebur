"use client";
import { AsyncBoundary } from "@/app/components/async-boundary";
import { Result } from "@/app/components/ui/Result";
import { Spinner } from "@/app/components/ui/Spinner";
import { useSuspenseProductList } from "./hooks/use-suspense-product-list";
import { ProductCard } from "./components/product-card";
import { useProductViewModeQueryParams } from "./hooks/use-product-view-mode-query-params";
import { Box, DataList, Flex, Grid } from "@radix-ui/themes";
import { SwitchCase } from "@/app/components/switch-case";
import { ProductItem } from "./models/server";

export default function ProductPage() {
  return (
    <AsyncBoundary
      fallback={<Spinner />}
      errorFallback={({ error }) => (
        <Result type="error" height={350} width={500}>
          {error?.message ?? "서버 오류가 발생했습니다. 잠시 뒤 시도해주세요."}
        </Result>
      )}
    >
      <Resolved />
    </AsyncBoundary>
  );
}

function Resolved() {
  const { data: allProducts } = useSuspenseProductList();
  const { productViewMode } = useProductViewModeQueryParams();

  return (
    <div>
      <SwitchCase
        value={productViewMode}
        caseBy={{
          list: <ProductCardViewList products={allProducts.products} />,
          grid: <ProductCardViewGrid products={allProducts.products} />,
        }}
      />
    </div>
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
          <ProductCard {...product} maxWidth={"700px"}>
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
