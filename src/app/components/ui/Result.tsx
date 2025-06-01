import { Callout } from "@radix-ui/themes";
import { CSSProperties, PropsWithChildren } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface ResultProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  type?: "success" | "error" | "info" | "warning";
}
export function Result({
  width,
  height,
  type = "success",
  children,
}: PropsWithChildren<ResultProps>) {
  const getResultColorViaType = (type: string) => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "info":
        return "blue";
      case "warning":
        return "yellow";
      default:
        return "green";
    }
  };

  return (
    <Callout.Root
      style={{
        width,
        height,
      }}
      color={getResultColorViaType(type)}
      size="2"
    >
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
}
