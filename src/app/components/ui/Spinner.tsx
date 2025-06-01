import {
  Spinner as RadixSpinner,
  SpinnerProps as RadixSpinnerProps,
} from "@radix-ui/themes";
import { Flex } from "@radix-ui/themes";
import { CSSProperties } from "react";

interface SpinnerProps extends RadixSpinnerProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}
export function Spinner({ width, height, ...props }: SpinnerProps) {
  return (
    <Flex
      style={{
        width,
        height,
      }}
      justify={"center"}
      align={"center"}
    >
      <RadixSpinner {...props} />
    </Flex>
  );
}
