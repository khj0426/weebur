"use client";

import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster, toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      toast.error("서버 오류가 발생했습니다. 잠시 뒤 시도해주세요.", {
        description:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
        duration: 5000,
        dismissible: true,
      }),
  }),
});

export function ProviderGroup({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </Theme>
  );
}
