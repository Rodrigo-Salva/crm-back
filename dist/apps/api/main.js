/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_pino_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(4);
const helmet_1 = __importDefault(__webpack_require__(5));
const api_module_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_module_1.ApiModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.use((0, helmet_1.default)());
    app.enableCors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CRM API')
        .setDescription('API pública del sistema CRM')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server running on port ${process.env.PORT ?? 3000}`);
    console.log(`OpenAPI docs at http://localhost:${process.env.PORT ?? 3000}/docs`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("nestjs-pino");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const config_1 = __webpack_require__(7);
const cache_manager_1 = __webpack_require__(8);
const bullmq_1 = __webpack_require__(9);
const throttler_1 = __webpack_require__(10);
const nestjs_pino_1 = __webpack_require__(3);
const shared_1 = __webpack_require__(11);
const auth_1 = __webpack_require__(23);
const tenant_1 = __webpack_require__(29);
const companies_1 = __webpack_require__(76);
const custom_fields_1 = __webpack_require__(105);
const pipeline_stages_1 = __webpack_require__(111);
const activities_1 = __webpack_require__(119);
const notifications_1 = __webpack_require__(127);
const email_1 = __webpack_require__(32);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const campaigns_1 = __webpack_require__(131);
const marketing_campaigns_1 = __webpack_require__(137);
const sales_goals_1 = __webpack_require__(142);
const commissions_1 = __webpack_require__(147);
const referrals_1 = __webpack_require__(156);
const saved_views_1 = __webpack_require__(161);
const invoicing_1 = __webpack_require__(166);
const nps_1 = __webpack_require__(172);
const tags_1 = __webpack_require__(94);
const lead_forms_1 = __webpack_require__(177);
const dashboard_1 = __webpack_require__(182);
const products_1 = __webpack_require__(189);
const product_categories_1 = __webpack_require__(194);
const projects_1 = __webpack_require__(199);
const quotes_1 = __webpack_require__(204);
const tickets_1 = __webpack_require__(216);
const api_keys_1 = __webpack_require__(221);
const webhooks_1 = __webpack_require__(207);
const whatsapp_1 = __webpack_require__(226);
const tenant_settings_1 = __webpack_require__(149);
const ai_assistant_1 = __webpack_require__(231);
const role_permissions_1 = __webpack_require__(34);
const leads_1 = __webpack_require__(235);
const uploads_1 = __webpack_require__(241);
const teams_1 = __webpack_require__(249);
const time_tracking_1 = __webpack_require__(254);
const tasks_1 = __webpack_require__(259);
const users_1 = __webpack_require__(266);
const notes_1 = __webpack_require__(272);
const admin_module_1 = __webpack_require__(278);
const import_module_1 = __webpack_require__(282);
const scheduler_module_1 = __webpack_require__(287);
const api_controller_1 = __webpack_require__(301);
const api_service_1 = __webpack_require__(302);
const careers_module_1 = __webpack_require__(303);
const modalities_module_1 = __webpack_require__(308);
const payments_1 = __webpack_require__(313);
const contracts_1 = __webpack_require__(318);
const subscriptions_1 = __webpack_require__(290);
const playbooks_1 = __webpack_require__(295);
const public_api_1 = __webpack_require__(323);
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            cache_manager_1.CacheModule.register({ isGlobal: true }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                },
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            singleLine: true,
                        },
                    },
                },
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 60,
                }]),
            shared_1.SharedModule,
            auth_1.AuthModule,
            tenant_1.TenantModule,
            companies_1.CompaniesModule,
            custom_fields_1.CustomFieldsModule,
            pipeline_stages_1.PipelineStagesModule,
            activities_1.ActivitiesModule,
            notifications_1.NotificationsModule,
            email_1.EmailModule,
            automation_1.AutomationModule,
            audit_1.AuditModule,
            campaigns_1.CampaignsModule,
            marketing_campaigns_1.MarketingCampaignsModule,
            sales_goals_1.SalesGoalsModule,
            commissions_1.CommissionsModule,
            referrals_1.ReferralsModule,
            saved_views_1.SavedViewsModule,
            invoicing_1.InvoicingModule,
            nps_1.NpsModule,
            tags_1.TagsModule,
            lead_forms_1.LeadFormsModule,
            dashboard_1.DashboardModule,
            products_1.ProductsModule,
            product_categories_1.ProductCategoriesModule,
            projects_1.ProjectsModule,
            quotes_1.QuotesModule,
            tickets_1.TicketsModule,
            api_keys_1.ApiKeysModule,
            webhooks_1.WebhooksModule,
            whatsapp_1.WhatsappModule,
            tenant_settings_1.TenantSettingsModule,
            ai_assistant_1.AiAssistantModule,
            role_permissions_1.RolePermissionsModule,
            leads_1.LeadsModule,
            uploads_1.UploadsModule,
            teams_1.TeamsModule,
            time_tracking_1.TimeTrackingModule,
            tasks_1.TasksModule,
            users_1.UsersModule,
            notes_1.NotesModule,
            admin_module_1.AdminModule,
            import_module_1.ImportModule,
            scheduler_module_1.SchedulerModule,
            careers_module_1.CareersModule,
            modalities_module_1.ModalitiesModule,
            payments_1.PaymentsModule,
            subscriptions_1.SubscriptionsModule,
            contracts_1.ContractsModule,
            playbooks_1.PlaybooksModule,
            public_api_1.PublicApiModule,
        ],
        controllers: [api_controller_1.ApiController],
        providers: [
            api_service_1.ApiService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_1.TwoFactorSetupGuard,
            },
        ],
    })
], ApiModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/bullmq");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeGateway = exports.RealtimeModule = exports.EncryptionService = exports.PrismaService = exports.PrismaModule = exports.SharedModule = void 0;
var shared_module_1 = __webpack_require__(12);
Object.defineProperty(exports, "SharedModule", ({ enumerable: true, get: function () { return shared_module_1.SharedModule; } }));
var prisma_1 = __webpack_require__(13);
Object.defineProperty(exports, "PrismaModule", ({ enumerable: true, get: function () { return prisma_1.PrismaModule; } }));
Object.defineProperty(exports, "PrismaService", ({ enumerable: true, get: function () { return prisma_1.PrismaService; } }));
var encryption_service_1 = __webpack_require__(17);
Object.defineProperty(exports, "EncryptionService", ({ enumerable: true, get: function () { return encryption_service_1.EncryptionService; } }));
var realtime_module_1 = __webpack_require__(19);
Object.defineProperty(exports, "RealtimeModule", ({ enumerable: true, get: function () { return realtime_module_1.RealtimeModule; } }));
var realtime_gateway_1 = __webpack_require__(20);
Object.defineProperty(exports, "RealtimeGateway", ({ enumerable: true, get: function () { return realtime_gateway_1.RealtimeGateway; } }));


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_1 = __webpack_require__(13);
const encryption_service_1 = __webpack_require__(17);
const realtime_module_1 = __webpack_require__(19);
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, realtime_module_1.RealtimeModule],
        providers: [encryption_service_1.EncryptionService],
        exports: [prisma_1.PrismaModule, encryption_service_1.EncryptionService, realtime_module_1.RealtimeModule],
    })
], SharedModule);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = exports.PrismaModule = void 0;
var prisma_module_1 = __webpack_require__(14);
Object.defineProperty(exports, "PrismaModule", ({ enumerable: true, get: function () { return prisma_module_1.PrismaModule; } }));
var prisma_service_1 = __webpack_require__(15);
Object.defineProperty(exports, "PrismaService", ({ enumerable: true, get: function () { return prisma_service_1.PrismaService; } }));


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(15);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(2);
const client_1 = __webpack_require__(16);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EncryptionService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptionService = void 0;
const common_1 = __webpack_require__(2);
const crypto = __importStar(__webpack_require__(18));
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
let EncryptionService = EncryptionService_1 = class EncryptionService {
    logger = new common_1.Logger(EncryptionService_1.name);
    masterKey;
    constructor() {
        const envKey = process.env.ENCRYPTION_KEY;
        if (envKey) {
            this.masterKey = Buffer.from(envKey, 'hex');
            if (this.masterKey.length !== KEY_LENGTH) {
                this.masterKey = crypto.scryptSync(envKey, 'crm-salt', KEY_LENGTH);
            }
        }
        else {
            this.masterKey = crypto.randomBytes(KEY_LENGTH);
            this.logger.warn('ENCRYPTION_KEY not set, using random key (data will be lost on restart)');
        }
    }
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, this.masterKey, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }
    decrypt(encryptedText) {
        const [ivHex, authTagHex, data] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, this.masterKey, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    hash(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
    generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = EncryptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EncryptionService);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeModule = void 0;
const common_1 = __webpack_require__(2);
const realtime_gateway_1 = __webpack_require__(20);
let RealtimeModule = class RealtimeModule {
};
exports.RealtimeModule = RealtimeModule;
exports.RealtimeModule = RealtimeModule = __decorate([
    (0, common_1.Module)({
        providers: [realtime_gateway_1.RealtimeGateway],
        exports: [realtime_gateway_1.RealtimeGateway],
    })
], RealtimeModule);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RealtimeGateway_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeGateway = void 0;
const websockets_1 = __webpack_require__(21);
const socket_io_1 = __webpack_require__(22);
const common_1 = __webpack_require__(2);
let RealtimeGateway = RealtimeGateway_1 = class RealtimeGateway {
    server;
    logger = new common_1.Logger(RealtimeGateway_1.name);
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinTenant(tenantId, client) {
        client.join(`tenant_${tenantId}`);
        this.logger.log(`Client ${client.id} joined tenant_${tenantId}`);
        return { event: 'joined', data: tenantId };
    }
    handleJoinUser(userId, client) {
        client.join(`user_${userId}`);
        this.logger.log(`Client ${client.id} joined user_${userId}`);
        return { event: 'joined', data: userId };
    }
    broadcastToTenant(tenantId, event, payload) {
        this.server.to(`tenant_${tenantId}`).emit(event, payload);
    }
    notifyUser(userId, event, payload) {
        this.server.to(`user_${userId}`).emit(event, payload);
    }
};
exports.RealtimeGateway = RealtimeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], RealtimeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinTenant'),
    __param(0, (0, websockets_1.MessageBody)('tenantId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleJoinTenant", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinUser'),
    __param(0, (0, websockets_1.MessageBody)('userId')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleJoinUser", null);
exports.RealtimeGateway = RealtimeGateway = RealtimeGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], RealtimeGateway);


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllowWithoutTwoFactor = exports.CurrentTenant = exports.CurrentUser = exports.Roles = exports.TwoFactorSetupGuard = exports.JwtAuthGuard = exports.PortalGuard = exports.TenantGuard = exports.RolesGuard = exports.AuthService = exports.AuthModule = void 0;
var auth_module_1 = __webpack_require__(24);
Object.defineProperty(exports, "AuthModule", ({ enumerable: true, get: function () { return auth_module_1.AuthModule; } }));
var auth_service_1 = __webpack_require__(27);
Object.defineProperty(exports, "AuthService", ({ enumerable: true, get: function () { return auth_service_1.AuthService; } }));
var roles_guard_1 = __webpack_require__(68);
Object.defineProperty(exports, "RolesGuard", ({ enumerable: true, get: function () { return roles_guard_1.RolesGuard; } }));
var tenant_guard_1 = __webpack_require__(70);
Object.defineProperty(exports, "TenantGuard", ({ enumerable: true, get: function () { return tenant_guard_1.TenantGuard; } }));
var portal_guard_1 = __webpack_require__(71);
Object.defineProperty(exports, "PortalGuard", ({ enumerable: true, get: function () { return portal_guard_1.PortalGuard; } }));
var jwt_auth_guard_1 = __webpack_require__(72);
Object.defineProperty(exports, "JwtAuthGuard", ({ enumerable: true, get: function () { return jwt_auth_guard_1.JwtAuthGuard; } }));
var two_factor_setup_guard_1 = __webpack_require__(73);
Object.defineProperty(exports, "TwoFactorSetupGuard", ({ enumerable: true, get: function () { return two_factor_setup_guard_1.TwoFactorSetupGuard; } }));
var roles_decorator_1 = __webpack_require__(69);
Object.defineProperty(exports, "Roles", ({ enumerable: true, get: function () { return roles_decorator_1.Roles; } }));
var current_user_decorator_1 = __webpack_require__(74);
Object.defineProperty(exports, "CurrentUser", ({ enumerable: true, get: function () { return current_user_decorator_1.CurrentUser; } }));
var current_tenant_decorator_1 = __webpack_require__(75);
Object.defineProperty(exports, "CurrentTenant", ({ enumerable: true, get: function () { return current_tenant_decorator_1.CurrentTenant; } }));
var allow_without_two_factor_decorator_1 = __webpack_require__(63);
Object.defineProperty(exports, "AllowWithoutTwoFactor", ({ enumerable: true, get: function () { return allow_without_two_factor_decorator_1.AllowWithoutTwoFactor; } }));


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(25);
const passport_1 = __webpack_require__(26);
const auth_service_1 = __webpack_require__(27);
const auth_controller_1 = __webpack_require__(56);
const jwt_strategy_1 = __webpack_require__(64);
const google_strategy_1 = __webpack_require__(66);
const two_factor_service_1 = __webpack_require__(53);
const tenant_1 = __webpack_require__(29);
const email_1 = __webpack_require__(32);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'super-secret',
                signOptions: { expiresIn: '7d' },
            }),
            tenant_1.TenantModule,
            email_1.EmailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, two_factor_service_1.TwoFactorService],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(25);
const bcrypt = __importStar(__webpack_require__(28));
const shared_1 = __webpack_require__(11);
const tenant_1 = __webpack_require__(29);
const email_1 = __webpack_require__(32);
const two_factor_service_1 = __webpack_require__(53);
const uuid_1 = __webpack_require__(44);
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    tenantService;
    twoFactorService;
    emailService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwtService, tenantService, twoFactorService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.tenantService = tenantService;
        this.twoFactorService = twoFactorService;
        this.emailService = emailService;
    }
    async buildToken(user) {
        let mustSetupTwoFactor = false;
        if (!user.isTwoFactorEnabled) {
            const setting = await this.prisma.tenantSetting.findUnique({
                where: { key_tenantId: { key: 'twoFactorRequiredRoles', tenantId: user.tenantId } },
            });
            const requiredRoles = setting?.value.split(',').map((r) => r.trim()).filter(Boolean) ?? [];
            mustSetupTwoFactor = requiredRoles.includes(user.role);
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
            ...(mustSetupTwoFactor ? { mustSetupTwoFactor: true } : {}),
        });
        return { token, mustSetupTwoFactor };
    }
    async register(dto, tenantSlug) {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: dto.email },
        });
        if (existingUser)
            throw new common_1.ConflictException('Email already registered');
        if (dto.password.length < 8)
            throw new common_1.BadRequestException('Password must be at least 8 characters');
        if (!/[A-Z]/.test(dto.password))
            throw new common_1.BadRequestException('Password must contain an uppercase letter');
        if (!/[a-z]/.test(dto.password))
            throw new common_1.BadRequestException('Password must contain a lowercase letter');
        if (!/[0-9]/.test(dto.password))
            throw new common_1.BadRequestException('Password must contain a number');
        let tenantId;
        if (dto.tenantSlug) {
            const tenant = await this.tenantService.findBySlug(dto.tenantSlug);
            if (!tenant)
                throw new common_1.BadRequestException('Tenant not found');
            tenantId = tenant.id;
        }
        else if (tenantSlug) {
            const tenant = await this.tenantService.findBySlug(tenantSlug);
            if (!tenant)
                throw new common_1.BadRequestException('Tenant not found');
            tenantId = tenant.id;
        }
        else {
            throw new common_1.BadRequestException('Tenant identifier required');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
                role: 'seller',
                tenantId,
            },
            select: { id: true, email: true, name: true, role: true, tenantId: true, isTwoFactorEnabled: true },
        });
        const { token, mustSetupTwoFactor } = await this.buildToken(user);
        return { user, token, mustSetupTwoFactor };
    }
    async login(dto) {
        const user = await this.prisma.user.findFirst({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (user.isTwoFactorEnabled) {
            return { requires2FA: true, userId: user.id };
        }
        const { token, mustSetupTwoFactor } = await this.buildToken(user);
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token, mustSetupTwoFactor };
    }
    async verify2FA(userId, code) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isCodeValid = await this.twoFactorService.isTwoFactorAuthenticationCodeValid(code, user);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('Wrong authentication code');
        }
        const { token, mustSetupTwoFactor } = await this.buildToken(user);
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token, mustSetupTwoFactor };
    }
    async loginWithGoogle(reqUser) {
        let user = await this.prisma.user.findFirst({
            where: { email: reqUser.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('No account found with this email. Please register first or ask for an invite.');
        }
        user = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                ssoProvider: 'google',
                ssoId: reqUser.ssoId,
                googleRefreshToken: reqUser.refreshToken || user.googleRefreshToken,
            },
        });
        if (user.isTwoFactorEnabled) {
            return { requires2FA: true, userId: user.id };
        }
        const { token, mustSetupTwoFactor } = await this.buildToken(user);
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token, mustSetupTwoFactor };
    }
    async generate2faQr(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const { secret, otpauthUrl } = this.twoFactorService.generateTwoFactorSecret(user);
        await this.prisma.user.update({
            where: { id: userId },
            data: { twoFactorSecret: secret },
        });
        return {
            qrCode: await this.twoFactorService.generateQrCodeDataURL(otpauthUrl),
        };
    }
    async enable2fa(userId, code) {
        await this.twoFactorService.turnOnTwoFactorAuthentication(userId, code);
        const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
        const { token } = await this.buildToken(user);
        return { success: true, token };
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, avatar: true, role: true, tenantId: true, createdAt: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async updateMe(userId, dto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { name: dto.name, avatar: dto.avatar },
            select: { id: true, email: true, name: true, avatar: true, role: true, tenantId: true, createdAt: true },
        });
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isValid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        if (dto.newPassword.length < 8)
            throw new common_1.BadRequestException('Password must be at least 8 characters');
        if (!/[A-Z]/.test(dto.newPassword))
            throw new common_1.BadRequestException('Password must contain an uppercase letter');
        if (!/[a-z]/.test(dto.newPassword))
            throw new common_1.BadRequestException('Password must contain a lowercase letter');
        if (!/[0-9]/.test(dto.newPassword))
            throw new common_1.BadRequestException('Password must contain a number');
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
        return { message: 'Password updated successfully' };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findFirst({
            where: { email: dto.email },
        });
        if (!user)
            return { message: 'If the email exists, a reset link has been sent' };
        const token = (0, uuid_1.v4)();
        const expiresAt = new Date(Date.now() + 3600000);
        await this.prisma.passwordResetToken.create({
            data: { email: dto.email, token, expiresAt },
        });
        try {
            await this.emailService.sendPasswordResetEmail(dto.email, token, user.tenantId);
        }
        catch (err) {
            this.logger.warn(`Failed to send password reset email to ${dto.email}: ${err.message}`);
        }
        return { message: 'If the email exists, a reset link has been sent' };
    }
    async resetPassword(dto) {
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token: dto.token },
        });
        if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        await this.prisma.user.updateMany({
            where: { email: resetToken.email },
            data: { password: hashedPassword },
        });
        await this.prisma.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { used: true },
        });
        return { message: 'Password updated successfully' };
    }
    async portalLogin(dto) {
        const lead = await this.prisma.lead.findFirst({
            where: { email: dto.email, portalPassword: { not: null } },
        });
        if (!lead || !lead.portalPassword)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isValid = await bcrypt.compare(dto.password, lead.portalPassword);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({
            sub: lead.id,
            email: lead.email,
            role: 'portal',
            tenantId: lead.tenantId,
            isPortal: true,
        });
        return { contact: { id: lead.id, name: lead.name, email: lead.email, isPartner: lead.isPartner }, token };
    }
    async togglePortalAccess(leadId, dto, tenantId) {
        const lead = await this.prisma.lead.findFirst({
            where: { id: leadId, tenantId },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        if (dto.enable && dto.password) {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            await this.prisma.lead.update({
                where: { id: leadId },
                data: { portalPassword: hashedPassword },
            });
            return { message: 'Portal access enabled' };
        }
        if (!dto.enable) {
            await this.prisma.lead.update({
                where: { id: leadId },
                data: { portalPassword: null },
            });
            return { message: 'Portal access disabled' };
        }
        return { message: 'No changes made' };
    }
    async changePortalPassword(user, dto) {
        if (!user.isPortal)
            throw new common_1.UnauthorizedException('Not a portal user');
        const lead = await this.prisma.lead.findUnique({
            where: { id: user.id },
            select: { portalPassword: true },
        });
        if (!lead?.portalPassword)
            throw new common_1.BadRequestException('Portal access not configured');
        const isValid = await bcrypt.compare(dto.currentPassword, lead.portalPassword);
        if (!isValid)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.lead.update({
            where: { id: user.id },
            data: { portalPassword: hashedPassword },
        });
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof tenant_1.TenantService !== "undefined" && tenant_1.TenantService) === "function" ? _c : Object, typeof (_d = typeof two_factor_service_1.TwoFactorService !== "undefined" && two_factor_service_1.TwoFactorService) === "function" ? _d : Object, typeof (_e = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _e : Object])
], AuthService);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantService = exports.TenantModule = void 0;
var tenant_module_1 = __webpack_require__(30);
Object.defineProperty(exports, "TenantModule", ({ enumerable: true, get: function () { return tenant_module_1.TenantModule; } }));
var tenant_service_1 = __webpack_require__(31);
Object.defineProperty(exports, "TenantService", ({ enumerable: true, get: function () { return tenant_service_1.TenantService; } }));


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantModule = void 0;
const common_1 = __webpack_require__(2);
const tenant_service_1 = __webpack_require__(31);
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        providers: [tenant_service_1.TenantService],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let TenantService = class TenantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.tenant.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findById(id) {
        const tenant = await this.prisma.tenant.findUnique({ where: { id } });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
        return tenant;
    }
    async findBySlug(slug) {
        return this.prisma.tenant.findUnique({ where: { slug } });
    }
    async findByDomain(domain) {
        return this.prisma.tenant.findUnique({ where: { domain } });
    }
    async create(dto) {
        const slug = dto.slug || dto.name.toLowerCase().replace(/\s+/g, '-');
        return this.prisma.tenant.create({
            data: { name: dto.name, slug, domain: dto.domain },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.tenant.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.tenant.delete({ where: { id } });
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TenantService);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImapService = exports.EmailService = exports.EmailModule = void 0;
var email_module_1 = __webpack_require__(33);
Object.defineProperty(exports, "EmailModule", ({ enumerable: true, get: function () { return email_module_1.EmailModule; } }));
var email_service_1 = __webpack_require__(42);
Object.defineProperty(exports, "EmailService", ({ enumerable: true, get: function () { return email_service_1.EmailService; } }));
var imap_service_1 = __webpack_require__(46);
Object.defineProperty(exports, "ImapService", ({ enumerable: true, get: function () { return imap_service_1.ImapService; } }));


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const email_service_1 = __webpack_require__(42);
const email_controller_1 = __webpack_require__(45);
const imap_service_1 = __webpack_require__(46);
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [email_controller_1.EmailController, email_controller_1.EmailTrackingController],
        providers: [email_service_1.EmailService, imap_service_1.ImapService],
        exports: [email_service_1.EmailService, imap_service_1.ImapService],
    })
], EmailModule);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(36), exports);
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(40), exports);
__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermissionsModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_service_1 = __webpack_require__(36);
const role_permissions_controller_1 = __webpack_require__(37);
const permissions_guard_1 = __webpack_require__(40);
let RolePermissionsModule = class RolePermissionsModule {
};
exports.RolePermissionsModule = RolePermissionsModule;
exports.RolePermissionsModule = RolePermissionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [role_permissions_controller_1.RolePermissionsController],
        providers: [role_permissions_service_1.RolePermissionsService, permissions_guard_1.PermissionsGuard],
        exports: [role_permissions_service_1.RolePermissionsService, permissions_guard_1.PermissionsGuard],
    })
], RolePermissionsModule);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RolePermissionsService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermissionsService = exports.DEFAULT_ROLE_PERMISSIONS = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
exports.DEFAULT_ROLE_PERMISSIONS = {
    admin: ['create', 'read', 'update', 'delete', 'export', 'manage_users', 'manage_settings'],
    seller: ['create', 'read', 'update', 'export'],
    reader: ['read'],
};
let RolePermissionsService = RolePermissionsService_1 = class RolePermissionsService {
    prisma;
    logger = new common_1.Logger(RolePermissionsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
        for (const tenant of tenants) {
            await this.seedDefaultsForTenant(tenant.id);
        }
        if (tenants.length > 0) {
            this.logger.log(`Checked default role permissions for ${tenants.length} tenant(s)`);
        }
    }
    async seedDefaultsForTenant(tenantId) {
        const existing = await this.prisma.rolePermission.count({ where: { tenantId } });
        if (existing > 0)
            return;
        const rows = Object.entries(exports.DEFAULT_ROLE_PERMISSIONS).flatMap(([role, permissions]) => permissions.map((permission) => ({ role: role, permission, tenantId })));
        await this.prisma.rolePermission.createMany({ data: rows, skipDuplicates: true });
    }
    async findAll(tenantId) {
        return this.prisma.rolePermission.findMany({
            where: { tenantId },
            orderBy: [{ role: 'asc' }, { permission: 'asc' }],
        });
    }
    async findByRole(role, tenantId) {
        return this.prisma.rolePermission.findMany({
            where: { role, tenantId },
        });
    }
    async setPermission(role, permission, enabled, tenantId) {
        if (enabled) {
            const existing = await this.prisma.rolePermission.findUnique({
                where: { role_permission_tenantId: { role, permission, tenantId } },
            });
            if (existing)
                return existing;
            return this.prisma.rolePermission.create({ data: { role, permission, tenantId } });
        }
        else {
            await this.prisma.rolePermission.deleteMany({
                where: { role, permission, tenantId },
            });
            return { removed: true };
        }
    }
    async hasPermission(role, permission, tenantId) {
        const count = await this.prisma.rolePermission.count({
            where: { role, permission, tenantId },
        });
        return count > 0;
    }
    async getEffectivePermissions(role, tenantId) {
        const perms = await this.prisma.rolePermission.findMany({
            where: { role, tenantId },
            select: { permission: true },
        });
        return perms.map((p) => p.permission);
    }
};
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = RolePermissionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], RolePermissionsService);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermissionsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const role_permissions_service_1 = __webpack_require__(36);
const set_permission_dto_1 = __webpack_require__(38);
const permissions_guard_1 = __webpack_require__(40);
const require_permission_decorator_1 = __webpack_require__(41);
let RolePermissionsController = class RolePermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(req) {
        return this.service.findAll(req.user.tenantId);
    }
    findByRole(role, req) {
        return this.service.findByRole(role, req.user.tenantId);
    }
    setPermission(body, req) {
        return this.service.setPermission(body.role, body.permission, body.enabled, req.user.tenantId);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findByRole", null);
__decorate([
    (0, common_1.Post)(),
    (0, require_permission_decorator_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof set_permission_dto_1.SetPermissionDto !== "undefined" && set_permission_dto_1.SetPermissionDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "setPermission", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, common_1.Controller)('role-permissions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof role_permissions_service_1.RolePermissionsService !== "undefined" && role_permissions_service_1.RolePermissionsService) === "function" ? _a : Object])
], RolePermissionsController);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetPermissionDto = void 0;
const class_validator_1 = __webpack_require__(39);
class SetPermissionDto {
    role;
    permission;
    enabled;
}
exports.SetPermissionDto = SetPermissionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetPermissionDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetPermissionDto.prototype, "permission", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SetPermissionDto.prototype, "enabled", void 0);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionsGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const role_permissions_service_1 = __webpack_require__(36);
const require_permission_decorator_1 = __webpack_require__(41);
const METHOD_PERMISSION = {
    GET: 'read',
    POST: 'create',
    PATCH: 'update',
    PUT: 'update',
    DELETE: 'delete',
};
let PermissionsGuard = class PermissionsGuard {
    rolePermissions;
    reflector;
    constructor(rolePermissions, reflector) {
        this.rolePermissions = rolePermissions;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.tenantId || !user.role)
            return true;
        if (user.isPortal)
            return true;
        if (user.role === 'superadmin')
            return true;
        const override = this.reflector.get(require_permission_decorator_1.PERMISSION_KEY, context.getHandler());
        const permission = override || METHOD_PERMISSION[request.method] || 'read';
        const allowed = await this.rolePermissions.hasPermission(user.role, permission, user.tenantId);
        if (!allowed) {
            throw new common_1.ForbiddenException(`No tienes permiso para "${permission}"`);
        }
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof role_permissions_service_1.RolePermissionsService !== "undefined" && role_permissions_service_1.RolePermissionsService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], PermissionsGuard);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequirePermission = exports.PERMISSION_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.PERMISSION_KEY = 'permission';
const RequirePermission = (permission) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, permission);
exports.RequirePermission = RequirePermission;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const nodemailer = __importStar(__webpack_require__(43));
const uuid_1 = __webpack_require__(44);
let EmailService = class EmailService {
    prisma;
    trackingUrl;
    constructor(prisma) {
        this.prisma = prisma;
        this.trackingUrl = process.env.TRACKING_URL || 'http://localhost:3000';
    }
    async getSmtpConfig(tenantId) {
        const config = await this.prisma.smtpConfig.findUnique({ where: { tenantId } });
        if (!config)
            throw new common_1.NotFoundException('SMTP not configured');
        return config;
    }
    async upsertSmtpConfig(tenantId, dto) {
        const existing = await this.prisma.smtpConfig.findUnique({ where: { tenantId } });
        const password = dto.password || existing?.password;
        if (!password)
            throw new common_1.BadRequestException('Password is required');
        return this.prisma.smtpConfig.upsert({
            where: { tenantId },
            create: { ...dto, password, tenantId },
            update: { ...dto, password },
        });
    }
    async getTemplates(tenantId) {
        return this.prisma.emailTemplate.findMany({
            where: { OR: [{ tenantId }, { tenantId: null }] },
            orderBy: { name: 'asc' },
        });
    }
    async createTemplate(dto, tenantId) {
        return this.prisma.emailTemplate.create({ data: { ...dto, tenantId } });
    }
    async updateTemplate(id, dto, tenantId) {
        const template = await this.prisma.emailTemplate.findFirst({
            where: { id, OR: [{ tenantId }, { tenantId: null }] },
        });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return this.prisma.emailTemplate.update({ where: { id }, data: dto });
    }
    async sendEmail(dto, tenantId) {
        let body = dto.body;
        let subject = dto.subject;
        if (dto.templateName || dto.templateId) {
            const template = dto.templateId
                ? await this.prisma.emailTemplate.findUnique({ where: { id: dto.templateId } })
                : await this.prisma.emailTemplate.findFirst({
                    where: { name: dto.templateName, OR: [{ tenantId }, { tenantId: null }] },
                });
            if (!template)
                throw new common_1.NotFoundException('Template not found');
            body = template.body;
            subject = template.subject;
            if (dto.templateData) {
                for (const [key, value] of Object.entries(dto.templateData)) {
                    body = body.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
                    subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
                }
            }
        }
        const trackingId = (0, uuid_1.v4)();
        body = body.replace(/href=["'](https?:\/\/[^"']+)["']/gi, (_match, url) => `href="${this.trackingUrl}/email/click/${trackingId}?url=${encodeURIComponent(url)}"`);
        const trackingPixel = `<img src="${this.trackingUrl}/email/track/${trackingId}.png" width="1" height="1" alt="" />`;
        body = body.replace('</body>', `${trackingPixel}</body>`);
        if (!body.includes('</body>'))
            body += trackingPixel;
        const config = await this.getSmtpConfig(tenantId);
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.port === 465,
            auth: { user: config.username, pass: config.password },
        });
        try {
            const info = await transporter.sendMail({
                from: `"${config.fromName}" <${config.fromEmail}>`,
                to: dto.to,
                subject,
                html: body,
            });
            const lead = await this.prisma.lead.findFirst({
                where: { tenantId, email: { equals: dto.to, mode: 'insensitive' } },
            });
            await this.prisma.email.create({
                data: {
                    direction: 'outbound',
                    subject,
                    body: body.substring(0, 5000),
                    fromEmail: config.fromEmail,
                    toEmail: dto.to,
                    leadId: lead?.id,
                    tenantId,
                    trackingId,
                    messageId: info.messageId,
                },
            });
            return { message: 'Email sent successfully', trackingId };
        }
        catch (err) {
            throw new common_1.BadRequestException(`Failed to send email: ${err.message}`);
        }
    }
    async trackOpen(trackingId) {
        await this.prisma.email.updateMany({
            where: { trackingId, openedAt: null },
            data: { openedAt: new Date() },
        });
        const recipient = await this.prisma.campaignRecipient.findUnique({ where: { trackingId } });
        if (recipient && !recipient.opened) {
            await this.prisma.campaignRecipient.update({
                where: { id: recipient.id },
                data: { opened: true, openedAt: new Date() },
            });
            await this.prisma.campaign.update({
                where: { id: recipient.campaignId },
                data: { openedCount: { increment: 1 } },
            });
        }
    }
    async trackClick(trackingId) {
        await this.prisma.email.updateMany({
            where: { trackingId, clickedAt: null },
            data: { clickedAt: new Date() },
        });
        const recipient = await this.prisma.campaignRecipient.findUnique({ where: { trackingId } });
        if (!recipient)
            return;
        if (!recipient.opened) {
            await this.prisma.campaign.update({
                where: { id: recipient.campaignId },
                data: { openedCount: { increment: 1 } },
            });
        }
        if (!recipient.clicked) {
            await this.prisma.campaign.update({
                where: { id: recipient.campaignId },
                data: { clickedCount: { increment: 1 } },
            });
        }
        await this.prisma.campaignRecipient.update({
            where: { id: recipient.id },
            data: {
                opened: true,
                openedAt: recipient.openedAt ?? new Date(),
                clicked: true,
                clickedAt: new Date(),
            },
        });
    }
    async getHistory(tenantId, leadId) {
        const where = { tenantId };
        if (leadId)
            where.leadId = leadId;
        return this.prisma.email.findMany({
            where,
            include: { lead: { select: { id: true, name: true, email: true } } },
            orderBy: { sentAt: 'desc' },
            take: 100,
        });
    }
    async sendPasswordResetEmail(email, token, tenantId) {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
        const subject = 'Recuperación de contraseña';
        const body = `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Restablecer contraseña</a>
      <p>Este enlace expira en 1 hora.</p>
    `;
        if (tenantId) {
            return this.sendEmail({ to: email, subject, body }, tenantId);
        }
        return { message: 'Email not sent (SMTP not configured for reset)' };
    }
    async sendNpsSurveyEmail(email, token, tenantId) {
        const surveyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/nps/${token}`;
        const subject = '¿Cómo fue tu experiencia?';
        const body = `
      <h2>Nos gustaría conocer tu opinión</h2>
      <p>Ayúdanos a mejorar calificando tu experiencia reciente:</p>
      <a href="${surveyUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Responder encuesta</a>
      <p>Solo toma un minuto.</p>
    `;
        if (tenantId) {
            return this.sendEmail({ to: email, subject, body }, tenantId);
        }
        return { message: 'Email not sent (SMTP not configured for NPS survey)' };
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], EmailService);


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailTrackingController = exports.EmailController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const role_permissions_1 = __webpack_require__(34);
const email_service_1 = __webpack_require__(42);
const imap_service_1 = __webpack_require__(46);
const create_smtp_config_dto_1 = __webpack_require__(49);
const create_imap_config_dto_1 = __webpack_require__(50);
const create_template_dto_1 = __webpack_require__(51);
const send_email_dto_1 = __webpack_require__(52);
let EmailController = class EmailController {
    emailService;
    imapService;
    constructor(emailService, imapService) {
        this.emailService = emailService;
        this.imapService = imapService;
    }
    async getConfig(req) {
        const user = req.user;
        const [smtp, imap] = await Promise.all([
            this.emailService.getSmtpConfig(user.tenantId).catch(() => null),
            this.imapService.getConfig(user.tenantId),
        ]);
        return { smtp, imap };
    }
    upsertConfig(dto, req) {
        return this.emailService.upsertSmtpConfig(req.user.tenantId, dto);
    }
    getImapConfig(req) {
        return this.imapService.getConfig(req.user.tenantId);
    }
    upsertImapConfig(dto, req) {
        return this.imapService.upsertConfig(req.user.tenantId, dto);
    }
    syncImap(req) {
        return this.imapService.syncMailbox(req.user.tenantId);
    }
    getTemplates(req) {
        return this.emailService.getTemplates(req.user.tenantId);
    }
    createTemplate(dto, req) {
        return this.emailService.createTemplate(dto, req.user.tenantId);
    }
    updateTemplate(id, dto, req) {
        return this.emailService.updateTemplate(id, dto, req.user.tenantId);
    }
    send(dto, req) {
        return this.emailService.sendEmail(dto, req.user.tenantId);
    }
    getHistory(leadId, req) {
        return this.emailService.getHistory(req.user.tenantId, leadId);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Get)('config'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Put)('config'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_smtp_config_dto_1.CreateSmtpConfigDto !== "undefined" && create_smtp_config_dto_1.CreateSmtpConfigDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "upsertConfig", null);
__decorate([
    (0, common_1.Get)('imap-config'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getImapConfig", null);
__decorate([
    (0, common_1.Put)('imap-config'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_imap_config_dto_1.CreateImapConfigDto !== "undefined" && create_imap_config_dto_1.CreateImapConfigDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "upsertImapConfig", null);
__decorate([
    (0, common_1.Post)('imap-sync'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "syncImap", null);
__decorate([
    (0, common_1.Get)('templates'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('templates'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_template_dto_1.CreateTemplateDto !== "undefined" && create_template_dto_1.CreateTemplateDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof create_template_dto_1.CreateTemplateDto !== "undefined" && create_template_dto_1.CreateTemplateDto) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof send_email_dto_1.SendEmailDto !== "undefined" && send_email_dto_1.SendEmailDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "send", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('leadId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getHistory", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _a : Object, typeof (_b = typeof imap_service_1.ImapService !== "undefined" && imap_service_1.ImapService) === "function" ? _b : Object])
], EmailController);
let EmailTrackingController = class EmailTrackingController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async trackOpen(trackingId, res) {
        await this.emailService.trackOpen(trackingId);
        const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.set('Content-Type', 'image/gif');
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.send(pixel);
    }
    async trackClick(trackingId, url, res) {
        if (!url || !/^https?:\/\//i.test(url)) {
            return res.status(400).send('Invalid url');
        }
        await this.emailService.trackClick(trackingId);
        res.redirect(url);
    }
};
exports.EmailTrackingController = EmailTrackingController;
__decorate([
    (0, common_1.Get)('email/track/:trackingId.png'),
    __param(0, (0, common_1.Param)('trackingId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailTrackingController.prototype, "trackOpen", null);
__decorate([
    (0, common_1.Get)('email/click/:trackingId'),
    __param(0, (0, common_1.Param)('trackingId')),
    __param(1, (0, common_1.Query)('url')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EmailTrackingController.prototype, "trackClick", null);
exports.EmailTrackingController = EmailTrackingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_h = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _h : Object])
], EmailTrackingController);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImapService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImapService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const imapflow_1 = __webpack_require__(47);
const mailparser_1 = __webpack_require__(48);
let ImapService = ImapService_1 = class ImapService {
    prisma;
    logger = new common_1.Logger(ImapService_1.name);
    clients = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertConfig(tenantId, dto) {
        const existing = await this.prisma.imapConfig.findUnique({ where: { tenantId } });
        const password = dto.password || existing?.password;
        if (!password)
            throw new common_1.BadRequestException('Password is required');
        const config = await this.prisma.imapConfig.upsert({
            where: { tenantId },
            create: { ...dto, password, tenantId },
            update: { ...dto, password },
        });
        this.disconnect(tenantId);
        return config;
    }
    async getConfig(tenantId) {
        const config = await this.prisma.imapConfig.findUnique({ where: { tenantId } });
        if (!config)
            return null;
        return config;
    }
    async getClient(tenantId) {
        if (this.clients.has(tenantId))
            return this.clients.get(tenantId);
        const config = await this.getConfig(tenantId);
        if (!config)
            return null;
        const client = new imapflow_1.ImapFlow({
            host: config.host,
            port: config.port,
            secure: config.useTLS,
            auth: { user: config.username, pass: config.password },
            logger: false,
        });
        this.clients.set(tenantId, client);
        return client;
    }
    disconnect(tenantId) {
        const client = this.clients.get(tenantId);
        if (client) {
            try {
                client.close();
            }
            catch { }
            this.clients.delete(tenantId);
        }
    }
    async syncMailbox(tenantId) {
        const client = await this.getClient(tenantId);
        if (!client)
            return 0;
        let synced = 0;
        try {
            await client.connect();
            const lock = await client.getMailboxLock('INBOX');
            try {
                for await (const msg of client.fetch('1:*', { envelope: true, source: true, uid: true })) {
                    const envelope = msg.envelope;
                    if (!envelope)
                        continue;
                    const exists = await this.prisma.email.findFirst({
                        where: { tenantId, messageId: envelope.messageId },
                    });
                    if (exists)
                        continue;
                    const from = envelope.from?.[0]?.address || '';
                    const to = envelope.to?.[0]?.address || '';
                    const subject = envelope.subject || '';
                    const parsed = msg.source ? await (0, mailparser_1.simpleParser)(msg.source) : null;
                    const textBody = parsed?.text || parsed?.html || '';
                    const lead = await this.prisma.lead.findFirst({
                        where: { tenantId, email: { equals: from, mode: 'insensitive' } },
                    });
                    await this.prisma.email.create({
                        data: {
                            direction: 'inbound',
                            subject,
                            body: textBody.substring(0, 10000),
                            fromEmail: from,
                            toEmail: to,
                            leadId: lead?.id,
                            tenantId,
                            messageId: envelope.messageId,
                        },
                    });
                    if (lead) {
                        await this.prisma.activity.create({
                            data: {
                                type: 'email',
                                subject: `Email from ${from}: ${subject}`,
                                description: textBody.substring(0, 500),
                                leadId: lead.id,
                                ownerId: lead.ownerId,
                                tenantId,
                            },
                        });
                    }
                    synced++;
                }
            }
            finally {
                lock.release();
            }
        }
        catch (err) {
            this.logger.error(`IMAP sync error for ${tenantId}: ${err.message}`);
        }
        finally {
            try {
                client.close();
            }
            catch { }
            this.clients.delete(tenantId);
        }
        return synced;
    }
    async syncAll() {
        const configs = await this.prisma.imapConfig.findMany();
        let total = 0;
        for (const cfg of configs) {
            total += await this.syncMailbox(cfg.tenantId);
        }
        return total;
    }
};
exports.ImapService = ImapService;
exports.ImapService = ImapService = ImapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ImapService);


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("imapflow");

/***/ }),
/* 48 */
/***/ ((module) => {

module.exports = require("mailparser");

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSmtpConfigDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateSmtpConfigDto {
    host;
    port = 587;
    username;
    password;
    fromEmail;
    fromName;
}
exports.CreateSmtpConfigDto = CreateSmtpConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSmtpConfigDto.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(65535),
    __metadata("design:type", Number)
], CreateSmtpConfigDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSmtpConfigDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSmtpConfigDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSmtpConfigDto.prototype, "fromEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSmtpConfigDto.prototype, "fromName", void 0);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateImapConfigDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateImapConfigDto {
    host;
    port;
    username;
    password;
    useTLS;
}
exports.CreateImapConfigDto = CreateImapConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImapConfigDto.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateImapConfigDto.prototype, "port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImapConfigDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateImapConfigDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateImapConfigDto.prototype, "useTLS", void 0);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTemplateDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateTemplateDto {
    name;
    subject;
    body;
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "body", void 0);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendEmailDto = void 0;
const class_validator_1 = __webpack_require__(39);
class SendEmailDto {
    to;
    subject;
    body;
    templateName;
    templateId;
    templateData;
}
exports.SendEmailDto = SendEmailDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "templateName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendEmailDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], SendEmailDto.prototype, "templateData", void 0);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorService = void 0;
const common_1 = __webpack_require__(2);
const otplib_1 = __webpack_require__(54);
const qrcode = __importStar(__webpack_require__(55));
const shared_1 = __webpack_require__(11);
let TwoFactorService = class TwoFactorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateTwoFactorSecret(user) {
        const secret = (0, otplib_1.generateSecret)();
        const otpauthUrl = (0, otplib_1.generateURI)({ issuer: 'Conecta', label: user.email, secret });
        return {
            secret,
            otpauthUrl,
        };
    }
    async generateQrCodeDataURL(otpauthUrl) {
        return qrcode.toDataURL(otpauthUrl);
    }
    async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, user) {
        const result = await (0, otplib_1.verify)({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorSecret,
        });
        return result.valid;
    }
    async turnOnTwoFactorAuthentication(userId, code) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const isCodeValid = await this.isTwoFactorAuthenticationCodeValid(code, user);
        if (!isCodeValid) {
            throw new common_1.BadRequestException('Wrong authentication code');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { isTwoFactorEnabled: true },
        });
    }
};
exports.TwoFactorService = TwoFactorService;
exports.TwoFactorService = TwoFactorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TwoFactorService);


/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = require("otplib");

/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("qrcode");

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const google_auth_guard_1 = __webpack_require__(57);
const auth_service_1 = __webpack_require__(27);
const register_dto_1 = __webpack_require__(58);
const login_dto_1 = __webpack_require__(59);
const forgot_password_dto_1 = __webpack_require__(60);
const reset_password_dto_1 = __webpack_require__(61);
const auth_extra_dto_1 = __webpack_require__(62);
const allow_without_two_factor_decorator_1 = __webpack_require__(63);
const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 3600 * 1000,
};
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, req, res) {
        const tenantSlug = req.headers['x-tenant-slug'] || req.headers['x-tenant'];
        const result = await this.authService.register(dto, tenantSlug);
        res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
        return result;
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        if ('token' in result)
            res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
        return result;
    }
    async googleAuth(req) { }
    async googleAuthRedirect(req) {
        return this.authService.loginWithGoogle(req.user);
    }
    async verify2fa(dto, res) {
        const result = await this.authService.verify2FA(dto.userId, dto.code);
        res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
        return result;
    }
    generate2faQr(req) {
        return this.authService.generate2faQr(req.user.id);
    }
    async enable2fa(dto, req, res) {
        const result = await this.authService.enable2fa(req.user.id, dto.code);
        res.cookie('session_token', result.token, SESSION_COOKIE_OPTIONS);
        return result;
    }
    async portalLogin(dto, res) {
        const result = await this.authService.portalLogin(dto);
        res.cookie('portal_session_token', result.token, SESSION_COOKIE_OPTIONS);
        return result;
    }
    logout(res) {
        res.clearCookie('session_token');
        res.clearCookie('portal_session_token');
        return { message: 'Logged out' };
    }
    me(req) {
        return this.authService.me(req.user.id);
    }
    updateMe(dto, req) {
        return this.authService.updateMe(req.user.id, dto);
    }
    changePassword(dto, req) {
        return this.authService.changePassword(req.user.id, dto);
    }
    forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    togglePortalAccess(leadId, dto, req) {
        return this.authService.togglePortalAccess(leadId, dto, req.user.tenantId);
    }
    changePortalPassword(dto, req) {
        return this.authService.changePortalPassword(req.user, dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('2fa/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_extra_dto_1.Verify2faDto !== "undefined" && auth_extra_dto_1.Verify2faDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify2fa", null);
__decorate([
    (0, common_1.Get)('2fa/generate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, allow_without_two_factor_decorator_1.AllowWithoutTwoFactor)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "generate2faQr", null);
__decorate([
    (0, common_1.Post)('2fa/enable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, allow_without_two_factor_decorator_1.AllowWithoutTwoFactor)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_extra_dto_1.Enable2faDto !== "undefined" && auth_extra_dto_1.Enable2faDto) === "function" ? _e : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "enable2fa", null);
__decorate([
    (0, common_1.Post)('portal-login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "portalLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, allow_without_two_factor_decorator_1.AllowWithoutTwoFactor)(),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, allow_without_two_factor_decorator_1.AllowWithoutTwoFactor)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_extra_dto_1.UpdateMeDto !== "undefined" && auth_extra_dto_1.UpdateMeDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof auth_extra_dto_1.ChangePasswordDto !== "undefined" && auth_extra_dto_1.ChangePasswordDto) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof forgot_password_dto_1.ForgotPasswordDto !== "undefined" && forgot_password_dto_1.ForgotPasswordDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof reset_password_dto_1.ResetPasswordDto !== "undefined" && reset_password_dto_1.ResetPasswordDto) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)('leads/:id/portal-access'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof auth_extra_dto_1.TogglePortalAccessDto !== "undefined" && auth_extra_dto_1.TogglePortalAccessDto) === "function" ? _l : Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "togglePortalAccess", null);
__decorate([
    (0, common_1.Post)('portal/change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof auth_extra_dto_1.ChangePortalPasswordDto !== "undefined" && auth_extra_dto_1.ChangePortalPasswordDto) === "function" ? _m : Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePortalPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
let GoogleAuthGuard = class GoogleAuthGuard extends (0, passport_1.AuthGuard)('google') {
    getAuthenticateOptions() {
        return { accessType: 'offline', prompt: 'consent' };
    }
};
exports.GoogleAuthGuard = GoogleAuthGuard;
exports.GoogleAuthGuard = GoogleAuthGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleAuthGuard);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(39);
class RegisterDto {
    email;
    password;
    name;
    tenantSlug;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "tenantSlug", void 0);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(39);
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgotPasswordDto = void 0;
const class_validator_1 = __webpack_require__(39);
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetPasswordDto = void 0;
const class_validator_1 = __webpack_require__(39);
class ResetPasswordDto {
    token;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordDto = exports.UpdateMeDto = exports.ChangePortalPasswordDto = exports.TogglePortalAccessDto = exports.Enable2faDto = exports.Verify2faDto = void 0;
const class_validator_1 = __webpack_require__(39);
class Verify2faDto {
    userId;
    code;
}
exports.Verify2faDto = Verify2faDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Verify2faDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Verify2faDto.prototype, "code", void 0);
class Enable2faDto {
    code;
}
exports.Enable2faDto = Enable2faDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Enable2faDto.prototype, "code", void 0);
class TogglePortalAccessDto {
    password;
    enable;
}
exports.TogglePortalAccessDto = TogglePortalAccessDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TogglePortalAccessDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TogglePortalAccessDto.prototype, "enable", void 0);
class ChangePortalPasswordDto {
    currentPassword;
    newPassword;
}
exports.ChangePortalPasswordDto = ChangePortalPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePortalPasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ChangePortalPasswordDto.prototype, "newPassword", void 0);
class UpdateMeDto {
    name;
    avatar;
}
exports.UpdateMeDto = UpdateMeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMeDto.prototype, "avatar", void 0);
class ChangePasswordDto {
    currentPassword;
    newPassword;
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllowWithoutTwoFactor = exports.ALLOW_WITHOUT_TWO_FACTOR_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.ALLOW_WITHOUT_TWO_FACTOR_KEY = 'allowWithoutTwoFactor';
const AllowWithoutTwoFactor = () => (0, common_1.SetMetadata)(exports.ALLOW_WITHOUT_TWO_FACTOR_KEY, true);
exports.AllowWithoutTwoFactor = AllowWithoutTwoFactor;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const passport_jwt_1 = __webpack_require__(65);
const shared_1 = __webpack_require__(11);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    prisma;
    constructor(prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                passport_jwt_1.ExtractJwt.fromUrlQueryParameter('token'),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret',
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        if (payload.isPortal) {
            const lead = await this.prisma.lead.findUnique({
                where: { id: payload.sub },
                select: { id: true, name: true, email: true, tenantId: true, isPartner: true },
            });
            if (!lead)
                throw new common_1.UnauthorizedException('Lead not found');
            return { ...lead, role: 'portal', isPortal: true };
        }
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true, role: true, tenantId: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return { ...user, mustSetupTwoFactor: payload.mustSetupTwoFactor ?? false };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const passport_google_oauth20_1 = __webpack_require__(67);
const config_1 = __webpack_require__(7);
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    configService;
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID') || 'placeholder_client_id',
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || 'placeholder_client_secret',
            callbackURL: configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:3001/api/auth/google/callback',
            scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar.events'],
        });
        this.configService = configService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails, id } = profile;
        const user = {
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            ssoId: id,
            ssoProvider: 'google',
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(69);
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user?.role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantGuard = void 0;
const common_1 = __webpack_require__(2);
let TenantGuard = class TenantGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const tenantId = request.headers['x-tenant-id'] || request.user?.tenantId;
        if (!tenantId)
            return false;
        request.tenantId = tenantId;
        return true;
    }
};
exports.TenantGuard = TenantGuard;
exports.TenantGuard = TenantGuard = __decorate([
    (0, common_1.Injectable)()
], TenantGuard);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PortalGuard = void 0;
const common_1 = __webpack_require__(2);
let PortalGuard = class PortalGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user?.isPortal) {
            throw new common_1.ForbiddenException('Portal access required');
        }
        return true;
    }
};
exports.PortalGuard = PortalGuard;
exports.PortalGuard = PortalGuard = __decorate([
    (0, common_1.Injectable)()
], PortalGuard);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorSetupGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(25);
const allow_without_two_factor_decorator_1 = __webpack_require__(63);
let TwoFactorSetupGuard = class TwoFactorSetupGuard {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers?.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
        if (!token)
            return true;
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch {
            return true;
        }
        if (!payload?.mustSetupTwoFactor)
            return true;
        const allowed = this.reflector.getAllAndOverride(allow_without_two_factor_decorator_1.ALLOW_WITHOUT_TWO_FACTOR_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (allowed)
            return true;
        throw new common_1.ForbiddenException('You must configure two-factor authentication before continuing');
    }
};
exports.TwoFactorSetupGuard = TwoFactorSetupGuard;
exports.TwoFactorSetupGuard = TwoFactorSetupGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], TwoFactorSetupGuard);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(2);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentTenant = void 0;
const common_1 = __webpack_require__(2);
exports.CurrentTenant = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant = { id: request.user?.tenantId };
    return data ? tenant[data] : tenant;
});


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesService = exports.CompaniesModule = void 0;
var companies_module_1 = __webpack_require__(77);
Object.defineProperty(exports, "CompaniesModule", ({ enumerable: true, get: function () { return companies_module_1.CompaniesModule; } }));
var companies_service_1 = __webpack_require__(78);
Object.defineProperty(exports, "CompaniesService", ({ enumerable: true, get: function () { return companies_service_1.CompaniesService; } }));


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesModule = void 0;
const common_1 = __webpack_require__(2);
const companies_service_1 = __webpack_require__(78);
const companies_controller_1 = __webpack_require__(99);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const role_permissions_1 = __webpack_require__(34);
const tags_1 = __webpack_require__(94);
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule, role_permissions_1.RolePermissionsModule, tags_1.TagsModule],
        controllers: [companies_controller_1.CompaniesController],
        providers: [companies_service_1.CompaniesService],
        exports: [companies_service_1.CompaniesService],
    })
], CompaniesModule);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const tags_1 = __webpack_require__(94);
let CompaniesService = class CompaniesService {
    prisma;
    automation;
    audit;
    tags;
    constructor(prisma, automation, audit, tags) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
        this.tags = tags;
    }
    async create(dto, ownerId, tenantId) {
        const company = await this.prisma.company.create({
            data: { ...dto, ownerId, tenantId },
        });
        await this.audit.log({
            entity: 'company', entityId: company.id, action: 'created',
            changes: { name: dto.name, industry: dto.industry },
            userId: ownerId, tenantId,
        });
        await this.automation.evaluate('company.created', { ...company, entity: 'company', entityId: company.id }, tenantId);
        return company;
    }
    async findAll(query, tenantId) {
        const { search, tagId, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { industry: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (tagId) {
            const entityIds = await this.tags.entityIdsForTag('company', tagId, tenantId);
            where.id = { in: entityIds };
        }
        const [data, total] = await Promise.all([
            this.prisma.company.findMany({
                where,
                include: { owner: { select: { id: true, name: true, email: true } }, _count: { select: { leads: true } } },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.company.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findById(id, tenantId) {
        const company = await this.prisma.company.findFirst({
            where: { id, tenantId },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                leads: { select: { id: true, name: true, email: true, status: true } },
            },
        });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        return company;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const updated = await this.prisma.company.update({ where: { id }, data: dto });
        await this.audit.log({
            entity: 'company', entityId: id, action: 'updated',
            changes: dto, userId: updated.ownerId, tenantId,
        });
        return updated;
    }
    async remove(id, tenantId) {
        const company = await this.findById(id, tenantId);
        await this.audit.log({
            entity: 'company', entityId: id, action: 'deleted',
            changes: { name: company.name },
            userId: company.ownerId, tenantId,
        });
        return this.prisma.company.delete({ where: { id } });
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object, typeof (_d = typeof tags_1.TagsService !== "undefined" && tags_1.TagsService) === "function" ? _d : Object])
], CompaniesService);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationService = exports.AutomationModule = void 0;
var automation_module_1 = __webpack_require__(80);
Object.defineProperty(exports, "AutomationModule", ({ enumerable: true, get: function () { return automation_module_1.AutomationModule; } }));
var automation_service_1 = __webpack_require__(81);
Object.defineProperty(exports, "AutomationService", ({ enumerable: true, get: function () { return automation_service_1.AutomationService; } }));


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationModule = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const role_permissions_1 = __webpack_require__(34);
const automation_service_1 = __webpack_require__(81);
const automation_controller_1 = __webpack_require__(83);
const automation_processor_1 = __webpack_require__(89);
let AutomationModule = class AutomationModule {
};
exports.AutomationModule = AutomationModule;
exports.AutomationModule = AutomationModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule, bullmq_1.BullModule.registerQueue({ name: 'automation' })],
        controllers: [automation_controller_1.AutomationController],
        providers: [automation_service_1.AutomationService, automation_processor_1.AutomationProcessor],
        exports: [automation_service_1.AutomationService],
    })
], AutomationModule);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AutomationService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationService = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const shared_1 = __webpack_require__(11);
const bullmq_2 = __webpack_require__(82);
let AutomationService = AutomationService_1 = class AutomationService {
    prisma;
    automationQueue;
    logger = new common_1.Logger(AutomationService_1.name);
    constructor(prisma, automationQueue) {
        this.prisma = prisma;
        this.automationQueue = automationQueue;
    }
    async create(dto, tenantId) {
        return this.prisma.automation.create({
            data: {
                name: dto.name,
                tenantId,
                nodes: {
                    create: {
                        type: 'trigger',
                        config: { event: dto.event, conditions: [] },
                        positionX: 100,
                        positionY: 100,
                    },
                },
            },
            include: { nodes: true, connections: true },
        });
    }
    async findAll(tenantId) {
        return this.prisma.automation.findMany({
            where: { tenantId },
            include: { nodes: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, tenantId) {
        const automation = await this.prisma.automation.findFirst({
            where: { id, tenantId },
            include: { nodes: true, connections: true },
        });
        if (!automation)
            throw new common_1.NotFoundException('Automation not found');
        return automation;
    }
    async update(id, dto, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.automation.update({ where: { id }, data: dto });
    }
    async remove(id, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.automation.delete({ where: { id } });
    }
    async createNode(automationId, dto, tenantId) {
        await this.findOne(automationId, tenantId);
        return this.prisma.automationNode.create({
            data: {
                automationId,
                type: dto.type,
                actionType: dto.actionType,
                config: dto.config,
                positionX: dto.positionX,
                positionY: dto.positionY,
            },
        });
    }
    async updateNode(automationId, nodeId, dto, tenantId) {
        await this.findOne(automationId, tenantId);
        return this.prisma.automationNode.update({
            where: { id: nodeId },
            data: dto,
        });
    }
    async removeNode(automationId, nodeId, tenantId) {
        await this.findOne(automationId, tenantId);
        return this.prisma.automationNode.delete({ where: { id: nodeId } });
    }
    async createConnection(automationId, dto, tenantId) {
        await this.findOne(automationId, tenantId);
        return this.prisma.automationConnection.create({
            data: {
                automationId,
                sourceNodeId: dto.sourceNodeId,
                targetNodeId: dto.targetNodeId,
                sourceHandle: dto.sourceHandle,
            },
        });
    }
    async removeConnection(automationId, connectionId, tenantId) {
        await this.findOne(automationId, tenantId);
        return this.prisma.automationConnection.deleteMany({ where: { id: connectionId, automationId } });
    }
    async evaluate(event, payload, tenantId) {
        const triggerNodes = await this.prisma.automationNode.findMany({
            where: {
                type: 'trigger',
                automation: { tenantId, active: true },
            },
            include: { automation: true },
        });
        for (const node of triggerNodes) {
            try {
                const config = (node.config || {});
                if (config.event !== event)
                    continue;
                const conditions = (config.conditions || []);
                const meetsConditions = conditions.every((cond) => this.evaluateCondition(cond, payload));
                if (!meetsConditions)
                    continue;
                await this.automationQueue.add('run-node', {
                    automationId: node.automationId,
                    tenantId,
                    nodeId: node.id,
                    payload,
                });
            }
            catch (err) {
                this.logger.error(`Automation "${node.automation.name}" failed to enqueue: ${err}`);
            }
        }
    }
    evaluateCondition(condition, payload) {
        const { field, operator, value } = condition;
        const actual = this.getNestedValue(payload, field);
        switch (operator) {
            case 'equals': return actual === value;
            case 'not_equals': return actual !== value;
            case 'greater_than': return Number(actual) > Number(value);
            case 'less_than': return Number(actual) < Number(value);
            case 'contains': return String(actual).includes(String(value));
            case 'in': return Array.isArray(value) && value.includes(actual);
            default: return true;
        }
    }
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    async executeAction(node, payload, tenantId) {
        const config = node.config || {};
        switch (node.actionType) {
            case 'assign_round_robin':
                await this.handleRoundRobin(payload, tenantId, config);
                break;
            case 'assign_workload':
                await this.handleWorkloadAssignment(payload, tenantId, config);
                break;
            case 'create_task':
                await this.handleCreateTask(payload, tenantId, config);
                break;
            case 'change_stage':
                await this.handleChangeStage(payload, config);
                break;
            case 'notify':
                await this.handleNotify(payload, config);
                break;
            default:
                this.logger.warn(`Unknown action type: ${node.actionType}`);
        }
    }
    async resolveAssignmentPool(tenantId, config) {
        if (config?.teamId) {
            const members = await this.prisma.teamMember.findMany({
                where: { teamId: config.teamId, user: { tenantId } },
                include: { user: { select: { id: true, createdAt: true } } },
                orderBy: { user: { createdAt: 'asc' } },
            });
            return { poolKey: `team:${config.teamId}`, users: members.map((m) => m.user) };
        }
        const role = config?.role || 'seller';
        const users = await this.prisma.user.findMany({
            where: { tenantId, role },
            orderBy: { createdAt: 'asc' },
            select: { id: true, createdAt: true },
        });
        return { poolKey: `role:${role}`, users };
    }
    async assignLead(targetEntity, targetId, assigneeId, tenantId) {
        if (targetEntity === 'lead') {
            await this.prisma.lead.update({
                where: { id: targetId },
                data: { ownerId: assigneeId },
            });
        }
        await this.prisma.auditLog.create({
            data: {
                entity: targetEntity, entityId: targetId, action: 'assigned',
                changes: { assigneeId }, tenantId, userId: assigneeId,
            },
        });
    }
    async handleRoundRobin(payload, tenantId, config) {
        const { poolKey, users } = await this.resolveAssignmentPool(tenantId, config);
        if (users.length === 0)
            return;
        const cursor = await this.prisma.automationAssignmentCursor.findUnique({
            where: { tenantId_poolKey: { tenantId, poolKey } },
        });
        const lastIndex = cursor?.lastUserId
            ? users.findIndex((u) => u.id === cursor.lastUserId)
            : -1;
        const nextIndex = (lastIndex + 1) % users.length;
        const assigneeId = users[nextIndex].id;
        await this.prisma.automationAssignmentCursor.upsert({
            where: { tenantId_poolKey: { tenantId, poolKey } },
            create: { tenantId, poolKey, lastUserId: assigneeId },
            update: { lastUserId: assigneeId },
        });
        await this.assignLead(payload.entity, payload.entityId, assigneeId, tenantId);
    }
    async handleWorkloadAssignment(payload, tenantId, config) {
        const { users } = await this.resolveAssignmentPool(tenantId, config);
        if (users.length === 0)
            return;
        const openStages = await this.prisma.pipelineStage.findMany({
            where: { tenantId, isWon: false, isLost: false },
            select: { name: true },
        });
        const openStageNames = openStages.map((s) => s.name);
        const candidateIds = users.map((u) => u.id);
        const counts = await this.prisma.lead.groupBy({
            by: ['ownerId'],
            where: { tenantId, ownerId: { in: candidateIds }, status: { in: openStageNames } },
            _count: true,
        });
        const countByUser = new Map(counts.map((c) => [c.ownerId, c._count]));
        let assigneeId = candidateIds[0];
        let lowest = countByUser.get(assigneeId) ?? 0;
        for (const id of candidateIds) {
            const count = countByUser.get(id) ?? 0;
            if (count < lowest) {
                lowest = count;
                assigneeId = id;
            }
        }
        await this.assignLead(payload.entity, payload.entityId, assigneeId, tenantId);
    }
    async handleCreateTask(payload, tenantId, config) {
        const leadId = payload?.id || payload?.entityId;
        if (!leadId)
            return;
        const lead = await this.prisma.lead.findUnique({
            where: { id: leadId },
        });
        if (!lead)
            return;
        const title = (config?.title || 'Seguimiento: {{lead.name}}')
            .replace('{{lead.name}}', lead.name);
        await this.prisma.activity.create({
            data: {
                type: 'task',
                subject: title,
                description: config?.description || '',
                dueDate: config?.dueDate ? new Date(config.dueDate) : undefined,
                leadId,
                ownerId: lead.ownerId,
                tenantId,
            },
        });
        await this.prisma.auditLog.create({
            data: {
                entity: 'lead',
                entityId: leadId,
                action: 'task_auto_created',
                tenantId,
                userId: lead.ownerId,
                changes: { title },
            },
        });
    }
    async handleChangeStage(payload, config) {
        const leadId = payload?.id || payload?.entityId;
        if (!leadId || !config?.stage)
            return;
        await this.prisma.lead.update({
            where: { id: leadId },
            data: { status: config.stage },
        });
    }
    async handleNotify(payload, config) {
        if (!config?.userId)
            return;
        await this.prisma.notification.create({
            data: {
                userId: config.userId,
                title: config.title || 'Notificación automática',
                body: config.body || '',
            },
        });
    }
};
exports.AutomationService = AutomationService;
exports.AutomationService = AutomationService = AutomationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('automation')),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _b : Object])
], AutomationService);


/***/ }),
/* 82 */
/***/ ((module) => {

module.exports = require("bullmq");

/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const automation_service_1 = __webpack_require__(81);
const create_automation_dto_1 = __webpack_require__(84);
const update_automation_dto_1 = __webpack_require__(85);
const create_node_dto_1 = __webpack_require__(86);
const update_node_dto_1 = __webpack_require__(87);
const create_connection_dto_1 = __webpack_require__(88);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let AutomationController = class AutomationController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findOne(id, user) {
        return this.service.findOne(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
    createNode(id, dto, user) {
        return this.service.createNode(id, dto, user.tenantId);
    }
    updateNode(id, nodeId, dto, user) {
        return this.service.updateNode(id, nodeId, dto, user.tenantId);
    }
    removeNode(id, nodeId, user) {
        return this.service.removeNode(id, nodeId, user.tenantId);
    }
    createConnection(id, dto, user) {
        return this.service.createConnection(id, dto, user.tenantId);
    }
    removeConnection(id, connectionId, user) {
        return this.service.removeConnection(id, connectionId, user.tenantId);
    }
};
exports.AutomationController = AutomationController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_automation_dto_1.CreateAutomationDto !== "undefined" && create_automation_dto_1.CreateAutomationDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_automation_dto_1.UpdateAutomationDto !== "undefined" && update_automation_dto_1.UpdateAutomationDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/nodes'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_node_dto_1.CreateNodeDto !== "undefined" && create_node_dto_1.CreateNodeDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "createNode", null);
__decorate([
    (0, common_1.Patch)(':id/nodes/:nodeId'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_e = typeof update_node_dto_1.UpdateNodeDto !== "undefined" && update_node_dto_1.UpdateNodeDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "updateNode", null);
__decorate([
    (0, common_1.Delete)(':id/nodes/:nodeId'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('nodeId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "removeNode", null);
__decorate([
    (0, common_1.Post)(':id/connections'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof create_connection_dto_1.CreateConnectionDto !== "undefined" && create_connection_dto_1.CreateConnectionDto) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "createConnection", null);
__decorate([
    (0, common_1.Delete)(':id/connections/:connectionId'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('connectionId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "removeConnection", null);
exports.AutomationController = AutomationController = __decorate([
    (0, common_1.Controller)('automations'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof automation_service_1.AutomationService !== "undefined" && automation_service_1.AutomationService) === "function" ? _a : Object])
], AutomationController);


/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAutomationDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateAutomationDto {
    name;
    event;
}
exports.CreateAutomationDto = CreateAutomationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAutomationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAutomationDto.prototype, "event", void 0);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAutomationDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpdateAutomationDto {
    name;
    active;
}
exports.UpdateAutomationDto = UpdateAutomationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAutomationDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAutomationDto.prototype, "active", void 0);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNodeDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateNodeDto {
    type;
    actionType;
    config;
    positionX;
    positionY;
}
exports.CreateNodeDto = CreateNodeDto;
__decorate([
    (0, class_validator_1.IsIn)(['trigger', 'action', 'wait', 'condition']),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "actionType", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateNodeDto.prototype, "config", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNodeDto.prototype, "positionX", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateNodeDto.prototype, "positionY", void 0);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateNodeDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpdateNodeDto {
    actionType;
    config;
    positionX;
    positionY;
}
exports.UpdateNodeDto = UpdateNodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNodeDto.prototype, "actionType", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], UpdateNodeDto.prototype, "config", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateNodeDto.prototype, "positionX", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateNodeDto.prototype, "positionY", void 0);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateConnectionDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateConnectionDto {
    sourceNodeId;
    targetNodeId;
    sourceHandle;
}
exports.CreateConnectionDto = CreateConnectionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConnectionDto.prototype, "sourceNodeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConnectionDto.prototype, "targetNodeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConnectionDto.prototype, "sourceHandle", void 0);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AutomationProcessor_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationProcessor = void 0;
const bullmq_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const bullmq_2 = __webpack_require__(82);
const shared_1 = __webpack_require__(11);
const automation_service_1 = __webpack_require__(81);
let AutomationProcessor = AutomationProcessor_1 = class AutomationProcessor extends bullmq_1.WorkerHost {
    prisma;
    automationService;
    automationQueue;
    logger = new common_1.Logger(AutomationProcessor_1.name);
    constructor(prisma, automationService, automationQueue) {
        super();
        this.prisma = prisma;
        this.automationService = automationService;
        this.automationQueue = automationQueue;
    }
    async process(job) {
        const { tenantId, nodeId, payload } = job.data;
        const node = await this.prisma.automationNode.findFirst({
            where: { id: nodeId, automation: { tenantId } },
        });
        if (!node) {
            this.logger.warn(`Node ${nodeId} not found for tenant ${tenantId}`);
            return;
        }
        if (node.type === 'action') {
            await this.automationService.executeAction(node, payload, tenantId);
        }
        let connection;
        if (node.type === 'condition') {
            const conditions = (node.config?.conditions || []);
            const meetsConditions = conditions.every((cond) => this.automationService.evaluateCondition(cond, payload));
            connection = await this.prisma.automationConnection.findFirst({
                where: { sourceNodeId: node.id, sourceHandle: meetsConditions ? 'yes' : 'no' },
            });
        }
        else {
            connection = await this.prisma.automationConnection.findFirst({
                where: { sourceNodeId: node.id },
            });
        }
        if (!connection)
            return;
        const nextNode = await this.prisma.automationNode.findUnique({
            where: { id: connection.targetNodeId },
        });
        if (!nextNode)
            return;
        const delay = nextNode.type === 'wait' ? (nextNode.config?.minutes ?? 0) * 60000 : 0;
        await this.automationQueue.add('run-node', { automationId: node.automationId, tenantId, nodeId: nextNode.id, payload }, { delay });
    }
};
exports.AutomationProcessor = AutomationProcessor;
exports.AutomationProcessor = AutomationProcessor = AutomationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('automation'),
    __param(2, (0, bullmq_1.InjectQueue)('automation')),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_service_1.AutomationService !== "undefined" && automation_service_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _c : Object])
], AutomationProcessor);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditService = exports.AuditModule = void 0;
var audit_module_1 = __webpack_require__(91);
Object.defineProperty(exports, "AuditModule", ({ enumerable: true, get: function () { return audit_module_1.AuditModule; } }));
var audit_service_1 = __webpack_require__(92);
Object.defineProperty(exports, "AuditService", ({ enumerable: true, get: function () { return audit_service_1.AuditService; } }));


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const audit_service_1 = __webpack_require__(92);
const audit_controller_1 = __webpack_require__(93);
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [audit_controller_1.AuditController],
        providers: [audit_service_1.AuditService],
        exports: [audit_service_1.AuditService],
    })
], AuditModule);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(params) {
        return this.prisma.auditLog.create({ data: params });
    }
    async findByEntity(entity, entityId, tenantId) {
        return this.prisma.auditLog.findMany({
            where: { entity, entityId, tenantId },
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async findByTenant(tenantId, limit = 50) {
        return this.prisma.auditLog.findMany({
            where: { tenantId },
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    async search(tenantId, filters) {
        const page = filters.page && filters.page > 0 ? filters.page : 1;
        const limit = filters.limit && filters.limit > 0 ? filters.limit : 50;
        const where = { tenantId };
        if (filters.entity)
            where.entity = filters.entity;
        if (filters.action)
            where.action = filters.action;
        if (filters.userId)
            where.userId = filters.userId;
        if (filters.from || filters.to) {
            where.createdAt = {};
            if (filters.from)
                where.createdAt.gte = new Date(filters.from);
            if (filters.to)
                where.createdAt.lte = new Date(filters.to);
        }
        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                include: { user: { select: { id: true, name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { data, total, page, limit };
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], AuditService);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const audit_service_1 = __webpack_require__(92);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let AuditController = class AuditController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(entity, action, userId, from, to, page, limit, user) {
        return this.service.search(user.tenantId, {
            entity,
            action,
            userId,
            from,
            to,
            page: Number(page) || undefined,
            limit: Number(limit) || undefined,
        });
    }
    findByEntity(entity, entityId, user) {
        return this.service.findByEntity(entity, entityId, user.tenantId);
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Get)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Query)('entity')),
    __param(1, (0, common_1.Query)('action')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Query)('from')),
    __param(4, (0, common_1.Query)('to')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __param(7, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':entity/:entityId'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('entityId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "findByEntity", null);
exports.AuditController = AuditController = __decorate([
    (0, common_1.Controller)('audit-logs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _a : Object])
], AuditController);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(95), exports);
__exportStar(__webpack_require__(96), exports);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const tags_service_1 = __webpack_require__(96);
const tags_controller_1 = __webpack_require__(97);
let TagsModule = class TagsModule {
};
exports.TagsModule = TagsModule;
exports.TagsModule = TagsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule],
        controllers: [tags_controller_1.TagsController],
        providers: [tags_service_1.TagsService],
        exports: [tags_service_1.TagsService],
    })
], TagsModule);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.prisma.tag.findMany({ where: { tenantId }, orderBy: { name: 'asc' } });
    }
    async attach(entity, entityId, tagName, tenantId) {
        const name = tagName.trim().toLowerCase();
        if (!name)
            throw new common_1.NotFoundException('Nombre de tag inválido');
        const tag = await this.prisma.tag.upsert({
            where: { name_tenantId: { name, tenantId } },
            create: { name, tenantId },
            update: {},
        });
        const existing = await this.prisma.entityTag.findFirst({
            where: { tagId: tag.id, entity, entityId, tenantId },
        });
        if (existing)
            return { ...existing, tag };
        const entityTag = await this.prisma.entityTag.create({
            data: { tagId: tag.id, entity, entityId, tenantId },
        });
        return { ...entityTag, tag };
    }
    async detach(entityTagId, tenantId) {
        const link = await this.prisma.entityTag.findFirst({ where: { id: entityTagId, tenantId } });
        if (!link)
            throw new common_1.NotFoundException('Etiqueta no encontrada en este registro');
        return this.prisma.entityTag.delete({ where: { id: entityTagId } });
    }
    async findForEntity(entity, entityId, tenantId) {
        return this.prisma.entityTag.findMany({
            where: { entity, entityId, tenantId },
            include: { tag: true },
        });
    }
    async removeTag(tagId, tenantId) {
        const tag = await this.prisma.tag.findFirst({ where: { id: tagId, tenantId } });
        if (!tag)
            throw new common_1.NotFoundException('Tag no encontrado');
        return this.prisma.tag.delete({ where: { id: tagId } });
    }
    async entityIdsForTag(entity, tagId, tenantId) {
        const links = await this.prisma.entityTag.findMany({
            where: { entity, tagId, tenantId },
            select: { entityId: true },
        });
        return links.map((l) => l.entityId);
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TagsService);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const tags_service_1 = __webpack_require__(96);
const attach_tag_dto_1 = __webpack_require__(98);
let TagsController = class TagsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    attach(dto, user) {
        return this.service.attach(dto.entity, dto.entityId, dto.tagName, user.tenantId);
    }
    findForEntity(entity, entityId, user) {
        return this.service.findForEntity(entity, entityId, user.tenantId);
    }
    removeTag(tagId, user) {
        return this.service.removeTag(tagId, user.tenantId);
    }
    detach(entityTagId, user) {
        return this.service.detach(entityTagId, user.tenantId);
    }
};
exports.TagsController = TagsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('attach'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof attach_tag_dto_1.AttachTagDto !== "undefined" && attach_tag_dto_1.AttachTagDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "attach", null);
__decorate([
    (0, common_1.Get)('entity/:entity/:entityId'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('entityId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findForEntity", null);
__decorate([
    (0, common_1.Delete)('tag/:tagId'),
    __param(0, (0, common_1.Param)('tagId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "removeTag", null);
__decorate([
    (0, common_1.Delete)(':entityTagId'),
    __param(0, (0, common_1.Param)('entityTagId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "detach", null);
exports.TagsController = TagsController = __decorate([
    (0, common_1.Controller)('tags'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof tags_service_1.TagsService !== "undefined" && tags_service_1.TagsService) === "function" ? _a : Object])
], TagsController);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttachTagDto = void 0;
const class_validator_1 = __webpack_require__(39);
class AttachTagDto {
    entity;
    entityId;
    tagName;
}
exports.AttachTagDto = AttachTagDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachTagDto.prototype, "entity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachTagDto.prototype, "entityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachTagDto.prototype, "tagName", void 0);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const companies_service_1 = __webpack_require__(78);
const create_company_dto_1 = __webpack_require__(100);
const update_company_dto_1 = __webpack_require__(101);
const query_company_dto_1 = __webpack_require__(103);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let CompaniesController = class CompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    create(dto, user) {
        return this.companiesService.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.companiesService.findAll(query, user.tenantId);
    }
    findOne(id, user) {
        return this.companiesService.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.companiesService.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.companiesService.remove(id, user.tenantId);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_company_dto_1.CreateCompanyDto !== "undefined" && create_company_dto_1.CreateCompanyDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof query_company_dto_1.QueryCompanyDto !== "undefined" && query_company_dto_1.QueryCompanyDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_company_dto_1.UpdateCompanyDto !== "undefined" && update_company_dto_1.UpdateCompanyDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('companies'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_service_1.CompaniesService !== "undefined" && companies_service_1.CompaniesService) === "function" ? _a : Object])
], CompaniesController);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCompanyDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateCompanyDto {
    name;
    industry;
    website;
    phone;
    address;
    ruc;
    customFields;
}
exports.CreateCompanyDto = CreateCompanyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCompanyDto.prototype, "ruc", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateCompanyDto.prototype, "customFields", void 0);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCompanyDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_company_dto_1 = __webpack_require__(100);
class UpdateCompanyDto extends (0, mapped_types_1.PartialType)(create_company_dto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;


/***/ }),
/* 102 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryCompanyDto = void 0;
const class_validator_1 = __webpack_require__(39);
const class_transformer_1 = __webpack_require__(104);
class QueryCompanyDto {
    search;
    tagId;
    page = 1;
    limit = 20;
}
exports.QueryCompanyDto = QueryCompanyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCompanyDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCompanyDto.prototype, "tagId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryCompanyDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryCompanyDto.prototype, "limit", void 0);


/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsService = exports.CustomFieldsModule = void 0;
var custom_fields_module_1 = __webpack_require__(106);
Object.defineProperty(exports, "CustomFieldsModule", ({ enumerable: true, get: function () { return custom_fields_module_1.CustomFieldsModule; } }));
var custom_fields_service_1 = __webpack_require__(107);
Object.defineProperty(exports, "CustomFieldsService", ({ enumerable: true, get: function () { return custom_fields_service_1.CustomFieldsService; } }));


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const custom_fields_service_1 = __webpack_require__(107);
const custom_fields_controller_1 = __webpack_require__(108);
let CustomFieldsModule = class CustomFieldsModule {
};
exports.CustomFieldsModule = CustomFieldsModule;
exports.CustomFieldsModule = CustomFieldsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [custom_fields_controller_1.CustomFieldsController],
        providers: [custom_fields_service_1.CustomFieldsService],
        exports: [custom_fields_service_1.CustomFieldsService],
    })
], CustomFieldsModule);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let CustomFieldsService = class CustomFieldsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        const existing = await this.prisma.customFieldDefinition.findUnique({
            where: { name_entity_tenantId: { name: dto.name, entity: dto.entity, tenantId } },
        });
        if (existing)
            throw new common_1.ConflictException('Field already exists for this entity');
        const count = await this.prisma.customFieldDefinition.count({
            where: { entity: dto.entity, tenantId },
        });
        if (count >= 5)
            throw new common_1.ConflictException('Maximum 5 custom fields per entity');
        return this.prisma.customFieldDefinition.create({
            data: { ...dto, options: dto.options || undefined, tenantId },
        });
    }
    async findAll(entity, tenantId) {
        const where = {};
        if (entity)
            where.entity = entity;
        if (tenantId)
            where.tenantId = tenantId;
        return this.prisma.customFieldDefinition.findMany({
            where,
            orderBy: [{ entity: 'asc' }, { order: 'asc' }],
        });
    }
    async update(id, dto, tenantId) {
        const field = await this.prisma.customFieldDefinition.findFirst({ where: { id, tenantId } });
        if (!field)
            throw new common_1.NotFoundException('Custom field not found');
        return this.prisma.customFieldDefinition.update({ where: { id }, data: dto });
    }
    async remove(id, tenantId) {
        const field = await this.prisma.customFieldDefinition.findFirst({ where: { id, tenantId } });
        if (!field)
            throw new common_1.NotFoundException('Custom field not found');
        return this.prisma.customFieldDefinition.delete({ where: { id } });
    }
};
exports.CustomFieldsService = CustomFieldsService;
exports.CustomFieldsService = CustomFieldsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], CustomFieldsService);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const custom_fields_service_1 = __webpack_require__(107);
const create_custom_field_dto_1 = __webpack_require__(109);
const update_custom_field_dto_1 = __webpack_require__(110);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let CustomFieldsController = class CustomFieldsController {
    customFieldsService;
    constructor(customFieldsService) {
        this.customFieldsService = customFieldsService;
    }
    create(dto, user) {
        return this.customFieldsService.create(dto, user.tenantId);
    }
    findAll(entity, user) {
        return this.customFieldsService.findAll(entity, user.tenantId);
    }
    update(id, dto, user) {
        return this.customFieldsService.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.customFieldsService.remove(id, user.tenantId);
    }
};
exports.CustomFieldsController = CustomFieldsController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_custom_field_dto_1.CreateCustomFieldDto !== "undefined" && create_custom_field_dto_1.CreateCustomFieldDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('entity')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_custom_field_dto_1.UpdateCustomFieldDto !== "undefined" && update_custom_field_dto_1.UpdateCustomFieldDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "remove", null);
exports.CustomFieldsController = CustomFieldsController = __decorate([
    (0, common_1.Controller)('custom-fields'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_fields_service_1.CustomFieldsService !== "undefined" && custom_fields_service_1.CustomFieldsService) === "function" ? _a : Object])
], CustomFieldsController);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCustomFieldDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateCustomFieldDto {
    name;
    label;
    type = 'text';
    entity;
    required;
    options;
    order;
}
exports.CreateCustomFieldDto = CreateCustomFieldDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "entity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCustomFieldDto.prototype, "required", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCustomFieldDto.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCustomFieldDto.prototype, "order", void 0);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCustomFieldDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_custom_field_dto_1 = __webpack_require__(109);
class UpdateCustomFieldDto extends (0, mapped_types_1.PartialType)(create_custom_field_dto_1.CreateCustomFieldDto) {
}
exports.UpdateCustomFieldDto = UpdateCustomFieldDto;


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesService = exports.PipelineStagesModule = void 0;
var pipeline_stages_module_1 = __webpack_require__(112);
Object.defineProperty(exports, "PipelineStagesModule", ({ enumerable: true, get: function () { return pipeline_stages_module_1.PipelineStagesModule; } }));
var pipeline_stages_service_1 = __webpack_require__(113);
Object.defineProperty(exports, "PipelineStagesService", ({ enumerable: true, get: function () { return pipeline_stages_service_1.PipelineStagesService; } }));


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const pipeline_stages_service_1 = __webpack_require__(113);
const pipeline_stages_controller_1 = __webpack_require__(114);
let PipelineStagesModule = class PipelineStagesModule {
};
exports.PipelineStagesModule = PipelineStagesModule;
exports.PipelineStagesModule = PipelineStagesModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [pipeline_stages_controller_1.PipelineStagesController],
        providers: [pipeline_stages_service_1.PipelineStagesService],
        exports: [pipeline_stages_service_1.PipelineStagesService],
    })
], PipelineStagesModule);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let PipelineStagesService = class PipelineStagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        const maxOrder = await this.prisma.pipelineStage.findFirst({
            where: { tenantId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        return this.prisma.pipelineStage.create({
            data: { ...dto, order: dto.order ?? (maxOrder?.order ?? -1) + 1, tenantId },
        });
    }
    async findAll(tenantId) {
        return this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
            include: { subPhases: { orderBy: { order: 'asc' } } },
        });
    }
    async update(id, dto, tenantId) {
        const stage = await this.prisma.pipelineStage.findFirst({ where: { id, tenantId } });
        if (!stage)
            throw new common_1.NotFoundException('Pipeline stage not found');
        return this.prisma.pipelineStage.update({ where: { id }, data: dto });
    }
    async remove(id, tenantId) {
        const stage = await this.prisma.pipelineStage.findFirst({ where: { id, tenantId } });
        if (!stage)
            throw new common_1.NotFoundException('Pipeline stage not found');
        return this.prisma.pipelineStage.delete({ where: { id } });
    }
    async findSubPhases(stageId, tenantId) {
        const stage = await this.prisma.pipelineStage.findFirst({ where: { id: stageId, tenantId } });
        if (!stage)
            throw new common_1.NotFoundException('Pipeline stage not found');
        return this.prisma.pipelineSubPhase.findMany({
            where: { pipelineStageId: stageId, tenantId },
            orderBy: { order: 'asc' },
        });
    }
    async createSubPhase(stageId, dto, tenantId) {
        const stage = await this.prisma.pipelineStage.findFirst({ where: { id: stageId, tenantId } });
        if (!stage)
            throw new common_1.NotFoundException('Pipeline stage not found');
        const maxOrder = await this.prisma.pipelineSubPhase.findFirst({
            where: { pipelineStageId: stageId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        return this.prisma.pipelineSubPhase.create({
            data: { ...dto, order: dto.order ?? (maxOrder?.order ?? -1) + 1, pipelineStageId: stageId, tenantId },
        });
    }
    async updateSubPhase(stageId, id, dto, tenantId) {
        const subPhase = await this.prisma.pipelineSubPhase.findFirst({ where: { id, pipelineStageId: stageId, tenantId } });
        if (!subPhase)
            throw new common_1.NotFoundException('Pipeline sub-phase not found');
        return this.prisma.pipelineSubPhase.update({ where: { id }, data: dto });
    }
    async removeSubPhase(stageId, id, tenantId) {
        const subPhase = await this.prisma.pipelineSubPhase.findFirst({ where: { id, pipelineStageId: stageId, tenantId } });
        if (!subPhase)
            throw new common_1.NotFoundException('Pipeline sub-phase not found');
        return this.prisma.pipelineSubPhase.delete({ where: { id } });
    }
};
exports.PipelineStagesService = PipelineStagesService;
exports.PipelineStagesService = PipelineStagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], PipelineStagesService);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const pipeline_stages_service_1 = __webpack_require__(113);
const create_pipeline_stage_dto_1 = __webpack_require__(115);
const update_pipeline_stage_dto_1 = __webpack_require__(116);
const create_pipeline_sub_phase_dto_1 = __webpack_require__(117);
const update_pipeline_sub_phase_dto_1 = __webpack_require__(118);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let PipelineStagesController = class PipelineStagesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
    findSubPhases(stageId, user) {
        return this.service.findSubPhases(stageId, user.tenantId);
    }
    createSubPhase(stageId, dto, user) {
        return this.service.createSubPhase(stageId, dto, user.tenantId);
    }
    updateSubPhase(stageId, id, dto, user) {
        return this.service.updateSubPhase(stageId, id, dto, user.tenantId);
    }
    removeSubPhase(stageId, id, user) {
        return this.service.removeSubPhase(stageId, id, user.tenantId);
    }
};
exports.PipelineStagesController = PipelineStagesController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_pipeline_stage_dto_1.CreatePipelineStageDto !== "undefined" && create_pipeline_stage_dto_1.CreatePipelineStageDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_pipeline_stage_dto_1.UpdatePipelineStageDto !== "undefined" && update_pipeline_stage_dto_1.UpdatePipelineStageDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':stageId/sub-phases'),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "findSubPhases", null);
__decorate([
    (0, common_1.Post)(':stageId/sub-phases'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_pipeline_sub_phase_dto_1.CreatePipelineSubPhaseDto !== "undefined" && create_pipeline_sub_phase_dto_1.CreatePipelineSubPhaseDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "createSubPhase", null);
__decorate([
    (0, common_1.Patch)(':stageId/sub-phases/:id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_e = typeof update_pipeline_sub_phase_dto_1.UpdatePipelineSubPhaseDto !== "undefined" && update_pipeline_sub_phase_dto_1.UpdatePipelineSubPhaseDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "updateSubPhase", null);
__decorate([
    (0, common_1.Delete)(':stageId/sub-phases/:id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "removeSubPhase", null);
exports.PipelineStagesController = PipelineStagesController = __decorate([
    (0, common_1.Controller)('pipeline-stages'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof pipeline_stages_service_1.PipelineStagesService !== "undefined" && pipeline_stages_service_1.PipelineStagesService) === "function" ? _a : Object])
], PipelineStagesController);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePipelineStageDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreatePipelineStageDto {
    name;
    order;
    color;
    isWon;
    isLost;
    maxLeads;
}
exports.CreatePipelineStageDto = CreatePipelineStageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePipelineStageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePipelineStageDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsHexColor)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePipelineStageDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePipelineStageDto.prototype, "isWon", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePipelineStageDto.prototype, "isLost", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePipelineStageDto.prototype, "maxLeads", void 0);


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePipelineStageDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_pipeline_stage_dto_1 = __webpack_require__(115);
class UpdatePipelineStageDto extends (0, mapped_types_1.PartialType)(create_pipeline_stage_dto_1.CreatePipelineStageDto) {
}
exports.UpdatePipelineStageDto = UpdatePipelineStageDto;


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePipelineSubPhaseDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreatePipelineSubPhaseDto {
    name;
    order;
}
exports.CreatePipelineSubPhaseDto = CreatePipelineSubPhaseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePipelineSubPhaseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePipelineSubPhaseDto.prototype, "order", void 0);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePipelineSubPhaseDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_pipeline_sub_phase_dto_1 = __webpack_require__(117);
class UpdatePipelineSubPhaseDto extends (0, mapped_types_1.PartialType)(create_pipeline_sub_phase_dto_1.CreatePipelineSubPhaseDto) {
}
exports.UpdatePipelineSubPhaseDto = UpdatePipelineSubPhaseDto;


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesService = exports.ActivitiesModule = void 0;
var activities_module_1 = __webpack_require__(120);
Object.defineProperty(exports, "ActivitiesModule", ({ enumerable: true, get: function () { return activities_module_1.ActivitiesModule; } }));
var activities_service_1 = __webpack_require__(121);
Object.defineProperty(exports, "ActivitiesService", ({ enumerable: true, get: function () { return activities_service_1.ActivitiesService; } }));


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const activities_service_1 = __webpack_require__(121);
const activities_controller_1 = __webpack_require__(124);
const google_calendar_service_1 = __webpack_require__(122);
let ActivitiesModule = class ActivitiesModule {
};
exports.ActivitiesModule = ActivitiesModule;
exports.ActivitiesModule = ActivitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [activities_controller_1.ActivitiesController],
        providers: [activities_service_1.ActivitiesService, google_calendar_service_1.GoogleCalendarService],
        exports: [activities_service_1.ActivitiesService],
    })
], ActivitiesModule);


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const google_calendar_service_1 = __webpack_require__(122);
let ActivitiesService = class ActivitiesService {
    prisma;
    googleCalendarService;
    constructor(prisma, googleCalendarService) {
        this.prisma = prisma;
        this.googleCalendarService = googleCalendarService;
    }
    async create(dto, ownerId, tenantId) {
        const activity = await this.prisma.activity.create({
            data: {
                type: dto.type,
                subject: dto.subject,
                description: dto.description,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                done: dto.done,
                leadId: dto.leadId,
                ownerId,
                tenantId,
            },
            include: {
                owner: { select: { id: true, name: true, email: true } },
            },
        });
        if (activity.type === 'meeting') {
            await this.googleCalendarService.syncActivity(activity.id);
        }
        if (dto.reminderMinutesBefore != null && activity.dueDate) {
            await this.prisma.reminder.create({
                data: { activityId: activity.id, userId: ownerId, minutesBefore: dto.reminderMinutesBefore },
            });
        }
        return activity;
    }
    async findAll(filters) {
        const where = { tenantId: filters.tenantId };
        if (filters.leadId)
            where.leadId = filters.leadId;
        if (filters.ownerId)
            where.ownerId = filters.ownerId;
        if (filters.from || filters.to) {
            where.dueDate = {};
            if (filters.from)
                where.dueDate.gte = new Date(filters.from);
            if (filters.to)
                where.dueDate.lte = new Date(filters.to);
        }
        return this.prisma.activity.findMany({
            where,
            include: {
                owner: { select: { id: true, name: true, email: true } },
                lead: { select: { id: true, name: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
    }
    async getCalendar(userId, tenantId, from, to) {
        const start = from ? new Date(from) : new Date();
        const end = to ? new Date(to) : new Date(start.getTime() + 30 * 24 * 3600000);
        const [activities, tasks] = await Promise.all([
            this.prisma.activity.findMany({
                where: {
                    tenantId,
                    ownerId: userId,
                    dueDate: { gte: start, lte: end },
                },
                include: {
                    lead: { select: { id: true, name: true } },
                },
                orderBy: { dueDate: 'asc' },
            }),
            this.prisma.task.findMany({
                where: {
                    tenantId,
                    assigneeId: userId,
                    dueDate: { gte: start, lte: end },
                },
                orderBy: { dueDate: 'asc' },
            }),
        ]);
        const taskEvents = tasks.map((t) => ({
            id: t.id,
            type: 'task',
            subject: t.title,
            dueDate: t.dueDate,
            done: t.status === 'completed',
            isTask: true,
        }));
        return [...activities, ...taskEvents].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    async findById(id, tenantId) {
        const activity = await this.prisma.activity.findFirst({
            where: { id, tenantId },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                lead: { select: { id: true, name: true } },
            },
        });
        if (!activity)
            throw new common_1.NotFoundException('Activity not found');
        return activity;
    }
    async update(id, dto, tenantId, userId) {
        await this.findById(id, tenantId);
        const { reminderMinutesBefore, ...rest } = dto;
        const data = { ...rest };
        if (dto.dueDate)
            data.dueDate = new Date(dto.dueDate);
        const updated = await this.prisma.activity.update({ where: { id }, data });
        if (updated.type === 'meeting') {
            await this.googleCalendarService.syncActivity(updated.id);
        }
        if (reminderMinutesBefore !== undefined) {
            if (reminderMinutesBefore === null) {
                await this.prisma.reminder.deleteMany({ where: { activityId: id, userId } });
            }
            else {
                const existing = await this.prisma.reminder.findFirst({ where: { activityId: id, userId } });
                if (existing) {
                    await this.prisma.reminder.update({
                        where: { id: existing.id },
                        data: { minutesBefore: reminderMinutesBefore, sent: false },
                    });
                }
                else {
                    await this.prisma.reminder.create({
                        data: { activityId: id, userId, minutesBefore: reminderMinutesBefore },
                    });
                }
            }
        }
        return updated;
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.activity.delete({ where: { id } });
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof google_calendar_service_1.GoogleCalendarService !== "undefined" && google_calendar_service_1.GoogleCalendarService) === "function" ? _b : Object])
], ActivitiesService);


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GoogleCalendarService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleCalendarService = void 0;
const common_1 = __webpack_require__(2);
const googleapis_1 = __webpack_require__(123);
const shared_1 = __webpack_require__(11);
let GoogleCalendarService = GoogleCalendarService_1 = class GoogleCalendarService {
    prisma;
    logger = new common_1.Logger(GoogleCalendarService_1.name);
    oauth2Client;
    constructor(prisma) {
        this.prisma = prisma;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID || 'dummy_id', process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret', process.env.GOOGLE_CALLBACK_URL || 'dummy_url');
    }
    async syncActivity(activityId) {
        const activity = await this.prisma.activity.findUnique({
            where: { id: activityId },
            include: { owner: true, lead: true }
        });
        if (!activity || !activity.dueDate || !activity.owner.googleRefreshToken || activity.type !== 'meeting') {
            return;
        }
        try {
            this.oauth2Client.setCredentials({
                refresh_token: activity.owner.googleRefreshToken,
            });
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
            const event = {
                summary: activity.subject,
                description: activity.description || '',
                start: {
                    dateTime: activity.dueDate.toISOString(),
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: new Date(activity.dueDate.getTime() + 60 * 60 * 1000).toISOString(),
                    timeZone: 'UTC',
                },
                attendees: activity.lead?.email ? [{ email: activity.lead.email }] : [],
            };
            if (activity.googleCalendarEventId) {
                await calendar.events.update({
                    calendarId: 'primary',
                    eventId: activity.googleCalendarEventId,
                    requestBody: event,
                });
                this.logger.log(`Updated calendar event ${activity.googleCalendarEventId} for activity ${activityId}`);
            }
            else {
                const response = await calendar.events.insert({
                    calendarId: 'primary',
                    requestBody: event,
                });
                await this.prisma.activity.update({
                    where: { id: activityId },
                    data: { googleCalendarEventId: response.data.id },
                });
                this.logger.log(`Created calendar event ${response.data.id} for activity ${activityId}`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to sync calendar for activity ${activityId}: ${error.message}`);
        }
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = GoogleCalendarService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], GoogleCalendarService);


/***/ }),
/* 123 */
/***/ ((module) => {

module.exports = require("googleapis");

/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const activities_service_1 = __webpack_require__(121);
const create_activity_dto_1 = __webpack_require__(125);
const update_activity_dto_1 = __webpack_require__(126);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
let ActivitiesController = class ActivitiesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(leadId, ownerId, from, to, user) {
        return this.service.findAll({ leadId, ownerId, from, to, tenantId: user.tenantId });
    }
    getCalendar(from, to, user) {
        return this.service.getCalendar(user.id, user.tenantId, from, to);
    }
    findOne(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId, user.id);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_activity_dto_1.CreateActivityDto !== "undefined" && create_activity_dto_1.CreateActivityDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('leadId')),
    __param(1, (0, common_1.Query)('ownerId')),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('calendar'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "getCalendar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_activity_dto_1.UpdateActivityDto !== "undefined" && update_activity_dto_1.UpdateActivityDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "remove", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, common_1.Controller)('activities'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof activities_service_1.ActivitiesService !== "undefined" && activities_service_1.ActivitiesService) === "function" ? _a : Object])
], ActivitiesController);


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateActivityDto = exports.ActivityType = void 0;
const class_validator_1 = __webpack_require__(39);
var ActivityType;
(function (ActivityType) {
    ActivityType["CALL"] = "call";
    ActivityType["MEETING"] = "meeting";
    ActivityType["EMAIL"] = "email";
    ActivityType["NOTE"] = "note";
    ActivityType["TASK"] = "task";
})(ActivityType || (exports.ActivityType = ActivityType = {}));
class CreateActivityDto {
    type;
    subject;
    description;
    dueDate;
    done;
    leadId;
    reminderMinutesBefore;
}
exports.CreateActivityDto = CreateActivityDto;
__decorate([
    (0, class_validator_1.IsEnum)(ActivityType),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateActivityDto.prototype, "done", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "leadId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateActivityDto.prototype, "reminderMinutesBefore", void 0);


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateActivityDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const class_validator_1 = __webpack_require__(39);
const create_activity_dto_1 = __webpack_require__(125);
class UpdateActivityDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_activity_dto_1.CreateActivityDto, ['reminderMinutesBefore'])) {
    reminderMinutesBefore;
}
exports.UpdateActivityDto = UpdateActivityDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateActivityDto.prototype, "reminderMinutesBefore", void 0);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = exports.NotificationsModule = void 0;
var notifications_module_1 = __webpack_require__(128);
Object.defineProperty(exports, "NotificationsModule", ({ enumerable: true, get: function () { return notifications_module_1.NotificationsModule; } }));
var notifications_service_1 = __webpack_require__(129);
Object.defineProperty(exports, "NotificationsService", ({ enumerable: true, get: function () { return notifications_service_1.NotificationsService; } }));


/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsModule = void 0;
const common_1 = __webpack_require__(2);
const notifications_service_1 = __webpack_require__(129);
const notifications_controller_1 = __webpack_require__(130);
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService],
        exports: [notifications_service_1.NotificationsService],
    })
], NotificationsModule);


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, unreadOnly = false) {
        const where = { userId };
        if (unreadOnly)
            where.read = false;
        return this.prisma.notification.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async markAsRead(id, userId) {
        return this.prisma.notification.updateMany({
            where: { id, userId },
            data: { read: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
    }
    async create(data) {
        return this.prisma.notification.create({ data });
    }
    async getUnreadCount(userId) {
        return this.prisma.notification.count({ where: { userId, read: false } });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], NotificationsService);


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const notifications_service_1 = __webpack_require__(129);
const auth_1 = __webpack_require__(23);
let NotificationsController = class NotificationsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(unread, user) {
        return this.service.findAll(user.id, unread === 'true');
    }
    unreadCount(user) {
        return this.service.getUnreadCount(user.id);
    }
    markAsRead(id, user) {
        return this.service.markAsRead(id, user.id);
    }
    markAllAsRead(user) {
        return this.service.markAllAsRead(user.id);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('unread')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "unreadCount", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('read-all'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAllAsRead", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _a : Object])
], NotificationsController);


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsService = exports.CampaignsModule = void 0;
var campaigns_module_1 = __webpack_require__(132);
Object.defineProperty(exports, "CampaignsModule", ({ enumerable: true, get: function () { return campaigns_module_1.CampaignsModule; } }));
var campaigns_service_1 = __webpack_require__(133);
Object.defineProperty(exports, "CampaignsService", ({ enumerable: true, get: function () { return campaigns_service_1.CampaignsService; } }));


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsModule = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const campaigns_service_1 = __webpack_require__(133);
const campaigns_controller_1 = __webpack_require__(134);
const campaign_send_processor_1 = __webpack_require__(136);
const email_1 = __webpack_require__(32);
const role_permissions_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(11);
const notifications_1 = __webpack_require__(127);
let CampaignsModule = class CampaignsModule {
};
exports.CampaignsModule = CampaignsModule;
exports.CampaignsModule = CampaignsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_1.EmailModule,
            role_permissions_1.RolePermissionsModule,
            shared_1.SharedModule,
            notifications_1.NotificationsModule,
            bullmq_1.BullModule.registerQueue({ name: 'campaign-send' }),
        ],
        controllers: [campaigns_controller_1.CampaignsController],
        providers: [campaigns_service_1.CampaignsService, campaign_send_processor_1.CampaignSendProcessor],
        exports: [campaigns_service_1.CampaignsService],
    })
], CampaignsModule);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CampaignsService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsService = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const bullmq_2 = __webpack_require__(82);
const shared_1 = __webpack_require__(11);
const email_1 = __webpack_require__(32);
let CampaignsService = CampaignsService_1 = class CampaignsService {
    prisma;
    emailService;
    campaignSendQueue;
    logger = new common_1.Logger(CampaignsService_1.name);
    constructor(prisma, emailService, campaignSendQueue) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.campaignSendQueue = campaignSendQueue;
    }
    async create(dto, tenantId, userId) {
        const body = dto.templateId
            ? (await this.prisma.emailTemplate.findUnique({ where: { id: dto.templateId } }))?.body || dto.body
            : dto.body;
        const campaign = await this.prisma.campaign.create({
            data: {
                name: dto.name,
                subject: dto.subject,
                body,
                templateId: dto.templateId,
                tenantId,
                createdById: userId,
                status: 'draft',
                totalRecipients: dto.leadIds.length,
                recipients: {
                    create: dto.leadIds.map((leadId) => ({
                        leadId,
                        email: '',
                    })),
                },
            },
            include: { recipients: true },
        });
        const leads = await this.prisma.lead.findMany({
            where: { id: { in: dto.leadIds }, tenantId },
            select: { id: true, email: true },
        });
        const emailMap = new Map(leads.map((l) => [l.id, l.email]));
        for (const recipient of campaign.recipients) {
            const email = emailMap.get(recipient.leadId);
            if (email) {
                await this.prisma.campaignRecipient.update({
                    where: { id: recipient.id },
                    data: { email },
                });
            }
        }
        return campaign;
    }
    async findAll(tenantId, search) {
        const where = { tenantId };
        if (search)
            where.name = { contains: search, mode: 'insensitive' };
        return this.prisma.campaign.findMany({
            where,
            include: { _count: { select: { recipients: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
            include: {
                recipients: {
                    include: { lead: { select: { id: true, name: true, email: true } } },
                },
            },
        });
        if (!campaign)
            throw new common_1.NotFoundException('Campaign not found');
        return campaign;
    }
    async update(id, dto, tenantId) {
        const campaign = await this.findById(id, tenantId);
        if (campaign.status !== 'draft')
            throw new common_1.BadRequestException('Only draft campaigns can be edited');
        const { leadIds, ...rest } = dto;
        if (leadIds) {
            const currentIds = campaign.recipients.map((r) => r.leadId);
            const toRemove = currentIds.filter((lid) => !leadIds.includes(lid));
            const toAdd = leadIds.filter((lid) => !currentIds.includes(lid));
            if (toRemove.length) {
                await this.prisma.campaignRecipient.deleteMany({
                    where: { campaignId: id, leadId: { in: toRemove } },
                });
            }
            if (toAdd.length) {
                const leads = await this.prisma.lead.findMany({
                    where: { id: { in: toAdd }, tenantId },
                    select: { id: true, email: true },
                });
                await this.prisma.campaignRecipient.createMany({
                    data: leads.map((l) => ({ campaignId: id, leadId: l.id, email: l.email || '' })),
                });
            }
            await this.prisma.campaign.update({
                where: { id },
                data: { totalRecipients: leadIds.length },
            });
        }
        return this.prisma.campaign.update({ where: { id }, data: rest });
    }
    async remove(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        if (campaign.status === 'sending')
            throw new common_1.BadRequestException('Cannot delete a campaign while sending');
        await this.prisma.campaignRecipient.deleteMany({ where: { campaignId: id } });
        return this.prisma.campaign.delete({ where: { id } });
    }
    async send(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        if (campaign.status !== 'draft')
            throw new common_1.BadRequestException('Campaign already sent or sending');
        await this.prisma.campaign.update({ where: { id }, data: { status: 'sending' } });
        await this.campaignSendQueue.add('send', { campaignId: id, tenantId });
        return { message: 'Campaña en cola para envío', total: campaign.recipients.length };
    }
    async getStats(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        const opened = campaign.recipients.filter((r) => r.opened).length;
        const clicked = campaign.recipients.filter((r) => r.clicked).length;
        return {
            total: campaign.recipients.length,
            sent: campaign.recipients.filter((r) => r.sent).length,
            opened,
            openRate: campaign.recipients.length ? ((opened / campaign.recipients.length) * 100).toFixed(1) : '0',
            clicked,
            clickRate: campaign.recipients.length ? ((clicked / campaign.recipients.length) * 100).toFixed(1) : '0',
        };
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = CampaignsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('campaign-send')),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _c : Object])
], CampaignsService);


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const campaigns_service_1 = __webpack_require__(133);
const create_campaign_dto_1 = __webpack_require__(135);
const role_permissions_1 = __webpack_require__(34);
let CampaignsController = class CampaignsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId, user.id);
    }
    findAll(search, user) {
        return this.service.findAll(user.tenantId, search);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
    send(id, user) {
        return this.service.send(id, user.tenantId);
    }
    getStats(id, user) {
        return this.service.getStats(id, user.tenantId);
    }
};
exports.CampaignsController = CampaignsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_campaign_dto_1.CreateCampaignDto !== "undefined" && create_campaign_dto_1.CreateCampaignDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_campaign_dto_1.UpdateCampaignDto !== "undefined" && create_campaign_dto_1.UpdateCampaignDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "send", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CampaignsController.prototype, "getStats", null);
exports.CampaignsController = CampaignsController = __decorate([
    (0, common_1.Controller)('campaigns'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof campaigns_service_1.CampaignsService !== "undefined" && campaigns_service_1.CampaignsService) === "function" ? _a : Object])
], CampaignsController);


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCampaignDto = exports.CreateCampaignDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateCampaignDto {
    name;
    subject;
    body;
    templateId;
    leadIds;
    scheduledAt;
}
exports.CreateCampaignDto = CreateCampaignDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCampaignDto.prototype, "leadIds", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "scheduledAt", void 0);
class UpdateCampaignDto {
    name;
    subject;
    body;
    leadIds;
}
exports.UpdateCampaignDto = UpdateCampaignDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCampaignDto.prototype, "leadIds", void 0);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CampaignSendProcessor_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignSendProcessor = void 0;
const bullmq_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const email_1 = __webpack_require__(32);
const notifications_1 = __webpack_require__(127);
let CampaignSendProcessor = CampaignSendProcessor_1 = class CampaignSendProcessor extends bullmq_1.WorkerHost {
    prisma;
    emailService;
    notifications;
    realtime;
    logger = new common_1.Logger(CampaignSendProcessor_1.name);
    constructor(prisma, emailService, notifications, realtime) {
        super();
        this.prisma = prisma;
        this.emailService = emailService;
        this.notifications = notifications;
        this.realtime = realtime;
    }
    async process(job) {
        const { campaignId, tenantId } = job.data;
        const campaign = await this.prisma.campaign.findFirst({
            where: { id: campaignId, tenantId },
            include: { recipients: true },
        });
        if (!campaign) {
            this.logger.warn(`Campaign ${campaignId} not found for tenant ${tenantId}`);
            return;
        }
        let sent = 0;
        for (const recipient of campaign.recipients) {
            try {
                const { trackingId } = await this.emailService.sendEmail({ to: recipient.email, subject: campaign.subject, body: campaign.body }, tenantId);
                await this.prisma.campaignRecipient.update({
                    where: { id: recipient.id },
                    data: { sent: true, sentAt: new Date(), trackingId },
                });
                sent++;
            }
            catch (err) {
                this.logger.error(`Campaign send error for ${recipient.email}: ${err.message}`);
                await this.prisma.campaignRecipient.update({
                    where: { id: recipient.id },
                    data: { error: err.message },
                });
            }
        }
        await this.prisma.campaign.update({
            where: { id: campaignId },
            data: { status: 'sent', sentCount: sent, sentAt: new Date() },
        });
        if (campaign.createdById) {
            const notification = await this.notifications.create({
                userId: campaign.createdById,
                title: 'Campaña enviada',
                body: `Se enviaron ${sent} de ${campaign.recipients.length} correos de "${campaign.name}".`,
                link: `/campaigns/${campaignId}`,
            });
            this.realtime.notifyUser(campaign.createdById, 'notification:new', notification);
        }
    }
};
exports.CampaignSendProcessor = CampaignSendProcessor;
exports.CampaignSendProcessor = CampaignSendProcessor = CampaignSendProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('campaign-send'),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof notifications_1.NotificationsService !== "undefined" && notifications_1.NotificationsService) === "function" ? _c : Object, typeof (_d = typeof shared_1.RealtimeGateway !== "undefined" && shared_1.RealtimeGateway) === "function" ? _d : Object])
], CampaignSendProcessor);


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(138), exports);
__exportStar(__webpack_require__(139), exports);


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketingCampaignsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const marketing_campaigns_service_1 = __webpack_require__(139);
const marketing_campaigns_controller_1 = __webpack_require__(140);
let MarketingCampaignsModule = class MarketingCampaignsModule {
};
exports.MarketingCampaignsModule = MarketingCampaignsModule;
exports.MarketingCampaignsModule = MarketingCampaignsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule],
        controllers: [marketing_campaigns_controller_1.MarketingCampaignsController],
        providers: [marketing_campaigns_service_1.MarketingCampaignsService],
        exports: [marketing_campaigns_service_1.MarketingCampaignsService],
    })
], MarketingCampaignsModule);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketingCampaignsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let MarketingCampaignsService = class MarketingCampaignsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.marketingCampaign.create({
            data: {
                name: dto.name,
                channel: dto.channel,
                budget: dto.budget ?? 0,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
                notes: dto.notes,
                tenantId,
            },
        });
    }
    async findAll(tenantId) {
        const campaigns = await this.prisma.marketingCampaign.findMany({
            where: { tenantId },
            include: { _count: { select: { leads: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return campaigns;
    }
    async findById(id, tenantId) {
        const campaign = await this.prisma.marketingCampaign.findFirst({
            where: { id, tenantId },
            include: { leads: { select: { id: true, name: true, status: true, value: true, currency: true } } },
        });
        if (!campaign)
            throw new common_1.NotFoundException('Marketing campaign not found');
        return campaign;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const data = { ...dto };
        if (dto.startDate)
            data.startDate = new Date(dto.startDate);
        if (dto.endDate)
            data.endDate = new Date(dto.endDate);
        return this.prisma.marketingCampaign.update({ where: { id }, data });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        await this.prisma.lead.updateMany({ where: { campaignId: id }, data: { campaignId: null } });
        return this.prisma.marketingCampaign.delete({ where: { id } });
    }
    async getStats(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        const wonStages = await this.prisma.pipelineStage.findMany({
            where: { tenantId, isWon: true },
            select: { name: true },
        });
        const wonNames = wonStages.map((s) => s.name);
        const wonLeads = campaign.leads.filter((l) => wonNames.includes(l.status));
        const totalValue = wonLeads.reduce((sum, l) => sum + l.value, 0);
        const budget = campaign.budget ?? 0;
        const roi = budget > 0 ? ((totalValue - budget) / budget) * 100 : null;
        return {
            leadsCount: campaign.leads.length,
            wonCount: wonLeads.length,
            totalValueWon: totalValue,
            budget,
            roi,
        };
    }
};
exports.MarketingCampaignsService = MarketingCampaignsService;
exports.MarketingCampaignsService = MarketingCampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], MarketingCampaignsService);


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarketingCampaignsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const marketing_campaigns_service_1 = __webpack_require__(139);
const create_marketing_campaign_dto_1 = __webpack_require__(141);
let MarketingCampaignsController = class MarketingCampaignsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    getStats(id, user) {
        return this.service.getStats(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.MarketingCampaignsController = MarketingCampaignsController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_marketing_campaign_dto_1.CreateMarketingCampaignDto !== "undefined" && create_marketing_campaign_dto_1.CreateMarketingCampaignDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_marketing_campaign_dto_1.UpdateMarketingCampaignDto !== "undefined" && create_marketing_campaign_dto_1.UpdateMarketingCampaignDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MarketingCampaignsController.prototype, "remove", null);
exports.MarketingCampaignsController = MarketingCampaignsController = __decorate([
    (0, common_1.Controller)('marketing-campaigns'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof marketing_campaigns_service_1.MarketingCampaignsService !== "undefined" && marketing_campaigns_service_1.MarketingCampaignsService) === "function" ? _a : Object])
], MarketingCampaignsController);


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMarketingCampaignDto = exports.CreateMarketingCampaignDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateMarketingCampaignDto {
    name;
    channel;
    budget;
    startDate;
    endDate;
    notes;
}
exports.CreateMarketingCampaignDto = CreateMarketingCampaignDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMarketingCampaignDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarketingCampaignDto.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMarketingCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarketingCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarketingCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMarketingCampaignDto.prototype, "notes", void 0);
class UpdateMarketingCampaignDto {
    name;
    channel;
    budget;
    startDate;
    endDate;
    notes;
}
exports.UpdateMarketingCampaignDto = UpdateMarketingCampaignDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarketingCampaignDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarketingCampaignDto.prototype, "channel", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMarketingCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarketingCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarketingCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMarketingCampaignDto.prototype, "notes", void 0);


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(143), exports);
__exportStar(__webpack_require__(144), exports);


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesGoalsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const sales_goals_service_1 = __webpack_require__(144);
const sales_goals_controller_1 = __webpack_require__(145);
let SalesGoalsModule = class SalesGoalsModule {
};
exports.SalesGoalsModule = SalesGoalsModule;
exports.SalesGoalsModule = SalesGoalsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule],
        controllers: [sales_goals_controller_1.SalesGoalsController],
        providers: [sales_goals_service_1.SalesGoalsService],
        exports: [sales_goals_service_1.SalesGoalsService],
    })
], SalesGoalsModule);


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesGoalsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let SalesGoalsService = class SalesGoalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsert(dto, tenantId) {
        return this.prisma.salesGoal.upsert({
            where: { userId_year_month: { userId: dto.userId, year: dto.year, month: dto.month } },
            create: { ...dto, tenantId },
            update: { targetValue: dto.targetValue, targetDeals: dto.targetDeals },
        });
    }
    async remove(id, tenantId) {
        const goal = await this.prisma.salesGoal.findFirst({ where: { id, tenantId } });
        if (!goal)
            throw new common_1.NotFoundException('Meta no encontrada');
        return this.prisma.salesGoal.delete({ where: { id } });
    }
    async findAll(tenantId, year, month) {
        const [users, goals, wonStages] = await Promise.all([
            this.prisma.user.findMany({
                where: { tenantId, role: { in: ['admin', 'seller'] } },
                select: { id: true, name: true },
                orderBy: { name: 'asc' },
            }),
            this.prisma.salesGoal.findMany({ where: { tenantId, year, month } }),
            this.prisma.pipelineStage.findMany({ where: { tenantId, isWon: true }, select: { name: true } }),
        ]);
        const wonNames = wonStages.map((s) => s.name);
        const periodStart = new Date(year, month - 1, 1);
        const periodEnd = new Date(year, month, 1);
        const progress = await this.prisma.lead.groupBy({
            by: ['ownerId'],
            where: {
                tenantId,
                status: { in: wonNames },
                updatedAt: { gte: periodStart, lt: periodEnd },
            },
            _sum: { value: true },
            _count: { _all: true },
        });
        const progressByUser = new Map(progress.map((p) => [p.ownerId, p]));
        const goalsByUser = new Map(goals.map((g) => [g.userId, g]));
        return users.map((user) => {
            const goal = goalsByUser.get(user.id);
            const prog = progressByUser.get(user.id);
            const actualValue = prog?._sum.value ?? 0;
            const actualDeals = prog?._count._all ?? 0;
            const targetValue = goal?.targetValue ?? 0;
            return {
                userId: user.id,
                userName: user.name,
                goalId: goal?.id ?? null,
                targetValue,
                targetDeals: goal?.targetDeals ?? null,
                actualValue,
                actualDeals,
                progressPercent: targetValue > 0 ? Math.min(100, Math.round((actualValue / targetValue) * 100)) : null,
            };
        });
    }
};
exports.SalesGoalsService = SalesGoalsService;
exports.SalesGoalsService = SalesGoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], SalesGoalsService);


/***/ }),
/* 145 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SalesGoalsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const sales_goals_service_1 = __webpack_require__(144);
const create_sales_goal_dto_1 = __webpack_require__(146);
let SalesGoalsController = class SalesGoalsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(year, month, user) {
        const now = new Date();
        const y = year ? parseInt(year, 10) : now.getFullYear();
        const m = month ? parseInt(month, 10) : now.getMonth() + 1;
        return this.service.findAll(user.tenantId, y, m);
    }
    upsert(dto, user) {
        return this.service.upsert(dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.SalesGoalsController = SalesGoalsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('year')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], SalesGoalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_sales_goal_dto_1.UpsertSalesGoalDto !== "undefined" && create_sales_goal_dto_1.UpsertSalesGoalDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], SalesGoalsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesGoalsController.prototype, "remove", null);
exports.SalesGoalsController = SalesGoalsController = __decorate([
    (0, common_1.Controller)('sales-goals'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof sales_goals_service_1.SalesGoalsService !== "undefined" && sales_goals_service_1.SalesGoalsService) === "function" ? _a : Object])
], SalesGoalsController);


/***/ }),
/* 146 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpsertSalesGoalDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpsertSalesGoalDto {
    userId;
    year;
    month;
    targetValue;
    targetDeals;
}
exports.UpsertSalesGoalDto = UpsertSalesGoalDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertSalesGoalDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2020),
    __metadata("design:type", Number)
], UpsertSalesGoalDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], UpsertSalesGoalDto.prototype, "month", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpsertSalesGoalDto.prototype, "targetValue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpsertSalesGoalDto.prototype, "targetDeals", void 0);


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(148), exports);
__exportStar(__webpack_require__(153), exports);


/***/ }),
/* 148 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommissionsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const tenant_settings_1 = __webpack_require__(149);
const commissions_service_1 = __webpack_require__(153);
const commissions_controller_1 = __webpack_require__(154);
let CommissionsModule = class CommissionsModule {
};
exports.CommissionsModule = CommissionsModule;
exports.CommissionsModule = CommissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule, tenant_settings_1.TenantSettingsModule],
        controllers: [commissions_controller_1.CommissionsController],
        providers: [commissions_service_1.CommissionsService],
        exports: [commissions_service_1.CommissionsService],
    })
], CommissionsModule);


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsService = exports.TenantSettingsModule = void 0;
var tenant_settings_module_1 = __webpack_require__(150);
Object.defineProperty(exports, "TenantSettingsModule", ({ enumerable: true, get: function () { return tenant_settings_module_1.TenantSettingsModule; } }));
var tenant_settings_service_1 = __webpack_require__(151);
Object.defineProperty(exports, "TenantSettingsService", ({ enumerable: true, get: function () { return tenant_settings_service_1.TenantSettingsService; } }));


/***/ }),
/* 150 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsModule = void 0;
const common_1 = __webpack_require__(2);
const tenant_settings_service_1 = __webpack_require__(151);
const tenant_settings_controller_1 = __webpack_require__(152);
const role_permissions_1 = __webpack_require__(34);
let TenantSettingsModule = class TenantSettingsModule {
};
exports.TenantSettingsModule = TenantSettingsModule;
exports.TenantSettingsModule = TenantSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [tenant_settings_controller_1.TenantSettingsController],
        providers: [tenant_settings_service_1.TenantSettingsService],
        exports: [tenant_settings_service_1.TenantSettingsService],
    })
], TenantSettingsModule);


/***/ }),
/* 151 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let TenantSettingsService = class TenantSettingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(tenantId) {
        const settings = await this.prisma.tenantSetting.findMany({ where: { tenantId } });
        const result = {};
        for (const s of settings)
            result[s.key] = s.value;
        return result;
    }
    async set(key, value, tenantId) {
        return this.prisma.tenantSetting.upsert({
            where: { key_tenantId: { key, tenantId } },
            create: { key, value, tenantId },
            update: { value },
        });
    }
    async setBulk(settings, tenantId) {
        for (const [key, value] of Object.entries(settings)) {
            await this.set(key, value, tenantId);
        }
        return this.get(tenantId);
    }
};
exports.TenantSettingsService = TenantSettingsService;
exports.TenantSettingsService = TenantSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TenantSettingsService);


/***/ }),
/* 152 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const tenant_settings_service_1 = __webpack_require__(151);
const role_permissions_1 = __webpack_require__(34);
let TenantSettingsController = class TenantSettingsController {
    service;
    constructor(service) {
        this.service = service;
    }
    get(user) {
        return this.service.get(user.tenantId);
    }
    update(settings, user) {
        return this.service.setBulk(settings, user.tenantId);
    }
};
exports.TenantSettingsController = TenantSettingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantSettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: false }))),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TenantSettingsController.prototype, "update", null);
exports.TenantSettingsController = TenantSettingsController = __decorate([
    (0, common_1.Controller)('tenant-settings'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_settings_service_1.TenantSettingsService !== "undefined" && tenant_settings_service_1.TenantSettingsService) === "function" ? _a : Object])
], TenantSettingsController);


/***/ }),
/* 153 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommissionsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const tenant_settings_1 = __webpack_require__(149);
const DEFAULT_RATE_KEY = 'commission_default_rate';
let CommissionsService = class CommissionsService {
    prisma;
    tenantSettings;
    constructor(prisma, tenantSettings) {
        this.prisma = prisma;
        this.tenantSettings = tenantSettings;
    }
    async resolveRate(userId, tenantId) {
        const user = await this.prisma.user.findFirst({ where: { id: userId, tenantId } });
        if (user?.commissionRate != null)
            return user.commissionRate;
        const settings = await this.tenantSettings.get(tenantId);
        const defaultRate = settings[DEFAULT_RATE_KEY];
        return defaultRate ? parseFloat(defaultRate) : 0;
    }
    async calculateForQuote(quote, tenantId) {
        const rate = await this.resolveRate(quote.createdById, tenantId);
        const amount = (quote.grandTotal * rate) / 100;
        return this.prisma.commissionEntry.upsert({
            where: { quoteId: quote.id },
            create: {
                tenantId,
                userId: quote.createdById,
                quoteId: quote.id,
                baseAmount: quote.grandTotal,
                rate,
                amount,
            },
            update: {
                baseAmount: quote.grandTotal,
                rate,
                amount,
            },
        });
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters.userId)
            where.userId = filters.userId;
        if (filters.status)
            where.status = filters.status;
        if (filters.year && filters.month) {
            where.createdAt = {
                gte: new Date(filters.year, filters.month - 1, 1),
                lt: new Date(filters.year, filters.month, 1),
            };
        }
        return this.prisma.commissionEntry.findMany({
            where,
            include: {
                user: { select: { id: true, name: true } },
                quote: { select: { id: true, number: true, grandTotal: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async markPaid(id, tenantId) {
        const entry = await this.prisma.commissionEntry.findFirst({ where: { id, tenantId } });
        if (!entry)
            throw new common_1.NotFoundException('Comisión no encontrada');
        return this.prisma.commissionEntry.update({
            where: { id },
            data: { status: 'paid', paidAt: new Date() },
        });
    }
    async getRates(tenantId) {
        const [settings, users] = await Promise.all([
            this.tenantSettings.get(tenantId),
            this.prisma.user.findMany({
                where: { tenantId, role: { in: ['admin', 'seller'] } },
                select: { id: true, name: true, commissionRate: true },
                orderBy: { name: 'asc' },
            }),
        ]);
        const defaultRate = settings[DEFAULT_RATE_KEY] ? parseFloat(settings[DEFAULT_RATE_KEY]) : 0;
        return { defaultRate, users };
    }
    async setDefaultRate(rate, tenantId) {
        await this.tenantSettings.set(DEFAULT_RATE_KEY, String(rate), tenantId);
        return this.getRates(tenantId);
    }
    async setUserRate(userId, rate, tenantId) {
        const user = await this.prisma.user.findFirst({ where: { id: userId, tenantId } });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return this.prisma.user.update({
            where: { id: userId },
            data: { commissionRate: rate },
            select: { id: true, name: true, commissionRate: true },
        });
    }
};
exports.CommissionsService = CommissionsService;
exports.CommissionsService = CommissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof tenant_settings_1.TenantSettingsService !== "undefined" && tenant_settings_1.TenantSettingsService) === "function" ? _b : Object])
], CommissionsService);


/***/ }),
/* 154 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommissionsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const commissions_service_1 = __webpack_require__(153);
const set_rate_dto_1 = __webpack_require__(155);
let CommissionsController = class CommissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(userId, year, month, status, user) {
        return this.service.findAll(user.tenantId, {
            userId: userId || undefined,
            year: year ? parseInt(year, 10) : undefined,
            month: month ? parseInt(month, 10) : undefined,
            status: status || undefined,
        });
    }
    getRates(user) {
        return this.service.getRates(user.tenantId);
    }
    setDefaultRate(dto, user) {
        return this.service.setDefaultRate(dto.rate, user.tenantId);
    }
    setUserRate(userId, dto, user) {
        return this.service.setUserRate(userId, dto.rate, user.tenantId);
    }
    markPaid(id, user) {
        return this.service.markPaid(id, user.tenantId);
    }
};
exports.CommissionsController = CommissionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('month')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('rates'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "getRates", null);
__decorate([
    (0, common_1.Patch)('rates/default'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof set_rate_dto_1.SetDefaultRateDto !== "undefined" && set_rate_dto_1.SetDefaultRateDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "setDefaultRate", null);
__decorate([
    (0, common_1.Patch)('rates/:userId'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof set_rate_dto_1.SetUserRateDto !== "undefined" && set_rate_dto_1.SetUserRateDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "setUserRate", null);
__decorate([
    (0, common_1.Patch)(':id/pay'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommissionsController.prototype, "markPaid", null);
exports.CommissionsController = CommissionsController = __decorate([
    (0, common_1.Controller)('commissions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof commissions_service_1.CommissionsService !== "undefined" && commissions_service_1.CommissionsService) === "function" ? _a : Object])
], CommissionsController);


/***/ }),
/* 155 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetUserRateDto = exports.SetDefaultRateDto = void 0;
const class_validator_1 = __webpack_require__(39);
class SetDefaultRateDto {
    rate;
}
exports.SetDefaultRateDto = SetDefaultRateDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SetDefaultRateDto.prototype, "rate", void 0);
class SetUserRateDto {
    rate;
}
exports.SetUserRateDto = SetUserRateDto;
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.rate !== null),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], SetUserRateDto.prototype, "rate", void 0);


/***/ }),
/* 156 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(157), exports);
__exportStar(__webpack_require__(158), exports);


/***/ }),
/* 157 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReferralsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const tenant_settings_1 = __webpack_require__(149);
const referrals_service_1 = __webpack_require__(158);
const referrals_controller_1 = __webpack_require__(159);
let ReferralsModule = class ReferralsModule {
};
exports.ReferralsModule = ReferralsModule;
exports.ReferralsModule = ReferralsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule, tenant_settings_1.TenantSettingsModule],
        controllers: [referrals_controller_1.ReferralsController],
        providers: [referrals_service_1.ReferralsService],
        exports: [referrals_service_1.ReferralsService],
    })
], ReferralsModule);


/***/ }),
/* 158 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReferralsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const tenant_settings_1 = __webpack_require__(149);
const RATE_KEY = 'referral_reward_rate';
let ReferralsService = class ReferralsService {
    prisma;
    tenantSettings;
    constructor(prisma, tenantSettings) {
        this.prisma = prisma;
        this.tenantSettings = tenantSettings;
    }
    async getRate(tenantId) {
        const settings = await this.tenantSettings.get(tenantId);
        return settings[RATE_KEY] ? parseFloat(settings[RATE_KEY]) : 0;
    }
    async setRate(rate, tenantId) {
        await this.tenantSettings.set(RATE_KEY, String(rate), tenantId);
        return { rate };
    }
    async calculateForQuote(quote, tenantId) {
        if (!quote.leadId)
            return null;
        const lead = await this.prisma.lead.findFirst({ where: { id: quote.leadId, tenantId } });
        if (!lead?.referredByLeadId)
            return null;
        const rate = await this.getRate(tenantId);
        const amount = (quote.grandTotal * rate) / 100;
        return this.prisma.referralReward.upsert({
            where: { quoteId: quote.id },
            create: {
                tenantId,
                referrerLeadId: lead.referredByLeadId,
                referredLeadId: lead.id,
                quoteId: quote.id,
                baseAmount: quote.grandTotal,
                rate,
                amount,
            },
            update: {
                baseAmount: quote.grandTotal,
                rate,
                amount,
            },
        });
    }
    async findAll(tenantId, filters) {
        const where = { tenantId };
        if (filters.referrerLeadId)
            where.referrerLeadId = filters.referrerLeadId;
        if (filters.status)
            where.status = filters.status;
        if (filters.year && filters.month) {
            where.createdAt = {
                gte: new Date(filters.year, filters.month - 1, 1),
                lt: new Date(filters.year, filters.month, 1),
            };
        }
        return this.prisma.referralReward.findMany({
            where,
            include: {
                referrerLead: { select: { id: true, name: true } },
                referredLead: { select: { id: true, name: true } },
                quote: { select: { id: true, number: true, grandTotal: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async markPaid(id, tenantId) {
        const entry = await this.prisma.referralReward.findFirst({ where: { id, tenantId } });
        if (!entry)
            throw new common_1.NotFoundException('Recompensa no encontrada');
        return this.prisma.referralReward.update({
            where: { id },
            data: { status: 'paid', paidAt: new Date() },
        });
    }
};
exports.ReferralsService = ReferralsService;
exports.ReferralsService = ReferralsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof tenant_settings_1.TenantSettingsService !== "undefined" && tenant_settings_1.TenantSettingsService) === "function" ? _b : Object])
], ReferralsService);


/***/ }),
/* 159 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReferralsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const referrals_service_1 = __webpack_require__(158);
const set_rate_dto_1 = __webpack_require__(160);
let ReferralsController = class ReferralsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(referrerLeadId, year, month, status, user) {
        return this.service.findAll(user.tenantId, {
            referrerLeadId: user?.isPortal ? user.id : (referrerLeadId || undefined),
            year: year ? parseInt(year, 10) : undefined,
            month: month ? parseInt(month, 10) : undefined,
            status: status || undefined,
        });
    }
    async getRate(user) {
        const rate = await this.service.getRate(user.tenantId);
        return { rate };
    }
    setRate(dto, user) {
        return this.service.setRate(dto.rate, user.tenantId);
    }
    markPaid(id, user) {
        return this.service.markPaid(id, user.tenantId);
    }
};
exports.ReferralsController = ReferralsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('referrerLeadId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('month')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], ReferralsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('rate'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReferralsController.prototype, "getRate", null);
__decorate([
    (0, common_1.Patch)('rate'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof set_rate_dto_1.SetReferralRateDto !== "undefined" && set_rate_dto_1.SetReferralRateDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ReferralsController.prototype, "setRate", null);
__decorate([
    (0, common_1.Patch)(':id/pay'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReferralsController.prototype, "markPaid", null);
exports.ReferralsController = ReferralsController = __decorate([
    (0, common_1.Controller)('referrals'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof referrals_service_1.ReferralsService !== "undefined" && referrals_service_1.ReferralsService) === "function" ? _a : Object])
], ReferralsController);


/***/ }),
/* 160 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetReferralRateDto = void 0;
const class_validator_1 = __webpack_require__(39);
class SetReferralRateDto {
    rate;
}
exports.SetReferralRateDto = SetReferralRateDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SetReferralRateDto.prototype, "rate", void 0);


/***/ }),
/* 161 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(162), exports);
__exportStar(__webpack_require__(163), exports);


/***/ }),
/* 162 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedViewsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const saved_views_service_1 = __webpack_require__(163);
const saved_views_controller_1 = __webpack_require__(164);
let SavedViewsModule = class SavedViewsModule {
};
exports.SavedViewsModule = SavedViewsModule;
exports.SavedViewsModule = SavedViewsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule],
        controllers: [saved_views_controller_1.SavedViewsController],
        providers: [saved_views_service_1.SavedViewsService],
        exports: [saved_views_service_1.SavedViewsService],
    })
], SavedViewsModule);


/***/ }),
/* 163 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedViewsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let SavedViewsService = class SavedViewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(entity, userId, tenantId) {
        return this.prisma.savedView.findMany({
            where: { entity, userId, tenantId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto, userId, tenantId) {
        return this.prisma.savedView.upsert({
            where: { userId_entity_name: { userId, entity: dto.entity, name: dto.name } },
            create: { entity: dto.entity, name: dto.name, filters: dto.filters, userId, tenantId },
            update: { filters: dto.filters },
        });
    }
    async remove(id, userId, tenantId) {
        const view = await this.prisma.savedView.findFirst({ where: { id, userId, tenantId } });
        if (!view)
            throw new common_1.NotFoundException('Vista no encontrada');
        return this.prisma.savedView.delete({ where: { id } });
    }
};
exports.SavedViewsService = SavedViewsService;
exports.SavedViewsService = SavedViewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], SavedViewsService);


/***/ }),
/* 164 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedViewsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const saved_views_service_1 = __webpack_require__(163);
const create_saved_view_dto_1 = __webpack_require__(165);
let SavedViewsController = class SavedViewsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(entity, user) {
        return this.service.findAll(entity, user.id, user.tenantId);
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.id, user.tenantId);
    }
};
exports.SavedViewsController = SavedViewsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('entity')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SavedViewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_saved_view_dto_1.CreateSavedViewDto !== "undefined" && create_saved_view_dto_1.CreateSavedViewDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], SavedViewsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SavedViewsController.prototype, "remove", null);
exports.SavedViewsController = SavedViewsController = __decorate([
    (0, common_1.Controller)('saved-views'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof saved_views_service_1.SavedViewsService !== "undefined" && saved_views_service_1.SavedViewsService) === "function" ? _a : Object])
], SavedViewsController);


/***/ }),
/* 165 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSavedViewDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateSavedViewDto {
    entity;
    name;
    filters;
}
exports.CreateSavedViewDto = CreateSavedViewDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSavedViewDto.prototype, "entity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSavedViewDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateSavedViewDto.prototype, "filters", void 0);


/***/ }),
/* 166 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(167), exports);
__exportStar(__webpack_require__(169), exports);
__exportStar(__webpack_require__(168), exports);


/***/ }),
/* 167 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicingModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const nubefact_service_1 = __webpack_require__(168);
const invoicing_service_1 = __webpack_require__(169);
const invoicing_controller_1 = __webpack_require__(170);
let InvoicingModule = class InvoicingModule {
};
exports.InvoicingModule = InvoicingModule;
exports.InvoicingModule = InvoicingModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule],
        controllers: [invoicing_controller_1.InvoicingController],
        providers: [nubefact_service_1.NubefactService, invoicing_service_1.InvoicingService],
        exports: [invoicing_service_1.InvoicingService, nubefact_service_1.NubefactService],
    })
], InvoicingModule);


/***/ }),
/* 168 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NubefactService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NubefactService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const NUBEFACT_URL_PROD = 'https://api.nubefact.com/api/v1';
const NUBEFACT_URL_SANDBOX = 'https://demo-facturacion.nubefact.com/api/v1';
let NubefactService = NubefactService_1 = class NubefactService {
    prisma;
    logger = new common_1.Logger(NubefactService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getConfig(tenantId) {
        return this.prisma.nubefactConfig.findUnique({ where: { tenantId } });
    }
    async setConfig(dto, tenantId) {
        const existing = await this.getConfig(tenantId);
        if (!existing && !dto.token) {
            throw new common_1.BadRequestException('El token de Nubefact es requerido la primera vez');
        }
        const data = {
            ruc: dto.ruc,
            serieFactura: dto.serieFactura ?? 'F001',
            serieBoleta: dto.serieBoleta ?? 'B001',
            sandbox: dto.sandbox ?? true,
        };
        if (dto.token)
            data.token = dto.token;
        return this.prisma.nubefactConfig.upsert({
            where: { tenantId },
            create: { ...data, ruc: dto.ruc, token: dto.token, tenantId },
            update: data,
        });
    }
    async issueInvoice(invoiceId, tenantId) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id: invoiceId, tenantId },
            include: {
                subscription: { include: { contract: { include: { lead: { include: { account: true } } } } } },
                quote: { include: { lead: { include: { account: true } }, items: true } },
            },
        });
        if (!invoice)
            return;
        const config = await this.getConfig(tenantId);
        if (!config) {
            await this.prisma.invoice.update({ where: { id: invoice.id }, data: { fiscalStatus: 'not_configured' } });
            return;
        }
        const lead = invoice.subscription?.contract?.lead ?? invoice.quote?.lead;
        const company = lead?.account;
        const isFactura = invoice.docType === 'factura' && !!company?.ruc;
        const items = invoice.quote?.items?.length
            ? invoice.quote.items.map((item) => ({
                unidad_de_medida: 'NIU',
                codigo: item.productId ?? 'ITEM',
                descripcion: item.description,
                cantidad: item.quantity,
                valor_unitario: item.unitPrice,
                precio_unitario: item.unitPrice,
                subtotal: item.total,
                tipo_de_igv: 1,
                igv: 0,
                total: item.total,
                anticipo_regularizacion: false,
            }))
            : [{
                    unidad_de_medida: 'NIU',
                    codigo: 'SERV',
                    descripcion: `Servicio ${invoice.number}`,
                    cantidad: 1,
                    valor_unitario: invoice.amount,
                    precio_unitario: invoice.amount,
                    subtotal: invoice.amount,
                    tipo_de_igv: 1,
                    igv: 0,
                    total: invoice.amount,
                    anticipo_regularizacion: false,
                }];
        const payload = {
            operacion: 'generar_comprobante',
            tipo_de_comprobante: isFactura ? 1 : 2,
            serie: isFactura ? config.serieFactura : config.serieBoleta,
            numero: invoice.correlative ?? 1,
            sunat_transaction: 1,
            cliente_tipo_de_documento: isFactura ? 6 : 1,
            cliente_numero_de_documento: isFactura ? company?.ruc : '00000000',
            cliente_denominacion: company?.name ?? lead?.name ?? 'Cliente',
            fecha_de_emision: new Date().toISOString().slice(0, 10),
            moneda: invoice.currency === 'USD' ? 2 : 1,
            total: invoice.amount,
            items,
        };
        const baseUrl = config.sandbox ? NUBEFACT_URL_SANDBOX : NUBEFACT_URL_PROD;
        try {
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: { Authorization: `Token token=${config.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || data.errors) {
                await this.prisma.invoice.update({
                    where: { id: invoice.id },
                    data: { fiscalStatus: 'rejected', sunatResponse: JSON.stringify(data.errors ?? data) },
                });
                return;
            }
            await this.prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    fiscalStatus: data.aceptada_por_sunat ? 'accepted' : 'pending',
                    sunatResponse: data.sunat_description ?? null,
                    pdfUrl: data.enlace_del_pdf ?? null,
                    xmlUrl: data.enlace_del_xml ?? null,
                    cdrUrl: data.enlace_del_cdr ?? null,
                },
            });
        }
        catch (err) {
            this.logger.error(`Nubefact issue error: ${err.message}`);
            await this.prisma.invoice.update({
                where: { id: invoice.id },
                data: { fiscalStatus: 'rejected', sunatResponse: err.message },
            });
        }
    }
};
exports.NubefactService = NubefactService;
exports.NubefactService = NubefactService = NubefactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], NubefactService);


/***/ }),
/* 169 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicingService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const nubefact_service_1 = __webpack_require__(168);
let InvoicingService = class InvoicingService {
    prisma;
    nubefact;
    constructor(prisma, nubefact) {
        this.prisma = prisma;
        this.nubefact = nubefact;
    }
    async getNextInvoiceNumber(tenantId) {
        const last = await this.prisma.invoice.findFirst({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            select: { number: true },
        });
        const lastNum = last ? parseInt(last.number.replace('INV-', ''), 10) : 0;
        return `INV-${String(lastNum + 1).padStart(5, '0')}`;
    }
    async createForQuote(quote, tenantId) {
        const number = await this.getNextInvoiceNumber(tenantId);
        const invoice = await this.prisma.invoice.create({
            data: {
                number,
                quoteId: quote.id,
                currency: quote.currency,
                amount: quote.grandTotal,
                dueDate: new Date(),
                tenantId,
            },
        });
        await this.nubefact.issueInvoice(invoice.id, tenantId);
        return invoice;
    }
    async retry(invoiceId, tenantId) {
        await this.nubefact.issueInvoice(invoiceId, tenantId);
        return this.prisma.invoice.findFirst({ where: { id: invoiceId, tenantId } });
    }
};
exports.InvoicingService = InvoicingService;
exports.InvoicingService = InvoicingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof nubefact_service_1.NubefactService !== "undefined" && nubefact_service_1.NubefactService) === "function" ? _b : Object])
], InvoicingService);


/***/ }),
/* 170 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicingController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const nubefact_service_1 = __webpack_require__(168);
const invoicing_service_1 = __webpack_require__(169);
const nubefact_config_dto_1 = __webpack_require__(171);
let InvoicingController = class InvoicingController {
    nubefact;
    invoicing;
    constructor(nubefact, invoicing) {
        this.nubefact = nubefact;
        this.invoicing = invoicing;
    }
    getConfig(user) {
        return this.nubefact.getConfig(user.tenantId);
    }
    setConfig(dto, user) {
        return this.nubefact.setConfig(dto, user.tenantId);
    }
    retry(invoiceId, user) {
        return this.invoicing.retry(invoiceId, user.tenantId);
    }
};
exports.InvoicingController = InvoicingController;
__decorate([
    (0, common_1.Get)('config'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Patch)('config'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof nubefact_config_dto_1.UpsertNubefactConfigDto !== "undefined" && nubefact_config_dto_1.UpsertNubefactConfigDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "setConfig", null);
__decorate([
    (0, common_1.Post)(':invoiceId/retry'),
    __param(0, (0, common_1.Param)('invoiceId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "retry", null);
exports.InvoicingController = InvoicingController = __decorate([
    (0, common_1.Controller)('invoicing'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof nubefact_service_1.NubefactService !== "undefined" && nubefact_service_1.NubefactService) === "function" ? _a : Object, typeof (_b = typeof invoicing_service_1.InvoicingService !== "undefined" && invoicing_service_1.InvoicingService) === "function" ? _b : Object])
], InvoicingController);


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpsertNubefactConfigDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpsertNubefactConfigDto {
    ruc;
    token;
    serieFactura;
    serieBoleta;
    sandbox;
}
exports.UpsertNubefactConfigDto = UpsertNubefactConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertNubefactConfigDto.prototype, "ruc", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpsertNubefactConfigDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpsertNubefactConfigDto.prototype, "serieFactura", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpsertNubefactConfigDto.prototype, "serieBoleta", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpsertNubefactConfigDto.prototype, "sandbox", void 0);


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(173), exports);
__exportStar(__webpack_require__(174), exports);


/***/ }),
/* 173 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NpsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const email_1 = __webpack_require__(32);
const nps_service_1 = __webpack_require__(174);
const nps_controller_1 = __webpack_require__(175);
let NpsModule = class NpsModule {
};
exports.NpsModule = NpsModule;
exports.NpsModule = NpsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, email_1.EmailModule],
        controllers: [nps_controller_1.NpsController, nps_controller_1.PublicNpsController],
        providers: [nps_service_1.NpsService],
        exports: [nps_service_1.NpsService],
    })
], NpsModule);


/***/ }),
/* 174 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NpsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const email_1 = __webpack_require__(32);
const uuid_1 = __webpack_require__(44);
let NpsService = class NpsService {
    prisma;
    email;
    constructor(prisma, email) {
        this.prisma = prisma;
        this.email = email;
    }
    async createAndSendSurvey(ticketId, tenantId) {
        const existing = await this.prisma.npsResponse.findUnique({ where: { ticketId } });
        if (existing)
            return existing;
        const ticket = await this.prisma.ticket.findFirst({
            where: { id: ticketId, tenantId },
            include: { lead: true },
        });
        if (!ticket?.lead?.email)
            return null;
        const token = (0, uuid_1.v4)();
        const response = await this.prisma.npsResponse.create({
            data: {
                tenantId,
                ticketId,
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 3600000),
            },
        });
        await this.email.sendNpsSurveyEmail(ticket.lead.email, token, tenantId);
        return response;
    }
    async getPublic(token) {
        const response = await this.prisma.npsResponse.findUnique({
            where: { token },
            include: { ticket: { select: { number: true, subject: true } } },
        });
        if (!response)
            throw new common_1.BadRequestException('Encuesta no encontrada');
        return {
            ticketNumber: response.ticket.number,
            subject: response.ticket.subject,
            alreadyResponded: !!response.respondedAt,
            expired: response.expiresAt < new Date(),
        };
    }
    async submitResponse(token, dto) {
        const response = await this.prisma.npsResponse.findUnique({ where: { token } });
        if (!response)
            throw new common_1.BadRequestException('Encuesta no encontrada');
        if (response.respondedAt)
            throw new common_1.BadRequestException('Ya se respondió esta encuesta');
        if (response.expiresAt < new Date())
            throw new common_1.BadRequestException('La encuesta expiró');
        return this.prisma.npsResponse.update({
            where: { token },
            data: { score: dto.score, comment: dto.comment, respondedAt: new Date() },
        });
    }
    async getStats(tenantId) {
        const responses = await this.prisma.npsResponse.findMany({
            where: { tenantId, respondedAt: { not: null } },
            select: { score: true },
        });
        const total = responses.length;
        const promoters = responses.filter((r) => (r.score ?? 0) >= 9).length;
        const passives = responses.filter((r) => (r.score ?? 0) >= 7 && (r.score ?? 0) <= 8).length;
        const detractors = responses.filter((r) => (r.score ?? 0) <= 6).length;
        const nps = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : null;
        return { total, promoters, passives, detractors, nps };
    }
};
exports.NpsService = NpsService;
exports.NpsService = NpsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object])
], NpsService);


/***/ }),
/* 175 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicNpsController = exports.NpsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const nps_service_1 = __webpack_require__(174);
const submit_nps_dto_1 = __webpack_require__(176);
let NpsController = class NpsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getStats(user) {
        return this.service.getStats(user.tenantId);
    }
};
exports.NpsController = NpsController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NpsController.prototype, "getStats", null);
exports.NpsController = NpsController = __decorate([
    (0, common_1.Controller)('nps'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof nps_service_1.NpsService !== "undefined" && nps_service_1.NpsService) === "function" ? _a : Object])
], NpsController);
let PublicNpsController = class PublicNpsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPublic(token) {
        return this.service.getPublic(token);
    }
    submit(token, dto) {
        return this.service.submitResponse(token, dto);
    }
};
exports.PublicNpsController = PublicNpsController;
__decorate([
    (0, common_1.Get)(':token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicNpsController.prototype, "getPublic", null);
__decorate([
    (0, common_1.Post)(':token/submit'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof submit_nps_dto_1.SubmitNpsDto !== "undefined" && submit_nps_dto_1.SubmitNpsDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], PublicNpsController.prototype, "submit", null);
exports.PublicNpsController = PublicNpsController = __decorate([
    (0, common_1.Controller)('public/nps'),
    __metadata("design:paramtypes", [typeof (_b = typeof nps_service_1.NpsService !== "undefined" && nps_service_1.NpsService) === "function" ? _b : Object])
], PublicNpsController);


/***/ }),
/* 176 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubmitNpsDto = void 0;
const class_validator_1 = __webpack_require__(39);
class SubmitNpsDto {
    score;
    comment;
}
exports.SubmitNpsDto = SubmitNpsDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], SubmitNpsDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmitNpsDto.prototype, "comment", void 0);


/***/ }),
/* 177 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(178), exports);
__exportStar(__webpack_require__(179), exports);


/***/ }),
/* 178 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadFormsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
const role_permissions_1 = __webpack_require__(34);
const lead_forms_service_1 = __webpack_require__(179);
const lead_forms_controller_1 = __webpack_require__(180);
let LeadFormsModule = class LeadFormsModule {
};
exports.LeadFormsModule = LeadFormsModule;
exports.LeadFormsModule = LeadFormsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, automation_1.AutomationModule, role_permissions_1.RolePermissionsModule],
        controllers: [lead_forms_controller_1.LeadFormsController, lead_forms_controller_1.PublicLeadFormsController],
        providers: [lead_forms_service_1.LeadFormsService],
        exports: [lead_forms_service_1.LeadFormsService],
    })
], LeadFormsModule);


/***/ }),
/* 179 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadFormsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
function slugify(name) {
    const base = name
        .toLowerCase()
        .normalize('NFD')
        .replace(new RegExp('[̀-ͯ]', 'g'), '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const suffix = Math.random().toString(36).slice(2, 8);
    return `${base || 'form'}-${suffix}`;
}
let LeadFormsService = class LeadFormsService {
    prisma;
    automation;
    constructor(prisma, automation) {
        this.prisma = prisma;
        this.automation = automation;
    }
    async create(dto, tenantId) {
        return this.prisma.leadForm.create({
            data: {
                name: dto.name,
                slug: dto.slug || slugify(dto.name),
                fields: dto.fields,
                campaignId: dto.campaignId,
                tenantId,
            },
        });
    }
    async findAll(tenantId) {
        return this.prisma.leadForm.findMany({
            where: { tenantId },
            include: { campaign: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const form = await this.prisma.leadForm.findFirst({ where: { id, tenantId } });
        if (!form)
            throw new common_1.NotFoundException('Formulario no encontrado');
        return form;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const data = { ...dto };
        Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
        return this.prisma.leadForm.update({ where: { id }, data });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.leadForm.delete({ where: { id } });
    }
    async getPublicForm(slug) {
        const form = await this.prisma.leadForm.findFirst({ where: { slug, active: true } });
        if (!form)
            throw new common_1.NotFoundException('Formulario no encontrado o inactivo');
        return { id: form.id, name: form.name, fields: form.fields };
    }
    async submit(slug, payload) {
        const form = await this.prisma.leadForm.findFirst({ where: { slug, active: true } });
        if (!form)
            throw new common_1.NotFoundException('Formulario no encontrado o inactivo');
        const fields = form.fields;
        for (const field of fields) {
            if (field.required && !payload[field.name]) {
                throw new common_1.BadRequestException(`El campo "${field.name}" es requerido`);
            }
        }
        const firstStage = await this.prisma.pipelineStage.findFirst({
            where: { tenantId: form.tenantId },
            orderBy: { order: 'asc' },
        });
        const owner = await this.prisma.user.findFirst({
            where: { tenantId: form.tenantId, role: { in: ['admin', 'seller'] } },
            orderBy: { createdAt: 'asc' },
        });
        if (!owner)
            throw new common_1.BadRequestException('El tenant no tiene un propietario válido para asignar el lead');
        const knownFields = new Set(['name', 'email', 'phone', 'company']);
        const customFields = {};
        for (const [key, value] of Object.entries(payload)) {
            if (!knownFields.has(key))
                customFields[key] = value;
        }
        const lead = await this.prisma.lead.create({
            data: {
                name: payload.name || 'Lead sin nombre',
                email: payload.email,
                phone: payload.phone,
                company: payload.company,
                source: 'web',
                status: firstStage?.name ?? 'new',
                campaignId: form.campaignId,
                customFields: Object.keys(customFields).length ? customFields : undefined,
                ownerId: owner.id,
                tenantId: form.tenantId,
            },
        });
        await this.automation.evaluate('lead.created', { ...lead, entity: 'lead', entityId: lead.id }, form.tenantId);
        return { id: lead.id, message: 'Lead creado correctamente' };
    }
};
exports.LeadFormsService = LeadFormsService;
exports.LeadFormsService = LeadFormsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object])
], LeadFormsService);


/***/ }),
/* 180 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicLeadFormsController = exports.LeadFormsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const lead_forms_service_1 = __webpack_require__(179);
const create_lead_form_dto_1 = __webpack_require__(181);
let LeadFormsController = class LeadFormsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.LeadFormsController = LeadFormsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_lead_form_dto_1.CreateLeadFormDto !== "undefined" && create_lead_form_dto_1.CreateLeadFormDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadFormsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadFormsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadFormsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_lead_form_dto_1.UpdateLeadFormDto !== "undefined" && create_lead_form_dto_1.UpdateLeadFormDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadFormsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadFormsController.prototype, "remove", null);
exports.LeadFormsController = LeadFormsController = __decorate([
    (0, common_1.Controller)('lead-forms'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof lead_forms_service_1.LeadFormsService !== "undefined" && lead_forms_service_1.LeadFormsService) === "function" ? _a : Object])
], LeadFormsController);
let PublicLeadFormsController = class PublicLeadFormsController {
    service;
    constructor(service) {
        this.service = service;
    }
    getPublicForm(slug) {
        return this.service.getPublicForm(slug);
    }
    submit(slug, payload) {
        return this.service.submit(slug, payload);
    }
};
exports.PublicLeadFormsController = PublicLeadFormsController;
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicLeadFormsController.prototype, "getPublicForm", null);
__decorate([
    (0, common_1.Post)(':slug/submit'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof Record !== "undefined" && Record) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], PublicLeadFormsController.prototype, "submit", null);
exports.PublicLeadFormsController = PublicLeadFormsController = __decorate([
    (0, common_1.Controller)('public/forms'),
    __metadata("design:paramtypes", [typeof (_d = typeof lead_forms_service_1.LeadFormsService !== "undefined" && lead_forms_service_1.LeadFormsService) === "function" ? _d : Object])
], PublicLeadFormsController);


/***/ }),
/* 181 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateLeadFormDto = exports.CreateLeadFormDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateLeadFormDto {
    name;
    slug;
    fields;
    campaignId;
}
exports.CreateLeadFormDto = CreateLeadFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeadFormDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadFormDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateLeadFormDto.prototype, "fields", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadFormDto.prototype, "campaignId", void 0);
class UpdateLeadFormDto {
    name;
    fields;
    campaignId;
    active;
}
exports.UpdateLeadFormDto = UpdateLeadFormDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadFormDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateLeadFormDto.prototype, "fields", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadFormDto.prototype, "campaignId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLeadFormDto.prototype, "active", void 0);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportService = exports.DashboardService = exports.DashboardModule = void 0;
var dashboard_module_1 = __webpack_require__(183);
Object.defineProperty(exports, "DashboardModule", ({ enumerable: true, get: function () { return dashboard_module_1.DashboardModule; } }));
var dashboard_service_1 = __webpack_require__(184);
Object.defineProperty(exports, "DashboardService", ({ enumerable: true, get: function () { return dashboard_service_1.DashboardService; } }));
var export_service_1 = __webpack_require__(185);
Object.defineProperty(exports, "ExportService", ({ enumerable: true, get: function () { return export_service_1.ExportService; } }));


/***/ }),
/* 183 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const nps_1 = __webpack_require__(172);
const dashboard_service_1 = __webpack_require__(184);
const export_service_1 = __webpack_require__(185);
const dashboard_controller_1 = __webpack_require__(188);
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule, nps_1.NpsModule],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, export_service_1.ExportService],
        exports: [dashboard_service_1.DashboardService, export_service_1.ExportService],
    })
], DashboardModule);


/***/ }),
/* 184 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DashboardService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let DashboardService = class DashboardService {
    static { DashboardService_1 = this; }
    prisma;
    logger = new common_1.Logger(DashboardService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(tenantId, from, to) {
        const dateFilter = from || to
            ? { createdAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } }
            : {};
        const [totalDeals, totalCompanies, totalActivities] = await Promise.all([
            this.prisma.lead.count({ where: { tenantId, ...dateFilter } }),
            this.prisma.company.count({ where: { tenantId, ...dateFilter } }),
            this.prisma.activity.count({ where: { tenantId, ...dateFilter } }),
        ]);
        const wonStages = await this.prisma.pipelineStage.findMany({
            where: { tenantId, isWon: true },
            select: { name: true },
        });
        const closedDeals = await this.prisma.lead.aggregate({
            where: { tenantId, status: { in: wonStages.map((s) => s.name) }, ...dateFilter },
            _sum: { value: true },
            _count: true,
        });
        return {
            totalDeals,
            totalCompanies,
            totalActivities,
            closedDealsValue: closedDeals._sum.value || 0,
            closedDealsCount: closedDeals._count,
        };
    }
    async getAccountHealth(tenantId) {
        const [byStatus, avg] = await Promise.all([
            this.prisma.lead.groupBy({
                by: ['healthStatus'],
                where: { tenantId, healthStatus: { not: 'unknown' } },
                _count: true,
            }),
            this.prisma.lead.aggregate({
                where: { tenantId, healthStatus: { not: 'unknown' } },
                _avg: { healthScore: true },
            }),
        ]);
        const counts = { healthy: 0, at_risk: 0, critical: 0 };
        byStatus.forEach((b) => {
            if (b.healthStatus in counts)
                counts[b.healthStatus] = b._count;
        });
        return { counts, averageScore: avg._avg.healthScore ?? null };
    }
    async getPipelineStages(tenantId) {
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const counts = await Promise.all(stages.map((stage) => this.prisma.lead.count({ where: { tenantId, status: stage.name } })));
        const total = counts.reduce((a, b) => a + b, 0);
        return stages.map((stage, i) => ({
            name: stage.name,
            color: stage.color,
            count: counts[i],
            percentage: total ? ((counts[i] / total) * 100).toFixed(1) : '0',
        }));
    }
    async getActivityBySeller(tenantId, from, to) {
        const dateFilter = { tenantId };
        if (from || to) {
            dateFilter.createdAt = {};
            if (from)
                dateFilter.createdAt.gte = new Date(from);
            if (to)
                dateFilter.createdAt.lte = new Date(to);
        }
        const users = await this.prisma.user.findMany({
            where: { tenantId, role: { not: 'superadmin' } },
            select: { id: true, name: true, email: true },
        });
        const activities = await this.prisma.activity.groupBy({
            by: ['ownerId', 'type'],
            where: dateFilter,
            _count: true,
        });
        const userMap = new Map(users.map((u) => [u.id, u]));
        const result = {};
        for (const act of activities) {
            const userId = act.ownerId;
            if (!result[userId]) {
                const user = userMap.get(userId);
                result[userId] = { id: userId, name: user?.name || 'Unknown', total: 0, byType: {} };
            }
            result[userId].byType[act.type] = act._count;
            result[userId].total += act._count;
        }
        return Object.values(result);
    }
    async getDealsByStage(tenantId) {
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const dealStageMap = new Map();
        for (const stage of stages) {
            const agg = await this.prisma.lead.aggregate({
                where: { tenantId, status: stage.name },
                _count: true,
                _sum: { value: true },
            });
            dealStageMap.set(stage.name, {
                count: agg._count,
                totalValue: agg._sum.value || 0,
            });
        }
        return stages.map((s) => ({
            name: s.name,
            color: s.color,
            ...dealStageMap.get(s.name),
        }));
    }
    async getMonthlyActivity(tenantId, months = 6) {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const activities = await this.prisma.activity.findMany({
            where: { tenantId, createdAt: { gte: start, lte: end } },
            select: { createdAt: true, type: true },
        });
        const monthly = {};
        for (let i = months - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            monthly[key] = { total: 0, calls: 0, emails: 0, meetings: 0, others: 0 };
        }
        for (const act of activities) {
            const key = `${act.createdAt.getFullYear()}-${String(act.createdAt.getMonth() + 1).padStart(2, '0')}`;
            if (!monthly[key])
                continue;
            monthly[key].total++;
            const type = act.type?.toLowerCase() || '';
            if (type.includes('call'))
                monthly[key].calls++;
            else if (type.includes('email'))
                monthly[key].emails++;
            else if (type.includes('meeting'))
                monthly[key].meetings++;
            else
                monthly[key].others++;
        }
        return Object.entries(monthly).map(([month, data]) => ({ month, ...data }));
    }
    async getForecast(tenantId, months = 3) {
        const now = new Date();
        const end = new Date(now.getFullYear(), now.getMonth() + months, 1);
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const stageWeights = {};
        stages.forEach((s, i) => {
            stageWeights[s.name] = Math.min((i + 1) / stages.length, 1);
        });
        const leads = await this.prisma.lead.findMany({
            where: { tenantId, expectedCloseDate: { gte: now, lte: end } },
            select: { name: true, value: true, status: true, expectedCloseDate: true },
        });
        const monthly = {};
        for (let i = 0; i < months; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            monthly[key] = { total: 0, weighted: 0, deals: [] };
        }
        for (const lead of leads) {
            if (!lead.expectedCloseDate)
                continue;
            const key = `${lead.expectedCloseDate.getFullYear()}-${String(lead.expectedCloseDate.getMonth() + 1).padStart(2, '0')}`;
            if (!monthly[key])
                continue;
            monthly[key].total += lead.value;
            monthly[key].weighted += lead.value * (stageWeights[lead.status] || 0);
            monthly[key].deals.push({ title: lead.name, value: lead.value, stage: lead.status });
        }
        return Object.entries(monthly).map(([month, data]) => ({
            month,
            total: data.total,
            weighted: Math.round(data.weighted * 100) / 100,
            deals: data.deals.length,
        }));
    }
    async getFunnel(tenantId, from, to) {
        const dateFilter = { tenantId };
        if (from || to) {
            dateFilter.enteredAt = {};
            if (from)
                dateFilter.enteredAt.gte = new Date(from);
            if (to)
                dateFilter.enteredAt.lte = new Date(to);
        }
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const history = await this.prisma.leadStageHistory.findMany({
            where: dateFilter,
            select: { leadId: true, toStage: true, fromStage: true, enteredAt: true, exitedAt: true },
        });
        const enteredCount = {};
        const stageDurations = {};
        for (const row of history) {
            enteredCount[row.toStage] = (enteredCount[row.toStage] || 0) + 1;
            if (row.exitedAt) {
                const hours = (row.exitedAt.getTime() - row.enteredAt.getTime()) / (1000 * 60 * 60);
                (stageDurations[row.toStage] ||= []).push(hours);
            }
        }
        const stageResults = stages.map((stage, i) => {
            const entered = enteredCount[stage.name] || 0;
            const nextStage = stages[i + 1];
            const nextEntered = nextStage ? enteredCount[nextStage.name] || 0 : null;
            const conversionRate = nextStage && entered > 0 ? Math.round((nextEntered / entered) * 1000) / 10 : null;
            const durations = stageDurations[stage.name] || [];
            const avgTimeInStageHours = durations.length
                ? Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10
                : null;
            return { name: stage.name, order: stage.order, color: stage.color, entered, conversionRate, avgTimeInStageHours };
        });
        const lostStageNames = new Set(stages.filter((s) => s.isLost).map((s) => s.name));
        const lostTransitions = history.filter((h) => lostStageNames.has(h.toStage));
        const lostLeadIds = [...new Set(lostTransitions.map((h) => h.leadId))];
        const lostLeads = lostLeadIds.length
            ? await this.prisma.lead.findMany({ where: { id: { in: lostLeadIds } }, select: { id: true, value: true } })
            : [];
        const leadValueMap = new Map(lostLeads.map((l) => [l.id, l.value]));
        const dropOffMap = {};
        for (const t of lostTransitions) {
            const fromStageName = t.fromStage || '(sin etapa previa)';
            const entry = (dropOffMap[fromStageName] ||= { lostCount: 0, lostValue: 0 });
            entry.lostCount += 1;
            entry.lostValue += leadValueMap.get(t.leadId) || 0;
        }
        const dropOff = Object.entries(dropOffMap).map(([stage, data]) => ({ stage, ...data }));
        return { stages: stageResults, dropOff };
    }
    static MONTHLY_FACTOR = {
        weekly: 52 / 12,
        monthly: 1,
        quarterly: 1 / 3,
        yearly: 1 / 12,
    };
    async getMrrArr(tenantId) {
        const subscriptions = await this.prisma.subscription.findMany({
            where: { tenantId, status: 'active' },
            select: { amount: true, currency: true, billingInterval: true },
        });
        const mrr = {};
        for (const sub of subscriptions) {
            const monthlyAmount = sub.amount * DashboardService_1.MONTHLY_FACTOR[sub.billingInterval];
            mrr[sub.currency] = Math.round(((mrr[sub.currency] || 0) + monthlyAmount) * 100) / 100;
        }
        const arr = {};
        for (const currency of Object.keys(mrr)) {
            arr[currency] = Math.round(mrr[currency] * 12 * 100) / 100;
        }
        return { mrr, arr, activeSubscriptions: subscriptions.length };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], DashboardService);


/***/ }),
/* 185 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportService = void 0;
const common_1 = __webpack_require__(2);
const ExcelJS = __importStar(__webpack_require__(186));
const PDFDocument = __webpack_require__(187);
let ExportService = class ExportService {
    async toExcel(summary, pipeline, forecast) {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'CRM System';
        workbook.created = new Date();
        const ws = workbook.addWorksheet('Reporte Ejecutivo', {
            views: [{ showGridLines: false }]
        });
        ws.mergeCells('A1:D2');
        const titleCell = ws.getCell('A1');
        titleCell.value = 'REPORTE EJECUTIVO - CRM';
        titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
        titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        ws.addRow([]);
        const addSectionHeader = (title, row) => {
            ws.mergeCells(`A${row}:D${row}`);
            const cell = ws.getCell(`A${row}`);
            cell.value = title;
            cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FF333333' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
            cell.border = { bottom: { style: 'medium', color: { argb: 'FFCBD5E1' } } };
        };
        addSectionHeader('Resumen General', 4);
        ws.columns = [
            { key: 'col1', width: 25 },
            { key: 'col2', width: 20 },
            { key: 'col3', width: 25 },
            { key: 'col4', width: 20 },
        ];
        ws.addRow({ col1: 'Total de Contactos', col2: summary.totalContacts, col3: 'Negocios Ganados', col4: summary.closedDealsCount });
        ws.addRow({ col1: 'Total de Negocios', col2: summary.totalDeals, col3: 'Valor Ganado', col4: summary.closedDealsValue });
        ws.addRow({ col1: 'Total de Empresas', col2: summary.totalCompanies, col3: 'Total de Actividades', col4: summary.totalActivities });
        ['B5', 'B6', 'B7', 'D5', 'D7'].forEach(ref => {
            ws.getCell(ref).alignment = { horizontal: 'right' };
        });
        ws.getCell('D6').numFmt = '"$"#,##0.00';
        ws.getCell('D6').alignment = { horizontal: 'right' };
        ws.addRow([]);
        const pipelineStart = 9;
        addSectionHeader('Embudo de Ventas (Pipeline)', pipelineStart);
        ws.addRow({ col1: 'Etapa', col2: 'Cantidad', col3: 'Porcentaje' });
        const pHeaderRow = ws.getRow(pipelineStart + 1);
        pHeaderRow.font = { bold: true };
        pHeaderRow.border = { bottom: { style: 'thin' } };
        let currentRow = pipelineStart + 2;
        for (const s of pipeline) {
            ws.addRow({ col1: s.name, col2: s.count, col3: `${s.percentage}%` });
            ws.getCell(`B${currentRow}`).alignment = { horizontal: 'right' };
            ws.getCell(`C${currentRow}`).alignment = { horizontal: 'right' };
            currentRow++;
        }
        ws.addRow([]);
        currentRow++;
        addSectionHeader('Pronóstico (Forecast)', currentRow);
        currentRow++;
        ws.addRow({ col1: 'Mes', col2: 'Total Proyectado', col3: 'Total Ponderado' });
        const fHeaderRow = ws.getRow(currentRow);
        fHeaderRow.font = { bold: true };
        fHeaderRow.border = { bottom: { style: 'thin' } };
        currentRow++;
        for (const f of forecast) {
            ws.addRow({ col1: f.month, col2: f.total, col3: f.weighted });
            ws.getCell(`B${currentRow}`).numFmt = '"$"#,##0.00';
            ws.getCell(`C${currentRow}`).numFmt = '"$"#,##0.00';
            currentRow++;
        }
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    async toPdf(summary, pipeline, forecast) {
        return new Promise((resolve) => {
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            const drawHeader = (title, y) => {
                doc.rect(50, y, 495, 20).fill('#0f172a');
                doc.fillColor('#ffffff').fontSize(12).text(title, 60, y + 5);
                doc.fillColor('#333333');
            };
            const drawRow = (y, col1, col2, col3, col4) => {
                doc.fontSize(10);
                doc.text(col1, 60, y);
                doc.text(col2, 200, y, { width: 80, align: 'right' });
                doc.text(col3, 300, y);
                doc.text(col4, 450, y, { width: 80, align: 'right' });
                doc.moveTo(50, y + 15).lineTo(545, y + 15).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
            };
            doc.fontSize(24).fillColor('#0f172a').text('Reporte Ejecutivo CRM', { align: 'center' });
            doc.fontSize(10).fillColor('#64748b').text(`Generado: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown(2);
            let currentY = doc.y;
            drawHeader('Resumen General', currentY);
            currentY += 30;
            drawRow(currentY, 'Total de Contactos:', summary.totalContacts.toString(), 'Negocios Ganados:', summary.closedDealsCount.toString());
            currentY += 20;
            drawRow(currentY, 'Total de Negocios:', summary.totalDeals.toString(), 'Valor Ganado:', `$${Number(summary.closedDealsValue).toLocaleString()}`);
            currentY += 20;
            drawRow(currentY, 'Total de Empresas:', summary.totalCompanies.toString(), 'Total Actividades:', summary.totalActivities.toString());
            currentY += 40;
            drawHeader('Embudo de Ventas', currentY);
            currentY += 30;
            doc.fontSize(10).font('Helvetica-Bold');
            doc.text('Etapa', 60, currentY);
            doc.text('Cantidad', 300, currentY, { width: 80, align: 'right' });
            doc.text('Porcentaje', 400, currentY, { width: 80, align: 'right' });
            doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(1).strokeColor('#cbd5e1').stroke();
            currentY += 20;
            doc.font('Helvetica');
            for (const s of pipeline) {
                doc.text(s.name, 60, currentY);
                doc.text(s.count.toString(), 300, currentY, { width: 80, align: 'right' });
                doc.text(`${s.percentage}%`, 400, currentY, { width: 80, align: 'right' });
                doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(0.5).strokeColor('#f1f5f9').stroke();
                currentY += 20;
            }
            currentY += 20;
            if (currentY > 700) {
                doc.addPage();
                currentY = 50;
            }
            drawHeader('Pronóstico Financiero', currentY);
            currentY += 30;
            doc.fontSize(10).font('Helvetica-Bold');
            doc.text('Mes', 60, currentY);
            doc.text('Proyectado', 300, currentY, { width: 80, align: 'right' });
            doc.text('Ponderado', 420, currentY, { width: 80, align: 'right' });
            doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(1).strokeColor('#cbd5e1').stroke();
            currentY += 20;
            doc.font('Helvetica');
            for (const f of forecast) {
                doc.text(f.month, 60, currentY);
                doc.text(`$${Number(f.total).toLocaleString()}`, 300, currentY, { width: 80, align: 'right' });
                doc.text(`$${Number(f.weighted).toLocaleString()}`, 420, currentY, { width: 80, align: 'right' });
                doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(0.5).strokeColor('#f1f5f9').stroke();
                currentY += 20;
            }
            const bottom = doc.page.height - 50;
            doc.fontSize(8).fillColor('#94a3b8').text('Generado automáticamente por el CRM.', 50, bottom, { align: 'center' });
            doc.end();
        });
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)()
], ExportService);


/***/ }),
/* 186 */
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),
/* 187 */
/***/ ((module) => {

module.exports = require("pdfkit");

/***/ }),
/* 188 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const dashboard_service_1 = __webpack_require__(184);
const export_service_1 = __webpack_require__(185);
const nps_1 = __webpack_require__(172);
let DashboardController = class DashboardController {
    service;
    exportService;
    nps;
    constructor(service, exportService, nps) {
        this.service = service;
        this.exportService = exportService;
        this.nps = nps;
    }
    getNps(user) {
        return this.nps.getStats(user.tenantId);
    }
    getSummary(from, to, user) {
        return this.service.getSummary(user.tenantId, from, to);
    }
    getPipeline(user) {
        return this.service.getPipelineStages(user.tenantId);
    }
    getAccountHealth(user) {
        return this.service.getAccountHealth(user.tenantId);
    }
    getDealsByStage(user) {
        return this.service.getDealsByStage(user.tenantId);
    }
    getActivityBySeller(from, to, user) {
        return this.service.getActivityBySeller(user.tenantId, from, to);
    }
    getMonthlyActivity(months, user) {
        return this.service.getMonthlyActivity(user.tenantId, Number(months) || 6);
    }
    getForecast(months, user) {
        return this.service.getForecast(user.tenantId, Number(months) || 3);
    }
    getMrrArr(user) {
        return this.service.getMrrArr(user.tenantId);
    }
    getFunnel(from, to, user) {
        return this.service.getFunnel(user.tenantId, from, to);
    }
    async export(type, from, to, user, res) {
        const summary = await this.service.getSummary(user.tenantId, from, to);
        const pipeline = await this.service.getPipelineStages(user.tenantId);
        const forecast = await this.service.getForecast(user.tenantId);
        if (type === 'excel') {
            const buffer = await this.exportService.toExcel(summary, pipeline, forecast);
            res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.set('Content-Disposition', 'attachment; filename=report.xlsx');
            res.send(buffer);
        }
        else if (type === 'pdf') {
            const buffer = await this.exportService.toPdf(summary, pipeline, forecast);
            res.set('Content-Type', 'application/pdf');
            res.set('Content-Disposition', 'attachment; filename=report.pdf');
            res.send(buffer);
        }
        else {
            res.status(400).json({ message: 'Invalid export type. Use "excel" or "pdf".' });
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('nps'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getNps", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('pipeline'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getPipeline", null);
__decorate([
    (0, common_1.Get)('account-health'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getAccountHealth", null);
__decorate([
    (0, common_1.Get)('deals-by-stage'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getDealsByStage", null);
__decorate([
    (0, common_1.Get)('activity-by-seller'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getActivityBySeller", null);
__decorate([
    (0, common_1.Get)('monthly-activity'),
    __param(0, (0, common_1.Query)('months')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMonthlyActivity", null);
__decorate([
    (0, common_1.Get)('forecast'),
    __param(0, (0, common_1.Query)('months')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getForecast", null);
__decorate([
    (0, common_1.Get)('mrr'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMrrArr", null);
__decorate([
    (0, common_1.Get)('funnel'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getFunnel", null);
__decorate([
    (0, common_1.Get)('export/:type'),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, auth_1.CurrentUser)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "export", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof dashboard_service_1.DashboardService !== "undefined" && dashboard_service_1.DashboardService) === "function" ? _a : Object, typeof (_b = typeof export_service_1.ExportService !== "undefined" && export_service_1.ExportService) === "function" ? _b : Object, typeof (_c = typeof nps_1.NpsService !== "undefined" && nps_1.NpsService) === "function" ? _c : Object])
], DashboardController);


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = exports.ProductsModule = void 0;
var products_module_1 = __webpack_require__(190);
Object.defineProperty(exports, "ProductsModule", ({ enumerable: true, get: function () { return products_module_1.ProductsModule; } }));
var products_service_1 = __webpack_require__(191);
Object.defineProperty(exports, "ProductsService", ({ enumerable: true, get: function () { return products_service_1.ProductsService; } }));


/***/ }),
/* 190 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(2);
const products_service_1 = __webpack_require__(191);
const products_controller_1 = __webpack_require__(192);
const role_permissions_1 = __webpack_require__(34);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ }),
/* 191 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.product.create({ data: { ...dto, tenantId } });
    }
    async findAll(tenantId, categoryId, search) {
        const where = { tenantId };
        if (categoryId)
            where.categoryId = categoryId;
        if (search)
            where.name = { contains: search, mode: 'insensitive' };
        return this.prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { name: 'asc' }
        });
    }
    async findById(id, tenantId) {
        const product = await this.prisma.product.findFirst({
            where: { id, tenantId },
            include: { category: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.product.update({ where: { id }, data: dto });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.product.delete({ where: { id } });
    }
    async createPriceList(dto, tenantId) {
        const { items, ...data } = dto;
        return this.prisma.priceList.create({
            data: {
                ...data,
                tenantId,
                items: items ? { create: items } : undefined,
            },
            include: { items: { include: { product: true } } },
        });
    }
    async getPriceLists(tenantId) {
        return this.prisma.priceList.findMany({
            where: { tenantId },
            include: { items: { include: { product: { select: { id: true, name: true, price: true } } } } },
        });
    }
    async createDiscount(dto, tenantId) {
        return this.prisma.discount.create({ data: { ...dto, tenantId } });
    }
    async getDiscounts(tenantId) {
        return this.prisma.discount.findMany({ where: { tenantId }, orderBy: { name: 'asc' } });
    }
    async calculatePrice(productId, quantity, tenantId) {
        const product = await this.findById(productId, tenantId);
        let unitPrice = product.price;
        let discountPercent = 0;
        const discount = await this.prisma.discount.findFirst({
            where: { tenantId, productId, active: true, minQuantity: { lte: quantity } },
            orderBy: { percentage: 'desc' },
        });
        if (discount)
            discountPercent = discount.percentage;
        const total = unitPrice * quantity * (1 - discountPercent / 100);
        return { unitPrice, discountPercent, total: Math.round(total * 100) / 100 };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ProductsService);


/***/ }),
/* 192 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const products_service_1 = __webpack_require__(191);
const create_product_dto_1 = __webpack_require__(193);
const role_permissions_1 = __webpack_require__(34);
let ProductsController = class ProductsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(categoryId, search, user) {
        return this.service.findAll(user.tenantId, categoryId, search);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
    createPriceList(dto, user) {
        return this.service.createPriceList(dto, user.tenantId);
    }
    getPriceLists(user) {
        return this.service.getPriceLists(user.tenantId);
    }
    createDiscount(dto, user) {
        return this.service.createDiscount(dto, user.tenantId);
    }
    getDiscounts(user) {
        return this.service.getDiscounts(user.tenantId);
    }
    calculatePrice(id, quantity, user) {
        return this.service.calculatePrice(id, Number(quantity) || 1, user.tenantId);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_product_dto_1.UpdateProductDto !== "undefined" && create_product_dto_1.UpdateProductDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('price-lists'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_product_dto_1.CreatePriceListDto !== "undefined" && create_product_dto_1.CreatePriceListDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createPriceList", null);
__decorate([
    (0, common_1.Get)('price-lists'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getPriceLists", null);
__decorate([
    (0, common_1.Post)('discounts'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_product_dto_1.CreateDiscountDto !== "undefined" && create_product_dto_1.CreateDiscountDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createDiscount", null);
__decorate([
    (0, common_1.Get)('discounts'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getDiscounts", null);
__decorate([
    (0, common_1.Get)('products/:id/price'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('quantity')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "calculatePrice", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ }),
/* 193 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateDiscountDto = exports.CreatePriceListDto = exports.UpdateProductDto = exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateProductDto {
    name;
    description;
    price;
    unit;
    categoryId;
    sku;
    type;
    billingType;
    stock;
    trackStock;
    currency;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "billingType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "trackStock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "currency", void 0);
class UpdateProductDto {
    name;
    description;
    price;
    unit;
    categoryId;
    sku;
    type;
    billingType;
    stock;
    trackStock;
    currency;
    active;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "billingType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "trackStock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "active", void 0);
class CreatePriceListDto {
    name;
    items;
}
exports.CreatePriceListDto = CreatePriceListDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePriceListDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePriceListDto.prototype, "items", void 0);
class CreateDiscountDto {
    name;
    percentage;
    minQuantity;
    productId;
}
exports.CreateDiscountDto = CreateDiscountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "percentage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "minQuantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "productId", void 0);


/***/ }),
/* 194 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(195), exports);
__exportStar(__webpack_require__(197), exports);
__exportStar(__webpack_require__(198), exports);


/***/ }),
/* 195 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCategoriesModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const product_categories_controller_1 = __webpack_require__(196);
const product_categories_service_1 = __webpack_require__(197);
let ProductCategoriesModule = class ProductCategoriesModule {
};
exports.ProductCategoriesModule = ProductCategoriesModule;
exports.ProductCategoriesModule = ProductCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule],
        controllers: [product_categories_controller_1.ProductCategoriesController],
        providers: [product_categories_service_1.ProductCategoriesService],
        exports: [product_categories_service_1.ProductCategoriesService],
    })
], ProductCategoriesModule);


/***/ }),
/* 196 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCategoriesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const product_categories_service_1 = __webpack_require__(197);
const create_category_dto_1 = __webpack_require__(198);
let ProductCategoriesController = class ProductCategoriesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.ProductCategoriesController = ProductCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_category_dto_1.CreateProductCategoryDto !== "undefined" && create_category_dto_1.CreateProductCategoryDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoriesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_category_dto_1.UpdateProductCategoryDto !== "undefined" && create_category_dto_1.UpdateProductCategoryDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductCategoriesController.prototype, "remove", null);
exports.ProductCategoriesController = ProductCategoriesController = __decorate([
    (0, common_1.Controller)('product-categories'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof product_categories_service_1.ProductCategoriesService !== "undefined" && product_categories_service_1.ProductCategoriesService) === "function" ? _a : Object])
], ProductCategoriesController);


/***/ }),
/* 197 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCategoriesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let ProductCategoriesService = class ProductCategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.productCategory.create({
            data: { ...dto, tenantId },
        });
    }
    async findAll(tenantId) {
        return this.prisma.productCategory.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });
    }
    async findById(id, tenantId) {
        const category = await this.prisma.productCategory.findFirst({
            where: { id, tenantId },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.productCategory.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.productCategory.delete({
            where: { id },
        });
    }
};
exports.ProductCategoriesService = ProductCategoriesService;
exports.ProductCategoriesService = ProductCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ProductCategoriesService);


/***/ }),
/* 198 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductCategoryDto = exports.CreateProductCategoryDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateProductCategoryDto {
    name;
}
exports.CreateProductCategoryDto = CreateProductCategoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductCategoryDto.prototype, "name", void 0);
class UpdateProductCategoryDto {
    name;
}
exports.UpdateProductCategoryDto = UpdateProductCategoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProductCategoryDto.prototype, "name", void 0);


/***/ }),
/* 199 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(200), exports);
__exportStar(__webpack_require__(202), exports);


/***/ }),
/* 200 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsModule = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const projects_controller_1 = __webpack_require__(201);
const projects_service_1 = __webpack_require__(202);
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule],
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_service_1.ProjectsService],
        exports: [projects_service_1.ProjectsService],
    })
], ProjectsModule);


/***/ }),
/* 201 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const projects_service_1 = __webpack_require__(202);
const create_project_dto_1 = __webpack_require__(203);
let ProjectsController = class ProjectsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId, user.id);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_project_dto_1.CreateProjectDto !== "undefined" && create_project_dto_1.CreateProjectDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_project_dto_1.UpdateProjectDto !== "undefined" && create_project_dto_1.UpdateProjectDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof projects_service_1.ProjectsService !== "undefined" && projects_service_1.ProjectsService) === "function" ? _a : Object])
], ProjectsController);


/***/ }),
/* 202 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId, ownerId) {
        const data = { ...dto, tenantId, ownerId: dto.ownerId || ownerId };
        return this.prisma.project.create({ data });
    }
    async findAll(tenantId) {
        return this.prisma.project.findMany({
            where: { tenantId },
            include: {
                lead: { select: { id: true, name: true } },
                owner: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId },
            include: {
                lead: true,
                owner: { select: { id: true, name: true, email: true } },
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.project.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.project.delete({ where: { id } });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ProjectsService);


/***/ }),
/* 203 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProjectDto = exports.CreateProjectDto = void 0;
const class_validator_1 = __webpack_require__(39);
const client_1 = __webpack_require__(16);
class CreateProjectDto {
    name;
    description;
    status;
    leadId;
    ownerId;
    startDate;
    endDate;
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ProjectStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof client_1.ProjectStatus !== "undefined" && client_1.ProjectStatus) === "function" ? _a : Object)
], CreateProjectDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "leadId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "endDate", void 0);
class UpdateProjectDto {
    name;
    description;
    status;
    leadId;
    ownerId;
    startDate;
    endDate;
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ProjectStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof client_1.ProjectStatus !== "undefined" && client_1.ProjectStatus) === "function" ? _b : Object)
], UpdateProjectDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "leadId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "endDate", void 0);


/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesService = exports.QuotesModule = void 0;
var quotes_module_1 = __webpack_require__(205);
Object.defineProperty(exports, "QuotesModule", ({ enumerable: true, get: function () { return quotes_module_1.QuotesModule; } }));
var quotes_service_1 = __webpack_require__(206);
Object.defineProperty(exports, "QuotesService", ({ enumerable: true, get: function () { return quotes_service_1.QuotesService; } }));


/***/ }),
/* 205 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesModule = void 0;
const common_1 = __webpack_require__(2);
const quotes_service_1 = __webpack_require__(206);
const quotes_controller_1 = __webpack_require__(213);
const stripe_webhook_controller_1 = __webpack_require__(215);
const role_permissions_1 = __webpack_require__(34);
const webhooks_1 = __webpack_require__(207);
const commissions_1 = __webpack_require__(147);
const referrals_1 = __webpack_require__(156);
const invoicing_1 = __webpack_require__(166);
let QuotesModule = class QuotesModule {
};
exports.QuotesModule = QuotesModule;
exports.QuotesModule = QuotesModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule, webhooks_1.WebhooksModule, commissions_1.CommissionsModule, referrals_1.ReferralsModule, invoicing_1.InvoicingModule],
        controllers: [quotes_controller_1.QuotesController, stripe_webhook_controller_1.StripeWebhookController],
        providers: [quotes_service_1.QuotesService],
        exports: [quotes_service_1.QuotesService],
    })
], QuotesModule);


/***/ }),
/* 206 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var QuotesService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const webhooks_1 = __webpack_require__(207);
const commissions_1 = __webpack_require__(147);
const referrals_1 = __webpack_require__(156);
const invoicing_1 = __webpack_require__(166);
const stripe_1 = __importDefault(__webpack_require__(212));
const PDFDocument = __webpack_require__(187);
let QuotesService = QuotesService_1 = class QuotesService {
    prisma;
    webhooksService;
    commissions;
    referrals;
    invoicing;
    logger = new common_1.Logger(QuotesService_1.name);
    appUrl;
    stripe;
    constructor(prisma, webhooksService, commissions, referrals, invoicing) {
        this.prisma = prisma;
        this.webhooksService = webhooksService;
        this.commissions = commissions;
        this.referrals = referrals;
        this.invoicing = invoicing;
        this.appUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
            apiVersion: '2025-01-27.acacia',
        });
    }
    async getNextNumber(tenantId) {
        const last = await this.prisma.quote.findFirst({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            select: { number: true },
        });
        const lastNum = last ? parseInt(last.number.replace('Q-', ''), 10) : 0;
        return `Q-${String(lastNum + 1).padStart(5, '0')}`;
    }
    async create(dto, userId, tenantId) {
        const currency = dto.currency ?? 'MXN';
        const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
        if (!validCurrencies.includes(currency)) {
            throw new common_1.BadRequestException(`Invalid currency: ${currency}`);
        }
        const number = await this.getNextNumber(tenantId);
        const items = dto.items.map((item) => {
            const itemCurrency = item.currency ?? currency;
            if (!validCurrencies.includes(itemCurrency)) {
                throw new common_1.BadRequestException(`Invalid currency on line item: ${itemCurrency}`);
            }
            const total = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
            return { ...item, total: Math.round(total * 100) / 100, currency: itemCurrency };
        });
        const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        const itemDiscount = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity * (i.discountPercent || 0) / 100), 0);
        const headerDiscount = subtotal * ((dto.discountPercent || 0) / 100);
        const discountTotal = itemDiscount + headerDiscount;
        const taxableAmount = subtotal - discountTotal;
        const taxPercent = dto.taxPercent || 0;
        const taxTotal = taxableAmount * (taxPercent / 100);
        const grandTotal = taxableAmount + taxTotal;
        return this.prisma.quote.create({
            data: {
                number,
                leadId: dto.leadId,
                currency: currency,
                status: 'draft',
                subtotal: Math.round(subtotal * 100) / 100,
                discountTotal: Math.round(discountTotal * 100) / 100,
                taxTotal: Math.round(taxTotal * 100) / 100,
                grandTotal: Math.round(grandTotal * 100) / 100,
                discountPercent: dto.discountPercent || 0,
                notes: dto.notes,
                requiresSignature: dto.requiresSignature || false,
                createdById: userId,
                tenantId,
                items: { create: items },
                versions: {
                    create: {
                        versionNumber: 1,
                        data: JSON.parse(JSON.stringify({ dto, items, subtotal, discountTotal, taxTotal, grandTotal })),
                    },
                },
            },
            include: { items: true, lead: { select: { id: true, name: true, email: true, companyName: true } } },
        });
    }
    async findAll(tenantId, user, filters) {
        const where = { tenantId };
        if (user?.isPortal) {
            where.leadId = user.id;
        }
        else if (user?.role === 'seller') {
            where.OR = [
                { createdById: user.id },
                { lead: { ownerId: user.id } }
            ];
        }
        if (!user?.isPortal && filters?.leadId)
            where.leadId = filters.leadId;
        if (!user?.isPortal && filters?.companyId)
            where.lead = { companyId: filters.companyId };
        if (filters?.status)
            where.status = filters.status;
        if (filters?.search) {
            const searchOR = [
                { number: { contains: filters.search, mode: 'insensitive' } },
                { lead: { name: { contains: filters.search, mode: 'insensitive' } } },
            ];
            if (where.OR) {
                where.AND = [{ OR: where.OR }, { OR: searchOR }];
                delete where.OR;
            }
            else {
                where.OR = searchOR;
            }
        }
        if (filters?.dateFrom || filters?.dateTo) {
            where.createdAt = {};
            if (filters.dateFrom)
                where.createdAt.gte = new Date(filters.dateFrom);
            if (filters.dateTo)
                where.createdAt.lte = new Date(filters.dateTo);
        }
        return this.prisma.quote.findMany({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true } },
                items: true,
                approvalRequest: { select: { id: true, status: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId, user) {
        const where = { id, tenantId };
        if (user?.isPortal) {
            where.leadId = user.id;
        }
        else if (user?.role === 'seller') {
            where.OR = [
                { createdById: user.id },
                { lead: { ownerId: user.id } }
            ];
        }
        const quote = await this.prisma.quote.findFirst({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true, companyName: true, status: true } },
                items: { include: { product: { select: { id: true, name: true, sku: true } } } },
                versions: { orderBy: { versionNumber: 'desc' } },
                approvalRequest: { include: { actions: { include: { user: { select: { id: true, name: true } } } } } },
                createdBy: { select: { id: true, name: true } },
            },
        });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        return quote;
    }
    async update(id, dto, userId, tenantId) {
        const existing = await this.findById(id, tenantId);
        if (existing.status !== 'draft')
            throw new common_1.BadRequestException('Only draft quotes can be edited');
        const currency = dto.currency ?? 'MXN';
        const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
        if (!validCurrencies.includes(currency)) {
            throw new common_1.BadRequestException(`Invalid currency: ${currency}`);
        }
        const items = dto.items.map((item) => {
            const itemCurrency = item.currency ?? currency;
            if (!validCurrencies.includes(itemCurrency)) {
                throw new common_1.BadRequestException(`Invalid currency on line item: ${itemCurrency}`);
            }
            const total = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
            return { ...item, total: Math.round(total * 100) / 100, currency: itemCurrency };
        });
        const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        const itemDiscount = items.reduce((sum, i) => sum + (i.unitPrice * i.quantity * (i.discountPercent || 0) / 100), 0);
        const headerDiscount = subtotal * ((dto.discountPercent || 0) / 100);
        const discountTotal = itemDiscount + headerDiscount;
        const taxableAmount = subtotal - discountTotal;
        const taxPercent = dto.taxPercent || 0;
        const taxTotal = taxableAmount * (taxPercent / 100);
        const grandTotal = taxableAmount + taxTotal;
        await this.prisma.quoteLineItem.deleteMany({ where: { quoteId: id } });
        const newVersion = existing.version + 1;
        return this.prisma.quote.update({
            where: { id },
            data: {
                leadId: dto.leadId,
                currency: currency,
                subtotal: Math.round(subtotal * 100) / 100,
                discountTotal: Math.round(discountTotal * 100) / 100,
                taxTotal: Math.round(taxTotal * 100) / 100,
                grandTotal: Math.round(grandTotal * 100) / 100,
                discountPercent: dto.discountPercent || 0,
                notes: dto.notes,
                requiresSignature: dto.requiresSignature || false,
                version: newVersion,
                items: { create: items },
                versions: {
                    create: {
                        versionNumber: newVersion,
                        data: JSON.parse(JSON.stringify({ dto, items, subtotal, discountTotal, taxTotal, grandTotal })),
                    },
                },
            },
            include: { items: true },
        });
    }
    async send(id, tenantId) {
        const quote = await this.findById(id, tenantId);
        if (quote.status !== 'draft')
            throw new common_1.BadRequestException('Quote already sent');
        const updated = await this.prisma.quote.update({
            where: { id },
            data: { status: 'sent' },
        });
        if (quote.lead?.email) {
            await this.sendQuoteEmail(quote);
        }
        return updated;
    }
    async requestApproval(id, reason, userId, tenantId) {
        const quote = await this.findById(id, tenantId);
        const existing = await this.prisma.approvalRequest.findUnique({ where: { quoteId: id } });
        if (existing)
            throw new common_1.BadRequestException('Approval already requested');
        return this.prisma.approvalRequest.create({
            data: {
                quoteId: id,
                reason,
                requestedBy: userId,
                discountPercent: quote.discountPercent ?? 0,
            },
        });
    }
    async approve(id, userId, comment, tenantId) {
        const request = await this.prisma.approvalRequest.findFirst({
            where: { quoteId: id, status: 'pending' },
            include: { quote: true },
        });
        if (!request || request.quote.tenantId !== tenantId)
            throw new common_1.NotFoundException('Pending approval not found');
        await this.prisma.approvalAction.create({
            data: { approvalRequestId: request.id, action: 'approved', comment, userId },
        });
        await this.prisma.approvalRequest.update({ where: { id: request.id }, data: { status: 'approved' } });
        const quote = await this.prisma.quote.update({ where: { id }, data: { status: 'approved' } });
        await this.webhooksService.emit('quote.approved', { ...quote, entity: 'quote', entityId: quote.id }, tenantId);
        return { message: 'Quote approved' };
    }
    async reject(id, userId, comment, tenantId) {
        const request = await this.prisma.approvalRequest.findFirst({
            where: { quoteId: id, status: 'pending' },
            include: { quote: true },
        });
        if (!request || request.quote.tenantId !== tenantId)
            throw new common_1.NotFoundException('Pending approval not found');
        await this.prisma.approvalAction.create({
            data: { approvalRequestId: request.id, action: 'rejected', comment, userId },
        });
        await this.prisma.approvalRequest.update({ where: { id: request.id }, data: { status: 'rejected' } });
        return { message: 'Quote rejected' };
    }
    async getQuotePdf(id, tenantId) {
        const quote = await this.findById(id, tenantId);
        return new Promise((resolve) => {
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            const primaryColor = '#2563eb';
            const secondaryColor = '#64748b';
            doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);
            doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold').text('COTIZACIÓN', 50, 40);
            doc.fontSize(12).font('Helvetica').text(`Nº: ${quote.number}`, 50, 75);
            doc.fillColor('#333333');
            doc.fontSize(10).font('Helvetica-Bold').text('Preparado para:', 50, 130);
            doc.font('Helvetica').text(quote.lead?.name || 'Cliente sin nombre', 50, 145);
            if (quote.lead?.companyName)
                doc.text(quote.lead.companyName, 50, 160);
            if (quote.lead?.email)
                doc.text(quote.lead.email, 50, 175);
            doc.font('Helvetica-Bold').text('Detalles:', 350, 130);
            doc.font('Helvetica').text(`Fecha: ${new Date(quote.createdAt).toLocaleDateString()}`, 350, 145);
            doc.text(`Moneda: ${quote.currency}`, 350, 160);
            doc.moveDown(3);
            let y = 220;
            doc.rect(50, y, 495, 25).fill('#f1f5f9');
            doc.fillColor('#333333').font('Helvetica-Bold').fontSize(10);
            doc.text('Descripción', 60, y + 8);
            doc.text('Cant.', 300, y + 8, { width: 50, align: 'right' });
            doc.text('P.U.', 360, y + 8, { width: 60, align: 'right' });
            doc.text('Desc.', 430, y + 8, { width: 50, align: 'right' });
            doc.text('Total', 490, y + 8, { width: 50, align: 'right' });
            y += 35;
            doc.font('Helvetica');
            for (const item of quote.items) {
                doc.text(item.description, 60, y, { width: 230 });
                doc.text(item.quantity.toString(), 300, y, { width: 50, align: 'right' });
                doc.text(`$${item.unitPrice.toLocaleString()}`, 360, y, { width: 60, align: 'right' });
                doc.text(`${item.discountPercent || 0}%`, 430, y, { width: 50, align: 'right' });
                doc.text(`$${item.total.toLocaleString()}`, 490, y, { width: 50, align: 'right' });
                y += 20;
                doc.moveTo(50, y).lineTo(545, y).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
                y += 10;
                if (y > 700) {
                    doc.addPage();
                    y = 50;
                }
            }
            y += 10;
            const tX = 350;
            doc.font('Helvetica').fontSize(10);
            doc.text('Subtotal:', tX, y, { width: 100 });
            doc.text(`$${quote.subtotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });
            if (quote.discountTotal > 0) {
                y += 20;
                doc.text('Descuento:', tX, y, { width: 100 });
                doc.text(`-$${quote.discountTotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });
            }
            const taxableAmount = quote.subtotal - quote.discountTotal;
            const taxPercent = taxableAmount > 0 ? Math.round((quote.taxTotal / taxableAmount) * 1000) / 10 : 0;
            y += 20;
            doc.text(`Impuesto (${taxPercent}%):`, tX, y, { width: 100 });
            doc.text(`$${quote.taxTotal.toLocaleString()}`, tX + 100, y, { width: 90, align: 'right' });
            y += 20;
            doc.rect(tX, y - 5, 195, 25).fill('#f8fafc');
            doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(14);
            doc.text('TOTAL:', tX + 5, y, { width: 90 });
            doc.text(`$${quote.grandTotal.toLocaleString()}`, tX + 90, y, { width: 95, align: 'right' });
            const bottom = doc.page.height - 50;
            doc.fillColor(secondaryColor).fontSize(8).font('Helvetica');
            doc.text('Gracias por su preferencia.', 50, bottom, { align: 'center' });
            if (quote.stripePaymentUrl) {
                doc.fillColor(primaryColor).text('Puede pagar esta cotización en línea haciendo clic aquí.', 50, bottom + 15, { align: 'center', link: quote.stripePaymentUrl });
            }
            doc.end();
        });
    }
    async generateCheckoutSession(quoteId, tenantId) {
        const quote = await this.findById(quoteId, tenantId);
        if (quote.status !== 'approved' && quote.status !== 'sent') {
            throw new common_1.BadRequestException('Quote must be sent or approved to be paid');
        }
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: quote.items.map(item => ({
                price_data: {
                    currency: item.currency.toLowerCase(),
                    product_data: {
                        name: item.description,
                    },
                    unit_amount: Math.round(item.unitPrice * (1 - (item.discountPercent || 0) / 100) * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${this.appUrl}/quotes/${quoteId}?success=true`,
            cancel_url: `${this.appUrl}/quotes/${quoteId}?canceled=true`,
            client_reference_id: quoteId,
        });
        await this.prisma.quote.update({
            where: { id: quoteId },
            data: {
                stripePaymentUrl: session.url,
            },
        });
        return { url: session.url };
    }
    async handleStripeWebhook(event) {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const quoteId = session.client_reference_id;
            if (quoteId) {
                const quote = await this.prisma.quote.update({
                    where: { id: quoteId },
                    data: { status: 'converted', stripePaymentIntentId: session.payment_intent },
                });
                this.logger.log(`Quote ${quoteId} marked as converted via Stripe`);
                await this.webhooksService.emit('quote.converted', { ...quote, entity: 'quote', entityId: quote.id }, quote.tenantId);
                await this.commissions.calculateForQuote(quote, quote.tenantId);
                await this.referrals.calculateForQuote(quote, quote.tenantId);
                await this.invoicing.createForQuote(quote, quote.tenantId);
            }
        }
    }
    async sendQuoteEmail(quote) {
        try {
            const { EmailService } = __webpack_require__(32);
        }
        catch { }
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = QuotesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _b : Object, typeof (_c = typeof commissions_1.CommissionsService !== "undefined" && commissions_1.CommissionsService) === "function" ? _c : Object, typeof (_d = typeof referrals_1.ReferralsService !== "undefined" && referrals_1.ReferralsService) === "function" ? _d : Object, typeof (_e = typeof invoicing_1.InvoicingService !== "undefined" && invoicing_1.InvoicingService) === "function" ? _e : Object])
], QuotesService);


/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksService = exports.WebhooksModule = void 0;
var webhooks_module_1 = __webpack_require__(208);
Object.defineProperty(exports, "WebhooksModule", ({ enumerable: true, get: function () { return webhooks_module_1.WebhooksModule; } }));
var webhooks_service_1 = __webpack_require__(209);
Object.defineProperty(exports, "WebhooksService", ({ enumerable: true, get: function () { return webhooks_service_1.WebhooksService; } }));


/***/ }),
/* 208 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksModule = void 0;
const common_1 = __webpack_require__(2);
const webhooks_service_1 = __webpack_require__(209);
const webhooks_controller_1 = __webpack_require__(210);
const role_permissions_1 = __webpack_require__(34);
let WebhooksModule = class WebhooksModule {
};
exports.WebhooksModule = WebhooksModule;
exports.WebhooksModule = WebhooksModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [webhooks_controller_1.WebhooksController],
        providers: [webhooks_service_1.WebhooksService],
        exports: [webhooks_service_1.WebhooksService],
    })
], WebhooksModule);


/***/ }),
/* 209 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhooksService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const crypto = __importStar(__webpack_require__(18));
let WebhooksService = WebhooksService_1 = class WebhooksService {
    prisma;
    logger = new common_1.Logger(WebhooksService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.webhook.create({ data: { ...dto, events: dto.events, tenantId } });
    }
    async findAll(tenantId) {
        return this.prisma.webhook.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
    }
    async update(id, dto, tenantId) {
        return this.prisma.webhook.updateMany({ where: { id, tenantId }, data: dto });
    }
    async remove(id, tenantId) {
        return this.prisma.webhook.deleteMany({ where: { id, tenantId } });
    }
    async findLogs(webhookId, tenantId) {
        const webhook = await this.prisma.webhook.findFirst({ where: { id: webhookId, tenantId } });
        if (!webhook)
            throw new common_1.NotFoundException('Webhook not found');
        return this.prisma.webhookLog.findMany({
            where: { webhookId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async emit(event, payload, tenantId) {
        const webhooks = await this.prisma.webhook.findMany({ where: { tenantId, active: true } });
        for (const wh of webhooks) {
            const events = wh.events;
            if (!events.includes(event) && !events.includes('*'))
                continue;
            this.sendWebhook(wh, event, payload);
        }
    }
    async sendWebhook(wh, event, payload) {
        const maxRetries = 3;
        const body = JSON.stringify({ event, payload, timestamp: new Date().toISOString() });
        const signatureHeaders = wh.secret
            ? {
                'X-Webhook-Secret': wh.secret,
                'X-Signature': `sha256=${crypto.createHmac('sha256', wh.secret).update(body).digest('hex')}`,
            }
            : {};
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const res = await fetch(wh.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...signatureHeaders },
                    body,
                });
                await this.prisma.webhookLog.create({ data: { webhookId: wh.id, event, payload, status: res.status, response: await res.text().catch(() => ''), retries: attempt } });
                return;
            }
            catch (err) {
                this.logger.warn(`Webhook ${wh.id} attempt ${attempt + 1} failed: ${err.message}`);
                if (attempt === maxRetries - 1) {
                    await this.prisma.webhookLog.create({ data: { webhookId: wh.id, event, payload, status: 0, response: err.message, retries: attempt + 1 } });
                }
            }
        }
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], WebhooksService);


/***/ }),
/* 210 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const webhooks_service_1 = __webpack_require__(209);
const create_webhook_dto_1 = __webpack_require__(211);
const role_permissions_1 = __webpack_require__(34);
let WebhooksController = class WebhooksController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findLogs(id, user) {
        return this.service.findLogs(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Registra un webhook saliente para uno o más eventos' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_webhook_dto_1.CreateWebhookDto !== "undefined" && create_webhook_dto_1.CreateWebhookDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista los webhooks del tenant' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Historial de entregas de un webhook (últimas 50)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "findLogs", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un webhook' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_webhook_dto_1.UpdateWebhookDto !== "undefined" && create_webhook_dto_1.UpdateWebhookDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un webhook' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "remove", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, swagger_1.ApiTags)('Webhooks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('webhooks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof webhooks_service_1.WebhooksService !== "undefined" && webhooks_service_1.WebhooksService) === "function" ? _a : Object])
], WebhooksController);


/***/ }),
/* 211 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateWebhookDto = exports.CreateWebhookDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateWebhookDto {
    url;
    events;
    secret;
}
exports.CreateWebhookDto = CreateWebhookDto;
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    __metadata("design:type", String)
], CreateWebhookDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateWebhookDto.prototype, "events", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWebhookDto.prototype, "secret", void 0);
class UpdateWebhookDto {
    url;
    events;
    secret;
    active;
}
exports.UpdateWebhookDto = UpdateWebhookDto;
__decorate([
    (0, class_validator_1.IsUrl)({ require_tld: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWebhookDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateWebhookDto.prototype, "events", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWebhookDto.prototype, "secret", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateWebhookDto.prototype, "active", void 0);


/***/ }),
/* 212 */
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),
/* 213 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const quotes_service_1 = __webpack_require__(206);
const create_quote_dto_1 = __webpack_require__(214);
const role_permissions_1 = __webpack_require__(34);
let QuotesController = class QuotesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(search, status, dateFrom, dateTo, leadId, companyId, user) {
        const filters = { search, status, dateFrom, dateTo, leadId, companyId };
        return this.service.findAll(user.tenantId, user, filters);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId, user);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.id, user.tenantId);
    }
    send(id, user) {
        return this.service.send(id, user.tenantId);
    }
    requestApproval(id, reason, user) {
        return this.service.requestApproval(id, reason, user.id, user.tenantId);
    }
    approve(id, comment, user) {
        return this.service.approve(id, user.id, comment, user.tenantId);
    }
    reject(id, comment, user) {
        return this.service.reject(id, user.id, comment, user.tenantId);
    }
    generatePayment(id, user) {
        return this.service.generateCheckoutSession(id, user.tenantId);
    }
    async getPdf(id, user, res) {
        const buffer = await this.service.getQuotePdf(id, user.tenantId);
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', `attachment; filename=quote-${id}.pdf`);
        res.send(buffer);
    }
};
exports.QuotesController = QuotesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea una cotización' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_quote_dto_1.CreateQuoteDto !== "undefined" && create_quote_dto_1.CreateQuoteDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista cotizaciones con filtros' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('dateFrom')),
    __param(3, (0, common_1.Query)('dateTo')),
    __param(4, (0, common_1.Query)('leadId')),
    __param(5, (0, common_1.Query)('companyId')),
    __param(6, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene una cotización por id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza una cotización en borrador' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_quote_dto_1.CreateQuoteDto !== "undefined" && create_quote_dto_1.CreateQuoteDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    (0, swagger_1.ApiOperation)({ summary: 'Envía la cotización al cliente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "send", null);
__decorate([
    (0, common_1.Post)(':id/request-approval'),
    (0, swagger_1.ApiOperation)({ summary: 'Solicita aprobación (ej. por descuento fuera de política)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "requestApproval", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Aprueba una cotización pendiente de aprobación' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechaza una cotización pendiente de aprobación' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Genera un checkout de Stripe para la cotización' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "generatePayment", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Descarga la cotización en PDF' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "getPdf", null);
exports.QuotesController = QuotesController = __decorate([
    (0, swagger_1.ApiTags)('Quotes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('quotes'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof quotes_service_1.QuotesService !== "undefined" && quotes_service_1.QuotesService) === "function" ? _a : Object])
], QuotesController);


/***/ }),
/* 214 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateQuoteDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateQuoteDto {
    leadId;
    notes;
    currency;
    items;
    requiresSignature;
    discountPercent;
    taxPercent;
}
exports.CreateQuoteDto = CreateQuoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "leadId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuoteDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateQuoteDto.prototype, "requiresSignature", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "discountPercent", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "taxPercent", void 0);


/***/ }),
/* 215 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripeWebhookController = void 0;
const common_1 = __webpack_require__(2);
const quotes_service_1 = __webpack_require__(206);
const stripe_1 = __importDefault(__webpack_require__(212));
let StripeWebhookController = class StripeWebhookController {
    quotesService;
    stripe;
    constructor(quotesService) {
        this.quotesService = quotesService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
            apiVersion: '2025-01-27.acacia',
        });
    }
    async handleWebhook(req, res, signature) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;
        if (webhookSecret) {
            try {
                event = this.stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
            }
            catch (err) {
                throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
            }
        }
        else {
            event = req.body;
        }
        await this.quotesService.handleStripeWebhook(event);
        res.json({ received: true });
    }
};
exports.StripeWebhookController = StripeWebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleWebhook", null);
exports.StripeWebhookController = StripeWebhookController = __decorate([
    (0, common_1.Controller)('webhooks/stripe'),
    __metadata("design:paramtypes", [typeof (_a = typeof quotes_service_1.QuotesService !== "undefined" && quotes_service_1.QuotesService) === "function" ? _a : Object])
], StripeWebhookController);


/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = exports.TicketsModule = void 0;
var tickets_module_1 = __webpack_require__(217);
Object.defineProperty(exports, "TicketsModule", ({ enumerable: true, get: function () { return tickets_module_1.TicketsModule; } }));
var tickets_service_1 = __webpack_require__(218);
Object.defineProperty(exports, "TicketsService", ({ enumerable: true, get: function () { return tickets_service_1.TicketsService; } }));


/***/ }),
/* 217 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsModule = void 0;
const common_1 = __webpack_require__(2);
const tickets_service_1 = __webpack_require__(218);
const tickets_controller_1 = __webpack_require__(219);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const webhooks_1 = __webpack_require__(207);
const shared_1 = __webpack_require__(11);
const notifications_1 = __webpack_require__(127);
const role_permissions_1 = __webpack_require__(34);
const tags_1 = __webpack_require__(94);
const nps_1 = __webpack_require__(172);
let TicketsModule = class TicketsModule {
};
exports.TicketsModule = TicketsModule;
exports.TicketsModule = TicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule, webhooks_1.WebhooksModule, shared_1.SharedModule, notifications_1.NotificationsModule, role_permissions_1.RolePermissionsModule, tags_1.TagsModule, nps_1.NpsModule],
        controllers: [tickets_controller_1.TicketsController],
        providers: [tickets_service_1.TicketsService],
        exports: [tickets_service_1.TicketsService],
    })
], TicketsModule);


/***/ }),
/* 218 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TicketsService_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const webhooks_1 = __webpack_require__(207);
const notifications_1 = __webpack_require__(127);
const tags_1 = __webpack_require__(94);
const nps_1 = __webpack_require__(172);
let TicketsService = class TicketsService {
    static { TicketsService_1 = this; }
    prisma;
    automation;
    audit;
    webhooks;
    notifications;
    realtime;
    tags;
    nps;
    logger = new common_1.Logger(TicketsService_1.name);
    constructor(prisma, automation, audit, webhooks, notifications, realtime, tags, nps) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
        this.webhooks = webhooks;
        this.notifications = notifications;
        this.realtime = realtime;
        this.tags = tags;
        this.nps = nps;
    }
    async notifyAssignee(assignedTo, title, body, link) {
        const notification = await this.notifications.create({ userId: assignedTo, title, body, link });
        this.realtime.notifyUser(assignedTo, 'notification:new', notification);
    }
    static DEFAULT_SLA_POLICY = {
        low: { responseHours: 24, resolutionHours: 72 },
        medium: { responseHours: 8, resolutionHours: 48 },
        high: { responseHours: 4, resolutionHours: 24 },
        critical: { responseHours: 1, resolutionHours: 8 },
    };
    async getSlaPolicy(tenantId) {
        const setting = await this.prisma.tenantSetting.findUnique({
            where: { key_tenantId: { key: 'slaPolicy', tenantId } },
        });
        let stored = {};
        if (setting) {
            try {
                stored = JSON.parse(setting.value);
            }
            catch {
                stored = {};
            }
        }
        const merged = {};
        for (const priority of Object.keys(TicketsService_1.DEFAULT_SLA_POLICY)) {
            merged[priority] = { ...TicketsService_1.DEFAULT_SLA_POLICY[priority], ...(stored[priority] || {}) };
        }
        return merged;
    }
    async setSlaPolicy(tenantId, policy) {
        await this.prisma.tenantSetting.upsert({
            where: { key_tenantId: { key: 'slaPolicy', tenantId } },
            create: { key: 'slaPolicy', value: JSON.stringify(policy), tenantId },
            update: { value: JSON.stringify(policy) },
        });
        return this.getSlaPolicy(tenantId);
    }
    async create(dto, userId, tenantId) {
        const priority = dto.priority || 'medium';
        const policy = await this.getSlaPolicy(tenantId);
        const { responseHours, resolutionHours } = policy[priority] || TicketsService_1.DEFAULT_SLA_POLICY.medium;
        const slaDeadline = new Date();
        slaDeadline.setHours(slaDeadline.getHours() + resolutionHours);
        const firstResponseDeadline = new Date();
        firstResponseDeadline.setHours(firstResponseDeadline.getHours() + responseHours);
        const ticket = await this.prisma.ticket.create({
            data: {
                subject: dto.subject,
                description: dto.description,
                priority,
                leadId: dto.leadId,
                assignedTo: dto.assignedTo,
                tenantId,
                slaDeadline,
                firstResponseDeadline,
            },
            include: { lead: { select: { id: true, name: true, email: true } } },
        });
        await this.audit.log({
            entity: 'ticket', entityId: ticket.id, action: 'created',
            changes: { subject: dto.subject, priority: dto.priority, leadId: dto.leadId },
            userId, tenantId,
        });
        await this.automation.evaluate('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
        await this.webhooks.emit('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
        if (ticket.assignedTo && ticket.assignedTo !== userId) {
            await this.notifyAssignee(ticket.assignedTo, 'Nuevo ticket asignado', ticket.subject, `/tickets/${ticket.id}`);
        }
        return ticket;
    }
    async findAll(tenantId, status, leadId, tagId) {
        const where = { tenantId };
        if (status)
            where.status = status;
        if (leadId)
            where.leadId = leadId;
        if (tagId) {
            const entityIds = await this.tags.entityIdsForTag('ticket', tagId, tenantId);
            where.id = { in: entityIds };
        }
        return this.prisma.ticket.findMany({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true } },
                _count: { select: { messages: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId, leadId) {
        const where = { id, tenantId };
        if (leadId)
            where.leadId = leadId;
        const ticket = await this.prisma.ticket.findFirst({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true, email: true } },
                messages: {
                    include: { author: { select: { id: true, name: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        return ticket;
    }
    async update(id, dto, tenantId) {
        const before = await this.findById(id, tenantId);
        const updated = await this.prisma.ticket.update({ where: { id }, data: dto });
        await this.audit.log({
            entity: 'ticket', entityId: id, action: 'updated',
            changes: dto, userId: before.assignedTo || before.leadId || '', tenantId,
        });
        await this.automation.evaluate('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
        await this.webhooks.emit('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
        if (dto.assignedTo && dto.assignedTo !== before.assignedTo) {
            await this.notifyAssignee(dto.assignedTo, 'Ticket asignado', updated.subject, `/tickets/${updated.id}`);
        }
        if (dto.status && ['resolved', 'closed'].includes(dto.status) && dto.status !== before.status) {
            try {
                await this.nps.createAndSendSurvey(id, tenantId);
            }
            catch { }
        }
        return updated;
    }
    async addMessage(ticketId, dto, userId, tenantId) {
        const ticket = await this.findById(ticketId, tenantId);
        const message = await this.prisma.ticketMessage.create({
            data: {
                ticketId,
                authorId: userId,
                content: dto.content,
                isInternal: dto.isInternal || false,
            },
            include: { author: { select: { id: true, name: true } } },
        });
        if (!dto.isInternal && userId && !ticket.firstRespondedAt) {
            await this.prisma.ticket.update({ where: { id: ticketId }, data: { firstRespondedAt: new Date() } });
        }
        return message;
    }
    async getSlaStatus(tenantId) {
        const now = new Date();
        const tickets = await this.prisma.ticket.findMany({
            where: { tenantId, status: { notIn: ['resolved', 'closed'] } },
            select: {
                id: true, number: true, subject: true, priority: true, status: true,
                slaDeadline: true, firstResponseDeadline: true, firstRespondedAt: true,
            },
        });
        return tickets.map((t) => ({
            ...t,
            slaBreached: t.slaDeadline ? t.slaDeadline < now : false,
            slaRemainingHours: t.slaDeadline ? Math.round((t.slaDeadline.getTime() - now.getTime()) / 3600000) : null,
            firstResponseBreached: t.firstResponseDeadline && !t.firstRespondedAt ? t.firstResponseDeadline < now : false,
            firstResponseRemainingHours: t.firstResponseDeadline && !t.firstRespondedAt
                ? Math.round((t.firstResponseDeadline.getTime() - now.getTime()) / 3600000)
                : null,
        }));
    }
    async createFromEmail(from, subject, body, tenantId) {
        const lead = await this.prisma.lead.findFirst({
            where: { tenantId, email: { equals: from, mode: 'insensitive' } },
        });
        const ticket = await this.create({ subject: `[Email] ${subject}`, description: body.substring(0, 2000), leadId: lead?.id }, lead?.ownerId || '', tenantId);
        this.logger.log(`Ticket #${ticket.number} created from email: ${subject}`);
        return ticket;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = TicketsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object, typeof (_d = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _d : Object, typeof (_e = typeof notifications_1.NotificationsService !== "undefined" && notifications_1.NotificationsService) === "function" ? _e : Object, typeof (_f = typeof shared_1.RealtimeGateway !== "undefined" && shared_1.RealtimeGateway) === "function" ? _f : Object, typeof (_g = typeof tags_1.TagsService !== "undefined" && tags_1.TagsService) === "function" ? _g : Object, typeof (_h = typeof nps_1.NpsService !== "undefined" && nps_1.NpsService) === "function" ? _h : Object])
], TicketsService);


/***/ }),
/* 219 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const tickets_service_1 = __webpack_require__(218);
const create_ticket_dto_1 = __webpack_require__(220);
const role_permissions_1 = __webpack_require__(34);
let TicketsController = class TicketsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(status, tagId, user) {
        if (user.isPortal) {
            return this.service.findAll(user.tenantId, status, user.id);
        }
        return this.service.findAll(user.tenantId, status, undefined, tagId);
    }
    getSla(user) {
        return this.service.getSlaStatus(user.tenantId);
    }
    getSlaPolicy(user) {
        return this.service.getSlaPolicy(user.tenantId);
    }
    setSlaPolicy(dto, user) {
        return this.service.setSlaPolicy(user.tenantId, dto);
    }
    findById(id, user) {
        if (user.isPortal) {
            return this.service.findById(id, user.tenantId, user.id);
        }
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    addMessage(id, dto, user) {
        return this.service.addMessage(id, dto, user.id, user.tenantId);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un ticket de soporte' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_ticket_dto_1.CreateTicketDto !== "undefined" && create_ticket_dto_1.CreateTicketDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista tickets (filtrados por estado)' }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('tagId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sla'),
    (0, swagger_1.ApiOperation)({ summary: 'Estado de cumplimiento de SLA' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getSla", null);
__decorate([
    (0, common_1.Get)('sla-policy'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la política de SLA configurada por prioridad' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getSlaPolicy", null);
__decorate([
    (0, common_1.Patch)('sla-policy'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Configura la política de SLA por prioridad' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "setSlaPolicy", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un ticket por id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_ticket_dto_1.UpdateTicketDto !== "undefined" && create_ticket_dto_1.UpdateTicketDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Agrega un mensaje a un ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof create_ticket_dto_1.AddMessageDto !== "undefined" && create_ticket_dto_1.AddMessageDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "addMessage", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof tickets_service_1.TicketsService !== "undefined" && tickets_service_1.TicketsService) === "function" ? _a : Object])
], TicketsController);


/***/ }),
/* 220 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddMessageDto = exports.UpdateTicketDto = exports.CreateTicketDto = void 0;
const class_validator_1 = __webpack_require__(39);
const mapped_types_1 = __webpack_require__(102);
class CreateTicketDto {
    subject;
    description;
    priority;
    leadId;
    assignedTo;
}
exports.CreateTicketDto = CreateTicketDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "leadId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "assignedTo", void 0);
class UpdateTicketDto extends (0, mapped_types_1.PartialType)(CreateTicketDto) {
    status;
}
exports.UpdateTicketDto = UpdateTicketDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "status", void 0);
class AddMessageDto {
    content;
    isInternal;
}
exports.AddMessageDto = AddMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddMessageDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AddMessageDto.prototype, "isInternal", void 0);


/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeyGuard = exports.ApiKeysService = exports.ApiKeysModule = void 0;
var api_keys_module_1 = __webpack_require__(222);
Object.defineProperty(exports, "ApiKeysModule", ({ enumerable: true, get: function () { return api_keys_module_1.ApiKeysModule; } }));
var api_keys_service_1 = __webpack_require__(223);
Object.defineProperty(exports, "ApiKeysService", ({ enumerable: true, get: function () { return api_keys_service_1.ApiKeysService; } }));
var api_key_guard_1 = __webpack_require__(225);
Object.defineProperty(exports, "ApiKeyGuard", ({ enumerable: true, get: function () { return api_key_guard_1.ApiKeyGuard; } }));


/***/ }),
/* 222 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeysModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const api_keys_service_1 = __webpack_require__(223);
const api_keys_controller_1 = __webpack_require__(224);
let ApiKeysModule = class ApiKeysModule {
};
exports.ApiKeysModule = ApiKeysModule;
exports.ApiKeysModule = ApiKeysModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [api_keys_controller_1.ApiKeysController],
        providers: [api_keys_service_1.ApiKeysService],
        exports: [api_keys_service_1.ApiKeysService],
    })
], ApiKeysModule);


/***/ }),
/* 223 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeysService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const crypto = __importStar(__webpack_require__(18));
let ApiKeysService = class ApiKeysService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name, tenantId) {
        const key = `crm_${crypto.randomBytes(24).toString('hex')}`;
        return this.prisma.apiKey.create({ data: { name, key, tenantId } });
    }
    async findAll(tenantId) {
        return this.prisma.apiKey.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
    }
    async update(id, dto, tenantId) {
        return this.prisma.apiKey.updateMany({ where: { id, tenantId }, data: dto });
    }
    async remove(id, tenantId) {
        const key = await this.prisma.apiKey.findFirst({ where: { id, tenantId } });
        if (!key)
            throw new common_1.NotFoundException('API key not found');
        return this.prisma.apiKey.delete({ where: { id } });
    }
    async validate(key) {
        const record = await this.prisma.apiKey.findUnique({ where: { key, active: true } });
        if (!record)
            return null;
        await this.prisma.apiKey.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } });
        return { tenantId: record.tenantId };
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ApiKeysService);


/***/ }),
/* 224 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeysController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const api_keys_service_1 = __webpack_require__(223);
let ApiKeysController = class ApiKeysController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(name, user) {
        return this.service.create(name, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.ApiKeysController = ApiKeysController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea una nueva API key para integraciones externas' }),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista las API keys del tenant' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Activa o desactiva una API key' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina una API key' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "remove", null);
exports.ApiKeysController = ApiKeysController = __decorate([
    (0, swagger_1.ApiTags)('API Keys'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api-keys'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof api_keys_service_1.ApiKeysService !== "undefined" && api_keys_service_1.ApiKeysService) === "function" ? _a : Object])
], ApiKeysController);


/***/ }),
/* 225 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeyGuard = void 0;
const common_1 = __webpack_require__(2);
const api_keys_service_1 = __webpack_require__(223);
let ApiKeyGuard = class ApiKeyGuard {
    apiKeysService;
    constructor(apiKeysService) {
        this.apiKeysService = apiKeysService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const key = request.headers['x-api-key'];
        if (!key)
            throw new common_1.UnauthorizedException('Missing x-api-key header');
        const result = await this.apiKeysService.validate(key);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid API key');
        request.apiKeyTenantId = result.tenantId;
        return true;
    }
};
exports.ApiKeyGuard = ApiKeyGuard;
exports.ApiKeyGuard = ApiKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof api_keys_service_1.ApiKeysService !== "undefined" && api_keys_service_1.ApiKeysService) === "function" ? _a : Object])
], ApiKeyGuard);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappService = exports.WhatsappModule = void 0;
var whatsapp_module_1 = __webpack_require__(227);
Object.defineProperty(exports, "WhatsappModule", ({ enumerable: true, get: function () { return whatsapp_module_1.WhatsappModule; } }));
var whatsapp_service_1 = __webpack_require__(228);
Object.defineProperty(exports, "WhatsappService", ({ enumerable: true, get: function () { return whatsapp_service_1.WhatsappService; } }));


/***/ }),
/* 227 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const whatsapp_service_1 = __webpack_require__(228);
const whatsapp_controller_1 = __webpack_require__(229);
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [whatsapp_controller_1.WhatsappController],
        providers: [whatsapp_service_1.WhatsappService],
        exports: [whatsapp_service_1.WhatsappService],
    })
], WhatsappModule);


/***/ }),
/* 228 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WhatsappService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let WhatsappService = WhatsappService_1 = class WhatsappService {
    prisma;
    logger = new common_1.Logger(WhatsappService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertConfig(dto, tenantId) {
        return this.prisma.whatsappConfig.upsert({
            where: { tenantId },
            create: { ...dto, tenantId },
            update: dto,
        });
    }
    async getConfig(tenantId) {
        return this.prisma.whatsappConfig.findUnique({ where: { tenantId } });
    }
    async sendTemplate(tenantId, to, templateName, params = {}) {
        const config = await this.getConfig(tenantId);
        if (!config)
            throw new common_1.NotFoundException('WhatsApp not configured');
        const body = {
            messaging_product: 'whatsapp',
            to,
            type: 'template',
            template: {
                name: templateName,
                language: { code: 'es' },
                components: Object.keys(params).length > 0
                    ? [{ type: 'body', parameters: Object.entries(params).map(([k, v]) => ({ type: 'text', text: v })) }]
                    : undefined,
            },
        };
        try {
            const res = await fetch(`https://graph.facebook.com/v21.0/${config.phoneNumberId}/messages`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${config.accessToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.error?.message || 'WhatsApp API error');
            return data;
        }
        catch (err) {
            this.logger.error(`WhatsApp send error: ${err.message}`);
            throw err;
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], WhatsappService);


/***/ }),
/* 229 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const whatsapp_service_1 = __webpack_require__(228);
const whatsapp_dto_1 = __webpack_require__(230);
let WhatsappController = class WhatsappController {
    service;
    constructor(service) {
        this.service = service;
    }
    upsertConfig(dto, user) {
        return this.service.upsertConfig(dto, user.tenantId);
    }
    getConfig(user) {
        return this.service.getConfig(user.tenantId);
    }
    send(dto, user) {
        return this.service.sendTemplate(user.tenantId, dto.to, dto.templateName, dto.params);
    }
};
exports.WhatsappController = WhatsappController;
__decorate([
    (0, common_1.Put)('config'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof whatsapp_dto_1.UpsertWhatsappConfigDto !== "undefined" && whatsapp_dto_1.UpsertWhatsappConfigDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "upsertConfig", null);
__decorate([
    (0, common_1.Get)('config'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof whatsapp_dto_1.SendWhatsappDto !== "undefined" && whatsapp_dto_1.SendWhatsappDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "send", null);
exports.WhatsappController = WhatsappController = __decorate([
    (0, common_1.Controller)('whatsapp'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof whatsapp_service_1.WhatsappService !== "undefined" && whatsapp_service_1.WhatsappService) === "function" ? _a : Object])
], WhatsappController);


/***/ }),
/* 230 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendWhatsappDto = exports.UpsertWhatsappConfigDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpsertWhatsappConfigDto {
    phoneNumberId;
    accessToken;
    businessId;
}
exports.UpsertWhatsappConfigDto = UpsertWhatsappConfigDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertWhatsappConfigDto.prototype, "phoneNumberId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertWhatsappConfigDto.prototype, "accessToken", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpsertWhatsappConfigDto.prototype, "businessId", void 0);
class SendWhatsappDto {
    to;
    templateName;
    params;
}
exports.SendWhatsappDto = SendWhatsappDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendWhatsappDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendWhatsappDto.prototype, "templateName", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], SendWhatsappDto.prototype, "params", void 0);


/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantService = exports.AiAssistantModule = void 0;
var ai_assistant_module_1 = __webpack_require__(232);
Object.defineProperty(exports, "AiAssistantModule", ({ enumerable: true, get: function () { return ai_assistant_module_1.AiAssistantModule; } }));
var ai_assistant_service_1 = __webpack_require__(233);
Object.defineProperty(exports, "AiAssistantService", ({ enumerable: true, get: function () { return ai_assistant_service_1.AiAssistantService; } }));


/***/ }),
/* 232 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const ai_assistant_service_1 = __webpack_require__(233);
const ai_assistant_controller_1 = __webpack_require__(234);
let AiAssistantModule = class AiAssistantModule {
};
exports.AiAssistantModule = AiAssistantModule;
exports.AiAssistantModule = AiAssistantModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [ai_assistant_controller_1.AiAssistantController],
        providers: [ai_assistant_service_1.AiAssistantService],
        exports: [ai_assistant_service_1.AiAssistantService],
    })
], AiAssistantModule);


/***/ }),
/* 233 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let AiAssistantService = class AiAssistantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSuggestions(entity, entityId, tenantId) {
        if (entity === 'lead' || entity === 'deal') {
            return this.getLeadSuggestions(entityId, tenantId);
        }
        return [];
    }
    async getLeadSuggestions(leadId, tenantId) {
        const lead = await this.prisma.lead.findFirst({
            where: { id: leadId, tenantId },
        });
        if (!lead)
            return [];
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const currentIdx = stages.findIndex((s) => s.name === lead.status);
        const nextStage = stages[currentIdx + 1];
        const suggestions = [];
        if (nextStage) {
            suggestions.push({
                action: `Mover a etapa "${nextStage.name}"`,
                reason: `La oportunidad "${lead.name}" está lista para avanzar en el pipeline`,
                category: 'pipeline',
            });
        }
        const lastActivity = await this.prisma.activity.findFirst({
            where: { leadId, tenantId },
            orderBy: { createdAt: 'desc' },
        });
        if (!lastActivity || this.daysSince(lastActivity.createdAt) > 7) {
            suggestions.push({
                action: 'Agendar seguimiento',
                reason: 'No hay actividad registrada en los últimos 7 días',
                category: 'engagement',
            });
        }
        if (lead.email) {
            suggestions.push({
                action: `Enviar correo a ${lead.name}`,
                reason: 'Mantener contacto con el cliente para avanzar la negociación',
                category: 'communication',
            });
        }
        return suggestions;
    }
    async summarizeNote(content) {
        const lines = content.split('\n').filter(Boolean);
        if (lines.length <= 3)
            return content;
        const first = lines[0];
        const keywords = content.match(/\b(acordó|decidió|próximo|pendiente|fecha|entregar|cobrar|pagar|reunión|llamada|seguimiento)\b/gi) || [];
        const keywordStr = keywords.length > 0 ? `Palabras clave: ${[...new Set(keywords)].slice(0, 5).join(', ')}` : '';
        return `${first}\n\n${keywordStr}\n\nLíneas: ${lines.length} | Resumen automático generado.`;
    }
    daysSince(date) {
        return Math.floor((Date.now() - date.getTime()) / 86400000);
    }
};
exports.AiAssistantService = AiAssistantService;
exports.AiAssistantService = AiAssistantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], AiAssistantService);


/***/ }),
/* 234 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const ai_assistant_service_1 = __webpack_require__(233);
let AiAssistantController = class AiAssistantController {
    service;
    constructor(service) {
        this.service = service;
    }
    getSuggestions(entity, entityId, user) {
        return this.service.getSuggestions(entity, entityId, user.tenantId);
    }
    summarize(content) {
        return this.service.summarizeNote(content || '');
    }
};
exports.AiAssistantController = AiAssistantController;
__decorate([
    (0, common_1.Get)('suggestions/:entity/:entityId'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('entityId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AiAssistantController.prototype, "getSuggestions", null);
__decorate([
    (0, common_1.Post)('summarize'),
    __param(0, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiAssistantController.prototype, "summarize", null);
exports.AiAssistantController = AiAssistantController = __decorate([
    (0, common_1.Controller)('ai'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof ai_assistant_service_1.AiAssistantService !== "undefined" && ai_assistant_service_1.AiAssistantService) === "function" ? _a : Object])
], AiAssistantController);


/***/ }),
/* 235 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsService = exports.LeadsModule = void 0;
var leads_module_1 = __webpack_require__(236);
Object.defineProperty(exports, "LeadsModule", ({ enumerable: true, get: function () { return leads_module_1.LeadsModule; } }));
var leads_service_1 = __webpack_require__(237);
Object.defineProperty(exports, "LeadsService", ({ enumerable: true, get: function () { return leads_service_1.LeadsService; } }));


/***/ }),
/* 236 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsModule = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const bullmq_2 = __webpack_require__(82);
const leads_service_1 = __webpack_require__(237);
const leads_controller_1 = __webpack_require__(238);
const health_processor_1 = __webpack_require__(240);
const webhooks_1 = __webpack_require__(207);
const role_permissions_1 = __webpack_require__(34);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const tags_1 = __webpack_require__(94);
let LeadsModule = class LeadsModule {
    healthQueue;
    constructor(healthQueue) {
        this.healthQueue = healthQueue;
    }
    async onModuleInit() {
        await this.healthQueue.add('recalculate-all', {}, { repeat: { pattern: '0 3 * * *' }, jobId: 'daily-health-recalc' });
    }
};
exports.LeadsModule = LeadsModule;
exports.LeadsModule = LeadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            webhooks_1.WebhooksModule,
            role_permissions_1.RolePermissionsModule,
            shared_1.SharedModule,
            automation_1.AutomationModule,
            audit_1.AuditModule,
            tags_1.TagsModule,
            bullmq_1.BullModule.registerQueue({ name: 'health' }),
        ],
        controllers: [leads_controller_1.LeadsController],
        providers: [leads_service_1.LeadsService, health_processor_1.HealthProcessor],
        exports: [leads_service_1.LeadsService],
    }),
    __param(0, (0, bullmq_1.InjectQueue)('health')),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _a : Object])
], LeadsModule);


/***/ }),
/* 237 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const webhooks_1 = __webpack_require__(207);
const automation_1 = __webpack_require__(79);
const audit_1 = __webpack_require__(90);
const tags_1 = __webpack_require__(94);
const VALID_CURRENCIES = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
function omitPortalPassword(lead) {
    const { portalPassword, ...rest } = lead;
    return rest;
}
let LeadsService = class LeadsService {
    prisma;
    webhooks;
    realtime;
    automation;
    audit;
    tags;
    constructor(prisma, webhooks, realtime, automation, audit, tags) {
        this.prisma = prisma;
        this.webhooks = webhooks;
        this.realtime = realtime;
        this.automation = automation;
        this.audit = audit;
        this.tags = tags;
    }
    async checkStageQuota(tenantId, stageName) {
        const stage = await this.prisma.pipelineStage.findFirst({ where: { tenantId, name: stageName } });
        if (!stage?.maxLeads)
            return;
        const count = await this.prisma.lead.count({ where: { tenantId, status: stageName } });
        if (count >= stage.maxLeads) {
            throw new common_1.BadRequestException(`La etapa "${stageName}" alcanzó su cupo máximo de ${stage.maxLeads} leads.`);
        }
    }
    async validateSubPhase(tenantId, stageName, subPhaseId) {
        const subPhase = await this.prisma.pipelineSubPhase.findFirst({
            where: { id: subPhaseId, tenantId },
            include: { pipelineStage: true },
        });
        if (!subPhase || subPhase.pipelineStage.name !== stageName) {
            throw new common_1.BadRequestException('La sub-fase no pertenece a la etapa seleccionada.');
        }
    }
    async create(dto, ownerId, tenantId) {
        const currency = dto.currency ?? 'MXN';
        if (!VALID_CURRENCIES.includes(currency)) {
            throw new common_1.BadRequestException(`Invalid currency: ${currency}`);
        }
        let status = dto.status;
        if (!status) {
            const firstStage = await this.prisma.pipelineStage.findFirst({
                where: { tenantId },
                orderBy: { order: 'asc' },
            });
            status = firstStage?.name ?? 'new';
        }
        await this.checkStageQuota(tenantId, status);
        if (dto.subPhaseId) {
            await this.validateSubPhase(tenantId, status, dto.subPhaseId);
        }
        const lead = await this.prisma.$transaction(async (tx) => {
            const created = await tx.lead.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    company: dto.company,
                    source: dto.source || 'web',
                    status,
                    score: dto.score ?? 0,
                    notes: dto.notes,
                    value: dto.value ?? 0,
                    currency: currency,
                    expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : undefined,
                    customFields: dto.customFields,
                    campaignId: dto.campaignId,
                    companyId: dto.companyId,
                    companyName: dto.companyName,
                    position: dto.position,
                    customerStatus: dto.customerStatus,
                    utmSource: dto.utmSource,
                    utmMedium: dto.utmMedium,
                    utmCampaign: dto.utmCampaign,
                    utmTerm: dto.utmTerm,
                    utmContent: dto.utmContent,
                    careerId: dto.careerId,
                    modalityId: dto.modalityId,
                    subPhaseId: dto.subPhaseId,
                    referredByLeadId: dto.referredByLeadId,
                    ownerId,
                    tenantId,
                },
            });
            await tx.leadStageHistory.create({
                data: { leadId: created.id, tenantId, fromStage: null, toStage: status, enteredAt: created.createdAt },
            });
            return created;
        });
        await this.audit.log({
            entity: 'lead', entityId: lead.id, action: 'created',
            changes: { name: dto.name, value: dto.value, status }, userId: ownerId, tenantId,
        });
        await this.automation.evaluate('lead.created', { ...lead, entity: 'lead', entityId: lead.id }, tenantId);
        await this.webhooks.emit('lead.created', lead, tenantId);
        return omitPortalPassword(lead);
    }
    async findAll(query, user) {
        const tenantId = user.tenantId;
        const { search, status, source, campaignId, companyId, customerStatus, careerId, modalityId, tagId, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (user.role === 'seller') {
            where.ownerId = user.id;
        }
        if (status)
            where.status = status;
        if (source)
            where.source = source;
        if (campaignId)
            where.campaignId = campaignId;
        if (companyId)
            where.companyId = companyId;
        if (customerStatus)
            where.customerStatus = customerStatus;
        if (careerId)
            where.careerId = careerId;
        if (modalityId)
            where.modalityId = modalityId;
        if (tagId) {
            const entityIds = await this.tags.entityIdsForTag('lead', tagId, tenantId);
            where.id = { in: entityIds };
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
                { companyName: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.lead.findMany({
                where,
                include: { owner: { select: { id: true, name: true } } },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.lead.count({ where }),
        ]);
        return { data: data.map(omitPortalPassword), total, page, limit };
    }
    async getPipeline(user) {
        const tenantId = user.tenantId;
        const [stages, leads] = await Promise.all([
            this.prisma.pipelineStage.findMany({
                where: { tenantId },
                orderBy: { order: 'asc' },
            }),
            this.prisma.lead.findMany({
                where: { tenantId, ...(user.role === 'seller' ? { ownerId: user.id } : {}) },
                include: {
                    owner: { select: { id: true, name: true } },
                    subPhase: { select: { id: true, name: true } },
                },
                orderBy: { updatedAt: 'desc' },
            }),
        ]);
        const safeLeads = leads.map(omitPortalPassword);
        const stagesWithLeads = stages.map((stage) => ({
            ...stage,
            leads: safeLeads.filter((l) => l.status === stage.name),
        }));
        return { stages: stagesWithLeads };
    }
    async findById(id, user) {
        const tenantId = user.tenantId;
        const lead = await this.prisma.lead.findFirst({
            where: { id, tenantId, ...(user.role === 'seller' ? { ownerId: user.id } : {}) },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                account: { select: { id: true, name: true } },
                campaign: { select: { id: true, name: true, channel: true } },
                career: { select: { id: true, name: true } },
                modality: { select: { id: true, name: true } },
                subPhase: { select: { id: true, name: true } },
                activities: { orderBy: { createdAt: 'desc' }, take: 10 },
                referredByLead: { select: { id: true, name: true } },
            },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return omitPortalPassword(lead);
    }
    async update(id, dto, user) {
        const tenantId = user.tenantId;
        const existing = await this.findById(id, user);
        const data = {
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            company: dto.company,
            source: dto.source,
            status: dto.status,
            score: dto.score,
            notes: dto.notes,
            value: dto.value,
            campaignId: dto.campaignId,
            companyId: dto.companyId,
            companyName: dto.companyName,
            position: dto.position,
            customerStatus: dto.customerStatus,
            customFields: dto.customFields,
            utmSource: dto.utmSource,
            utmMedium: dto.utmMedium,
            utmCampaign: dto.utmCampaign,
            utmTerm: dto.utmTerm,
            utmContent: dto.utmContent,
            careerId: dto.careerId,
            modalityId: dto.modalityId,
            subPhaseId: dto.subPhaseId,
            referredByLeadId: dto.referredByLeadId,
            isPartner: dto.isPartner,
        };
        if (dto.currency !== undefined) {
            if (!VALID_CURRENCIES.includes(dto.currency)) {
                throw new common_1.BadRequestException(`Invalid currency: ${dto.currency}`);
            }
            data.currency = dto.currency;
        }
        if (dto.expectedCloseDate)
            data.expectedCloseDate = new Date(dto.expectedCloseDate);
        Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
        if (dto.status !== undefined && dto.status !== existing.status) {
            await this.checkStageQuota(tenantId, dto.status);
            if (dto.subPhaseId) {
                await this.validateSubPhase(tenantId, dto.status, dto.subPhaseId);
            }
            else if (dto.subPhaseId === undefined) {
                data.subPhaseId = null;
            }
        }
        else if (dto.subPhaseId) {
            await this.validateSubPhase(tenantId, dto.status ?? existing.status, dto.subPhaseId);
        }
        const updated = await this.prisma.lead.update({ where: { id }, data });
        await this.automation.evaluate('lead.updated', { ...updated, entity: 'lead', entityId: id }, tenantId);
        await this.webhooks.emit('lead.updated', updated, tenantId);
        if (dto.status !== undefined) {
            if (dto.status !== existing.status) {
                await this.prisma.$transaction([
                    this.prisma.leadStageHistory.updateMany({
                        where: { leadId: id, exitedAt: null },
                        data: { exitedAt: updated.updatedAt },
                    }),
                    this.prisma.leadStageHistory.create({
                        data: { leadId: id, tenantId, fromStage: existing.status, toStage: dto.status, enteredAt: updated.updatedAt },
                    }),
                ]);
            }
            await this.audit.log({
                entity: 'lead', entityId: id, action: 'status_changed',
                changes: { status: dto.status }, userId: updated.ownerId, tenantId,
            });
            await this.automation.evaluate('lead.stage_changed', { ...updated, entity: 'lead', entityId: id }, tenantId);
            await this.webhooks.emit('lead.stage_changed', { ...updated, entity: 'lead', entityId: id }, tenantId);
            this.realtime.broadcastToTenant(tenantId, 'lead:updated', omitPortalPassword(updated));
        }
        return omitPortalPassword(updated);
    }
    async remove(id, user) {
        const tenantId = user.tenantId;
        await this.findById(id, user);
        return this.prisma.lead.delete({ where: { id } });
    }
    async recalculateScore(id, user) {
        const tenantId = user.tenantId;
        const lead = await this.findById(id, user);
        let score = 0;
        if (lead.email)
            score += 10;
        if (lead.phone)
            score += 10;
        if (lead.company)
            score += 15;
        if (lead.source === 'referral')
            score += 20;
        if (lead.source === 'organic')
            score += 10;
        const updated = await this.prisma.lead.update({ where: { id }, data: { score } });
        return omitPortalPassword(updated);
    }
    async computeHealth(leadId, tenantId) {
        const contracts = await this.prisma.contract.findMany({
            where: { leadId, tenantId },
            include: { subscription: { include: { invoices: true } } },
        });
        if (contracts.length === 0) {
            return { score: null, status: 'unknown' };
        }
        const lastActivity = await this.prisma.activity.findFirst({
            where: { leadId, tenantId },
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true },
        });
        const openTickets = await this.prisma.ticket.findMany({
            where: { leadId, tenantId, status: { in: ['open', 'in_progress'] } },
            select: { priority: true },
        });
        let score = 100;
        if (!lastActivity) {
            score -= 30;
        }
        else {
            const daysSinceActivity = Math.floor((Date.now() - lastActivity.createdAt.getTime()) / (24 * 3600000));
            if (daysSinceActivity > 30)
                score -= 25;
            else if (daysSinceActivity >= 15)
                score -= 10;
        }
        const ticketPenaltyWeights = { critical: 15, high: 8, medium: 4, low: 2 };
        const ticketPenalty = Math.min(openTickets.reduce((sum, t) => sum + (ticketPenaltyWeights[t.priority] ?? 0), 0), 35);
        score -= ticketPenalty;
        const subscriptions = contracts.map((c) => c.subscription).filter((s) => !!s);
        const hasCancelledSubscription = subscriptions.some((s) => s.status === 'cancelled');
        if (hasCancelledSubscription) {
            score -= 40;
        }
        else {
            const overdueCount = subscriptions.reduce((sum, s) => sum + s.invoices.filter((i) => i.status === 'overdue').length, 0);
            score -= Math.min(overdueCount * 15, 30);
            const hasRecentPayment = subscriptions.some((s) => s.status === 'active' &&
                s.invoices.every((i) => i.status !== 'overdue') &&
                s.invoices.some((i) => i.status === 'paid' && i.paidAt && Date.now() - i.paidAt.getTime() <= 35 * 24 * 3600000));
            if (overdueCount === 0 && hasRecentPayment)
                score += 5;
            const hasUpcomingRenewal = subscriptions.some((s) => s.status === 'active' &&
                s.nextBillingDate &&
                s.nextBillingDate.getTime() - Date.now() <= 14 * 24 * 3600000 &&
                s.nextBillingDate.getTime() >= Date.now());
            if (hasUpcomingRenewal)
                score -= 10;
        }
        score = Math.max(0, Math.min(100, score));
        const status = score >= 70 ? 'healthy' : score >= 40 ? 'at_risk' : 'critical';
        return { score, status };
    }
    async recalculateHealth(id, user) {
        const tenantId = user.tenantId;
        await this.findById(id, user);
        const { score, status } = await this.computeHealth(id, tenantId);
        const updated = await this.prisma.lead.update({
            where: { id },
            data: { healthScore: score, healthStatus: status },
        });
        return omitPortalPassword(updated);
    }
    async recalculateAllForTenant(tenantId) {
        const contracts = await this.prisma.contract.findMany({
            where: { tenantId },
            select: { leadId: true },
            distinct: ['leadId'],
        });
        let updated = 0;
        for (const { leadId } of contracts) {
            const { score, status } = await this.computeHealth(leadId, tenantId);
            await this.prisma.lead.update({
                where: { id: leadId },
                data: { healthScore: score, healthStatus: status },
            });
            updated++;
        }
        return { updated };
    }
    async findDuplicates(tenantId) {
        const leads = await this.prisma.lead.findMany({
            where: { tenantId },
            select: {
                id: true, name: true, email: true, phone: true, company: true, companyName: true,
                status: true, value: true, ownerId: true, createdAt: true,
                owner: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
        const groupsByKey = new Map();
        for (const lead of leads) {
            if (lead.email) {
                const key = `email:${lead.email.trim().toLowerCase()}`;
                groupsByKey.set(key, [...(groupsByKey.get(key) || []), lead]);
            }
            if (lead.phone) {
                const digits = lead.phone.replace(/\D/g, '');
                if (digits.length >= 7) {
                    const key = `phone:${digits}`;
                    groupsByKey.set(key, [...(groupsByKey.get(key) || []), lead]);
                }
            }
        }
        const seen = new Set();
        const groups = [];
        for (const [key, group] of groupsByKey) {
            if (group.length < 2)
                continue;
            const dedupeKey = group.map((l) => l.id).sort().join(',');
            if (seen.has(dedupeKey))
                continue;
            seen.add(dedupeKey);
            groups.push({ matchedBy: key.startsWith('email:') ? 'email' : 'phone', leads: group });
        }
        return groups;
    }
    async merge(primaryId, duplicateIds, userId, tenantId) {
        const ids = duplicateIds.filter((id) => id !== primaryId);
        if (ids.length === 0)
            throw new common_1.BadRequestException('No hay duplicados para fusionar');
        const primary = await this.prisma.lead.findFirst({ where: { id: primaryId, tenantId } });
        if (!primary)
            throw new common_1.NotFoundException('Lead principal no encontrado');
        const duplicates = await this.prisma.lead.findMany({ where: { id: { in: ids }, tenantId } });
        if (duplicates.length !== ids.length)
            throw new common_1.NotFoundException('Algún lead duplicado no existe');
        await this.prisma.$transaction(async (tx) => {
            for (const dup of duplicates) {
                await tx.activity.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
                await tx.quote.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
                await tx.ticket.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
                await tx.email.updateMany({ where: { leadId: dup.id }, data: { leadId: primaryId } });
                const recipients = await tx.campaignRecipient.findMany({ where: { leadId: dup.id } });
                for (const recipient of recipients) {
                    const existing = await tx.campaignRecipient.findFirst({
                        where: { campaignId: recipient.campaignId, leadId: primaryId },
                    });
                    if (existing) {
                        await tx.campaignRecipient.delete({ where: { id: recipient.id } });
                    }
                    else {
                        await tx.campaignRecipient.update({ where: { id: recipient.id }, data: { leadId: primaryId } });
                    }
                }
                await tx.note.updateMany({ where: { relatedType: 'lead', relatedId: dup.id }, data: { relatedId: primaryId } });
                await tx.fileAttachment.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
                await tx.auditLog.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
                await tx.aiSuggestion.updateMany({ where: { entity: 'lead', entityId: dup.id }, data: { entityId: primaryId } });
                await tx.task.updateMany({ where: { relatedType: 'lead', relatedId: dup.id }, data: { relatedId: primaryId } });
                await tx.lead.delete({ where: { id: dup.id } });
            }
            const fill = {};
            for (const field of ['email', 'phone', 'company', 'companyName', 'position', 'customerStatus', 'companyId', 'campaignId']) {
                if (!primary[field]) {
                    const fromDup = duplicates.find((d) => d[field]);
                    if (fromDup)
                        fill[field] = fromDup[field];
                }
            }
            if (Object.keys(fill).length > 0) {
                await tx.lead.update({ where: { id: primaryId }, data: fill });
            }
        });
        await this.audit.log({
            entity: 'lead', entityId: primaryId, action: 'merged',
            changes: { mergedIds: ids }, userId, tenantId,
        });
        return this.findById(primaryId, tenantId);
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _b : Object, typeof (_c = typeof shared_1.RealtimeGateway !== "undefined" && shared_1.RealtimeGateway) === "function" ? _c : Object, typeof (_d = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _d : Object, typeof (_e = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _e : Object, typeof (_f = typeof tags_1.TagsService !== "undefined" && tags_1.TagsService) === "function" ? _f : Object])
], LeadsService);


/***/ }),
/* 238 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const leads_service_1 = __webpack_require__(237);
const create_lead_dto_1 = __webpack_require__(239);
const role_permissions_1 = __webpack_require__(34);
let LeadsController = class LeadsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.service.findAll(query, user);
    }
    getPipeline(user) {
        return this.service.getPipeline(user);
    }
    recalculateAllHealth(user) {
        return this.service.recalculateAllForTenant(user.tenantId);
    }
    findDuplicates(user) {
        return this.service.findDuplicates(user.tenantId);
    }
    merge(dto, user) {
        return this.service.merge(dto.primaryId, dto.duplicateIds, user.id, user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user);
    }
    remove(id, user) {
        return this.service.remove(id, user);
    }
    recalculateScore(id, user) {
        return this.service.recalculateScore(id, user);
    }
    recalculateHealth(id, user) {
        return this.service.recalculateHealth(id, user);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un lead' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_lead_dto_1.CreateLeadDto !== "undefined" && create_lead_dto_1.CreateLeadDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista leads con filtros y paginación' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_lead_dto_1.QueryLeadDto !== "undefined" && create_lead_dto_1.QueryLeadDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pipeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumen del pipeline de ventas' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "getPipeline", null);
__decorate([
    (0, common_1.Post)('recalculate-health'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Recalcula el health score de todos los leads con contrato del tenant' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "recalculateAllHealth", null);
__decorate([
    (0, common_1.Get)('duplicates'),
    (0, swagger_1.ApiOperation)({ summary: 'Detecta leads potencialmente duplicados' }),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findDuplicates", null);
__decorate([
    (0, common_1.Post)('merge'),
    (0, swagger_1.ApiOperation)({ summary: 'Fusiona leads duplicados en uno solo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "merge", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un lead por id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_lead_dto_1.UpdateLeadDto !== "undefined" && create_lead_dto_1.UpdateLeadDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/recalculate-score'),
    (0, swagger_1.ApiOperation)({ summary: 'Recalcula el score de ventas del lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "recalculateScore", null);
__decorate([
    (0, common_1.Post)(':id/recalculate-health'),
    (0, swagger_1.ApiOperation)({ summary: 'Recalcula el health score de retención del lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "recalculateHealth", null);
exports.LeadsController = LeadsController = __decorate([
    (0, swagger_1.ApiTags)('Leads'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('leads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof leads_service_1.LeadsService !== "undefined" && leads_service_1.LeadsService) === "function" ? _a : Object])
], LeadsController);


/***/ }),
/* 239 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryLeadDto = exports.UpdateLeadDto = exports.CreateLeadDto = void 0;
const class_validator_1 = __webpack_require__(39);
const class_transformer_1 = __webpack_require__(104);
const CONTACT_STATUSES = ['new', 'contacted', 'qualified', 'lost'];
class CreateLeadDto {
    name;
    email;
    phone;
    company;
    source;
    status;
    score;
    notes;
    value;
    currency;
    expectedCloseDate;
    customFields;
    campaignId;
    companyId;
    companyName;
    position;
    customerStatus;
    utmSource;
    utmMedium;
    utmCampaign;
    utmTerm;
    utmContent;
    careerId;
    modalityId;
    subPhaseId;
    referredByLeadId;
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateLeadDto.prototype, "customFields", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "campaignId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsIn)(CONTACT_STATUSES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "customerStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "utmSource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "utmMedium", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "utmCampaign", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "utmTerm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "utmContent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "careerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "modalityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "subPhaseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "referredByLeadId", void 0);
class UpdateLeadDto {
    name;
    email;
    phone;
    company;
    source;
    status;
    score;
    notes;
    value;
    currency;
    expectedCloseDate;
    customFields;
    campaignId;
    companyId;
    companyName;
    position;
    customerStatus;
    utmSource;
    utmMedium;
    utmCampaign;
    utmTerm;
    utmContent;
    careerId;
    modalityId;
    subPhaseId;
    referredByLeadId;
    isPartner;
}
exports.UpdateLeadDto = UpdateLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLeadDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLeadDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], UpdateLeadDto.prototype, "customFields", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "campaignId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsIn)(CONTACT_STATUSES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "customerStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "utmSource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "utmMedium", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "utmCampaign", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "utmTerm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "utmContent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "careerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "modalityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateLeadDto.prototype, "subPhaseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeadDto.prototype, "referredByLeadId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateLeadDto.prototype, "isPartner", void 0);
class QueryLeadDto {
    search;
    status;
    source;
    campaignId;
    companyId;
    customerStatus;
    page;
    limit;
    careerId;
    modalityId;
    tagId;
}
exports.QueryLeadDto = QueryLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "campaignId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "customerStatus", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryLeadDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryLeadDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "careerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "modalityId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryLeadDto.prototype, "tagId", void 0);


/***/ }),
/* 240 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HealthProcessor_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthProcessor = void 0;
const bullmq_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const leads_service_1 = __webpack_require__(237);
let HealthProcessor = HealthProcessor_1 = class HealthProcessor extends bullmq_1.WorkerHost {
    prisma;
    leadsService;
    logger = new common_1.Logger(HealthProcessor_1.name);
    constructor(prisma, leadsService) {
        super();
        this.prisma = prisma;
        this.leadsService = leadsService;
    }
    async process(job) {
        const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
        for (const tenant of tenants) {
            try {
                await this.leadsService.recalculateAllForTenant(tenant.id);
            }
            catch (err) {
                this.logger.error(`Health recalculation failed for tenant ${tenant.id}: ${err}`);
            }
        }
    }
};
exports.HealthProcessor = HealthProcessor;
exports.HealthProcessor = HealthProcessor = HealthProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof leads_service_1.LeadsService !== "undefined" && leads_service_1.LeadsService) === "function" ? _b : Object])
], HealthProcessor);


/***/ }),
/* 241 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsService = exports.UploadsModule = void 0;
var uploads_module_1 = __webpack_require__(242);
Object.defineProperty(exports, "UploadsModule", ({ enumerable: true, get: function () { return uploads_module_1.UploadsModule; } }));
var uploads_service_1 = __webpack_require__(244);
Object.defineProperty(exports, "UploadsService", ({ enumerable: true, get: function () { return uploads_service_1.UploadsService; } }));


/***/ }),
/* 242 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsModule = void 0;
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(243);
const role_permissions_1 = __webpack_require__(34);
const uploads_service_1 = __webpack_require__(244);
const uploads_controller_1 = __webpack_require__(247);
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({ dest: './uploads' }), role_permissions_1.RolePermissionsModule],
        controllers: [uploads_controller_1.UploadsController],
        providers: [uploads_service_1.UploadsService],
        exports: [uploads_service_1.UploadsService],
    })
], UploadsModule);


/***/ }),
/* 243 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 244 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const fs = __importStar(__webpack_require__(245));
const path = __importStar(__webpack_require__(246));
const uuid_1 = __webpack_require__(44);
let UploadsService = class UploadsService {
    prisma;
    uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
    constructor(prisma) {
        this.prisma = prisma;
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async upload(file, entity, entityId, userId, tenantId) {
        const fileName = `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
        const filePath = path.join(this.uploadDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        return this.prisma.fileAttachment.create({
            data: {
                fileName,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                entity,
                entityId,
                uploadedById: userId,
                tenantId,
            },
        });
    }
    async findByEntity(entity, entityId, tenantId) {
        return this.prisma.fileAttachment.findMany({
            where: { entity, entityId, tenantId },
            include: { uploadedBy: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getFile(id, tenantId) {
        const file = await this.prisma.fileAttachment.findFirst({
            where: { id, tenantId },
        });
        if (!file)
            throw new common_1.NotFoundException('File not found');
        const filePath = path.join(this.uploadDir, file.fileName);
        if (!fs.existsSync(filePath))
            throw new common_1.NotFoundException('File not found on disk');
        return { file, stream: fs.createReadStream(filePath) };
    }
    async remove(id, tenantId) {
        const file = await this.prisma.fileAttachment.findFirst({
            where: { id, tenantId },
        });
        if (!file)
            throw new common_1.NotFoundException('File not found');
        const filePath = path.join(this.uploadDir, file.fileName);
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);
        return this.prisma.fileAttachment.delete({ where: { id } });
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], UploadsService);


/***/ }),
/* 245 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 246 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 247 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const platform_express_1 = __webpack_require__(243);
const multer_1 = __webpack_require__(248);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const uploads_service_1 = __webpack_require__(244);
let UploadsController = class UploadsController {
    service;
    constructor(service) {
        this.service = service;
    }
    upload(file, entity, entityId, user) {
        return this.service.upload(file, entity, entityId, user.id, user.tenantId);
    }
    findByEntity(entity, entityId, user) {
        return this.service.findByEntity(entity, entityId, user.tenantId);
    }
    async getFile(id, user, res) {
        const { file, stream } = await this.service.getFile(id, user.tenantId);
        res.set('Content-Type', file.mimeType);
        res.set('Content-Disposition', `inline; filename="${file.originalName}"`);
        stream.pipe(res);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('entity')),
    __param(2, (0, common_1.Query)('entityId')),
    __param(3, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, String, String, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('entity')),
    __param(1, (0, common_1.Query)('entityId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "findByEntity", null);
__decorate([
    (0, common_1.Get)(':id/file'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "getFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "remove", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof uploads_service_1.UploadsService !== "undefined" && uploads_service_1.UploadsService) === "function" ? _a : Object])
], UploadsController);


/***/ }),
/* 248 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 249 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsService = exports.TeamsModule = void 0;
var teams_module_1 = __webpack_require__(250);
Object.defineProperty(exports, "TeamsModule", ({ enumerable: true, get: function () { return teams_module_1.TeamsModule; } }));
var teams_service_1 = __webpack_require__(251);
Object.defineProperty(exports, "TeamsService", ({ enumerable: true, get: function () { return teams_service_1.TeamsService; } }));


/***/ }),
/* 250 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const teams_service_1 = __webpack_require__(251);
const teams_controller_1 = __webpack_require__(252);
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService],
        exports: [teams_service_1.TeamsService],
    })
], TeamsModule);


/***/ }),
/* 251 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let TeamsService = class TeamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.team.create({
            data: {
                name: dto.name,
                description: dto.description,
                tenantId,
                members: dto.memberIds?.length
                    ? { create: dto.memberIds.map((userId) => ({ userId })) }
                    : undefined,
            },
            include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
        });
    }
    async findAll(tenantId) {
        return this.prisma.team.findMany({
            where: { tenantId },
            include: {
                members: { include: { user: { select: { id: true, name: true, email: true } } } },
                _count: { select: { tickets: true, tasks: true, leads: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const team = await this.prisma.team.findFirst({
            where: { id, tenantId },
            include: {
                members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
                _count: { select: { tickets: true, tasks: true, leads: true } },
            },
        });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        return team;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.team.update({ where: { id }, data: dto });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.team.delete({ where: { id } });
    }
    async addMember(teamId, userId, tenantId) {
        await this.findById(teamId, tenantId);
        return this.prisma.teamMember.create({ data: { teamId, userId } });
    }
    async removeMember(teamId, userId, tenantId) {
        await this.findById(teamId, tenantId);
        return this.prisma.teamMember.deleteMany({ where: { teamId, userId } });
    }
    async getAssignableUsers(tenantId) {
        return this.prisma.user.findMany({
            where: { tenantId },
            select: { id: true, name: true, email: true, avatar: true },
        });
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TeamsService);


/***/ }),
/* 252 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const teams_service_1 = __webpack_require__(251);
const create_team_dto_1 = __webpack_require__(253);
let TeamsController = class TeamsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    getAssignableUsers(user) {
        return this.service.getAssignableUsers(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
    addMember(id, userId, user) {
        return this.service.addMember(id, userId, user.tenantId);
    }
    removeMember(id, userId, user) {
        return this.service.removeMember(id, userId, user.tenantId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_team_dto_1.CreateTeamDto !== "undefined" && create_team_dto_1.CreateTeamDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "getAssignableUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_team_dto_1.UpdateTeamDto !== "undefined" && create_team_dto_1.UpdateTeamDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "removeMember", null);
exports.TeamsController = TeamsController = __decorate([
    (0, common_1.Controller)('teams'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof teams_service_1.TeamsService !== "undefined" && teams_service_1.TeamsService) === "function" ? _a : Object])
], TeamsController);


/***/ }),
/* 253 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTeamDto = exports.CreateTeamDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateTeamDto {
    name;
    description;
    memberIds;
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTeamDto.prototype, "memberIds", void 0);
class UpdateTeamDto {
    name;
    description;
}
exports.UpdateTeamDto = UpdateTeamDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeamDto.prototype, "description", void 0);


/***/ }),
/* 254 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingService = exports.TimeTrackingModule = void 0;
var time_tracking_module_1 = __webpack_require__(255);
Object.defineProperty(exports, "TimeTrackingModule", ({ enumerable: true, get: function () { return time_tracking_module_1.TimeTrackingModule; } }));
var time_tracking_service_1 = __webpack_require__(256);
Object.defineProperty(exports, "TimeTrackingService", ({ enumerable: true, get: function () { return time_tracking_service_1.TimeTrackingService; } }));


/***/ }),
/* 255 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const time_tracking_service_1 = __webpack_require__(256);
const time_tracking_controller_1 = __webpack_require__(257);
let TimeTrackingModule = class TimeTrackingModule {
};
exports.TimeTrackingModule = TimeTrackingModule;
exports.TimeTrackingModule = TimeTrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [time_tracking_controller_1.TimeTrackingController],
        providers: [time_tracking_service_1.TimeTrackingService],
        exports: [time_tracking_service_1.TimeTrackingService],
    })
], TimeTrackingModule);


/***/ }),
/* 256 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let TimeTrackingService = class TimeTrackingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId, tenantId) {
        return this.prisma.timeEntry.create({
            data: {
                taskId: dto.taskId,
                userId,
                description: dto.description,
                duration: dto.duration,
                date: dto.date ? new Date(dto.date) : new Date(),
                tenantId,
            },
            include: { user: { select: { id: true, name: true } } },
        });
    }
    async findByTask(taskId, tenantId) {
        return this.prisma.timeEntry.findMany({
            where: { taskId, tenantId },
            include: { user: { select: { id: true, name: true } } },
            orderBy: { date: 'desc' },
        });
    }
    async findByUser(userId, tenantId, from, to) {
        const where = { userId, tenantId };
        if (from || to) {
            where.date = {};
            if (from)
                where.date.gte = new Date(from);
            if (to)
                where.date.lte = new Date(to);
        }
        return this.prisma.timeEntry.findMany({
            where,
            include: { task: { select: { id: true, title: true } } },
            orderBy: { date: 'desc' },
        });
    }
    async report(tenantId, from, to) {
        const where = { tenantId };
        if (from || to) {
            where.date = {};
            if (from)
                where.date.gte = new Date(from);
            if (to)
                where.date.lte = new Date(to);
        }
        const entries = await this.prisma.timeEntry.findMany({
            where,
            include: {
                user: { select: { id: true, name: true } },
                task: { select: { id: true, title: true } },
            },
            orderBy: { date: 'desc' },
        });
        return entries;
    }
    async summary(tenantId, from, to) {
        const where = { tenantId };
        if (from || to) {
            where.date = {};
            if (from)
                where.date.gte = new Date(from);
            if (to)
                where.date.lte = new Date(to);
        }
        const entries = await this.prisma.timeEntry.findMany({ where, select: { duration: true, userId: true } });
        const byUser = {};
        let total = 0;
        for (const e of entries) {
            byUser[e.userId] = (byUser[e.userId] || 0) + e.duration;
            total += e.duration;
        }
        return { total, byUser };
    }
    async remove(id, tenantId) {
        return this.prisma.timeEntry.deleteMany({ where: { id, tenantId } });
    }
};
exports.TimeTrackingService = TimeTrackingService;
exports.TimeTrackingService = TimeTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], TimeTrackingService);


/***/ }),
/* 257 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const time_tracking_service_1 = __webpack_require__(256);
const create_time_entry_dto_1 = __webpack_require__(258);
let TimeTrackingController = class TimeTrackingController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(taskId, userId, from, to, user) {
        if (taskId)
            return this.service.findByTask(taskId, user.tenantId);
        if (userId)
            return this.service.findByUser(userId, user.tenantId, from, to);
        return this.service.report(user.tenantId, from, to);
    }
    summary(from, to, user) {
        return this.service.summary(user.tenantId, from, to);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.TimeTrackingController = TimeTrackingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_time_entry_dto_1.CreateTimeEntryDto !== "undefined" && create_time_entry_dto_1.CreateTimeEntryDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TimeTrackingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('taskId')),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], TimeTrackingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TimeTrackingController.prototype, "summary", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TimeTrackingController.prototype, "remove", null);
exports.TimeTrackingController = TimeTrackingController = __decorate([
    (0, common_1.Controller)('time-entries'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof time_tracking_service_1.TimeTrackingService !== "undefined" && time_tracking_service_1.TimeTrackingService) === "function" ? _a : Object])
], TimeTrackingController);


/***/ }),
/* 258 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTimeEntryDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateTimeEntryDto {
    taskId;
    description;
    duration;
    date;
}
exports.CreateTimeEntryDto = CreateTimeEntryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTimeEntryDto.prototype, "taskId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTimeEntryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTimeEntryDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTimeEntryDto.prototype, "date", void 0);


/***/ }),
/* 259 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(260), exports);
__exportStar(__webpack_require__(262), exports);


/***/ }),
/* 260 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksModule = void 0;
const common_1 = __webpack_require__(2);
const bullmq_1 = __webpack_require__(9);
const bullmq_2 = __webpack_require__(82);
const tasks_controller_1 = __webpack_require__(261);
const tasks_service_1 = __webpack_require__(262);
const google_calendar_task_service_1 = __webpack_require__(263);
const calendar_sync_processor_1 = __webpack_require__(265);
const role_permissions_1 = __webpack_require__(34);
const automation_1 = __webpack_require__(79);
let TasksModule = class TasksModule {
    calendarQueue;
    constructor(calendarQueue) {
        this.calendarQueue = calendarQueue;
    }
    async onModuleInit() {
        await this.calendarQueue.add('pull-sync', {}, { repeat: { pattern: '*/15 * * * *' }, jobId: 'calendar-pull-sync' });
    }
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            role_permissions_1.RolePermissionsModule,
            automation_1.AutomationModule,
            bullmq_1.BullModule.registerQueue({ name: 'calendar-sync' }),
        ],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService, google_calendar_task_service_1.GoogleCalendarTaskService, calendar_sync_processor_1.CalendarSyncProcessor],
        exports: [tasks_service_1.TasksService],
    }),
    __param(0, (0, bullmq_1.InjectQueue)('calendar-sync')),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _a : Object])
], TasksModule);


/***/ }),
/* 261 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const tasks_service_1 = __webpack_require__(262);
const create_task_dto_1 = __webpack_require__(264);
const role_permissions_1 = __webpack_require__(34);
let TasksController = class TasksController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.service.findAll(query, user);
    }
    findById(id, user) {
        return this.service.findById(id, user);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user);
    }
    remove(id, user) {
        return this.service.remove(id, user);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_task_dto_1.CreateTaskDto !== "undefined" && create_task_dto_1.CreateTaskDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_task_dto_1.QueryTaskDto !== "undefined" && create_task_dto_1.QueryTaskDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_task_dto_1.UpdateTaskDto !== "undefined" && create_task_dto_1.UpdateTaskDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof tasks_service_1.TasksService !== "undefined" && tasks_service_1.TasksService) === "function" ? _a : Object])
], TasksController);


/***/ }),
/* 262 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const automation_1 = __webpack_require__(79);
const google_calendar_task_service_1 = __webpack_require__(263);
let TasksService = class TasksService {
    prisma;
    automation;
    googleCalendar;
    constructor(prisma, automation, googleCalendar) {
        this.prisma = prisma;
        this.automation = automation;
        this.googleCalendar = googleCalendar;
    }
    async create(dto, assigneeId, tenantId) {
        const task = await this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status ?? 'pending',
                priority: dto.priority ?? 'medium',
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                relatedType: dto.relatedType,
                relatedId: dto.relatedId,
                teamId: dto.teamId,
                assigneeId,
                tenantId,
            },
        });
        await this.automation.evaluate('task.created', { ...task, entity: 'task', entityId: task.id }, tenantId);
        if (task.dueDate)
            await this.googleCalendar.syncTask(task.id);
        return task;
    }
    async findAll(query, user) {
        const tenantId = user.tenantId;
        const { search, status, priority, dateFrom, dateTo, limit } = query;
        const where = { tenantId };
        if (user.role === 'seller') {
            where.assigneeId = user.id;
        }
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (search)
            where.title = { contains: search, mode: 'insensitive' };
        if (dateFrom || dateTo) {
            where.dueDate = {};
            if (dateFrom)
                where.dueDate.gte = new Date(dateFrom);
            if (dateTo)
                where.dueDate.lte = new Date(dateTo);
        }
        return this.prisma.task.findMany({
            where,
            include: { assignee: { select: { id: true, name: true } } },
            orderBy: { dueDate: 'asc' },
            take: limit ? Number(limit) : undefined,
        });
    }
    async findById(id, user) {
        const tenantId = user.tenantId;
        const task = await this.prisma.task.findFirst({
            where: { id, tenantId, ...(user.role === 'seller' ? { assigneeId: user.id } : {}) },
            include: { assignee: { select: { id: true, name: true, email: true } } },
        });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        return task;
    }
    async update(id, dto, user) {
        const tenantId = user.tenantId;
        await this.findById(id, user);
        const updated = await this.prisma.task.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
                priority: dto.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                relatedType: dto.relatedType,
                relatedId: dto.relatedId,
                teamId: dto.teamId,
            },
        });
        await this.automation.evaluate('task.updated', { ...updated, entity: 'task', entityId: id }, tenantId);
        if (updated.dueDate)
            await this.googleCalendar.syncTask(updated.id);
        return updated;
    }
    async remove(id, user) {
        await this.findById(id, user);
        await this.googleCalendar.deleteTaskEvent(id);
        return this.prisma.task.delete({ where: { id } });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof google_calendar_task_service_1.GoogleCalendarTaskService !== "undefined" && google_calendar_task_service_1.GoogleCalendarTaskService) === "function" ? _c : Object])
], TasksService);


/***/ }),
/* 263 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GoogleCalendarTaskService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleCalendarTaskService = void 0;
const common_1 = __webpack_require__(2);
const googleapis_1 = __webpack_require__(123);
const shared_1 = __webpack_require__(11);
let GoogleCalendarTaskService = GoogleCalendarTaskService_1 = class GoogleCalendarTaskService {
    prisma;
    logger = new common_1.Logger(GoogleCalendarTaskService_1.name);
    oauth2Client;
    constructor(prisma) {
        this.prisma = prisma;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID || 'dummy_id', process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret', process.env.GOOGLE_CALLBACK_URL || 'dummy_url');
    }
    async syncTask(taskId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { assignee: true },
        });
        if (!task || !task.dueDate || !task.assignee.googleRefreshToken) {
            return;
        }
        try {
            this.oauth2Client.setCredentials({
                refresh_token: task.assignee.googleRefreshToken,
            });
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
            const event = {
                summary: task.title,
                description: task.description || '',
                start: {
                    dateTime: task.dueDate.toISOString(),
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: new Date(task.dueDate.getTime() + 60 * 60 * 1000).toISOString(),
                    timeZone: 'UTC',
                },
            };
            if (task.googleCalendarEventId) {
                await calendar.events.update({
                    calendarId: 'primary',
                    eventId: task.googleCalendarEventId,
                    requestBody: event,
                });
                this.logger.log(`Updated calendar event ${task.googleCalendarEventId} for task ${taskId}`);
            }
            else {
                const response = await calendar.events.insert({
                    calendarId: 'primary',
                    requestBody: event,
                });
                await this.prisma.task.update({
                    where: { id: taskId },
                    data: { googleCalendarEventId: response.data.id },
                });
                this.logger.log(`Created calendar event ${response.data.id} for task ${taskId}`);
            }
        }
        catch (error) {
            this.logger.error(`Failed to sync calendar for task ${taskId}: ${error.message}`);
        }
    }
    async deleteTaskEvent(taskId) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { assignee: true },
        });
        if (!task?.googleCalendarEventId || !task.assignee.googleRefreshToken)
            return;
        try {
            this.oauth2Client.setCredentials({ refresh_token: task.assignee.googleRefreshToken });
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
            await calendar.events.delete({ calendarId: 'primary', eventId: task.googleCalendarEventId });
        }
        catch (error) {
            this.logger.error(`Failed to delete calendar event for task ${taskId}: ${error.message}`);
        }
    }
};
exports.GoogleCalendarTaskService = GoogleCalendarTaskService;
exports.GoogleCalendarTaskService = GoogleCalendarTaskService = GoogleCalendarTaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], GoogleCalendarTaskService);


/***/ }),
/* 264 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryTaskDto = exports.UpdateTaskDto = exports.CreateTaskDto = void 0;
const class_validator_1 = __webpack_require__(39);
const STATUSES = ['pending', 'in_progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];
class CreateTaskDto {
    title;
    description;
    status;
    priority;
    dueDate;
    relatedType;
    relatedId;
    teamId;
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsIn)(STATUSES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsIn)(PRIORITIES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "relatedType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "relatedId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "teamId", void 0);
class UpdateTaskDto {
    title;
    description;
    status;
    priority;
    dueDate;
    relatedType;
    relatedId;
    teamId;
}
exports.UpdateTaskDto = UpdateTaskDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsIn)(STATUSES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsIn)(PRIORITIES),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "relatedType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "relatedId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "teamId", void 0);
class QueryTaskDto {
    search;
    status;
    priority;
    dateFrom;
    dateTo;
    limit;
}
exports.QueryTaskDto = QueryTaskDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "dateFrom", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "dateTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryTaskDto.prototype, "limit", void 0);


/***/ }),
/* 265 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CalendarSyncProcessor_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarSyncProcessor = void 0;
const bullmq_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const googleapis_1 = __webpack_require__(123);
const shared_1 = __webpack_require__(11);
let CalendarSyncProcessor = CalendarSyncProcessor_1 = class CalendarSyncProcessor extends bullmq_1.WorkerHost {
    prisma;
    logger = new common_1.Logger(CalendarSyncProcessor_1.name);
    oauth2Client;
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID || 'dummy_id', process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret', process.env.GOOGLE_CALLBACK_URL || 'dummy_url');
    }
    async process(job) {
        const tasks = await this.prisma.task.findMany({
            where: { googleCalendarEventId: { not: null }, assignee: { googleRefreshToken: { not: null } } },
            include: { assignee: true },
        });
        for (const task of tasks) {
            try {
                this.oauth2Client.setCredentials({ refresh_token: task.assignee.googleRefreshToken });
                const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
                const event = await calendar.events.get({ calendarId: 'primary', eventId: task.googleCalendarEventId });
                const start = event.data.start?.dateTime;
                if (start && task.dueDate && new Date(start).getTime() !== task.dueDate.getTime()) {
                    await this.prisma.task.update({ where: { id: task.id }, data: { dueDate: new Date(start) } });
                    this.logger.log(`Task ${task.id} dueDate updated from Google Calendar`);
                }
            }
            catch (error) {
                if (error.code === 404) {
                    await this.prisma.task.update({ where: { id: task.id }, data: { googleCalendarEventId: null } });
                    this.logger.log(`Task ${task.id} calendar event no longer exists, unlinked`);
                }
                else {
                    this.logger.error(`Calendar pull-sync failed for task ${task.id}: ${error.message}`);
                }
            }
        }
    }
};
exports.CalendarSyncProcessor = CalendarSyncProcessor;
exports.CalendarSyncProcessor = CalendarSyncProcessor = CalendarSyncProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('calendar-sync'),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], CalendarSyncProcessor);


/***/ }),
/* 266 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(267), exports);
__exportStar(__webpack_require__(268), exports);


/***/ }),
/* 267 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(2);
const role_permissions_1 = __webpack_require__(34);
const users_service_1 = __webpack_require__(268);
const users_controller_1 = __webpack_require__(269);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 268 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const bcrypt = __importStar(__webpack_require__(28));
const SAFE_SELECT = {
    id: true,
    email: true,
    name: true,
    avatar: true,
    role: true,
    tenantId: true,
    isTwoFactorEnabled: true,
    createdAt: true,
    updatedAt: true,
};
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashedPassword,
                role: dto.role,
                tenantId,
            },
            select: SAFE_SELECT,
        });
    }
    async findAll(tenantId) {
        return this.prisma.user.findMany({
            where: { tenantId },
            select: SAFE_SELECT,
            orderBy: { name: 'asc' },
        });
    }
    async findById(id, tenantId) {
        const user = await this.prisma.user.findFirst({
            where: { id, tenantId },
            select: SAFE_SELECT,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.user.update({
            where: { id },
            data: dto,
            select: SAFE_SELECT,
        });
    }
    async remove(id, tenantId, requestingUserId) {
        if (id === requestingUserId) {
            throw new common_1.BadRequestException('You cannot delete your own user');
        }
        await this.findById(id, tenantId);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 269 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const users_service_1 = __webpack_require__(268);
const create_user_dto_1 = __webpack_require__(270);
const update_user_dto_1 = __webpack_require__(271);
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(user) {
        return this.usersService.findAll(user.tenantId);
    }
    findOne(id, user) {
        return this.usersService.findById(id, user.tenantId);
    }
    create(dto, user) {
        return this.usersService.create(dto, user.tenantId);
    }
    update(id, dto, user) {
        return this.usersService.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.usersService.remove(id, user.tenantId, user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_users'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_users'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 270 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateUserDto {
    email;
    name;
    password;
    role;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/[A-Z]/, { message: 'Password must contain an uppercase letter' }),
    (0, class_validator_1.Matches)(/[a-z]/, { message: 'Password must contain a lowercase letter' }),
    (0, class_validator_1.Matches)(/[0-9]/, { message: 'Password must contain a number' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['admin', 'seller', 'reader']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);


/***/ }),
/* 271 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpdateUserDto {
    name;
    avatar;
    role;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['admin', 'seller', 'reader']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);


/***/ }),
/* 272 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(273), exports);
__exportStar(__webpack_require__(274), exports);


/***/ }),
/* 273 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotesModule = void 0;
const common_1 = __webpack_require__(2);
const notes_service_1 = __webpack_require__(274);
const notes_controller_1 = __webpack_require__(275);
let NotesModule = class NotesModule {
};
exports.NotesModule = NotesModule;
exports.NotesModule = NotesModule = __decorate([
    (0, common_1.Module)({
        controllers: [notes_controller_1.NotesController],
        providers: [notes_service_1.NotesService],
        exports: [notes_service_1.NotesService],
    })
], NotesModule);


/***/ }),
/* 274 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let NotesService = class NotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(relatedType, relatedId, tenantId) {
        return this.prisma.note.findMany({
            where: { relatedType, relatedId, tenantId },
            include: { author: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto, authorId, tenantId) {
        return this.prisma.note.create({
            data: { ...dto, authorId, tenantId },
            include: { author: { select: { id: true, name: true, email: true } } },
        });
    }
    async update(id, dto, tenantId, userId, userRole) {
        const note = await this.findOneOrThrow(id, tenantId);
        this.assertCanModify(note, userId, userRole);
        return this.prisma.note.update({
            where: { id },
            data: dto,
            include: { author: { select: { id: true, name: true, email: true } } },
        });
    }
    async remove(id, tenantId, userId, userRole) {
        const note = await this.findOneOrThrow(id, tenantId);
        this.assertCanModify(note, userId, userRole);
        await this.prisma.note.delete({ where: { id } });
        return { message: 'Note deleted successfully' };
    }
    async findOneOrThrow(id, tenantId) {
        const note = await this.prisma.note.findFirst({ where: { id, tenantId } });
        if (!note)
            throw new common_1.NotFoundException('Note not found');
        return note;
    }
    assertCanModify(note, userId, userRole) {
        if (note.authorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('You cannot modify a note created by another user');
        }
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], NotesService);


/***/ }),
/* 275 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const notes_service_1 = __webpack_require__(274);
const create_note_dto_1 = __webpack_require__(276);
const update_note_dto_1 = __webpack_require__(277);
let NotesController = class NotesController {
    notesService;
    constructor(notesService) {
        this.notesService = notesService;
    }
    findAll(relatedType, relatedId, user) {
        return this.notesService.findAll(relatedType, relatedId, user.tenantId);
    }
    create(dto, user) {
        return this.notesService.create(dto, user.id, user.tenantId);
    }
    update(id, dto, user) {
        return this.notesService.update(id, dto, user.tenantId, user.id, user.role);
    }
    remove(id, user) {
        return this.notesService.remove(id, user.tenantId, user.id, user.role);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('relatedType')),
    __param(1, (0, common_1.Query)('relatedId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_note_dto_1.CreateNoteDto !== "undefined" && create_note_dto_1.CreateNoteDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_note_dto_1.UpdateNoteDto !== "undefined" && update_note_dto_1.UpdateNoteDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "remove", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof notes_service_1.NotesService !== "undefined" && notes_service_1.NotesService) === "function" ? _a : Object])
], NotesController);


/***/ }),
/* 276 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNoteDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateNoteDto {
    content;
    relatedType;
    relatedId;
}
exports.CreateNoteDto = CreateNoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "relatedType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "relatedId", void 0);


/***/ }),
/* 277 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateNoteDto = void 0;
const class_validator_1 = __webpack_require__(39);
class UpdateNoteDto {
    content;
}
exports.UpdateNoteDto = UpdateNoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "content", void 0);


/***/ }),
/* 278 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(2);
const auth_1 = __webpack_require__(23);
const tenant_1 = __webpack_require__(29);
const role_permissions_1 = __webpack_require__(34);
const admin_controller_1 = __webpack_require__(279);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_1.AuthModule, tenant_1.TenantModule, role_permissions_1.RolePermissionsModule],
        controllers: [admin_controller_1.AdminController],
    })
], AdminModule);


/***/ }),
/* 279 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const tenant_1 = __webpack_require__(29);
const auth_1 = __webpack_require__(23);
const role_permissions_1 = __webpack_require__(34);
const create_tenant_dto_1 = __webpack_require__(280);
const update_tenant_dto_1 = __webpack_require__(281);
let AdminController = class AdminController {
    tenantService;
    rolePermissions;
    constructor(tenantService, rolePermissions) {
        this.tenantService = tenantService;
        this.rolePermissions = rolePermissions;
    }
    findAll() {
        return this.tenantService.findAll();
    }
    async create(dto) {
        const tenant = await this.tenantService.create(dto);
        await this.rolePermissions.seedDefaultsForTenant(tenant.id);
        return tenant;
    }
    findOne(id) {
        return this.tenantService.findById(id);
    }
    update(id, dto) {
        return this.tenantService.update(id, dto);
    }
    remove(id) {
        return this.tenantService.remove(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_1.Roles)('superadmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_1.Roles)('superadmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_tenant_dto_1.CreateTenantDto !== "undefined" && create_tenant_dto_1.CreateTenantDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_1.Roles)('superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_1.Roles)('superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_tenant_dto_1.UpdateTenantDto !== "undefined" && update_tenant_dto_1.UpdateTenantDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_1.Roles)('superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin/tenants'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), auth_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_1.TenantService !== "undefined" && tenant_1.TenantService) === "function" ? _a : Object, typeof (_b = typeof role_permissions_1.RolePermissionsService !== "undefined" && role_permissions_1.RolePermissionsService) === "function" ? _b : Object])
], AdminController);


/***/ }),
/* 280 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTenantDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateTenantDto {
    name;
    slug;
    domain;
}
exports.CreateTenantDto = CreateTenantDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTenantDto.prototype, "domain", void 0);


/***/ }),
/* 281 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTenantDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_tenant_dto_1 = __webpack_require__(280);
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(create_tenant_dto_1.CreateTenantDto) {
    status;
}
exports.UpdateTenantDto = UpdateTenantDto;


/***/ }),
/* 282 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportModule = void 0;
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(243);
const import_controller_1 = __webpack_require__(283);
const import_service_1 = __webpack_require__(284);
let ImportModule = class ImportModule {
};
exports.ImportModule = ImportModule;
exports.ImportModule = ImportModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({ dest: './uploads' })],
        controllers: [import_controller_1.ImportController],
        providers: [import_service_1.ImportService],
    })
], ImportModule);


/***/ }),
/* 283 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const platform_express_1 = __webpack_require__(243);
const import_service_1 = __webpack_require__(284);
const auth_1 = __webpack_require__(23);
let ImportController = class ImportController {
    importService;
    constructor(importService) {
        this.importService = importService;
    }
    importCompanies(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importCompanies(file.buffer, user.id, user.tenantId);
    }
    importLeads(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importLeads(file.buffer, user.id, user.tenantId);
    }
    importProducts(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importProducts(file.buffer, user.id, user.tenantId);
    }
};
exports.ImportController = ImportController;
__decorate([
    (0, common_1.Post)('companies'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importCompanies", null);
__decorate([
    (0, common_1.Post)('leads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importLeads", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof Express !== "undefined" && (_f = Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importProducts", null);
exports.ImportController = ImportController = __decorate([
    (0, common_1.Controller)('import'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof import_service_1.ImportService !== "undefined" && import_service_1.ImportService) === "function" ? _a : Object])
], ImportController);


/***/ }),
/* 284 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const stream_1 = __webpack_require__(285);
const csv = __webpack_require__(286);
let ImportService = class ImportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importCompanies(buffer, ownerId, tenantId) {
        const results = [];
        const errors = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        const parser = stream.pipe(csv());
        for await (const row of parser) {
            rowIndex++;
            try {
                const company = await this.prisma.company.create({
                    data: {
                        name: row.name || row.Name || row.nombre || row.Nombre || '',
                        industry: row.industry || row.Industry || row.industria || '',
                        website: row.website || row.Website || row.sitio || '',
                        phone: row.phone || row.Phone || row.telefono || '',
                        address: row.address || row.Address || row.direccion || '',
                        ownerId,
                        tenantId,
                    },
                });
                results.push(company);
            }
            catch (err) {
                errors.push({ row: rowIndex, message: err.message });
            }
        }
        return { imported: results.length, errors, total: rowIndex };
    }
    async importLeads(buffer, ownerId, tenantId) {
        const results = [];
        const errors = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        const parser = stream.pipe(csv());
        for await (const row of parser) {
            rowIndex++;
            try {
                const lead = await this.prisma.lead.create({
                    data: {
                        name: row.title || row.Title || row.name || row.Name || row.nombre || row.Nombre || '',
                        email: row.email || row.Email || undefined,
                        phone: row.phone || row.Phone || row.telefono || undefined,
                        companyName: row.company || row.Company || row.empresa || undefined,
                        position: row.position || row.Position || row.cargo || undefined,
                        value: parseFloat(row.value || row.Value || '0') || 0,
                        status: row.stage || row.Stage || row.status || row.Status || 'new',
                        ownerId,
                        tenantId,
                    },
                });
                results.push(lead);
            }
            catch (err) {
                errors.push({ row: rowIndex, message: err.message });
            }
        }
        return { imported: results.length, errors, total: rowIndex };
    }
    async importProducts(buffer, _ownerId, tenantId) {
        const results = [];
        const errors = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        const parser = stream.pipe(csv());
        for await (const row of parser) {
            rowIndex++;
            try {
                const product = await this.prisma.product.create({
                    data: {
                        name: row.name || row.Name || row.nombre || '',
                        price: parseFloat(row.price || row.Price || row.precio || '0') || 0,
                        description: row.description || row.Description || row.descripcion || '',
                        category: row.category || row.Category || row.categoria || '',
                        sku: row.sku || row.Sku || row.SKU || '',
                        tenantId,
                    },
                });
                results.push(product);
            }
            catch (err) {
                errors.push({ row: rowIndex, message: err.message });
            }
        }
        return { imported: results.length, errors, total: rowIndex };
    }
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ImportService);


/***/ }),
/* 285 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 286 */
/***/ ((module) => {

module.exports = require("csv-parser");

/***/ }),
/* 287 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchedulerModule = void 0;
const common_1 = __webpack_require__(2);
const scheduler_service_1 = __webpack_require__(288);
const email_1 = __webpack_require__(32);
const notifications_1 = __webpack_require__(127);
const subscriptions_1 = __webpack_require__(290);
const playbooks_1 = __webpack_require__(295);
const leads_1 = __webpack_require__(235);
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [email_1.EmailModule, notifications_1.NotificationsModule, subscriptions_1.SubscriptionsModule, playbooks_1.PlaybooksModule, leads_1.LeadsModule],
        providers: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);


/***/ }),
/* 288 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SchedulerService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchedulerService = void 0;
const common_1 = __webpack_require__(2);
const cron = __importStar(__webpack_require__(289));
const shared_1 = __webpack_require__(11);
const email_1 = __webpack_require__(32);
const notifications_1 = __webpack_require__(127);
const subscriptions_1 = __webpack_require__(290);
const playbooks_1 = __webpack_require__(295);
const leads_1 = __webpack_require__(235);
let SchedulerService = class SchedulerService {
    static { SchedulerService_1 = this; }
    prisma;
    emailService;
    imapService;
    notificationsService;
    subscriptionsService;
    playbooksService;
    leadsService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(prisma, emailService, imapService, notificationsService, subscriptionsService, playbooksService, leadsService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.imapService = imapService;
        this.notificationsService = notificationsService;
        this.subscriptionsService = subscriptionsService;
        this.playbooksService = playbooksService;
        this.leadsService = leadsService;
    }
    onModuleInit() {
        cron.schedule('*/5 * * * *', () => this.checkReminders());
        cron.schedule('*/10 * * * *', () => this.syncImap());
        cron.schedule('0 9 * * *', () => this.checkStaleLeads());
        cron.schedule('0 6 * * *', () => this.generateRecurringInvoices());
        cron.schedule('0 7 * * *', () => this.recalculateHealthScores());
        cron.schedule('0 8 * * *', () => this.notifyUpcomingRenewalsAndOverdueInvoices());
        cron.schedule('*/15 * * * *', () => this.checkTicketSlaBreaches());
        this.logger.log('Reminder scheduler started (every 5 minutes)');
        this.logger.log('IMAP sync scheduler started (every 10 minutes)');
        this.logger.log('Stale lead follow-up scheduler started (daily at 09:00)');
        this.logger.log('Recurring invoice generator started (daily at 06:00)');
        this.logger.log('Customer health score recalculation started (daily at 07:00)');
        this.logger.log('Invoice renewal/overdue check started (daily at 08:00)');
        this.logger.log('Ticket SLA breach check started (every 15 minutes)');
    }
    static SLA_ESCALATION_GRACE_HOURS = 1;
    async checkTicketSlaBreaches() {
        try {
            const now = new Date();
            const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
            for (const tenant of tenants) {
                const openTickets = await this.prisma.ticket.findMany({
                    where: {
                        tenantId: tenant.id,
                        status: { notIn: ['resolved', 'closed'] },
                        OR: [
                            { slaDeadline: { lt: now }, slaBreachNotifiedAt: null },
                            { firstResponseDeadline: { lt: now }, firstRespondedAt: null, slaBreachNotifiedAt: null },
                        ],
                    },
                    include: { team: true },
                });
                for (const ticket of openTickets) {
                    if (ticket.assignedTo) {
                        await this.notificationsService.create({
                            userId: ticket.assignedTo,
                            title: 'SLA vencido',
                            body: `El ticket #${ticket.number} "${ticket.subject}" superó el tiempo de SLA.`,
                            link: `/tickets/${ticket.id}`,
                        });
                    }
                    await this.prisma.ticket.update({ where: { id: ticket.id }, data: { slaBreachNotifiedAt: now } });
                }
                const graceMs = SchedulerService_1.SLA_ESCALATION_GRACE_HOURS * 3600000;
                const escalationCutoff = new Date(now.getTime() - graceMs);
                const toEscalate = await this.prisma.ticket.findMany({
                    where: {
                        tenantId: tenant.id,
                        status: { notIn: ['resolved', 'closed'] },
                        escalatedAt: null,
                        slaDeadline: { lt: escalationCutoff },
                    },
                    include: { team: true },
                });
                for (const ticket of toEscalate) {
                    const supervisorId = ticket.team?.leadId;
                    if (supervisorId) {
                        await this.notificationsService.create({
                            userId: supervisorId,
                            title: 'Ticket escalado',
                            body: `El ticket #${ticket.number} "${ticket.subject}" lleva más de ${SchedulerService_1.SLA_ESCALATION_GRACE_HOURS}h vencido sin resolverse.`,
                            link: `/tickets/${ticket.id}`,
                        });
                    }
                    else {
                        const admins = await this.prisma.user.findMany({
                            where: { tenantId: tenant.id, role: { in: ['admin', 'superadmin'] } },
                            select: { id: true },
                        });
                        for (const admin of admins) {
                            await this.notificationsService.create({
                                userId: admin.id,
                                title: 'Ticket escalado',
                                body: `El ticket #${ticket.number} "${ticket.subject}" lleva más de ${SchedulerService_1.SLA_ESCALATION_GRACE_HOURS}h vencido sin resolverse y su equipo no tiene un líder asignado.`,
                                link: `/tickets/${ticket.id}`,
                            });
                        }
                    }
                    await this.prisma.ticket.update({ where: { id: ticket.id }, data: { escalatedAt: now } });
                }
            }
        }
        catch (err) {
            this.logger.error('Ticket SLA breach check failed', err);
        }
    }
    async recalculateHealthScores() {
        try {
            const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
            for (const tenant of tenants) {
                const leads = await this.prisma.lead.findMany({
                    where: { tenantId: tenant.id, contracts: { some: {} } },
                    select: { id: true },
                });
                for (const lead of leads) {
                    try {
                        await this.leadsService.recalculateHealth(lead.id, { tenantId: tenant.id });
                    }
                    catch (err) {
                        this.logger.error(`Health score recalculation failed for lead ${lead.id}`, err);
                    }
                }
            }
        }
        catch (err) {
            this.logger.error('Health score recalculation batch failed', err);
        }
    }
    async generateRecurringInvoices() {
        try {
            const now = new Date();
            const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
            for (const tenant of tenants) {
                const dueSubscriptions = await this.prisma.subscription.findMany({
                    where: {
                        tenantId: tenant.id,
                        status: 'active',
                        nextBillingDate: { lte: now },
                        contract: { status: 'accepted' },
                    },
                    select: { id: true },
                });
                for (const subscription of dueSubscriptions) {
                    try {
                        await this.subscriptionsService.generateInvoice(subscription.id, tenant.id);
                    }
                    catch (err) {
                        this.logger.error(`Failed to generate invoice for subscription ${subscription.id}`, err);
                    }
                }
            }
        }
        catch (err) {
            this.logger.error('Recurring invoice generation failed', err);
        }
    }
    static DUNNING_REMINDER_INTERVAL_DAYS = 3;
    static DUNNING_CANCEL_AFTER_DAYS = 15;
    async notifyUpcomingRenewalsAndOverdueInvoices() {
        try {
            const now = new Date();
            const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
            for (const tenant of tenants) {
                const newlyOverdueInvoices = await this.prisma.invoice.findMany({
                    where: {
                        tenantId: tenant.id,
                        status: { in: ['pending', 'sent'] },
                        dueDate: { lt: now },
                        subscriptionId: { not: null },
                    },
                    include: { subscription: { include: { contract: { include: { lead: true } } } } },
                });
                for (const invoice of newlyOverdueInvoices) {
                    await this.prisma.invoice.update({ where: { id: invoice.id }, data: { status: 'overdue' } });
                    const subscription = invoice.subscription;
                    await this.notificationsService.create({
                        userId: subscription.contract.createdById,
                        title: 'Factura vencida',
                        body: `La factura ${invoice.number} de ${subscription.contract.lead.name} está vencida.`,
                        link: `/contracts/${subscription.contractId}`,
                    });
                }
                await this.runDunning(tenant.id, now);
                const soon = new Date(now.getTime() + 3 * 24 * 3600000);
                const upcomingRenewals = await this.prisma.subscription.findMany({
                    where: {
                        tenantId: tenant.id,
                        status: 'active',
                        nextBillingDate: { gte: now, lte: soon },
                        contract: { status: 'accepted' },
                    },
                    include: { contract: { include: { lead: true } } },
                });
                for (const subscription of upcomingRenewals) {
                    await this.notificationsService.create({
                        userId: subscription.contract.createdById,
                        title: 'Renovación próxima',
                        body: `La suscripción del contrato ${subscription.contract.number} (${subscription.contract.lead.name}) se renueva pronto.`,
                        link: `/contracts/${subscription.contractId}`,
                    });
                    await this.playbooksService.startRunsForTrigger('renewal_upcoming', {
                        leadId: subscription.contract.leadId,
                        contractId: subscription.contractId,
                        tenantId: tenant.id,
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('Renewal/overdue invoice check failed', err);
        }
    }
    async runDunning(tenantId, now) {
        const overdueInvoices = await this.prisma.invoice.findMany({
            where: { tenantId, status: 'overdue', subscriptionId: { not: null } },
            include: { subscription: { include: { contract: { include: { lead: true } } } } },
        });
        for (const invoice of overdueInvoices) {
            const daysOverdue = Math.floor((now.getTime() - invoice.dueDate.getTime()) / (24 * 3600000));
            const subscription = invoice.subscription;
            const lead = subscription.contract.lead;
            if (daysOverdue >= SchedulerService_1.DUNNING_CANCEL_AFTER_DAYS) {
                if (subscription.status === 'active') {
                    await this.prisma.subscription.update({
                        where: { id: subscription.id },
                        data: { status: 'cancelled', cancelledAt: now },
                    });
                    await this.notificationsService.create({
                        userId: subscription.contract.createdById,
                        title: 'Suscripción cancelada por falta de pago',
                        body: `La suscripción del contrato ${subscription.contract.number} (${lead.name}) se canceló tras ${daysOverdue} días de mora en la factura ${invoice.number}.`,
                        link: `/contracts/${subscription.contractId}`,
                    });
                }
                continue;
            }
            const isReminderDay = daysOverdue > 0 && daysOverdue % SchedulerService_1.DUNNING_REMINDER_INTERVAL_DAYS === 0;
            const alreadyRemindedToday = invoice.lastReminderAt && this.isSameDay(invoice.lastReminderAt, now);
            if (isReminderDay && !alreadyRemindedToday && lead.email) {
                try {
                    await this.emailService.sendEmail({
                        to: lead.email,
                        subject: `Recordatorio de pago pendiente: factura ${invoice.number}`,
                        body: `<p>Hola ${lead.name},</p><p>La factura <strong>${invoice.number}</strong> está vencida desde hace ${daysOverdue} días. Por favor realiza tu pago a la brevedad para evitar la suspensión del servicio.</p>`,
                    }, tenantId);
                }
                catch (err) {
                    this.logger.warn(`Failed to send dunning reminder email to ${lead.email}`);
                }
                await this.prisma.invoice.update({
                    where: { id: invoice.id },
                    data: { remindersSent: { increment: 1 }, lastReminderAt: now },
                });
            }
        }
    }
    isSameDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }
    async checkStaleLeads() {
        const DEFAULT_STALE_DAYS = 5;
        try {
            const tenants = await this.prisma.tenant.findMany({ select: { id: true } });
            for (const tenant of tenants) {
                const setting = await this.prisma.tenantSetting.findUnique({
                    where: { key_tenantId: { key: 'staleLeadDays', tenantId: tenant.id } },
                });
                const staleDays = setting ? parseInt(setting.value, 10) || DEFAULT_STALE_DAYS : DEFAULT_STALE_DAYS;
                const cutoff = new Date(Date.now() - staleDays * 24 * 3600000);
                const closedStages = await this.prisma.pipelineStage.findMany({
                    where: { tenantId: tenant.id, OR: [{ isWon: true }, { isLost: true }] },
                    select: { name: true },
                });
                const closedNames = closedStages.map((s) => s.name);
                const leads = await this.prisma.lead.findMany({
                    where: { tenantId: tenant.id, status: { notIn: closedNames } },
                    include: { activities: { orderBy: { createdAt: 'desc' }, take: 1 } },
                });
                for (const lead of leads) {
                    const lastActivity = lead.activities[0]?.createdAt ?? lead.updatedAt;
                    if (lastActivity > cutoff)
                        continue;
                    const existingTask = await this.prisma.task.findFirst({
                        where: {
                            tenantId: tenant.id,
                            relatedType: 'lead',
                            relatedId: lead.id,
                            status: { not: 'completed' },
                        },
                    });
                    if (existingTask)
                        continue;
                    await this.prisma.task.create({
                        data: {
                            title: `Dar seguimiento a ${lead.name}`,
                            description: `Este lead no ha tenido actividad en ${staleDays} o más días.`,
                            status: 'pending',
                            priority: 'medium',
                            dueDate: new Date(),
                            relatedType: 'lead',
                            relatedId: lead.id,
                            assigneeId: lead.ownerId,
                            tenantId: tenant.id,
                        },
                    });
                    await this.notificationsService.create({
                        userId: lead.ownerId,
                        title: 'Lead sin seguimiento',
                        body: `"${lead.name}" no ha tenido actividad reciente. Se creó una tarea de seguimiento.`,
                        link: `/leads/${lead.id}`,
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('Stale lead check failed', err);
        }
    }
    async syncImap() {
        try {
            const count = await this.imapService.syncAll();
            if (count > 0)
                this.logger.log(`IMAP sync: ${count} new emails`);
        }
        catch (err) {
            this.logger.error('IMAP sync failed', err);
        }
    }
    async checkReminders() {
        try {
            const now = new Date();
            const reminders = await this.prisma.reminder.findMany({
                where: {
                    sent: false,
                    activity: {
                        dueDate: { not: null },
                        done: false,
                    },
                },
                include: {
                    activity: { select: { id: true, subject: true, dueDate: true } },
                    user: { select: { id: true, email: true, name: true, tenantId: true } },
                },
            });
            for (const reminder of reminders) {
                const dueDate = reminder.activity.dueDate;
                if (!dueDate)
                    continue;
                const diffMs = dueDate.getTime() - now.getTime();
                const diffMin = Math.floor(diffMs / 60000);
                if (diffMin <= reminder.minutesBefore && diffMin > -5) {
                    await this.notificationsService.create({
                        userId: reminder.userId,
                        title: `Recordatorio: ${reminder.activity.subject}`,
                        body: `La actividad "${reminder.activity.subject}" vence en breve.`,
                        link: `/activities?id=${reminder.activity.id}`,
                    });
                    try {
                        await this.emailService.sendEmail({
                            to: reminder.user.email,
                            subject: `Recordatorio: ${reminder.activity.subject}`,
                            body: `<p>Hola ${reminder.user.name},</p><p>Recuérdale: <strong>${reminder.activity.subject}</strong> está por vencer.</p>`,
                        }, reminder.user.tenantId);
                    }
                    catch (err) {
                        this.logger.warn(`Failed to send reminder email to ${reminder.user.email}`);
                    }
                    await this.prisma.reminder.update({
                        where: { id: reminder.id },
                        data: { sent: true },
                    });
                }
            }
        }
        catch (err) {
            this.logger.error('Reminder check failed', err);
        }
    }
};
exports.SchedulerService = SchedulerService;
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof email_1.ImapService !== "undefined" && email_1.ImapService) === "function" ? _c : Object, typeof (_d = typeof notifications_1.NotificationsService !== "undefined" && notifications_1.NotificationsService) === "function" ? _d : Object, typeof (_e = typeof subscriptions_1.SubscriptionsService !== "undefined" && subscriptions_1.SubscriptionsService) === "function" ? _e : Object, typeof (_f = typeof playbooks_1.PlaybooksService !== "undefined" && playbooks_1.PlaybooksService) === "function" ? _f : Object, typeof (_g = typeof leads_1.LeadsService !== "undefined" && leads_1.LeadsService) === "function" ? _g : Object])
], SchedulerService);


/***/ }),
/* 289 */
/***/ ((module) => {

module.exports = require("node-cron");

/***/ }),
/* 290 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionsService = exports.SubscriptionsModule = void 0;
var subscriptions_module_1 = __webpack_require__(291);
Object.defineProperty(exports, "SubscriptionsModule", ({ enumerable: true, get: function () { return subscriptions_module_1.SubscriptionsModule; } }));
var subscriptions_service_1 = __webpack_require__(292);
Object.defineProperty(exports, "SubscriptionsService", ({ enumerable: true, get: function () { return subscriptions_service_1.SubscriptionsService; } }));


/***/ }),
/* 291 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionsModule = void 0;
const common_1 = __webpack_require__(2);
const subscriptions_service_1 = __webpack_require__(292);
const subscriptions_controller_1 = __webpack_require__(293);
const invoices_controller_1 = __webpack_require__(294);
const role_permissions_1 = __webpack_require__(34);
const notifications_1 = __webpack_require__(127);
const invoicing_1 = __webpack_require__(166);
let SubscriptionsModule = class SubscriptionsModule {
};
exports.SubscriptionsModule = SubscriptionsModule;
exports.SubscriptionsModule = SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule, notifications_1.NotificationsModule, invoicing_1.InvoicingModule],
        controllers: [subscriptions_controller_1.SubscriptionsController, invoices_controller_1.InvoicesController],
        providers: [subscriptions_service_1.SubscriptionsService],
        exports: [subscriptions_service_1.SubscriptionsService],
    })
], SubscriptionsModule);


/***/ }),
/* 292 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SubscriptionsService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const notifications_1 = __webpack_require__(127);
const invoicing_1 = __webpack_require__(166);
let SubscriptionsService = SubscriptionsService_1 = class SubscriptionsService {
    prisma;
    notificationsService;
    nubefact;
    constructor(prisma, notificationsService, nubefact) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.nubefact = nubefact;
    }
    static addInterval(date, interval) {
        const next = new Date(date);
        switch (interval) {
            case 'weekly':
                next.setDate(next.getDate() + 7);
                break;
            case 'monthly':
                next.setMonth(next.getMonth() + 1);
                break;
            case 'quarterly':
                next.setMonth(next.getMonth() + 3);
                break;
            case 'yearly':
                next.setFullYear(next.getFullYear() + 1);
                break;
        }
        return next;
    }
    async createForContract(contractId, dto, tenantId) {
        const startDate = dto.startDate ? new Date(dto.startDate) : new Date();
        return this.prisma.subscription.create({
            data: {
                contractId,
                billingInterval: dto.billingInterval,
                amount: dto.amount,
                currency: dto.currency ?? 'MXN',
                startDate,
                nextBillingDate: startDate,
                tenantId,
            },
        });
    }
    async findById(id, tenantId, user) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { id, tenantId },
            include: { contract: { include: { lead: true } }, invoices: { orderBy: { dueDate: 'desc' } } },
        });
        if (!subscription)
            throw new common_1.NotFoundException('Subscription not found');
        if (user?.isPortal && subscription.contract.leadId !== user.id) {
            throw new common_1.ForbiddenException('Not your subscription');
        }
        return subscription;
    }
    async findByContract(contractId, tenantId) {
        return this.prisma.subscription.findFirst({
            where: { contractId, tenantId },
            include: { invoices: { orderBy: { dueDate: 'desc' } } },
        });
    }
    async pause(id, tenantId) {
        const subscription = await this.findById(id, tenantId);
        if (subscription.status !== 'active')
            throw new common_1.BadRequestException('Only active subscriptions can be paused');
        return this.prisma.subscription.update({ where: { id }, data: { status: 'paused' } });
    }
    async cancel(id, tenantId) {
        const subscription = await this.findById(id, tenantId);
        if (subscription.status === 'cancelled')
            throw new common_1.BadRequestException('Subscription already cancelled');
        return this.prisma.subscription.update({
            where: { id },
            data: { status: 'cancelled', cancelledAt: new Date() },
        });
    }
    async generateInvoice(subscriptionId, tenantId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { id: subscriptionId, tenantId },
            include: { contract: { include: { lead: true } } },
        });
        if (!subscription)
            throw new common_1.NotFoundException('Subscription not found');
        if (subscription.status !== 'active') {
            throw new common_1.BadRequestException('Only active subscriptions can generate invoices');
        }
        const now = new Date();
        const number = await this.getNextInvoiceNumber(tenantId);
        const dueDate = new Date(now.getTime() + 7 * 24 * 3600000);
        const invoice = await this.prisma.invoice.create({
            data: {
                number,
                subscriptionId: subscription.id,
                currency: subscription.currency,
                amount: subscription.amount,
                dueDate,
                tenantId,
            },
        });
        try {
            await this.nubefact.issueInvoice(invoice.id, tenantId);
        }
        catch { }
        await this.prisma.subscription.update({
            where: { id: subscription.id },
            data: {
                lastBilledAt: now,
                nextBillingDate: SubscriptionsService_1.addInterval(subscription.nextBillingDate, subscription.billingInterval),
            },
        });
        const lead = subscription.contract.lead;
        await this.prisma.task.create({
            data: {
                title: `Enviar factura ${invoice.number} a ${lead.name}`,
                description: `Se generó la factura recurrente de la suscripción del contrato ${subscription.contract.number}.`,
                status: 'pending',
                priority: 'medium',
                dueDate: now,
                relatedType: 'invoice',
                relatedId: invoice.id,
                assigneeId: subscription.contract.createdById,
                tenantId,
            },
        });
        await this.notificationsService.create({
            userId: subscription.contract.createdById,
            title: 'Factura recurrente generada',
            body: `Se generó la factura ${invoice.number} para ${lead.name}.`,
            link: `/contracts/${subscription.contractId}`,
        });
        return invoice;
    }
    async getNextInvoiceNumber(tenantId) {
        const last = await this.prisma.invoice.findFirst({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            select: { number: true },
        });
        const lastNum = last ? parseInt(last.number.replace('INV-', ''), 10) : 0;
        return `INV-${String(lastNum + 1).padStart(5, '0')}`;
    }
    async findAllSubscriptions(tenantId) {
        return this.prisma.subscription.findMany({
            where: { tenantId },
            include: { contract: { include: { lead: true } }, invoices: { orderBy: { dueDate: 'desc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findInvoicesBySubscription(subscriptionId, tenantId) {
        return this.prisma.invoice.findMany({
            where: { subscriptionId, tenantId },
            orderBy: { dueDate: 'desc' },
            include: { payments: true },
        });
    }
    async findAllInvoices(tenantId) {
        return this.prisma.invoice.findMany({
            where: { tenantId },
            orderBy: { dueDate: 'desc' },
            include: { payments: true, subscription: { include: { contract: { include: { lead: true } } } } },
        });
    }
    async findInvoicesForLead(leadId, tenantId) {
        return this.prisma.invoice.findMany({
            where: { tenantId, subscription: { contract: { leadId } } },
            orderBy: { dueDate: 'desc' },
            include: { payments: true, subscription: { select: { id: true, contractId: true } } },
        });
    }
    async findInvoiceById(id, tenantId, user) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id, tenantId },
            include: {
                payments: true,
                subscription: { include: { contract: { include: { lead: true, quote: true } } } },
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (user?.isPortal && invoice.subscription?.contract.leadId !== user.id) {
            throw new common_1.ForbiddenException('Not your invoice');
        }
        return invoice;
    }
    async sendInvoice(id, tenantId) {
        const invoice = await this.prisma.invoice.findFirst({ where: { id, tenantId } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        if (invoice.status !== 'pending' && invoice.status !== 'overdue') {
            throw new common_1.BadRequestException('Invoice already sent or paid');
        }
        return this.prisma.invoice.update({
            where: { id },
            data: { status: 'sent', sentAt: new Date() },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = SubscriptionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof notifications_1.NotificationsService !== "undefined" && notifications_1.NotificationsService) === "function" ? _b : Object, typeof (_c = typeof invoicing_1.NubefactService !== "undefined" && invoicing_1.NubefactService) === "function" ? _c : Object])
], SubscriptionsService);


/***/ }),
/* 293 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const subscriptions_service_1 = __webpack_require__(292);
const role_permissions_1 = __webpack_require__(34);
let SubscriptionsController = class SubscriptionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    find(contractId, user) {
        if (contractId) {
            return this.service.findByContract(contractId, user.tenantId);
        }
        return this.service.findAllSubscriptions(user.tenantId);
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId, user);
    }
    pause(id, user) {
        return this.service.pause(id, user.tenantId);
    }
    cancel(id, user) {
        return this.service.cancel(id, user.tenantId);
    }
    generateInvoice(id, user) {
        if (user.isPortal)
            throw new common_1.ForbiddenException('Not allowed from the portal');
        return this.service.generateInvoice(id, user.tenantId);
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('contractId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id/pause'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "pause", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/generate-invoice'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionsController.prototype, "generateInvoice", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof subscriptions_service_1.SubscriptionsService !== "undefined" && subscriptions_service_1.SubscriptionsService) === "function" ? _a : Object])
], SubscriptionsController);


/***/ }),
/* 294 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicesController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const subscriptions_service_1 = __webpack_require__(292);
const role_permissions_1 = __webpack_require__(34);
let InvoicesController = class InvoicesController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(subscriptionId, user) {
        if (subscriptionId) {
            return this.service.findInvoicesBySubscription(subscriptionId, user.tenantId);
        }
        if (user.isPortal) {
            return this.service.findInvoicesForLead(user.id, user.tenantId);
        }
        return this.service.findAllInvoices(user.tenantId);
    }
    findById(id, user) {
        return this.service.findInvoiceById(id, user.tenantId, user);
    }
    send(id, user) {
        return this.service.sendInvoice(id, user.tenantId);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('subscriptionId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "send", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.Controller)('invoices'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof subscriptions_service_1.SubscriptionsService !== "undefined" && subscriptions_service_1.SubscriptionsService) === "function" ? _a : Object])
], InvoicesController);


/***/ }),
/* 295 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaybooksService = exports.PlaybooksModule = void 0;
var playbooks_module_1 = __webpack_require__(296);
Object.defineProperty(exports, "PlaybooksModule", ({ enumerable: true, get: function () { return playbooks_module_1.PlaybooksModule; } }));
var playbooks_service_1 = __webpack_require__(297);
Object.defineProperty(exports, "PlaybooksService", ({ enumerable: true, get: function () { return playbooks_service_1.PlaybooksService; } }));


/***/ }),
/* 296 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaybooksModule = void 0;
const common_1 = __webpack_require__(2);
const playbooks_service_1 = __webpack_require__(297);
const playbooks_controller_1 = __webpack_require__(298);
const role_permissions_1 = __webpack_require__(34);
let PlaybooksModule = class PlaybooksModule {
};
exports.PlaybooksModule = PlaybooksModule;
exports.PlaybooksModule = PlaybooksModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule],
        controllers: [playbooks_controller_1.PlaybooksController],
        providers: [playbooks_service_1.PlaybooksService],
        exports: [playbooks_service_1.PlaybooksService],
    })
], PlaybooksModule);


/***/ }),
/* 297 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlaybooksService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaybooksService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let PlaybooksService = PlaybooksService_1 = class PlaybooksService {
    prisma;
    logger = new common_1.Logger(PlaybooksService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.playbook.create({
            data: {
                name: dto.name,
                trigger: dto.trigger,
                active: dto.active ?? true,
                tenantId,
                steps: {
                    create: dto.steps.map((s) => ({
                        title: s.title,
                        description: s.description,
                        dayOffset: s.dayOffset,
                        order: s.order ?? 0,
                    })),
                },
            },
            include: { steps: { orderBy: { order: 'asc' } } },
        });
    }
    async findAll(tenantId) {
        return this.prisma.playbook.findMany({
            where: { tenantId },
            include: { steps: { orderBy: { order: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, tenantId) {
        const playbook = await this.prisma.playbook.findFirst({
            where: { id, tenantId },
            include: { steps: { orderBy: { order: 'asc' } } },
        });
        if (!playbook)
            throw new common_1.NotFoundException('Playbook not found');
        return playbook;
    }
    async update(id, dto, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.$transaction(async (tx) => {
            if (dto.steps) {
                await tx.playbookStep.deleteMany({ where: { playbookId: id } });
                await tx.playbookStep.createMany({
                    data: dto.steps.map((s) => ({
                        playbookId: id,
                        title: s.title,
                        description: s.description,
                        dayOffset: s.dayOffset,
                        order: s.order ?? 0,
                    })),
                });
            }
            return tx.playbook.update({
                where: { id },
                data: {
                    name: dto.name,
                    trigger: dto.trigger,
                    active: dto.active,
                },
                include: { steps: { orderBy: { order: 'asc' } } },
            });
        });
    }
    async remove(id, tenantId) {
        await this.findOne(id, tenantId);
        return this.prisma.playbook.delete({ where: { id } });
    }
    async startRunsForTrigger(trigger, params) {
        const { leadId, contractId, tenantId } = params;
        const playbooks = await this.prisma.playbook.findMany({
            where: { tenantId, trigger, active: true },
            include: { steps: true },
        });
        if (playbooks.length === 0)
            return;
        const lead = await this.prisma.lead.findUnique({
            where: { id: leadId },
            select: { ownerId: true },
        });
        if (!lead)
            return;
        for (const playbook of playbooks) {
            try {
                if (contractId) {
                    const existing = await this.prisma.playbookRun.findFirst({
                        where: { playbookId: playbook.id, contractId, status: 'active' },
                    });
                    if (existing)
                        continue;
                }
                const now = new Date();
                await this.prisma.$transaction(async (tx) => {
                    const run = await tx.playbookRun.create({
                        data: { playbookId: playbook.id, leadId, contractId, tenantId, status: 'active' },
                    });
                    for (const step of playbook.steps) {
                        const dueDate = new Date(now.getTime() + step.dayOffset * 24 * 3600000);
                        await tx.task.create({
                            data: {
                                title: step.title,
                                description: step.description,
                                status: 'pending',
                                priority: 'medium',
                                dueDate,
                                relatedType: 'playbook_run',
                                relatedId: run.id,
                                assigneeId: lead.ownerId,
                                tenantId,
                            },
                        });
                    }
                });
            }
            catch (err) {
                this.logger.error(`Failed to start playbook run for playbook ${playbook.id}`, err);
            }
        }
    }
    async getRunsForLead(leadId, tenantId) {
        const runs = await this.prisma.playbookRun.findMany({
            where: { leadId, tenantId },
            include: { playbook: { select: { id: true, name: true, trigger: true } } },
            orderBy: { startedAt: 'desc' },
        });
        if (runs.length === 0)
            return [];
        const tasks = await this.prisma.task.findMany({
            where: { tenantId, relatedType: 'playbook_run', relatedId: { in: runs.map((r) => r.id) } },
            orderBy: { dueDate: 'asc' },
        });
        const tasksByRunId = new Map();
        for (const task of tasks) {
            const list = tasksByRunId.get(task.relatedId) ?? [];
            list.push(task);
            tasksByRunId.set(task.relatedId, list);
        }
        return runs.map((run) => ({ ...run, tasks: tasksByRunId.get(run.id) ?? [] }));
    }
};
exports.PlaybooksService = PlaybooksService;
exports.PlaybooksService = PlaybooksService = PlaybooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], PlaybooksService);


/***/ }),
/* 298 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaybooksController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const playbooks_service_1 = __webpack_require__(297);
const create_playbook_dto_1 = __webpack_require__(299);
const update_playbook_dto_1 = __webpack_require__(300);
const role_permissions_1 = __webpack_require__(34);
let PlaybooksController = class PlaybooksController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    getRunsForLead(leadId, user) {
        return this.service.getRunsForLead(leadId, user.tenantId);
    }
    findOne(id, user) {
        return this.service.findOne(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.PlaybooksController = PlaybooksController;
__decorate([
    (0, common_1.Post)(),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_playbook_dto_1.CreatePlaybookDto !== "undefined" && create_playbook_dto_1.CreatePlaybookDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('runs'),
    __param(0, (0, common_1.Query)('leadId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "getRunsForLead", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_playbook_dto_1.UpdatePlaybookDto !== "undefined" && update_playbook_dto_1.UpdatePlaybookDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_permissions_1.RequirePermission)('manage_settings'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlaybooksController.prototype, "remove", null);
exports.PlaybooksController = PlaybooksController = __decorate([
    (0, common_1.Controller)('playbooks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof playbooks_service_1.PlaybooksService !== "undefined" && playbooks_service_1.PlaybooksService) === "function" ? _a : Object])
], PlaybooksController);


/***/ }),
/* 299 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePlaybookDto = exports.PlaybookStepDto = void 0;
const class_validator_1 = __webpack_require__(39);
const class_transformer_1 = __webpack_require__(104);
const client_1 = __webpack_require__(16);
class PlaybookStepDto {
    title;
    description;
    dayOffset;
    order;
}
exports.PlaybookStepDto = PlaybookStepDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlaybookStepDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlaybookStepDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PlaybookStepDto.prototype, "dayOffset", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PlaybookStepDto.prototype, "order", void 0);
class CreatePlaybookDto {
    name;
    trigger;
    active;
    steps;
}
exports.CreatePlaybookDto = CreatePlaybookDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaybookDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PlaybookTrigger),
    __metadata("design:type", typeof (_a = typeof client_1.PlaybookTrigger !== "undefined" && client_1.PlaybookTrigger) === "function" ? _a : Object)
], CreatePlaybookDto.prototype, "trigger", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePlaybookDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlaybookStepDto),
    __metadata("design:type", Array)
], CreatePlaybookDto.prototype, "steps", void 0);


/***/ }),
/* 300 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePlaybookDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_playbook_dto_1 = __webpack_require__(299);
class UpdatePlaybookDto extends (0, mapped_types_1.PartialType)(create_playbook_dto_1.CreatePlaybookDto) {
}
exports.UpdatePlaybookDto = UpdatePlaybookDto;


/***/ }),
/* 301 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiController = void 0;
const common_1 = __webpack_require__(2);
const api_service_1 = __webpack_require__(302);
let ApiController = class ApiController {
    apiService;
    constructor(apiService) {
        this.apiService = apiService;
    }
    getHello() {
        return this.apiService.getHello();
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ApiController.prototype, "getHello", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof api_service_1.ApiService !== "undefined" && api_service_1.ApiService) === "function" ? _a : Object])
], ApiController);


/***/ }),
/* 302 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiService = void 0;
const common_1 = __webpack_require__(2);
let ApiService = class ApiService {
    getHello() {
        return 'Hello World!';
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);


/***/ }),
/* 303 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CareersModule = void 0;
const common_1 = __webpack_require__(2);
const careers_service_1 = __webpack_require__(304);
const careers_controller_1 = __webpack_require__(305);
let CareersModule = class CareersModule {
};
exports.CareersModule = CareersModule;
exports.CareersModule = CareersModule = __decorate([
    (0, common_1.Module)({
        controllers: [careers_controller_1.CareersController],
        providers: [careers_service_1.CareersService],
    })
], CareersModule);


/***/ }),
/* 304 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CareersService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let CareersService = class CareersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createCareerDto, tenantId) {
        return this.prisma.career.create({
            data: {
                ...createCareerDto,
                tenantId,
            },
        });
    }
    findAll(tenantId) {
        return this.prisma.career.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });
    }
    findOne(id, tenantId) {
        return this.prisma.career.findFirst({
            where: { id, tenantId },
        });
    }
    update(id, updateCareerDto, tenantId) {
        return this.prisma.career.updateMany({
            where: { id, tenantId },
            data: updateCareerDto,
        });
    }
    remove(id, tenantId) {
        return this.prisma.career.deleteMany({
            where: { id, tenantId },
        });
    }
};
exports.CareersService = CareersService;
exports.CareersService = CareersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], CareersService);


/***/ }),
/* 305 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CareersController = void 0;
const common_1 = __webpack_require__(2);
const careers_service_1 = __webpack_require__(304);
const create_career_dto_1 = __webpack_require__(306);
const update_career_dto_1 = __webpack_require__(307);
const auth_1 = __webpack_require__(23);
let CareersController = class CareersController {
    careersService;
    constructor(careersService) {
        this.careersService = careersService;
    }
    create(createCareerDto, tenantId) {
        return this.careersService.create(createCareerDto, tenantId);
    }
    findAll(tenantId) {
        return this.careersService.findAll(tenantId);
    }
    findOne(id, tenantId) {
        return this.careersService.findOne(id, tenantId);
    }
    update(id, updateCareerDto, tenantId) {
        return this.careersService.update(id, updateCareerDto, tenantId);
    }
    remove(id, tenantId) {
        return this.careersService.remove(id, tenantId);
    }
};
exports.CareersController = CareersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_career_dto_1.CreateCareerDto !== "undefined" && create_career_dto_1.CreateCareerDto) === "function" ? _b : Object, String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_career_dto_1.UpdateCareerDto !== "undefined" && update_career_dto_1.UpdateCareerDto) === "function" ? _c : Object, String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CareersController.prototype, "remove", null);
exports.CareersController = CareersController = __decorate([
    (0, common_1.Controller)('careers'),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof careers_service_1.CareersService !== "undefined" && careers_service_1.CareersService) === "function" ? _a : Object])
], CareersController);


/***/ }),
/* 306 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCareerDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateCareerDto {
    name;
    active;
}
exports.CreateCareerDto = CreateCareerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCareerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCareerDto.prototype, "active", void 0);


/***/ }),
/* 307 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCareerDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_career_dto_1 = __webpack_require__(306);
class UpdateCareerDto extends (0, mapped_types_1.PartialType)(create_career_dto_1.CreateCareerDto) {
}
exports.UpdateCareerDto = UpdateCareerDto;


/***/ }),
/* 308 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalitiesModule = void 0;
const common_1 = __webpack_require__(2);
const modalities_service_1 = __webpack_require__(309);
const modalities_controller_1 = __webpack_require__(310);
let ModalitiesModule = class ModalitiesModule {
};
exports.ModalitiesModule = ModalitiesModule;
exports.ModalitiesModule = ModalitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [modalities_controller_1.ModalitiesController],
        providers: [modalities_service_1.ModalitiesService],
    })
], ModalitiesModule);


/***/ }),
/* 309 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalitiesService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
let ModalitiesService = class ModalitiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createModalityDto, tenantId) {
        return this.prisma.modality.create({
            data: {
                ...createModalityDto,
                tenantId,
            },
        });
    }
    findAll(tenantId) {
        return this.prisma.modality.findMany({
            where: { tenantId },
            orderBy: { name: 'asc' },
        });
    }
    findOne(id, tenantId) {
        return this.prisma.modality.findFirst({
            where: { id, tenantId },
        });
    }
    update(id, updateModalityDto, tenantId) {
        return this.prisma.modality.updateMany({
            where: { id, tenantId },
            data: updateModalityDto,
        });
    }
    remove(id, tenantId) {
        return this.prisma.modality.deleteMany({
            where: { id, tenantId },
        });
    }
};
exports.ModalitiesService = ModalitiesService;
exports.ModalitiesService = ModalitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], ModalitiesService);


/***/ }),
/* 310 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalitiesController = void 0;
const common_1 = __webpack_require__(2);
const modalities_service_1 = __webpack_require__(309);
const create_modality_dto_1 = __webpack_require__(311);
const update_modality_dto_1 = __webpack_require__(312);
const auth_1 = __webpack_require__(23);
let ModalitiesController = class ModalitiesController {
    modalitiesService;
    constructor(modalitiesService) {
        this.modalitiesService = modalitiesService;
    }
    create(createModalityDto, tenantId) {
        return this.modalitiesService.create(createModalityDto, tenantId);
    }
    findAll(tenantId) {
        return this.modalitiesService.findAll(tenantId);
    }
    findOne(id, tenantId) {
        return this.modalitiesService.findOne(id, tenantId);
    }
    update(id, updateModalityDto, tenantId) {
        return this.modalitiesService.update(id, updateModalityDto, tenantId);
    }
    remove(id, tenantId) {
        return this.modalitiesService.remove(id, tenantId);
    }
};
exports.ModalitiesController = ModalitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_modality_dto_1.CreateModalityDto !== "undefined" && create_modality_dto_1.CreateModalityDto) === "function" ? _b : Object, String]),
    __metadata("design:returntype", void 0)
], ModalitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModalitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModalitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_modality_dto_1.UpdateModalityDto !== "undefined" && update_modality_dto_1.UpdateModalityDto) === "function" ? _c : Object, String]),
    __metadata("design:returntype", void 0)
], ModalitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentTenant)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModalitiesController.prototype, "remove", null);
exports.ModalitiesController = ModalitiesController = __decorate([
    (0, common_1.Controller)('modalities'),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof modalities_service_1.ModalitiesService !== "undefined" && modalities_service_1.ModalitiesService) === "function" ? _a : Object])
], ModalitiesController);


/***/ }),
/* 311 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateModalityDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreateModalityDto {
    name;
    active;
}
exports.CreateModalityDto = CreateModalityDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateModalityDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateModalityDto.prototype, "active", void 0);


/***/ }),
/* 312 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateModalityDto = void 0;
const mapped_types_1 = __webpack_require__(102);
const create_modality_dto_1 = __webpack_require__(311);
class UpdateModalityDto extends (0, mapped_types_1.PartialType)(create_modality_dto_1.CreateModalityDto) {
}
exports.UpdateModalityDto = UpdateModalityDto;


/***/ }),
/* 313 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(314), exports);
__exportStar(__webpack_require__(315), exports);


/***/ }),
/* 314 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsModule = void 0;
const common_1 = __webpack_require__(2);
const payments_service_1 = __webpack_require__(315);
const payments_controller_1 = __webpack_require__(316);
const shared_1 = __webpack_require__(11);
const role_permissions_1 = __webpack_require__(34);
const webhooks_1 = __webpack_require__(207);
const commissions_1 = __webpack_require__(147);
const referrals_1 = __webpack_require__(156);
const invoicing_1 = __webpack_require__(166);
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_1.SharedModule, role_permissions_1.RolePermissionsModule, webhooks_1.WebhooksModule, commissions_1.CommissionsModule, referrals_1.ReferralsModule, invoicing_1.InvoicingModule],
        providers: [payments_service_1.PaymentsService],
        controllers: [payments_controller_1.PaymentsController],
        exports: [payments_service_1.PaymentsService],
    })
], PaymentsModule);


/***/ }),
/* 315 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const webhooks_1 = __webpack_require__(207);
const commissions_1 = __webpack_require__(147);
const referrals_1 = __webpack_require__(156);
const invoicing_1 = __webpack_require__(166);
const PDFDocument = __webpack_require__(187);
let PaymentsService = class PaymentsService {
    prisma;
    webhooksService;
    commissions;
    referrals;
    invoicing;
    constructor(prisma, webhooksService, commissions, referrals, invoicing) {
        this.prisma = prisma;
        this.webhooksService = webhooksService;
        this.commissions = commissions;
        this.referrals = referrals;
        this.invoicing = invoicing;
    }
    async create(dto, userId, tenantId) {
        if (!dto.quoteId && !dto.invoiceId) {
            throw new common_1.BadRequestException('quoteId or invoiceId is required');
        }
        if (dto.quoteId && dto.invoiceId) {
            throw new common_1.BadRequestException('Provide only one of quoteId or invoiceId');
        }
        if (dto.quoteId) {
            return this.createForQuote(dto, dto.quoteId, userId, tenantId);
        }
        return this.createForInvoice(dto, dto.invoiceId, userId, tenantId);
    }
    async createForQuote(dto, quoteId, userId, tenantId) {
        const quote = await this.prisma.quote.findFirst({
            where: { id: quoteId, tenantId },
            include: { payments: true }
        });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        const payment = await this.prisma.payment.create({
            data: {
                amount: dto.amount,
                method: dto.method,
                reference: dto.reference,
                notes: dto.notes,
                quoteId,
                createdById: userId,
                tenantId,
            }
        });
        const totalPaid = quote.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;
        if (totalPaid >= quote.grandTotal && quote.status !== 'converted') {
            const updatedQuote = await this.prisma.quote.update({
                where: { id: quote.id },
                data: { status: 'converted' }
            });
            await this.webhooksService.emit('quote.converted', { ...updatedQuote, entity: 'quote', entityId: updatedQuote.id }, tenantId);
            await this.commissions.calculateForQuote(updatedQuote, tenantId);
            await this.referrals.calculateForQuote(updatedQuote, tenantId);
            await this.invoicing.createForQuote(updatedQuote, tenantId);
        }
        return payment;
    }
    async createForInvoice(dto, invoiceId, userId, tenantId) {
        const invoice = await this.prisma.invoice.findFirst({
            where: { id: invoiceId, tenantId },
            include: { payments: true }
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const payment = await this.prisma.payment.create({
            data: {
                amount: dto.amount,
                method: dto.method,
                reference: dto.reference,
                notes: dto.notes,
                invoiceId,
                createdById: userId,
                tenantId,
            }
        });
        const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;
        if (totalPaid >= invoice.amount && invoice.status !== 'paid') {
            const updatedInvoice = await this.prisma.invoice.update({
                where: { id: invoice.id },
                data: { status: 'paid', paidAt: new Date() }
            });
            await this.webhooksService.emit('invoice.paid', { ...updatedInvoice, entity: 'invoice', entityId: updatedInvoice.id }, tenantId);
        }
        return payment;
    }
    async getByQuote(quoteId, tenantId) {
        return this.prisma.payment.findMany({
            where: { quoteId, tenantId },
            orderBy: { createdAt: 'desc' },
            include: { createdBy: { select: { id: true, name: true } } }
        });
    }
    async getByInvoice(invoiceId, tenantId) {
        return this.prisma.payment.findMany({
            where: { invoiceId, tenantId },
            orderBy: { createdAt: 'desc' },
            include: { createdBy: { select: { id: true, name: true } } }
        });
    }
    async generateReceiptPdf(id, tenantId) {
        const payment = await this.prisma.payment.findFirst({
            where: { id, tenantId },
            include: {
                quote: { include: { lead: true } },
                invoice: { include: { subscription: { include: { contract: { include: { lead: true } } } } } },
                tenant: true
            }
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        const relatedNumber = payment.quote?.number ?? payment.invoice?.number ?? 'N/A';
        const clientName = payment.quote?.lead?.name ?? payment.invoice?.subscription?.contract?.lead?.name ?? 'N/A';
        const relatedTotal = payment.quote?.grandTotal ?? payment.invoice?.amount ?? 0;
        const relatedLabel = payment.quoteId ? 'Cotización Relacionada' : 'Factura Relacionada';
        return new Promise((resolve) => {
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            const primaryColor = '#10b981';
            const secondaryColor = '#64748b';
            doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);
            doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('RECIBO DE PAGO', 50, 40);
            doc.fillColor('#333333');
            doc.fontSize(12).font('Helvetica-Bold').text('Detalles del Pago', 50, 130);
            doc.font('Helvetica').text(`Monto: $${payment.amount.toLocaleString()}`, 50, 150);
            doc.text(`Fecha: ${new Date(payment.createdAt).toLocaleDateString()}`, 50, 165);
            doc.text(`Método: ${payment.method}`, 50, 180);
            if (payment.reference)
                doc.text(`Referencia: ${payment.reference}`, 50, 195);
            doc.font('Helvetica-Bold').text(`${relatedLabel}:`, 350, 130);
            doc.font('Helvetica').text(`Nº: ${relatedNumber}`, 350, 150);
            doc.text(`Cliente: ${clientName}`, 350, 165);
            doc.text(`Total: $${relatedTotal.toLocaleString()}`, 350, 180);
            const bottom = doc.page.height - 50;
            doc.fillColor(secondaryColor).fontSize(8).font('Helvetica');
            doc.text('Gracias por su pago.', 50, bottom, { align: 'center' });
            doc.end();
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _b : Object, typeof (_c = typeof commissions_1.CommissionsService !== "undefined" && commissions_1.CommissionsService) === "function" ? _c : Object, typeof (_d = typeof referrals_1.ReferralsService !== "undefined" && referrals_1.ReferralsService) === "function" ? _d : Object, typeof (_e = typeof invoicing_1.InvoicingService !== "undefined" && invoicing_1.InvoicingService) === "function" ? _e : Object])
], PaymentsService);


/***/ }),
/* 316 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const auth_1 = __webpack_require__(23);
const payments_service_1 = __webpack_require__(315);
const create_payment_dto_1 = __webpack_require__(317);
const role_permissions_1 = __webpack_require__(34);
let PaymentsController = class PaymentsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    getByQuote(quoteId, user) {
        return this.service.getByQuote(quoteId, user.tenantId);
    }
    getByInvoice(invoiceId, user) {
        return this.service.getByInvoice(invoiceId, user.tenantId);
    }
    async getReceiptPdf(id, user, res) {
        const buffer = await this.service.generateReceiptPdf(id, user.tenantId);
        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', `attachment; filename="receipt-${id}.pdf"`);
        res.send(buffer);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_payment_dto_1.CreatePaymentDto !== "undefined" && create_payment_dto_1.CreatePaymentDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('quote/:quoteId'),
    __param(0, (0, common_1.Param)('quoteId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getByQuote", null);
__decorate([
    (0, common_1.Get)('invoice/:invoiceId'),
    __param(0, (0, common_1.Param)('invoiceId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getByInvoice", null);
__decorate([
    (0, common_1.Get)(':id/receipt'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getReceiptPdf", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof payments_service_1.PaymentsService !== "undefined" && payments_service_1.PaymentsService) === "function" ? _a : Object])
], PaymentsController);


/***/ }),
/* 317 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePaymentDto = void 0;
const class_validator_1 = __webpack_require__(39);
const client_1 = __webpack_require__(16);
class CreatePaymentDto {
    quoteId;
    invoiceId;
    amount;
    method;
    reference;
    notes;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, class_validator_1.ValidateIf)((dto) => !dto.invoiceId),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "quoteId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((dto) => !dto.quoteId),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "invoiceId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.PaymentMethod),
    __metadata("design:type", typeof (_a = typeof client_1.PaymentMethod !== "undefined" && client_1.PaymentMethod) === "function" ? _a : Object)
], CreatePaymentDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "notes", void 0);


/***/ }),
/* 318 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsService = exports.ContractsModule = void 0;
var contracts_module_1 = __webpack_require__(319);
Object.defineProperty(exports, "ContractsModule", ({ enumerable: true, get: function () { return contracts_module_1.ContractsModule; } }));
var contracts_service_1 = __webpack_require__(320);
Object.defineProperty(exports, "ContractsService", ({ enumerable: true, get: function () { return contracts_service_1.ContractsService; } }));


/***/ }),
/* 319 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsModule = void 0;
const common_1 = __webpack_require__(2);
const contracts_service_1 = __webpack_require__(320);
const contracts_controller_1 = __webpack_require__(321);
const role_permissions_1 = __webpack_require__(34);
const subscriptions_1 = __webpack_require__(290);
const playbooks_1 = __webpack_require__(295);
const webhooks_1 = __webpack_require__(207);
let ContractsModule = class ContractsModule {
};
exports.ContractsModule = ContractsModule;
exports.ContractsModule = ContractsModule = __decorate([
    (0, common_1.Module)({
        imports: [role_permissions_1.RolePermissionsModule, subscriptions_1.SubscriptionsModule, playbooks_1.PlaybooksModule, webhooks_1.WebhooksModule],
        controllers: [contracts_controller_1.ContractsController],
        providers: [contracts_service_1.ContractsService],
        exports: [contracts_service_1.ContractsService],
    })
], ContractsModule);


/***/ }),
/* 320 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const subscriptions_1 = __webpack_require__(290);
const playbooks_1 = __webpack_require__(295);
const webhooks_1 = __webpack_require__(207);
const crypto = __importStar(__webpack_require__(18));
let ContractsService = class ContractsService {
    prisma;
    subscriptionsService;
    playbooksService;
    webhooksService;
    constructor(prisma, subscriptionsService, playbooksService, webhooksService) {
        this.prisma = prisma;
        this.subscriptionsService = subscriptionsService;
        this.playbooksService = playbooksService;
        this.webhooksService = webhooksService;
    }
    async getNextNumber(tenantId) {
        const last = await this.prisma.contract.findFirst({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            select: { number: true },
        });
        const lastNum = last ? parseInt(last.number.replace('C-', ''), 10) : 0;
        return `C-${String(lastNum + 1).padStart(5, '0')}`;
    }
    async create(dto, userId, tenantId) {
        const quote = await this.prisma.quote.findFirst({ where: { id: dto.quoteId, tenantId } });
        if (!quote)
            throw new common_1.NotFoundException('Quote not found');
        if (!['approved', 'converted'].includes(quote.status)) {
            throw new common_1.BadRequestException('Quote must be approved or converted to create a contract');
        }
        if (!quote.leadId)
            throw new common_1.BadRequestException('Quote has no associated lead');
        const number = await this.getNextNumber(tenantId);
        const contract = await this.prisma.contract.create({
            data: {
                number,
                quoteId: dto.quoteId,
                leadId: quote.leadId,
                content: dto.content,
                createdById: userId,
                tenantId,
            },
        });
        await this.subscriptionsService.createForContract(contract.id, {
            billingInterval: dto.billingInterval,
            amount: dto.amount,
            currency: dto.currency ?? quote.currency,
            startDate: dto.startDate,
        }, tenantId);
        return this.findById(contract.id, tenantId);
    }
    async findAll(tenantId, user, filters) {
        const where = { tenantId };
        if (user?.isPortal)
            where.leadId = user.id;
        if (!user?.isPortal && filters?.leadId)
            where.leadId = filters.leadId;
        if (!user?.isPortal && filters?.companyId)
            where.lead = { companyId: filters.companyId };
        return this.prisma.contract.findMany({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true } },
                quote: { select: { id: true, number: true, grandTotal: true, currency: true } },
                subscription: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId, user) {
        const where = { id, tenantId };
        if (user?.isPortal)
            where.leadId = user.id;
        const contract = await this.prisma.contract.findFirst({
            where,
            include: {
                lead: { select: { id: true, name: true, email: true, companyName: true } },
                quote: { select: { id: true, number: true, grandTotal: true, currency: true } },
                createdBy: { select: { id: true, name: true } },
                subscription: { include: { invoices: { orderBy: { dueDate: 'desc' } } } },
            },
        });
        if (!contract)
            throw new common_1.NotFoundException('Contract not found');
        return contract;
    }
    async send(id, tenantId) {
        const contract = await this.findById(id, tenantId);
        if (contract.status !== 'draft')
            throw new common_1.BadRequestException('Only draft contracts can be sent');
        return this.prisma.contract.update({
            where: { id },
            data: { status: 'sent', sentAt: new Date() },
        });
    }
    async accept(id, user, ip) {
        if (!user?.isPortal) {
            throw new common_1.ForbiddenException('Only the client can accept the contract from the portal');
        }
        const contract = await this.prisma.contract.findFirst({ where: { id, tenantId: user.tenantId } });
        if (!contract || contract.leadId !== user.id)
            throw new common_1.NotFoundException('Contract not found');
        if (contract.status !== 'sent')
            throw new common_1.BadRequestException('Contract must be sent before it can be accepted');
        const documentHash = crypto.createHash('sha256').update(contract.content).digest('hex');
        const updated = await this.prisma.contract.update({
            where: { id },
            data: {
                status: 'accepted',
                acceptedByUserId: user.id,
                acceptedIp: ip,
                acceptedAt: new Date(),
                documentHash,
            },
        });
        await this.playbooksService.startRunsForTrigger('contract_accepted', {
            leadId: updated.leadId,
            contractId: updated.id,
            tenantId: user.tenantId,
        });
        await this.webhooksService.emit('contract.accepted', { ...updated, entity: 'contract', entityId: updated.id }, user.tenantId);
        return updated;
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof subscriptions_1.SubscriptionsService !== "undefined" && subscriptions_1.SubscriptionsService) === "function" ? _b : Object, typeof (_c = typeof playbooks_1.PlaybooksService !== "undefined" && playbooks_1.PlaybooksService) === "function" ? _c : Object, typeof (_d = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _d : Object])
], ContractsService);


/***/ }),
/* 321 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractsController = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(26);
const swagger_1 = __webpack_require__(4);
const auth_1 = __webpack_require__(23);
const contracts_service_1 = __webpack_require__(320);
const create_contract_dto_1 = __webpack_require__(322);
const role_permissions_1 = __webpack_require__(34);
let ContractsController = class ContractsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(leadId, companyId, user) {
        return this.service.findAll(user.tenantId, user, { leadId, companyId });
    }
    findById(id, user) {
        return this.service.findById(id, user.tenantId, user);
    }
    send(id, user) {
        return this.service.send(id, user.tenantId);
    }
    accept(id, user, req) {
        return this.service.accept(id, user, req.ip);
    }
};
exports.ContractsController = ContractsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un contrato (y su suscripción) a partir de una cotización aprobada/convertida' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_contract_dto_1.CreateContractDto !== "undefined" && create_contract_dto_1.CreateContractDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista contratos' }),
    __param(0, (0, common_1.Query)('leadId')),
    __param(1, (0, common_1.Query)('companyId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un contrato por id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    (0, swagger_1.ApiOperation)({ summary: 'Envía el contrato al cliente para su aceptación' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "send", null);
__decorate([
    (0, common_1.Post)(':id/accept'),
    (0, swagger_1.ApiOperation)({ summary: 'El cliente acepta el contrato desde el portal' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "accept", null);
exports.ContractsController = ContractsController = __decorate([
    (0, swagger_1.ApiTags)('Contracts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('contracts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_permissions_1.PermissionsGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof contracts_service_1.ContractsService !== "undefined" && contracts_service_1.ContractsService) === "function" ? _a : Object])
], ContractsController);


/***/ }),
/* 322 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractDto = void 0;
const class_validator_1 = __webpack_require__(39);
const client_1 = __webpack_require__(16);
class CreateContractDto {
    quoteId;
    content;
    billingInterval;
    amount;
    currency;
    startDate;
}
exports.CreateContractDto = CreateContractDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "quoteId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.BillingInterval),
    __metadata("design:type", typeof (_a = typeof client_1.BillingInterval !== "undefined" && client_1.BillingInterval) === "function" ? _a : Object)
], CreateContractDto.prototype, "billingInterval", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContractDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.Currency),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof client_1.Currency !== "undefined" && client_1.Currency) === "function" ? _b : Object)
], CreateContractDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "startDate", void 0);


/***/ }),
/* 323 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicApiModule = void 0;
var public_api_module_1 = __webpack_require__(324);
Object.defineProperty(exports, "PublicApiModule", ({ enumerable: true, get: function () { return public_api_module_1.PublicApiModule; } }));


/***/ }),
/* 324 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicApiModule = void 0;
const common_1 = __webpack_require__(2);
const public_api_service_1 = __webpack_require__(325);
const public_api_controller_1 = __webpack_require__(326);
const api_keys_1 = __webpack_require__(221);
const leads_1 = __webpack_require__(235);
const tickets_1 = __webpack_require__(216);
let PublicApiModule = class PublicApiModule {
};
exports.PublicApiModule = PublicApiModule;
exports.PublicApiModule = PublicApiModule = __decorate([
    (0, common_1.Module)({
        imports: [api_keys_1.ApiKeysModule, leads_1.LeadsModule, tickets_1.TicketsModule],
        controllers: [public_api_controller_1.PublicApiController],
        providers: [public_api_service_1.PublicApiService],
    })
], PublicApiModule);


/***/ }),
/* 325 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicApiService = void 0;
const common_1 = __webpack_require__(2);
const shared_1 = __webpack_require__(11);
const leads_1 = __webpack_require__(235);
const tickets_1 = __webpack_require__(216);
let PublicApiService = class PublicApiService {
    prisma;
    leadsService;
    ticketsService;
    constructor(prisma, leadsService, ticketsService) {
        this.prisma = prisma;
        this.leadsService = leadsService;
        this.ticketsService = ticketsService;
    }
    async resolveDefaultOwner(tenantId) {
        const owner = await this.prisma.user.findFirst({
            where: { tenantId, role: { in: ['admin', 'superadmin'] } },
            orderBy: { createdAt: 'asc' },
        });
        if (!owner)
            throw new common_1.BadRequestException('No admin user found to assign this record to');
        return owner;
    }
    async createLead(dto, tenantId) {
        const owner = await this.resolveDefaultOwner(tenantId);
        return this.leadsService.create(dto, owner.id, tenantId);
    }
    async getLead(id, tenantId) {
        return this.leadsService.findById(id, { tenantId, role: 'api' });
    }
    async createTicket(dto, tenantId) {
        const owner = await this.resolveDefaultOwner(tenantId);
        return this.ticketsService.create(dto, owner.id, tenantId);
    }
    async getTicket(id, tenantId) {
        return this.ticketsService.findById(id, tenantId);
    }
};
exports.PublicApiService = PublicApiService;
exports.PublicApiService = PublicApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof leads_1.LeadsService !== "undefined" && leads_1.LeadsService) === "function" ? _b : Object, typeof (_c = typeof tickets_1.TicketsService !== "undefined" && tickets_1.TicketsService) === "function" ? _c : Object])
], PublicApiService);


/***/ }),
/* 326 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicApiController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const api_keys_1 = __webpack_require__(221);
const public_api_service_1 = __webpack_require__(325);
const create_public_lead_dto_1 = __webpack_require__(327);
const create_public_ticket_dto_1 = __webpack_require__(328);
let PublicApiController = class PublicApiController {
    service;
    constructor(service) {
        this.service = service;
    }
    createLead(dto, req) {
        return this.service.createLead(dto, req.apiKeyTenantId);
    }
    getLead(id, req) {
        return this.service.getLead(id, req.apiKeyTenantId);
    }
    createTicket(dto, req) {
        return this.service.createTicket(dto, req.apiKeyTenantId);
    }
    getTicket(id, req) {
        return this.service.getTicket(id, req.apiKeyTenantId);
    }
};
exports.PublicApiController = PublicApiController;
__decorate([
    (0, common_1.Post)('leads'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un lead desde un sistema externo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_public_lead_dto_1.CreatePublicLeadDto !== "undefined" && create_public_lead_dto_1.CreatePublicLeadDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], PublicApiController.prototype, "createLead", null);
__decorate([
    (0, common_1.Get)('leads/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulta el estado de un lead' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicApiController.prototype, "getLead", null);
__decorate([
    (0, common_1.Post)('tickets'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un ticket de soporte desde un sistema externo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_public_ticket_dto_1.CreatePublicTicketDto !== "undefined" && create_public_ticket_dto_1.CreatePublicTicketDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], PublicApiController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)('tickets/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulta el estado de un ticket' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicApiController.prototype, "getTicket", null);
exports.PublicApiController = PublicApiController = __decorate([
    (0, swagger_1.ApiTags)('Public API'),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, common_1.Controller)('public/v1'),
    (0, common_1.UseGuards)(api_keys_1.ApiKeyGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof public_api_service_1.PublicApiService !== "undefined" && public_api_service_1.PublicApiService) === "function" ? _a : Object])
], PublicApiController);


/***/ }),
/* 327 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePublicLeadDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreatePublicLeadDto {
    name;
    email;
    phone;
    company;
    source;
    notes;
    value;
}
exports.CreatePublicLeadDto = CreatePublicLeadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicLeadDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePublicLeadDto.prototype, "value", void 0);


/***/ }),
/* 328 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePublicTicketDto = void 0;
const class_validator_1 = __webpack_require__(39);
class CreatePublicTicketDto {
    subject;
    description;
    priority;
    leadId;
}
exports.CreatePublicTicketDto = CreatePublicTicketDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePublicTicketDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicTicketDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['low', 'medium', 'high', 'critical']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicTicketDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePublicTicketDto.prototype, "leadId", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;