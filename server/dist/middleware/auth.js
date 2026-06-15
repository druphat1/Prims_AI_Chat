"use strict";
var __importDefault = (this && this.__importDefault) || function (mod){
    return (mod && mod.__esModule) ? mod : { "default" : mod};
}
Object.defineProperty(exports,"__esModule",{value :true});
exports.optionalAuth = optionalAuth;
exports.requireAuth = this.requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../lib/db"));
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";
async function optionalAuth(req, res, next){
    const header = req.headers.authorization;
     if (!header?.startsWith("Bearer ")) {
        return next();
    }
    const token = header.split(" ")[1];
     try {
         const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
         const user = await db_1.default.user.findUnique({ where: { id: payload.userId } });
        if (user) {
            req.user = { id: user.id, email: user.email ?? undefined, name: user.displayName ?? undefined };
        }
    }
    catch (err) {
        console.warn("Invalid auth token", err);
    }
    return next();
}
function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
    }
    return next();
}
function signJwt(userId){
    return jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: "7d" });
}
