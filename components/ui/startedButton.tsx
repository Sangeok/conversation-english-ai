"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartedButton() {
    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch('http://localhost:8080/api/users');
    //         console.log(res.json());
    //     }
    //     fetchData();
    // }, [])
    
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