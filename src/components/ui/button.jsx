import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)]",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_4px_20px_hsl(30_20%_15%/0.08)]",
            ghost: "hover:bg-muted hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            gold: "bg-gradient-to-r from-[hsl(38_80%_50%)] to-[hsl(40_75%_60%)] text-primary-foreground shadow-[0_4px_20px_hsl(38_80%_50%/0.3)] hover:opacity-90 hover:shadow-[0_8px_30px_hsl(38_80%_50%/0.4)]",
            burgundy: "bg-[hsl(345_45%_35%)] text-secondary-foreground hover:bg-[hsl(345_40%_50%)] shadow-[0_4px_20px_hsl(30_20%_15%/0.08)]",
            hero: "bg-gradient-to-r from-[hsl(38_80%_50%)] to-[hsl(40_75%_60%)] text-primary-foreground px-8 py-6 text-lg font-semibold shadow-[0_4px_20px_hsl(38_80%_50%/0.3)] hover:shadow-[0_8px_30px_hsl(38_80%_50%/0.4)] hover:scale-105",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-lg px-8",
            xl: "h-14 rounded-xl px-10 text-lg",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}/>;
});
Button.displayName = "Button";
export { Button, buttonVariants };
