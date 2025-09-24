"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
let cachedApp;
async function createApp() {
    if (cachedApp) {
        return cachedApp;
    }
    const expressApp = (0, express_1.default)();
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter, {
        logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'log'],
    });
    app.enableCors();
    await app.init();
    cachedApp = expressApp;
    return expressApp;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap();
}
exports.default = async (req, res) => {
    try {
        const app = await createApp();
        return app(req, res);
    }
    catch (error) {
        console.error('Serverless function error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
//# sourceMappingURL=main.js.map