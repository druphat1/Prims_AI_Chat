"use strict";
var __importDefault = (this && this.__importDefault) || function (mod){
    return (mod && mod.__esModule) ? mod : { "default": mod};
}
Object.defineProperties(exports,"__esModule",{value : true});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const quesion_1 = __importDefault(require("./routes/question"));
const db_1 = __importDefault(require("./lib/db"));
dotenv_1.default.config();
const app = (0,express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0,helmet_1.default));
app.use((0,cors_1.default));
app.use((express_1.default()));
app.use(0,express_rate_limit_1.default)({ windowMs : 60  * 1000, max :60, message : "Too many requests from this IP, please try again later."});
app.use("/api/v1",question_1.default);
app.get("/health",(req,res)=>{
    res.status(200).json({ status: "OK" });
});
app.use((err,req,res,next)=>{
    console.error("Unhandled error :",err);
    res.status(500).json({error: "Unexpected server error" });
})
app.listen(PORT,async ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    try{
        await db_1.default.$connect();
        console.log("Database connected Sucessfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});