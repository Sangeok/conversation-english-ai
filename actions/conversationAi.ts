"use server";

import openai from "@/lib/openai";

export const conversationAi = async (text : string) => {
    if(!text) return null;

    // text를 받아왔다면 ai에게 보내고 그 응답을 받아서 return해주면 되겠죠?
    const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages : [
            {
                role: "system", 
                content: `You are a helpful assistant for English conversation to correct the user's ${text}`
            },
            {
                role : 'user',
                content : `
                    Recognize the user's ${text} as a speech, and point out the wrong part ${text} as a speech.
                    (Do not provide Commas, comma, capitalization, punctuation, contraction , or any marks issues)
                    
                    you answer the following.
                    
                    If there is an error in the ${text} as a speech, do the following
                    - Provide the corrected ${text} as a speech starting 'correct sentense is'.
                    - Explain why ${text} as a speech is wrong.
                    - Respond to the corrected sentence and ask a related question to continue the conversation.
                    - But do not provide original text in the answer.

                    If there are no error in the ${text} as a speech, do the following
                    - Answer the question and continue the conversation with a related question.

                    answer with following the options below.
                    - Tone : polite
                    - Style : accurate
                    - Reader level : university student
                    - Length : Within 100 characters
                    - Format : To print out as a dialog
                    - Answer me in English

                    Do not provide the same answer as the previous answer.
                    Do not provide ${text} in the answer.
                `
                
            },
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
    });

    console.log(aiResponse.choices[0].message.content);

    if(aiResponse) {
        if (aiResponse?.choices?.[0]?.message?.content) {
            console.log("AI Response Success");
            return { isMine: false, message: aiResponse.choices[0].message.content };
        }
    }
}