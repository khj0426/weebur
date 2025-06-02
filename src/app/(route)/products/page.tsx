"use client";
import { AsyncBoundary } from "@/app/components/async-boundary";
import { Result } from "@/app/components/ui/Result";
import { Spinner } from "@/app/components/ui/Spinner";
import { useSuspenseProductList } from "./hooks/use-suspense-product-list";
import { ProductCard } from "./components/product-card";

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
  console.log(allProducts);
  return (
    <div>
      {allProducts.products.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
