"use server";

import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const ValidatedFields = LoginSchema.safeParse(values);

    if (!ValidatedFields.success) {
        return { error: "Invalid fields  "};
    }

    const { email, password, code} = ValidatedFields.data;

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
    if (existinguser.isTwoFactorEnabled && existinguser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existinguser.email
            );

            if (!twoFactorToken) {
                return { error: "Invalid code!"};
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!"};
            }

            const hasExpired = new Date(twoFactorToken.expires) < new date();

            if (hasExpired) {
                return { error: "Code has expired!"}
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.ID}
            });

            const existConfirmation = await getTwoFactorConfirmationByUserId(existinguser.id);
        } else{
            const twoFactorToken = await generateTwoFactorToken(existinguser.email)
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );

            return {twoFactor: true};
        }
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