"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod :{"default": mod};
}
Object.defineProperty(exports,"__esModule",{value : true});
exports.generateAiResponse = generateAiResponse;
const openai_1 = __importDefault(require("openai"));
const openAikey = process.env.OPENAI_API_KEY;
if(!openAikey){
    throw new Error("OPENAI_API_KEY is not set in environment variables");
}
const client = new openai_1.default({ apiKey :openAikey});
const personaPrompts ={
    default : "You are a helpful assistant. Answer clearly and concisely.",
    engineer: "You are an expert engineer. Provide a technical, structured answer when asked.",
    monk: "You are a calm and thoughtful monk. Keep the tone gentle and reflective.",
    critic: "You are a critical analyst who examines assumptions carefully and offers balanced critique.",
}
async function generateAiResponse(question, personality = "default"){
    const persona = personality && personaPrompts[personality] ? personality : "default";
    const systemPrompt = personaPrompts[persona];
    const startTime = Date.now();
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
         input: [
            {role : "system", content : systemPrompt},
            {role :"user",content :question}
         ],max_output_tokens : 600,
    });
    const elapsedTime = Date.now() - start;
    const text = response.ouptut_text ?? "";
    return {
        text : text.trim(),
        model : response.model ?? "gpt-4o-mini",
        latencyMs : elapsedTime,
        tokens : response.usage?.total_tokens,
    }
}