import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters is required!"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(1, {
        message: "You need a password to proceed"
    }),
    code: z.optional(z.string()),
});
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),

});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "You need a minimum of 6 characters"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});