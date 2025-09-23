"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const expressApp = (0, express_1.default)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    await app.init();
    if (process.env.VERCEL === undefined) {
        await app.listen(3000);
        console.log(`🚀 Local server running on http://localhost:3000`);
    }
}
if (process.env.VERCEL === undefined) {
    bootstrap();
}
exports.handler = expressApp;
//# sourceMappingURL=main.js.map