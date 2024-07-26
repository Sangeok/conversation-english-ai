interface AudioProps {
    audioUrl: string;
    audioRef: React.RefObject<HTMLAudioElement>;
}

export default function AudioPlayer({audioUrl, audioRef}: AudioProps) {
    return (
        <>
            {audioUrl && (
                <audio controls autoPlay ref={audioRef}>
                    <source src={audioUrl} type="audio/flac" />
                </audio>
            )}
        </>
    )
}