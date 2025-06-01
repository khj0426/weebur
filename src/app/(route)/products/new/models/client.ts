import { z } from "zod";

export const createNewProductSchema = z.object({
  title: z
    .string({
      message: "상품명을 입력해주세요.",
    })
    .min(1, {
      message: "최소 1자 이상 입력해주세요.",
    })
    .max(15, {
      message: "최대 15자 이하로 입력해주세요.",
    }),
  description: z.string().optional(),
  price: z
    .number({
      message: "가격을 입력해주세요.",
    })
    .min(1000, {
      message: "1000원 이상으로 입력해주세요.",
    }),
  discountPercentage: z
    .number()
    .max(100, {
      message: "할인율은 최대 100%까지 가능합니다.",
    })
    .optional(),
  brand: z.enum(["Apple", "Samsung", "Weebur"], {
    message: "브랜드를 선택해주세요.",
  }),
});

export type CreateNewProductSchema = z.infer<typeof createNewProductSchema>;

export const ProductBrandList = [
  {
    key: "삼성",
    value: "Samsung",
  },
  {
    key: "애플",
    value: "Apple",
  },
  {
    key: "위버",
    value: "Weebur",
  },
] as const;
