"use client";

import { Controller, Control } from "react-hook-form";
import { Input } from "@/app/components/ui/Input"; // 네 Input 컴포넌트 임포트 경로 확인
import React from "react";

interface ControlledInputProps
  extends Omit<React.ComponentProps<typeof Input>, "bottomText" | "error"> {
  name: string;
  control: Control<any>;
  type?: React.HTMLInputTypeAttribute;
}

function ControlledInput({
  name,
  control,
  type,
  ...restProps
}: ControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...restProps}
          onChange={(e) => {
            const value =
              type === "number" ? parseFloat(e.target.value) : e.target.value;
            field.onChange(
              type === "number" && isNaN(value as number) ? undefined : value
            );
          }}
          onBlur={field.onBlur}
          value={
            type === "number" &&
            (field.value === undefined ||
              field.value === null ||
              isNaN(field.value as number))
              ? ""
              : (field.value ?? "")
          }
          name={field.name}
          ref={field.ref}
          type={type}
          bottomText={error?.message}
          error={Boolean(error)}
        />
      )}
    />
  );
}

export default ControlledInput;
