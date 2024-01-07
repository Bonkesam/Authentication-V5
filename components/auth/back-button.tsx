"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface backButtonProps {
    href: string;
    label: string;
}

export const BackButton = ({
    href, label 
}: backButtonProps) => {
    return (
        <Button variant="link" size="sm" className="font-normal w-full" asChild>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
} 