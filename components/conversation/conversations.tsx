"use client";

import 'regenerator-runtime/runtime'
import { Mic } from "lucide-react";
import { SendHorizonal } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';

import {conversationAi} from '@/actions/conversationAi';

export default function Conversations() {
    // 나중에는 내가 말한 것을 들어보는 기능도 나쁘지않을 거 같다.
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [messages, setMessages] = useState<messagesType[]>([]);

    // message 타입을 새로 만들어야 할듯.
    // string과 boolean으로 이루어진 객체로 만들어야 할듯.
    // boolean은 내꺼냐 아니냐를 판단하는것으로 하면 될듯.
    // 그리고 이걸로 왼쪽 오른쪽을 판단하면 될듯.

    const handleFetchMessages = async () => {
        const newMessage = {
            message: transcript,
            isMine: true
        };

        setMessages((prevMessages : messagesType[]) => [...prevMessages, newMessage]);
        resetTranscript();

        const responseMessages = await conversationAi(transcript);
        if(responseMessages) {
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

    if(!isMounted) return null;


    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesnt support speech recognition.</span>;
    }

    const handleStartListening = () => {
        SpeechRecognition.startListening();
    }
    
    const handleSubmitMessage = () => {
        const newMessage = {
            message: transcript,
            isMine: true
        };

        setMessages((prevMessages : messagesType[]) => [...prevMessages, newMessage]);
        resetTranscript();
    }

    return (
        <div className="flex flex-col pt-16 h-screen">
            <div className="p-6 flex-grow">
                <div className="flex flex-col w-full space-y-4">
                    {
                        
                        messages.map((messageObj, index) => (
                            // 메세지가 내꺼냐에 따라 왼쪽 오른쪽 나누는것도 해줘야함.
                            
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