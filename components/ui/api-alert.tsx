"use client";


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import type { VariantProps } from "class-variance-authority";


interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};


type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const variantMap: Record<ApiAlertProps["variant"], BadgeVariant> = {
    public: "secondary",
    admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public",
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to clipboard.");
    };

    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}

                </Badge>
                </AlertTitle>
                <AlertDescription className="mt-4 flex items-center justify-between">
                    <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {description}
                    </code>
                    <Button variant="outline" size="icon" onClick={onCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </AlertDescription>
        </Alert>
    )
}