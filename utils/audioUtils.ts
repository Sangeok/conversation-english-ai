export const AudioUtils = async (text: string) => {
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

      return audioUrl;

    } catch (error) {
      console.error(error);
      return "Can you say that again? I didn't catch that.";
    }
};