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
                content: "You are a helpful assistant for English teaching."
            },
            {
                role : 'user',
                content : `
                Identify and correct grammatical issues in the user's text: "${text}" (excluding uppercase and lowercase issues).
                1. If there are grammatical errors:
                1.1 Provide the correct sentence as a teacher would to a student.
                1.2 Explain why the original text is wrong.
                1.3 Respond to the corrected sentence naturally and ask a related question to continue the conversation.
                Note: Ignore comma and punctuation issues.

                2. If there are no grammatical errors:
                Answer the question and continue the conversation with a related question.

                Do not provide ${text}.
                Do not provide answers that are just numbers.
                Respond as if talking to a person.
                `
                
            },
        ],
    });

    console.log(aiResponse.choices[0].message.content);

    if(aiResponse) {
        if (aiResponse?.choices?.[0]?.message?.content) {
            console.log("AI Response Success");
            return { isMine: false, message: aiResponse.choices[0].message.content };
        }
    }
}