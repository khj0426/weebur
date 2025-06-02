import { Box, Card, Inset, Text, Flex, Strong } from "@radix-ui/themes";
import { ProductItem } from "../models/server";
import Image from "next/image";
import React from "react";
import { SwitchCase } from "@/app/components/switch-case";

export function ProductCard({
  title,
  description,
  thumbnail,
  rating,
  reviews,
  price,
  discountPercentage,
  stock,
  category,
  availabilityStatus,
}: ProductItem) {
  const originalPrice = price;
  const discount = discountPercentage ?? 0;
  const isDiscounted = discount > 0;
  const discountedPrice = isDiscounted
    ? originalPrice * (1 - discount / 100)
    : originalPrice;

  const isOutOfStock = availabilityStatus === "Out of Stock" || stock === 0;

  return (
    <Box minWidth={{ initial: "240px", sm: "200px" }} maxWidth="300px">
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <SwitchCase
            value={thumbnail ? "썸네일_존재" : "썸네일_없음"}
            caseBy={{
              썸네일_존재: (
                <div className="relative w-full h-[180px] bg-[var(--gray-5)] overflow-hidden">
                  <Image alt={title} src={thumbnail} fill objectFit="cover" />
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
        <Flex direction="column" gap="2" mt="2">
          <Text as="div" size="4" weight="bold" trim="both">
            {title}
          </Text>
          <Text as="div" size={"2"} weight={"bold"} color="blue">
            {category}
          </Text>
          <Text
            as="p"
            size="2"
            color="gray"
            trim="both"
            className="line-clamp-3"
          >
            {description}
          </Text>
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
                      {originalPrice}$
                    </Text>
                    <Text size="2" weight="bold" color="red">
                      {discount}% 할인
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

          <Text as="div" size="1" mt="2" color="gray" weight={"bold"}>
            평점: <Strong>{rating?.toFixed(1)}</Strong> ({reviews.length}개의
            리뷰)
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
