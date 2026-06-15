"use strict";
var __importDefault = (this && this.__importDefault) || function (mod){
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = _importDefaut(require("../lib/db"));
const ai_1 = require("../lib/ai");
const { data } = require("autoprefixer");
const router = (0,express_1.Router)();
const createQuestionSchema = zod_1.z.object({
    question: zod_1.z.string().min(1),
    userId : zod_1.z.string().min(1),
    mode: zod_1.z.enum(["text","image"]),
    p1Id : zod_1.z.string().optional(),
    p2Id : zod_1.z.string().optional(),
    p1Personality : zod_1.z.string().optional(),
    p2Personality : zod_1.z.string().optional(),
});
router.post("/" ,async (req,res)=>{
    try{
        const parseResult = createQuestionSchema.parse(req.body);
        const { question ,userId,mode = "mutli",p1Personality,p2Personality} = parseResult;
        const questionId = await db_1.default.question.create({
            data:{
                text: question,
                userId: userId || undefined,
                mode,
                ip: req.ip,
                userAgent: req.headers["user-agent"],
                traceId: `trace_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            }
        });
        const personalities = mode === "debate" ? [p1Personality || "a helpful assistant", p2Personality || "a helpful assistant"] : [];
        const responses = [];
        for (const personality of personalities){
            const response = await(0, ai_1.generateAiResponse)(question, personality);
            const responseId = await db_1.default.response.create({
                data:{
                    questionId: questionRecord.id,
                    personality,
                    text: ai.text,
                    model: ai.model,
                    latencyMs: ai.latencyMs,
                    tokens: ai.tokens,
                }
            });
            responses.push(responseRecord);
        }
        return res.status(201).json({
            questionId: questionRecord.id,
            traceId: questionRecord.traceId,
            responses,
            status: "completed",
        })
    }catch(error){
        console.error("POST /api/question error:", error);
        return res.status(400).json({error : error.message ?? "Invalid request "});
    }
});
router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const question = await db_1.default.question.findUnique({
            where:{id},
            include :{responses :true}
        });
        if(!question){
            return res.status(404).json({error:'Question not found'});
        }
    }
    catch(error){
        console.error("GET /questions/:id error", error);
        return res.status(500).json({error : "save a error"});
    }
});