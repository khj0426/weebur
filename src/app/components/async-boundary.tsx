"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  ComponentProps,
  Suspense,
  PropsWithChildren,
  useCallback,
} from "react";

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;
type Props = {
  fallback: ComponentProps<typeof Suspense>["fallback"];
  errorFallback: NonNullable<ErrorBoundaryProps["fallbackRender"]>;
};

export function AsyncBoundary({
  fallback,
  errorFallback,
  children,
}: PropsWithChildren<Props>) {
  const { reset } = useQueryErrorResetBoundary();
  const resetHandler = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <ErrorBoundary onReset={resetHandler} fallbackRender={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
