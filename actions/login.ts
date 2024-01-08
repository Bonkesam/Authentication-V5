"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const ValidatedFields = LoginSchema.safeParse(values);

    if (!ValidatedFields.success) {
        return { error: "Invalid fields  "};
    }

    return { success: "Email successfully sent "}
};