"use client";

import 'regenerator-runtime/runtime'
import { Mic } from "lucide-react";
import { SendHorizonal } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';

import {conversationAi} from '@/actions/conversationAi';
import { useAudio} from '@/hooks/useAudio';

import {AudioUtils} from '@/utils/audioUtils';
import AudioPlayer from '../audioPlayer';

export default function Conversations() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessagesType[]>([]);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const {
        audioUrl,
        setAudioUrl,
        audioRef
    } = useAudio();

    const handleFetchMessages = async () => {
        const newMessage = {
            message: transcript,
            isMine: true
        };

        setMessages((prevMessages : MessagesType[]) => [...prevMessages, newMessage]);
        resetTranscript();
        
        // response 받으면 바로 text to speech로 읽어줘야 함.
        const responseMessages = await conversationAi(transcript);
        if(responseMessages) {
            const res = await AudioUtils(responseMessages.message);
            setAudioUrl(res);
            setMessages((prevMessages : MessagesType[]) => [...prevMessages, responseMessages]);
        }
    };

    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                <AudioPlayer
                    audioRef={audioRef}
                    audioUrl={audioUrl}
                />
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