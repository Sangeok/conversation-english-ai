import OpenAi from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if(!apiKey) {
    throw new Error('No OpenAI API key found');
}

const openai = new OpenAi({apiKey});

export default openai;