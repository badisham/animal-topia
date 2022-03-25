"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router_1 = require("../engine/router");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const currentRouter = new router_1.PRouter();
const secretKey = process.env.SECRET_AUTH_PASS || 'KEY';
const inputUser = (user) => {
    return {
        name: user.name.trim() || '',
        email: user.email.trim() || '',
        password: bcryptjs_1.default.hashSync(user.password.trim() || '', 8),
    };
};
const getUser = {
    ID: true,
    name: true,
    email: true,
    // old: true,
    // cash: true,
    // mvpNum: true,
    currentCharacterID: true,
    point: true
};
currentRouter.post('/register', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userInput = inputUser(body);
    const user = yield prisma.user.create({
        data: Object.assign({}, userInput),
    });
    return {
        message: 'สมัครสำเร็จแล้ว เข้าไปเล่นกันเลย',
    };
}));
currentRouter.get('/', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findMany({
        select: Object.assign({}, getUser),
    });
    return user;
}));
currentRouter.post('/login', (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const email = body.email;
    const user = yield prisma.user.findFirst({
        where: {
            email: email.trim(),
        },
        select: Object.assign(Object.assign({}, getUser), { password: true }),
    });
    if (!user) {
        throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
    }
    const keyIsValid = bcryptjs_1.default.compareSync(body.password, user.password);
    if (!keyIsValid) {
        throw new Error('รหัสผ่านไม่ถูกต้อง');
    }
    var token = jsonwebtoken_1.default.sign({ id: user.ID }, secretKey, {
        expiresIn: 86400, // 24 hours
    });
    user.cash;
    return {
        ID: user.ID,
        name: user.name,
        email: user.email,
        old: user.old,
        point: user.point,
        cash: user.cash,
        mvpNum: user.mvpNum,
        currentCharacterID: user.currentCharacterID,
        accessToken: token,
    };
}));
currentRouter.post('/get-user-by-token', (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        throw new Error('No token');
    }
    const userId = jsonwebtoken_1.default.verify(accessToken, secretKey).ID;
    const user = yield prisma.user.findFirst({
        where: {
            ID: userId,
        },
        select: Object.assign({}, getUser),
    });
    if (!user) {
        throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
    }
    var token = jsonwebtoken_1.default.sign({ id: user.ID }, secretKey, {
        expiresIn: 86400, // 24 hours
    });
    return {
        ID: user.ID,
        name: user.name,
        email: user.email,
        old: user.old,
        point: user.point,
        cash: user.cash,
        mvpNum: user.mvpNum,
        currentCharacterID: user.currentCharacterID,
        accessToken: token,
    };
}));
exports.authRouter = currentRouter.router;
//# sourceMappingURL=auth.js.map