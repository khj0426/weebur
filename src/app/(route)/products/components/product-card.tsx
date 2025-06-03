import {
  Box,
  Card,
  Inset,
  Text,
  Flex,
  Strong,
  BoxProps,
} from "@radix-ui/themes";
import { ProductItem } from "../models/server";
import Image from "next/image";
import React, { createContext, useContext } from "react";
import { SwitchCase } from "@/app/components/switch-case";
import { PersonIcon, StarIcon } from "@radix-ui/react-icons";

const ProductCardContext = createContext<ProductItem | null>(null);

function useProductCard() {
  const ctx = useContext(ProductCardContext);
  if (!ctx)
    throw new Error(
      "ProductCard의 하위 컴포넌트는 반드시 ProductCard 내부에서 사용되어야 합니다."
    );
  return ctx;
}

function Thumbnail() {
  const { title, thumbnail, availabilityStatus, stock } = useProductCard();
  const isOutOfStock = availabilityStatus === "Out of Stock" || stock === 0;
  return (
    <Inset clip="padding-box" side="top" pb="current">
      <SwitchCase
        value={thumbnail ? "썸네일_존재" : "썸네일_없음"}
        caseBy={{
          썸네일_존재: (
            <div className="relative w-full h-[180px] bg-[var(--gray-3)] overflow-hidden">
              <Image alt={title} src={thumbnail!} fill objectFit="cover" />
              {isOutOfStock && (
                <Flex
                  position="absolute"
                  inset="0"
                  justify="center"
                  align="center"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                  }}
                >
                  <Text size="4" weight="bold">
                    품절
                  </Text>
                </Flex>
              )}
            </div>
          ),
          썸네일_없음: (
            <div className="relative w-full h-[180px] bg-[var(--gray-5)] flex items-center justify-center">
              <Text color="gray">이미지 없음</Text>
            </div>
          ),
        }}
      />
    </Inset>
  );
}

function Title() {
  const { title } = useProductCard();
  return (
    <Text as="div" size="4" weight="bold" trim="both" mb={"2"}>
      {title}
    </Text>
  );
}

function Category() {
  const { category } = useProductCard();
  return (
    <Text as="div" size="2" weight="bold" color="blue" mt={"2"} mb={"2"}>
      {category}
    </Text>
  );
}

function Description() {
  const { description } = useProductCard();
  return (
    <Text as="p" size="2" color="gray" trim="both" className="line-clamp-2">
      {description}
    </Text>
  );
}

function Price() {
  const { price, discountPercentage } = useProductCard();
  const discount = discountPercentage ?? 0;
  const isDiscounted = discount > 0;
  const discountedPrice = isDiscounted ? price * (1 - discount / 100) : price;
  return (
    <Flex align="center" gap="2" mt="2">
      <SwitchCase
        value={isDiscounted ? "할인_적용" : "할인_적용_안됨"}
        caseBy={{
          할인_적용: (
            <div className="flex items-center gap-2">
              <Text
                size="3"
                weight="bold"
                color="gray"
                className="line-through"
              >
                {price}$
              </Text>
              <Text size="2" weight="bold" color="red">
                {discount}%
              </Text>
            </div>
          ),
          할인_적용_안됨: <></>,
        }}
      />
      <Text size={isDiscounted ? "4" : "3"} weight="bold">
        {discountedPrice?.toLocaleString()}$
      </Text>
    </Flex>
  );
}

function Rating() {
  const { rating, reviews } = useProductCard();
  return (
    <Text
      as="div"
      size="1"
      mt="2"
      color="gray"
      weight="bold"
      className="flex items-center gap-1"
    >
      <div className="flex items-center gap-1">
        <StarIcon />
        평점: <Strong>{rating?.toFixed(1)}</Strong>
      </div>
      <div className="flex items-center gap-1">
        <PersonIcon />({reviews.length}개의 리뷰)
      </div>
    </Text>
  );
}

export function ProductCard(
  props: ProductItem & {
    children?: React.ReactNode;
    maxWidth?: BoxProps["maxWidth"];
  }
) {
  return (
    <ProductCardContext.Provider value={props}>
      <Box
        minWidth={{ initial: "240px", sm: "200px" }}
        maxWidth={props.maxWidth ?? "300px"}
      >
        <Card size="2">{props.children}</Card>
      </Box>
    </ProductCardContext.Provider>
  );
}

ProductCard.Thumbnail = Thumbnail;
ProductCard.Title = Title;
ProductCard.Category = Category;
ProductCard.Description = Description;
ProductCard.Price = Price;
ProductCard.Rating = Rating;
