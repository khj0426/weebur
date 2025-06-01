"use client";
import { AsyncBoundary } from "@/app/components/async-boundary";
import { Result } from "@/app/components/ui/Result";
import { Spinner } from "@/app/components/ui/Spinner";

export default function ProductPage() {
  return (
    <AsyncBoundary fallback={<Spinner />} errorFallback={() => <div>에러</div>}>
      <Resolved />
    </AsyncBoundary>
  );
}

function Resolved() {
  return (
    <div>
      <Spinner width={150} height={150} />
      <Result type="error">gaga</Result>
    </div>
  );
}
