import { Box } from "@radix-ui/themes";
import React from "react";

type RadixSpacingValue =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | undefined;

interface SpacingProps {
  size?: RadixSpacingValue;
  my?: RadixSpacingValue;
  mx?: RadixSpacingValue;
  m?: RadixSpacingValue;
  p?: RadixSpacingValue;
  children?: React.ReactNode;
}

export function Spacing({
  size,
  my,
  mx,
  m,
  p,
  children,
  ...restProps
}: SpacingProps) {
  const marginProps = size ? { m: size } : { m, my, mx };

  return (
    <Box {...marginProps} p={p} {...restProps}>
      {children}
    </Box>
  );
}
