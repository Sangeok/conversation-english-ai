export async function POST(request : Request) {
    const requestText = await request.json();

    if (!requestText.text) {
      throw new Error("Missing text error");
    }

    if (!process.env.HUGGINGFACE_TOKEN) {
      throw new Error("Missing 'Hugging Face Access Token'");
    }

    const text = requestText.text;
    const modelUrl = "https://api-inference.huggingface.co/models/facebook/mms-tts-eng";

    const response = await fetch(modelUrl, {
        headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
    });

    console.log("response : " + response);
    
    if(!response.ok){
        throw new Error("Request Failed")
    }

    const audioData = await response.arrayBuffer();

    return new Response(audioData,{
        headers:{
            "Content-Type":"audio/mpeg"
        }
    })
}