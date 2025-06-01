import ky from "ky";
export const api = ky.create({
  prefixUrl:
    process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || "http://localhost:3000/api",
  timeout: 10000,
  hooks: {
    //요청 전 실행할 항목들 명시.
    beforeRequest: [
      (request) => {
        request.headers.set("Content-Type", "application/json");
      },
    ],
  },
});
