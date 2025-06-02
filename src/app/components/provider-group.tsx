"use client";

import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const queryClient = new QueryClient();

export function ProviderGroup({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <Theme>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Theme>
    </NuqsAdapter>
  );
}
