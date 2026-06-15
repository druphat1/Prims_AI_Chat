"use strict";
Object.defineProperty(exports,"_esModule",{value:true});
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const users = await prisma.user.findMany();
exports.default = prisma;