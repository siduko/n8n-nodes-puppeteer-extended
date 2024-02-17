"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcRequest = void 0;
const node_ipc_1 = __importDefault(require("node-ipc"));
const ipcRequest = (type, parameters) => {
    return new Promise((resolve, reject) => {
        node_ipc_1.default.config.retry = 1500;
        node_ipc_1.default.connectTo("puppeteer", () => {
            var _a, _b;
            console.log(`[Helper][IPC] Emit ${type}`);
            (_a = node_ipc_1.default.of.puppeteer) === null || _a === void 0 ? void 0 : _a.emit(type, parameters);
            (_b = node_ipc_1.default.of.puppeteer) === null || _b === void 0 ? void 0 : _b.on(type, (data) => {
                if (data instanceof Error) {
                    console.log(`[Helper][IPC] Error ${type}`, data);
                    reject(data);
                    return;
                }
                console.log(`[Helper][IPC] On ${type}`, data);
                resolve(data);
            });
        });
    });
};
exports.ipcRequest = ipcRequest;
//# sourceMappingURL=helpers.js.map