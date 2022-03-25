"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uploadFile = (file) => {
    const path = file.path;
    const nameFile = path;
    const fileStream = fs_1.default.createReadStream(nameFile);
    return nameFile;
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload_file.js.map