"use client";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createNewProductSchema,
  CreateNewProductSchema,
  ProductBrandList,
} from "./models/client";

import { useRouter } from "next/navigation";
import { useWatch } from "react-hook-form";
import { Spacing } from "@/app/components/ui/Spacing";

import { FileTextIcon, ReaderIcon, InputIcon } from "@radix-ui/react-icons";
import { ControllerWithInput } from "./components/create-new-product-control-input";
import { SwitchCase } from "@/app/components/switch-case";
import { useCreateNewProduct } from "./hooks/use-create-new-product";

export default function CreateNewProductPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewProductSchema>({
    resolver: zodResolver(createNewProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1000,
      discountPercentage: 0,
      brand: "Samsung",
    },
  });

  const router = useRouter();

  const { mutate: createNewProduct } = useCreateNewProduct();

  const watchPrice = useWatch({
    control,
    name: "price",
  });

  const watchDiscountPerncetage = useWatch({
    control,
    name: "discountPercentage",
  });

  const discountedPrice =
    watchPrice && watchDiscountPerncetage
      ? Math.round(watchPrice * (1 - watchDiscountPerncetage / 100))
      : watchPrice;

  const onSubmit = (data: CreateNewProductSchema) => {
    createNewProduct(data, {
      onSuccess: () => {
        alert("상품 정보가 성공적으로 저장되었습니다.");
        router.push("/products");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
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
        <ControllerWithInput
          control={control}
          name="title"
          label="상품명"
          error={errors?.title?.message}
          placeholder="상품명을 입력해주세요."
          leftAddon={<FileTextIcon />}
        />

        <ControllerWithInput
          control={control}
          name="description"
          label="상품 설명"
          error={errors?.description?.message}
          placeholder="상품 설명을 입력해주세요."
          leftAddon={<ReaderIcon />}
        />

        <ControllerWithInput
          control={control}
          name="price"
          type="number"
          label="상품 가격"
          error={errors?.price?.message}
          placeholder="상품 가격을 입력해주세요."
          leftAddon={<InputIcon />}
        />

        <ControllerWithInput
          control={control}
          type="number"
          label="상품 할인율"
          name="discountPercentage"
          disabled={watchPrice < 1}
          error={errors?.discountPercentage?.message}
          placeholder="상품 할인율을 입력해주세요."
          leftAddon={<InputIcon />}
        />
        <SwitchCase
          value={isNaN(discountedPrice) ? "할인_적용_안됨" : "할인_적용"}
          caseBy={{
            할인_적용_안됨: null,
            할인_적용: (
              <Text color="gray">
                할인율을 적용한 최종 가격은 {discountedPrice}원 입니다.
              </Text>
            ),
          }}
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
