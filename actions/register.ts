"use server";
import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const ValidatedFields = RegisterSchema.safeParse(values);

    if (!ValidatedFields.success) {
        return { error: "Invalid fields  "};
    }
    const { email, password, name  } = ValidatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "The email is already taken!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    //TODO: send verification token email

    return { success: "User Successfully created "}
};