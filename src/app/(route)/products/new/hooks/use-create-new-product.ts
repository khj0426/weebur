import { api } from "@/app/services/api";
import { useMutation } from "@tanstack/react-query";
import { CreateNewProductSchema } from "../models/client";
import { toast } from "sonner";

export function useCreateNewProduct() {
  return useMutation({
    onSuccess() {
      toast.success("상품이 성공적으로 생성되었습니다.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "상품 생성에 실패했습니다."
      );
    },
    mutationFn: (data: CreateNewProductSchema) =>
      api.post("products/add", {
        json: data,
      }),
  });
}
