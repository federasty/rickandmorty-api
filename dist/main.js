"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
let cachedApp = null;
async function createNestApp() {
    if (cachedApp) {
        return cachedApp;
    }
    const server = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors();
    await app.init();
    cachedApp = server;
    return server;
}
async function bootstrap() {
    try {
        const server = await createNestApp();
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(3000);
        console.log(`🚀 Local server running on http://localhost:3000`);
    }
    catch (error) {
        console.error('Error starting local server:', error);
    }
}
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    bootstrap();
}
exports.default = async (req, res) => {
    try {
        const server = await createNestApp();
        return server(req, res);
    }
    catch (error) {
        console.error('Vercel handler error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//# sourceMappingURL=main.js.map