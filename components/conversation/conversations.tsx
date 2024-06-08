"use client";

import 'regenerator-runtime/runtime'
import { Mic } from "lucide-react";
import { SendHorizonal } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';

import {conversationAi} from '@/actions/conversationAi';

export default function Conversations() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [messages, setMessages] = useState<messagesType[]>([]);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string>("");

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleGetAudio = async (text: string) => {
        try {
          const response = await fetch("http://localhost:3000/api/generate-sound", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: text,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch audio data");
          }
    
          const data = await response.arrayBuffer();
    
          const blob = new Blob([data], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(blob);

          setAudioUrl(audioUrl);
    
        } catch (error) {
          console.error(error)
        }
      };

    const handleFetchMessages = async () => {
        const newMessage = {
            message: transcript,
            isMine: true
        };

        setMessages((prevMessages : messagesType[]) => [...prevMessages, newMessage]);
        resetTranscript();
        
        // response 받으면 바로 text to speech로 읽어줘야 함.
        const responseMessages = await conversationAi(transcript);
        if(responseMessages) {
            const res = await handleGetAudio(responseMessages.message);
            setMessages((prevMessages : messagesType[]) => [...prevMessages, responseMessages]);
        }
    };

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
    }, [audioUrl])

    if(!isMounted) return null;

    const handleStartListening = () => {
        SpeechRecognition.startListening();
    }

    return (
        <div className="flex flex-col pt-16 h-screen">
            <div className="p-6 flex-grow">
                <div className="flex flex-col w-full space-y-4">
                    {
                        
                        messages.map((messageObj, index) => (
                            <div 
                                key={index} 
                                className={`p-2 rounded-lg max-w-xl ${
                                    messageObj.isMine
                                      ? 'self-start bg-blue-500 text-white'
                                      : 'self-end bg-gray-200 dark:bg-gray-800'
                                  }`}
                            >
                                <div className="">{messageObj.message}</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            
            <div className="invisible">
                {
                    audioUrl && (
                        <audio controls autoPlay ref={audioRef}>
                            <source src={audioUrl} type="audio/flac" />
                        </audio>
                    )
                }
            </div>

            <div className="flex">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Press the Mic and speak..."
                    value={transcript}
                    readOnly
                />
                <button 
                    className="ml-2 px-4 py-2 bg-grey-500 dark:text-white border text-black rounded-lg dark:border-gray-300" 
                    onClick={handleStartListening}
                >
                    <Mic />
                </button>
                <button
                    className="ml-2 px-4 py-2 bg-grey-500 dark:text-white border text-black rounded-lg dark:border-gray-300" 
                    onClick={handleFetchMessages}
                >
                    <SendHorizonal />
                </button>
            </div>
            
        </div>
    )
}