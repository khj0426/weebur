import { Text } from "@radix-ui/themes";
import { Input } from "@/app/components/ui/Input";
import { Control, Controller } from "react-hook-form";
import { CreateNewProductSchema } from "../models/client";
import { allowOnlyNumber } from "../utils/allow-only-number";

interface Props {
  control: Control<CreateNewProductSchema>;
  name: keyof CreateNewProductSchema;
  leftAddon?: React.ReactNode;
  placeholder?: string;
  type?: "text" | "number";
  error?: string;
  label?: string;
  disabled?: boolean;
}
export function ControllerWithInput({
  control,
  name,
  leftAddon,
  type,
  label,
  disabled,
  placeholder,
  error,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <Text size={"2"}>{label}</Text>
          <Input
            size={"3"}
            disabled={disabled}
            aria-disabled={disabled}
            leftAddon={leftAddon}
            type={type}
            aria-label={name}
            placeholder={placeholder}
            {...field}
            onChange={(e) => {
              if (type === "number") {
                field.onChange(allowOnlyNumber(e.target.value));
              } else {
                field.onChange(e);
              }
            }}
            bottomText={error}
            error={Boolean(error)}
          />
        </div>
      )}
    />
  );
}
