
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function stylizeImage(base64Image: string, mimeType: string, prompt: string): Promise<{ base64: string, mimeType: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType
        };
      }
    }
    
    throw new Error('No image data found in the API response.');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to process the image. Please try a different image or style.");
  }
}
