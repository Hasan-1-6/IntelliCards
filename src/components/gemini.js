import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const key = import.meta.env.VITE_GEMINI_API


const schema = {
    description: "Object with a one word title and a List of question-answer pairs for flashcards",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        question: {
          type: SchemaType.STRING,
          description: "The question should be here",
          nullable: false,
        },
        answer: {
          type: SchemaType.STRING,
          description: "The answer should be here",
          nullable: false, 
        },
      },
      required: ["question", "answer"], 
    },
  };


const genAI = new GoogleGenerativeAI(key);
export const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
    }
});
