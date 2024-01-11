"use server";

import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const ValidatedFields = LoginSchema.safeParse(values);

    if (!ValidatedFields.success) {
        return { error: "Invalid fields  "};
    }

    const { email, password} = ValidatedFields.data;

    const existinguser = await getUserByEmail(email);

    if (!existinguser || !existinguser.email || !existinguser?.password) {
        return { error: "Email does not exist!"}
    }

    if (!existinguser.emailVerified) {
        const verificationToken = await generateVerificationToken( existinguser.email);

        await sendVerificationEmail (
           verificationToken.email,
           verificationToken.token,
        );
        
        return { success: "Confirmation email sent!"};

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

    } catch (error) {
      
        if (error instanceof AuthError ) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!"}
                default:
                    return { error: "something went wrong!"}
            }
        }

        throw error;
    }
};