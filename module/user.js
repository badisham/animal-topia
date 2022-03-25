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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const router_1 = require("../engine/router");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const currentRouter = new router_1.PRouter();
const getUser = {
    ID: true,
    name: true,
    email: true,
    cash: true,
    currentCharacterID: true,
    mvpNum: true,
    point: true
};
currentRouter.get('/ranking', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.params.id;
    const user = yield prisma.user.findMany({
        select: Object.assign({}, getUser),
        orderBy: {
            point: 'desc'
        },
    });
    return user;
}));
currentRouter.get('/:id', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.params.id;
    const user = yield prisma.user.findFirst({
        where: {
            ID
        },
        select: Object.assign({}, getUser),
    });
    return user;
}));
currentRouter.post('/change-name', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.body.ID;
    const name = req.body.name;
    const user = yield prisma.user.update({
        where: {
            ID
        },
        data: {
            name
        },
    });
    return {
        message: 'เปลี่ยนชื่อสำเร็จ',
    };
}));
currentRouter.post('/change-character', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.body.ID;
    const characterID = req.body.characterID;
    const user = yield prisma.user.update({
        where: {
            ID
        },
        data: {
            currentCharacterID: `${parseInt(characterID) + 1}`
        },
    });
    return {
        message: '',
    };
}));
currentRouter.post('/add-point', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.body.ID;
    const point = req.body.point;
    const user = yield prisma.user.update({
        where: {
            ID
        },
        data: {
            point: {
                increment: parseInt(point)
            }
        },
    });
    return {
        message: '',
    };
}));
exports.userRouter = currentRouter.router;
//# sourceMappingURL=user.js.map