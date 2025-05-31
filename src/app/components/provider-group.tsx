import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ProviderGroup({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Theme>
  );
}
