"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../..//src/app.module");
let app;
const initApp = async () => {
    if (app) {
        return app;
    }
    app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.init();
    return app;
};
async function handler(req, res) {
    try {
        console.log('Character ID function is running!', req.method, req.url);
        const nestApp = await initApp();
        const httpAdapter = nestApp.getHttpAdapter();
        const instance = httpAdapter.getInstance();
        const { id } = req.query;
        req.url = `/characters/${id}`;
        return instance(req, res);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Server Error',
            message: error.message
        });
    }
}
//# sourceMappingURL=%5Bid%5D.js.map