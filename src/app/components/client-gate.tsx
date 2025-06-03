import { ReactNode, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ClientGate({ children }: { children: ReactNode }) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );
  return isServer ? null : children;
}
