"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const ValidatedFields = RegisterSchema.safeParse(values);

    if (!ValidatedFields.success) {
        return { error: "Invalid fields  "};
    }

    return { success: "Email successfully sent "}
};