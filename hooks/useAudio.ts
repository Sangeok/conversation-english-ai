import { useEffect, useRef, useState } from 'react';

export function useAudio() {
    const [audioUrl, setAudioUrl] = useState<string>("");
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            const audioElement = audioRef.current;
            audioElement.load();
            audioElement.onloadeddata = () => {
                audioElement.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            };
        }
    }, [audioUrl]);

    return { audioUrl, setAudioUrl, audioRef };
}