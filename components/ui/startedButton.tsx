"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function StartedButton() {
    const router = useRouter();

    const handleClick = () => {
      router.push('/conversationAi');
    }
    return (
        <Button onClick={handleClick} variant="secondary" className="self-center">
            <ArrowRight className="mr-2"/>Get Started
        </Button>
    )
}