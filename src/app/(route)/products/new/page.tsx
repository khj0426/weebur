"use client";
import { Button, Flex, Select } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createNewProductSchema,
  CreateNewProductSchema,
  ProductBrandList,
} from "./models/client";
import { Input } from "@/app/components/ui/Input";
import { Spacing } from "@/app/components/ui/Spacing";

import {
  FileTextIcon,
  ReaderIcon,
  InputIcon,
  BadgeIcon,
} from "@radix-ui/react-icons";

export default function CreateNewProductPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewProductSchema>({
    resolver: zodResolver(createNewProductSchema),
    mode: "all",
  });

  const onSubmit = (data: CreateNewProductSchema) => {
    console.log("Submitted data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        justify={"between"}
        align={"center"}
        width={"100%"}
        direction={"column"}
        gap={"3"}
      >
        <Spacing size="2" />
        <Input
          size={"3"}
          leftAddon={<FileTextIcon />}
          aria-label="상품명"
          placeholder="상품명을 입력해주세요."
          {...register("title")}
          bottomText={errors.title?.message}
          error={Boolean(errors.title?.message)}
        />
        <Input
          size={"3"}
          leftAddon={<ReaderIcon />}
          aria-label="상품 설명"
          placeholder="상품 설명을 입력해주세요."
          {...register("description")}
          bottomText={errors.description?.message}
          error={Boolean(errors.description?.message)}
        />
        <Input
          size={"3"}
          leftAddon={<InputIcon />}
          aria-label="상품 가격"
          placeholder="상품 가격을 입력해주세요."
          {...(register("price"),
          {
            valueAsNumber: true,
          })}
          type="number"
          bottomText={errors.price?.message}
          error={Boolean(errors.price?.message)}
        />
        <Input
          size={"3"}
          leftAddon={<BadgeIcon />}
          aria-label="상품 할인율"
          placeholder="상품 할인율을 입력해주세요."
          {...register("discountPercentage", {
            valueAsNumber: true,
          })}
          type="number"
          bottomText={errors.discountPercentage?.message}
          error={Boolean(errors.discountPercentage?.message)}
        />

        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <Flex
              justify={"end"}
              gap={"2"}
              style={{
                minWidth: "350px",
              }}
            >
              <Select.Root
                size="3"
                defaultValue={field.value ?? "Samsung"}
                onValueChange={field.onChange}
                value={field.value}
              >
                <Select.Trigger />
                <Select.Content>
                  {ProductBrandList.map((brand) => (
                    <Select.Item key={brand.value} value={brand.value}>
                      {brand.key}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Button
                size="3"
                variant="soft"
                type="submit"
                color="blue"
                style={{
                  cursor: "pointer",
                }}
              >
                상품정보 저장하기
              </Button>
            </Flex>
          )}
        />
      </Flex>
    </form>
  );
}
