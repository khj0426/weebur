import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props extends TextField.RootProps {
  bottomText?: string;
  error?: boolean;
  searchYn?: boolean;
  leftAddon?: ReactNode;
}
export function Input({ bottomText, error, ...props }: Props) {
  return (
    <div
      style={{
        minWidth: "350px",
      }}
    >
      <TextField.Root {...props}>
        {props.searchYn ? (
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        ) : null}

        {props.leftAddon && <TextField.Slot>{props.leftAddon}</TextField.Slot>}
      </TextField.Root>
      {bottomText && (
        <Text as="p" color={error ? "red" : "gray"} size={"2"}>
          {bottomText}
        </Text>
      )}
    </div>
  );
}
