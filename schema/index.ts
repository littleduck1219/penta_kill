import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
      message: "이메일을 입력하세요",
    }),
    password: z.string().min(8, {
      message: "최소 8자 이상의 비밀번호를 입력하세요",
    }),
    code: z.optional(z.string()),
  });

  export const RegisterSchema = z.object({
    email: z.string().email({
      message: "이메일을 입력하세요",
    }),
    password: z.string().min(8, {
      message: "최소 8자 이상의 비밀번호를 입력하세요",
    }),
    username: z.string().min(1, {
      message: "이름을 입력하세요",
    }),
  });
