import { api } from "@/app/services/api";
import { useMutation } from "@tanstack/react-query";
import { CreateNewProductSchema } from "../models/client";

export function useCreateNewProduct() {
  return useMutation({
    mutationFn: (data: CreateNewProductSchema) =>
      api.post("add", {
        json: data,
      }),
  });
}
