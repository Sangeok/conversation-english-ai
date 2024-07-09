"use server";

import openai from "@/lib/openai";

export const conversationAi = async (text : string) => {
    if(!text) return null;

    // text를 받아왔다면 ai에게 보내고 그 응답을 받아서 return해주면 되겠죠?
    const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
         messages : [
            {
                "role": "system",
                "content": `You are an English conversation practice assistant with a focus on error correction. Your tasks are:
                    1. Engage in natural conversation with the user.
                    2. Identify and correct significant grammatical or vocabulary errors in the user's English.
                    3. Provide corrections and brief explanations for major errors only.
                    4. Ignore minor issues such as spacing, punctuation, capitalization, or typos.
                    5. Continue the conversation naturally after any corrections.
                    Always maintain a friendly and encouraging tone.`
            },
            {
                "role": "user",
                "content": `${text}`
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