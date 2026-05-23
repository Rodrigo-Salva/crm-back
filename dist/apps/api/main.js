/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/admin/admin.controller.ts"
/*!************************************************!*\
  !*** ./apps/api/src/admin/admin.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AdminController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const tenant_1 = __webpack_require__(/*! @crm/tenant */ "./libs/tenant/src/index.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const create_tenant_dto_1 = __webpack_require__(/*! @crm/tenant/dto/create-tenant.dto */ "./libs/tenant/src/dto/create-tenant.dto.ts");
const update_tenant_dto_1 = __webpack_require__(/*! @crm/tenant/dto/update-tenant.dto */ "./libs/tenant/src/dto/update-tenant.dto.ts");
let AdminController = class AdminController {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    findAll() {
        return this.tenantService.findAll();
    }
    create(dto) {
        return this.tenantService.create(dto);
    }
    findOne(id) {
        return this.tenantService.findById(id);
    }
    update(id, dto) {
        return this.tenantService.update(id, dto);
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
    __metadata("design:paramtypes", [typeof (_b = typeof create_tenant_dto_1.CreateTenantDto !== "undefined" && create_tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
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
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_tenant_dto_1.UpdateTenantDto !== "undefined" && update_tenant_dto_1.UpdateTenantDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin/tenants'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), auth_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_1.TenantService !== "undefined" && tenant_1.TenantService) === "function" ? _a : Object])
], AdminController);


/***/ },

/***/ "./apps/api/src/admin/admin.module.ts"
/*!********************************************!*\
  !*** ./apps/api/src/admin/admin.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const tenant_1 = __webpack_require__(/*! @crm/tenant */ "./libs/tenant/src/index.ts");
const admin_controller_1 = __webpack_require__(/*! ./admin.controller */ "./apps/api/src/admin/admin.controller.ts");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_1.AuthModule, tenant_1.TenantModule],
        controllers: [admin_controller_1.AdminController],
    })
], AdminModule);


/***/ },

/***/ "./apps/api/src/api.controller.ts"
/*!****************************************!*\
  !*** ./apps/api/src/api.controller.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const api_service_1 = __webpack_require__(/*! ./api.service */ "./apps/api/src/api.service.ts");
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


/***/ },

/***/ "./apps/api/src/api.module.ts"
/*!************************************!*\
  !*** ./apps/api/src/api.module.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const tenant_1 = __webpack_require__(/*! @crm/tenant */ "./libs/tenant/src/index.ts");
const contacts_1 = __webpack_require__(/*! @crm/contacts */ "./libs/contacts/src/index.ts");
const companies_1 = __webpack_require__(/*! @crm/companies */ "./libs/companies/src/index.ts");
const deals_1 = __webpack_require__(/*! @crm/deals */ "./libs/deals/src/index.ts");
const custom_fields_1 = __webpack_require__(/*! @crm/custom-fields */ "./libs/custom-fields/src/index.ts");
const pipeline_stages_1 = __webpack_require__(/*! @crm/pipeline-stages */ "./libs/pipeline-stages/src/index.ts");
const activities_1 = __webpack_require__(/*! @crm/activities */ "./libs/activities/src/index.ts");
const notifications_1 = __webpack_require__(/*! @crm/notifications */ "./libs/notifications/src/index.ts");
const email_1 = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const campaigns_1 = __webpack_require__(/*! @crm/campaigns */ "./libs/campaigns/src/index.ts");
const dashboard_1 = __webpack_require__(/*! @crm/dashboard */ "./libs/dashboard/src/index.ts");
const products_1 = __webpack_require__(/*! @crm/products */ "./libs/products/src/index.ts");
const quotes_1 = __webpack_require__(/*! @crm/quotes */ "./libs/quotes/src/index.ts");
const tickets_1 = __webpack_require__(/*! @crm/tickets */ "./libs/tickets/src/index.ts");
const api_keys_1 = __webpack_require__(/*! @crm/api-keys */ "./libs/api-keys/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
const whatsapp_1 = __webpack_require__(/*! @crm/whatsapp */ "./libs/whatsapp/src/index.ts");
const tenant_settings_1 = __webpack_require__(/*! @crm/tenant-settings */ "./libs/tenant-settings/src/index.ts");
const ai_assistant_1 = __webpack_require__(/*! @crm/ai-assistant */ "./libs/ai-assistant/src/index.ts");
const role_permissions_1 = __webpack_require__(/*! @crm/role-permissions */ "./libs/role-permissions/src/index.ts");
const leads_1 = __webpack_require__(/*! @crm/leads */ "./libs/leads/src/index.ts");
const uploads_1 = __webpack_require__(/*! @crm/uploads */ "./libs/uploads/src/index.ts");
const teams_1 = __webpack_require__(/*! @crm/teams */ "./libs/teams/src/index.ts");
const time_tracking_1 = __webpack_require__(/*! @crm/time-tracking */ "./libs/time-tracking/src/index.ts");
const admin_module_1 = __webpack_require__(/*! ./admin/admin.module */ "./apps/api/src/admin/admin.module.ts");
const import_module_1 = __webpack_require__(/*! ./import/import.module */ "./apps/api/src/import/import.module.ts");
const scheduler_module_1 = __webpack_require__(/*! ./scheduler/scheduler.module */ "./apps/api/src/scheduler/scheduler.module.ts");
const api_controller_1 = __webpack_require__(/*! ./api.controller */ "./apps/api/src/api.controller.ts");
const api_service_1 = __webpack_require__(/*! ./api.service */ "./apps/api/src/api.service.ts");
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
            contacts_1.ContactsModule,
            companies_1.CompaniesModule,
            deals_1.DealsModule,
            custom_fields_1.CustomFieldsModule,
            pipeline_stages_1.PipelineStagesModule,
            activities_1.ActivitiesModule,
            notifications_1.NotificationsModule,
            email_1.EmailModule,
            automation_1.AutomationModule,
            audit_1.AuditModule,
            campaigns_1.CampaignsModule,
            dashboard_1.DashboardModule,
            products_1.ProductsModule,
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
            admin_module_1.AdminModule,
            import_module_1.ImportModule,
            scheduler_module_1.SchedulerModule,
        ],
        controllers: [api_controller_1.ApiController],
        providers: [
            api_service_1.ApiService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], ApiModule);


/***/ },

/***/ "./apps/api/src/api.service.ts"
/*!*************************************!*\
  !*** ./apps/api/src/api.service.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ApiService = class ApiService {
    getHello() {
        return 'Hello World!';
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);


/***/ },

/***/ "./apps/api/src/import/import.controller.ts"
/*!**************************************************!*\
  !*** ./apps/api/src/import/import.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const import_service_1 = __webpack_require__(/*! ./import.service */ "./apps/api/src/import/import.service.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let ImportController = class ImportController {
    importService;
    constructor(importService) {
        this.importService = importService;
    }
    importContacts(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importContacts(file.buffer, user.id, user.tenantId);
    }
    importCompanies(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importCompanies(file.buffer, user.id, user.tenantId);
    }
    importDeals(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importDeals(file.buffer, user.id, user.tenantId);
    }
    importProducts(file, user) {
        if (!file)
            throw new common_1.BadRequestException('CSV file required');
        return this.importService.importProducts(file.buffer, user.id, user.tenantId);
    }
};
exports.ImportController = ImportController;
__decorate([
    (0, common_1.Post)('contacts'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importContacts", null);
__decorate([
    (0, common_1.Post)('companies'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importCompanies", null);
__decorate([
    (0, common_1.Post)('deals'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof Express !== "undefined" && (_f = Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importDeals", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof Express !== "undefined" && (_h = Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", void 0)
], ImportController.prototype, "importProducts", null);
exports.ImportController = ImportController = __decorate([
    (0, common_1.Controller)('import'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof import_service_1.ImportService !== "undefined" && import_service_1.ImportService) === "function" ? _a : Object])
], ImportController);


/***/ },

/***/ "./apps/api/src/import/import.module.ts"
/*!**********************************************!*\
  !*** ./apps/api/src/import/import.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImportModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const import_controller_1 = __webpack_require__(/*! ./import.controller */ "./apps/api/src/import/import.controller.ts");
const import_service_1 = __webpack_require__(/*! ./import.service */ "./apps/api/src/import/import.service.ts");
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


/***/ },

/***/ "./apps/api/src/import/import.service.ts"
/*!***********************************************!*\
  !*** ./apps/api/src/import/import.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const stream_1 = __webpack_require__(/*! stream */ "stream");
const csv = __webpack_require__(/*! csv-parser */ "csv-parser");
let ImportService = class ImportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importContacts(buffer, ownerId, tenantId) {
        const results = [];
        const errors = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        const parser = stream.pipe(csv());
        for await (const row of parser) {
            rowIndex++;
            try {
                const contact = await this.prisma.contact.create({
                    data: {
                        name: row.name || row.Name || row.nombre || row.Nombre || '',
                        email: row.email || row.Email || row.email || '',
                        phone: row.phone || row.Phone || row.telefono || '',
                        companyName: row.company || row.Company || row.empresa || '',
                        position: row.position || row.Position || row.cargo || '',
                        ownerId,
                        tenantId,
                    },
                });
                results.push(contact);
            }
            catch (err) {
                errors.push({ row: rowIndex, message: err.message });
            }
        }
        return { imported: results.length, errors, total: rowIndex };
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
    async importDeals(buffer, ownerId, tenantId) {
        const results = [];
        const errors = [];
        let rowIndex = 0;
        const stream = stream_1.Readable.from(buffer.toString());
        const parser = stream.pipe(csv());
        for await (const row of parser) {
            rowIndex++;
            try {
                const deal = await this.prisma.deal.create({
                    data: {
                        title: row.title || row.Title || row.name || row.Name || '',
                        value: parseFloat(row.value || row.Value || '0') || 0,
                        stage: row.stage || row.Stage || 'lead',
                        contactId: row.contactId || row.contact_id || '',
                        ownerId,
                        tenantId,
                    },
                });
                results.push(deal);
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


/***/ },

/***/ "./apps/api/src/main.ts"
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const api_module_1 = __webpack_require__(/*! ./api.module */ "./apps/api/src/api.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_module_1.ApiModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.use((0, helmet_1.default)());
    app.enableCors();
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


/***/ },

/***/ "./apps/api/src/scheduler/scheduler.module.ts"
/*!****************************************************!*\
  !*** ./apps/api/src/scheduler/scheduler.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchedulerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const scheduler_service_1 = __webpack_require__(/*! ./scheduler.service */ "./apps/api/src/scheduler/scheduler.service.ts");
const email_1 = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
const notifications_1 = __webpack_require__(/*! @crm/notifications */ "./libs/notifications/src/index.ts");
let SchedulerModule = class SchedulerModule {
};
exports.SchedulerModule = SchedulerModule;
exports.SchedulerModule = SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [email_1.EmailModule, notifications_1.NotificationsModule],
        providers: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);


/***/ },

/***/ "./apps/api/src/scheduler/scheduler.service.ts"
/*!*****************************************************!*\
  !*** ./apps/api/src/scheduler/scheduler.service.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchedulerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cron = __importStar(__webpack_require__(/*! node-cron */ "node-cron"));
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const email_1 = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
const notifications_1 = __webpack_require__(/*! @crm/notifications */ "./libs/notifications/src/index.ts");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    prisma;
    emailService;
    imapService;
    notificationsService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(prisma, emailService, imapService, notificationsService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.imapService = imapService;
        this.notificationsService = notificationsService;
    }
    onModuleInit() {
        cron.schedule('*/5 * * * *', () => this.checkReminders());
        cron.schedule('*/10 * * * *', () => this.syncImap());
        this.logger.log('Reminder scheduler started (every 5 minutes)');
        this.logger.log('IMAP sync scheduler started (every 10 minutes)');
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
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof email_1.ImapService !== "undefined" && email_1.ImapService) === "function" ? _c : Object, typeof (_d = typeof notifications_1.NotificationsService !== "undefined" && notifications_1.NotificationsService) === "function" ? _d : Object])
], SchedulerService);


/***/ },

/***/ "./libs/activities/src/activities.controller.ts"
/*!******************************************************!*\
  !*** ./libs/activities/src/activities.controller.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const activities_service_1 = __webpack_require__(/*! ./activities.service */ "./libs/activities/src/activities.service.ts");
const create_activity_dto_1 = __webpack_require__(/*! ./dto/create-activity.dto */ "./libs/activities/src/dto/create-activity.dto.ts");
const update_activity_dto_1 = __webpack_require__(/*! ./dto/update-activity.dto */ "./libs/activities/src/dto/update-activity.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let ActivitiesController = class ActivitiesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(contactId, dealId, ownerId, from, to, user) {
        return this.service.findAll({ contactId, dealId, ownerId, from, to, tenantId: user.tenantId });
    }
    getCalendar(from, to, user) {
        return this.service.getCalendar(user.id, user.tenantId, from, to);
    }
    findOne(id, user) {
        return this.service.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
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
    __param(0, (0, common_1.Query)('contactId')),
    __param(1, (0, common_1.Query)('dealId')),
    __param(2, (0, common_1.Query)('ownerId')),
    __param(3, (0, common_1.Query)('from')),
    __param(4, (0, common_1.Query)('to')),
    __param(5, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof activities_service_1.ActivitiesService !== "undefined" && activities_service_1.ActivitiesService) === "function" ? _a : Object])
], ActivitiesController);


/***/ },

/***/ "./libs/activities/src/activities.module.ts"
/*!**************************************************!*\
  !*** ./libs/activities/src/activities.module.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const activities_service_1 = __webpack_require__(/*! ./activities.service */ "./libs/activities/src/activities.service.ts");
const activities_controller_1 = __webpack_require__(/*! ./activities.controller */ "./libs/activities/src/activities.controller.ts");
const google_calendar_service_1 = __webpack_require__(/*! ./google-calendar.service */ "./libs/activities/src/google-calendar.service.ts");
let ActivitiesModule = class ActivitiesModule {
};
exports.ActivitiesModule = ActivitiesModule;
exports.ActivitiesModule = ActivitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [activities_controller_1.ActivitiesController],
        providers: [activities_service_1.ActivitiesService, google_calendar_service_1.GoogleCalendarService],
        exports: [activities_service_1.ActivitiesService],
    })
], ActivitiesModule);


/***/ },

/***/ "./libs/activities/src/activities.service.ts"
/*!***************************************************!*\
  !*** ./libs/activities/src/activities.service.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const google_calendar_service_1 = __webpack_require__(/*! ./google-calendar.service */ "./libs/activities/src/google-calendar.service.ts");
let ActivitiesService = class ActivitiesService {
    prisma;
    googleCalendarService;
    constructor(prisma, googleCalendarService) {
        this.prisma = prisma;
        this.googleCalendarService = googleCalendarService;
    }
    async create(dto, ownerId, tenantId) {
        return this.prisma.activity.create({
            data: {
                type: dto.type,
                subject: dto.subject,
                description: dto.description,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                done: dto.done,
                contactId: dto.contactId,
                dealId: dto.dealId,
                ownerId,
                tenantId,
            },
            include: {
                owner: { select: { id: true, name: true, email: true } },
            },
        });
        // removed by dead control flow

        // removed by dead control flow

    }
    async findAll(filters) {
        const where = { tenantId: filters.tenantId };
        if (filters.contactId)
            where.contactId = filters.contactId;
        if (filters.dealId)
            where.dealId = filters.dealId;
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
                contact: { select: { id: true, name: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
    }
    async getCalendar(userId, tenantId, from, to) {
        const start = from ? new Date(from) : new Date();
        const end = to ? new Date(to) : new Date(start.getTime() + 30 * 24 * 3600000);
        const activities = await this.prisma.activity.findMany({
            where: {
                tenantId,
                ownerId: userId,
                dueDate: { gte: start, lte: end },
            },
            include: {
                contact: { select: { id: true, name: true } },
                deal: { select: { id: true, title: true } },
            },
            orderBy: { dueDate: 'asc' },
        });
        return activities;
    }
    async findById(id, tenantId) {
        const activity = await this.prisma.activity.findFirst({
            where: { id, tenantId },
            include: {
                owner: { select: { id: true, name: true, email: true } },
                contact: { select: { id: true, name: true } },
                deal: { select: { id: true, title: true } },
            },
        });
        if (!activity)
            throw new common_1.NotFoundException('Activity not found');
        return activity;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const data = { ...dto };
        if (dto.dueDate)
            data.dueDate = new Date(dto.dueDate);
        const updated = await this.prisma.activity.update({ where: { id }, data });
        if (updated.type === 'meeting') {
            await this.googleCalendarService.syncActivity(updated.id);
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


/***/ },

/***/ "./libs/activities/src/dto/create-activity.dto.ts"
/*!********************************************************!*\
  !*** ./libs/activities/src/dto/create-activity.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    contactId;
    dealId;
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
], CreateActivityDto.prototype, "contactId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "dealId", void 0);


/***/ },

/***/ "./libs/activities/src/dto/update-activity.dto.ts"
/*!********************************************************!*\
  !*** ./libs/activities/src/dto/update-activity.dto.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateActivityDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_activity_dto_1 = __webpack_require__(/*! ./create-activity.dto */ "./libs/activities/src/dto/create-activity.dto.ts");
class UpdateActivityDto extends (0, mapped_types_1.PartialType)(create_activity_dto_1.CreateActivityDto) {
}
exports.UpdateActivityDto = UpdateActivityDto;


/***/ },

/***/ "./libs/activities/src/google-calendar.service.ts"
/*!********************************************************!*\
  !*** ./libs/activities/src/google-calendar.service.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const googleapis_1 = __webpack_require__(/*! googleapis */ "googleapis");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
            include: { owner: true, contact: true }
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
                attendees: activity.contact ? [{ email: activity.contact.email }] : [],
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


/***/ },

/***/ "./libs/activities/src/index.ts"
/*!**************************************!*\
  !*** ./libs/activities/src/index.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitiesService = exports.ActivitiesModule = void 0;
var activities_module_1 = __webpack_require__(/*! ./activities.module */ "./libs/activities/src/activities.module.ts");
Object.defineProperty(exports, "ActivitiesModule", ({ enumerable: true, get: function () { return activities_module_1.ActivitiesModule; } }));
var activities_service_1 = __webpack_require__(/*! ./activities.service */ "./libs/activities/src/activities.service.ts");
Object.defineProperty(exports, "ActivitiesService", ({ enumerable: true, get: function () { return activities_service_1.ActivitiesService; } }));


/***/ },

/***/ "./libs/ai-assistant/src/ai-assistant.controller.ts"
/*!**********************************************************!*\
  !*** ./libs/ai-assistant/src/ai-assistant.controller.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const ai_assistant_service_1 = __webpack_require__(/*! ./ai-assistant.service */ "./libs/ai-assistant/src/ai-assistant.service.ts");
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof ai_assistant_service_1.AiAssistantService !== "undefined" && ai_assistant_service_1.AiAssistantService) === "function" ? _a : Object])
], AiAssistantController);


/***/ },

/***/ "./libs/ai-assistant/src/ai-assistant.module.ts"
/*!******************************************************!*\
  !*** ./libs/ai-assistant/src/ai-assistant.module.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ai_assistant_service_1 = __webpack_require__(/*! ./ai-assistant.service */ "./libs/ai-assistant/src/ai-assistant.service.ts");
const ai_assistant_controller_1 = __webpack_require__(/*! ./ai-assistant.controller */ "./libs/ai-assistant/src/ai-assistant.controller.ts");
let AiAssistantModule = class AiAssistantModule {
};
exports.AiAssistantModule = AiAssistantModule;
exports.AiAssistantModule = AiAssistantModule = __decorate([
    (0, common_1.Module)({
        controllers: [ai_assistant_controller_1.AiAssistantController],
        providers: [ai_assistant_service_1.AiAssistantService],
        exports: [ai_assistant_service_1.AiAssistantService],
    })
], AiAssistantModule);


/***/ },

/***/ "./libs/ai-assistant/src/ai-assistant.service.ts"
/*!*******************************************************!*\
  !*** ./libs/ai-assistant/src/ai-assistant.service.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let AiAssistantService = class AiAssistantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSuggestions(entity, entityId, tenantId) {
        if (entity === 'deal') {
            return this.getDealSuggestions(entityId, tenantId);
        }
        return [];
    }
    async getDealSuggestions(dealId, tenantId) {
        const deal = await this.prisma.deal.findFirst({
            where: { id: dealId, tenantId },
            include: { contact: { select: { name: true, email: true } } },
        });
        if (!deal)
            return [];
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const currentIdx = stages.findIndex((s) => s.name === deal.stage);
        const nextStage = stages[currentIdx + 1];
        const suggestions = [];
        if (nextStage) {
            suggestions.push({
                action: `Mover a etapa "${nextStage.name}"`,
                reason: `La oportunidad "${deal.title}" está lista para avanzar en el pipeline`,
                category: 'pipeline',
            });
        }
        const lastActivity = await this.prisma.activity.findFirst({
            where: { dealId, tenantId },
            orderBy: { createdAt: 'desc' },
        });
        if (!lastActivity || this.daysSince(lastActivity.createdAt) > 7) {
            suggestions.push({
                action: 'Agendar seguimiento',
                reason: 'No hay actividad registrada en los últimos 7 días',
                category: 'engagement',
            });
        }
        if (deal.contact?.email) {
            suggestions.push({
                action: `Enviar correo a ${deal.contact.name}`,
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


/***/ },

/***/ "./libs/ai-assistant/src/index.ts"
/*!****************************************!*\
  !*** ./libs/ai-assistant/src/index.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiAssistantService = exports.AiAssistantModule = void 0;
var ai_assistant_module_1 = __webpack_require__(/*! ./ai-assistant.module */ "./libs/ai-assistant/src/ai-assistant.module.ts");
Object.defineProperty(exports, "AiAssistantModule", ({ enumerable: true, get: function () { return ai_assistant_module_1.AiAssistantModule; } }));
var ai_assistant_service_1 = __webpack_require__(/*! ./ai-assistant.service */ "./libs/ai-assistant/src/ai-assistant.service.ts");
Object.defineProperty(exports, "AiAssistantService", ({ enumerable: true, get: function () { return ai_assistant_service_1.AiAssistantService; } }));


/***/ },

/***/ "./libs/api-keys/src/api-keys.controller.ts"
/*!**************************************************!*\
  !*** ./libs/api-keys/src/api-keys.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const api_keys_service_1 = __webpack_require__(/*! ./api-keys.service */ "./libs/api-keys/src/api-keys.service.ts");
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
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.ApiKeysController = ApiKeysController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApiKeysController.prototype, "remove", null);
exports.ApiKeysController = ApiKeysController = __decorate([
    (0, common_1.Controller)('api-keys'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof api_keys_service_1.ApiKeysService !== "undefined" && api_keys_service_1.ApiKeysService) === "function" ? _a : Object])
], ApiKeysController);


/***/ },

/***/ "./libs/api-keys/src/api-keys.module.ts"
/*!**********************************************!*\
  !*** ./libs/api-keys/src/api-keys.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeysModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const api_keys_service_1 = __webpack_require__(/*! ./api-keys.service */ "./libs/api-keys/src/api-keys.service.ts");
const api_keys_controller_1 = __webpack_require__(/*! ./api-keys.controller */ "./libs/api-keys/src/api-keys.controller.ts");
let ApiKeysModule = class ApiKeysModule {
};
exports.ApiKeysModule = ApiKeysModule;
exports.ApiKeysModule = ApiKeysModule = __decorate([
    (0, common_1.Module)({
        controllers: [api_keys_controller_1.ApiKeysController],
        providers: [api_keys_service_1.ApiKeysService],
        exports: [api_keys_service_1.ApiKeysService],
    })
], ApiKeysModule);


/***/ },

/***/ "./libs/api-keys/src/api-keys.service.ts"
/*!***********************************************!*\
  !*** ./libs/api-keys/src/api-keys.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const crypto = __importStar(__webpack_require__(/*! crypto */ "crypto"));
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


/***/ },

/***/ "./libs/api-keys/src/index.ts"
/*!************************************!*\
  !*** ./libs/api-keys/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiKeysService = exports.ApiKeysModule = void 0;
var api_keys_module_1 = __webpack_require__(/*! ./api-keys.module */ "./libs/api-keys/src/api-keys.module.ts");
Object.defineProperty(exports, "ApiKeysModule", ({ enumerable: true, get: function () { return api_keys_module_1.ApiKeysModule; } }));
var api_keys_service_1 = __webpack_require__(/*! ./api-keys.service */ "./libs/api-keys/src/api-keys.service.ts");
Object.defineProperty(exports, "ApiKeysService", ({ enumerable: true, get: function () { return api_keys_service_1.ApiKeysService; } }));


/***/ },

/***/ "./libs/audit/src/audit.controller.ts"
/*!********************************************!*\
  !*** ./libs/audit/src/audit.controller.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const audit_service_1 = __webpack_require__(/*! ./audit.service */ "./libs/audit/src/audit.service.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let AuditController = class AuditController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(limit, user) {
        return this.service.findByTenant(user.tenantId, Number(limit) || 50);
    }
    findByEntity(entity, entityId, user) {
        return this.service.findByEntity(entity, entityId, user.tenantId);
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':entity/:entityId'),
    __param(0, (0, common_1.Param)('entity')),
    __param(1, (0, common_1.Param)('entityId')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "findByEntity", null);
exports.AuditController = AuditController = __decorate([
    (0, common_1.Controller)('audit-logs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof audit_service_1.AuditService !== "undefined" && audit_service_1.AuditService) === "function" ? _a : Object])
], AuditController);


/***/ },

/***/ "./libs/audit/src/audit.module.ts"
/*!****************************************!*\
  !*** ./libs/audit/src/audit.module.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const audit_service_1 = __webpack_require__(/*! ./audit.service */ "./libs/audit/src/audit.service.ts");
const audit_controller_1 = __webpack_require__(/*! ./audit.controller */ "./libs/audit/src/audit.controller.ts");
let AuditModule = class AuditModule {
};
exports.AuditModule = AuditModule;
exports.AuditModule = AuditModule = __decorate([
    (0, common_1.Module)({
        controllers: [audit_controller_1.AuditController],
        providers: [audit_service_1.AuditService],
        exports: [audit_service_1.AuditService],
    })
], AuditModule);


/***/ },

/***/ "./libs/audit/src/audit.service.ts"
/*!*****************************************!*\
  !*** ./libs/audit/src/audit.service.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], AuditService);


/***/ },

/***/ "./libs/audit/src/index.ts"
/*!*********************************!*\
  !*** ./libs/audit/src/index.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditService = exports.AuditModule = void 0;
var audit_module_1 = __webpack_require__(/*! ./audit.module */ "./libs/audit/src/audit.module.ts");
Object.defineProperty(exports, "AuditModule", ({ enumerable: true, get: function () { return audit_module_1.AuditModule; } }));
var audit_service_1 = __webpack_require__(/*! ./audit.service */ "./libs/audit/src/audit.service.ts");
Object.defineProperty(exports, "AuditService", ({ enumerable: true, get: function () { return audit_service_1.AuditService; } }));


/***/ },

/***/ "./libs/auth/src/auth.controller.ts"
/*!******************************************!*\
  !*** ./libs/auth/src/auth.controller.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./libs/auth/src/auth.service.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./libs/auth/src/dto/register.dto.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./libs/auth/src/dto/login.dto.ts");
const forgot_password_dto_1 = __webpack_require__(/*! ./dto/forgot-password.dto */ "./libs/auth/src/dto/forgot-password.dto.ts");
const reset_password_dto_1 = __webpack_require__(/*! ./dto/reset-password.dto */ "./libs/auth/src/dto/reset-password.dto.ts");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto, req) {
        const tenantSlug = req.headers['x-tenant-slug'] || req.headers['x-tenant'];
        return this.authService.register(dto, tenantSlug);
    }
    login(dto) {
        return this.authService.login(dto);
    }
    async googleAuth(req) { }
    async googleAuthRedirect(req) {
        return this.authService.loginWithGoogle(req.user);
    }
    verify2fa(dto) {
        return this.authService.verify2FA(dto.userId, dto.code);
    }
    generate2faQr(req) {
        return this.authService.generate2faQr(req.user.id);
    }
    enable2fa(dto, req) {
        return this.authService.enable2fa(req.user.id, dto.code);
    }
    portalLogin(dto) {
        return this.authService.portalLogin(dto);
    }
    me(req) {
        return this.authService.me(req.user.id);
    }
    forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    togglePortalAccess(contactId, dto, req) {
        return this.authService.togglePortalAccess(contactId, dto, req.user.tenantId);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verify2fa", null);
__decorate([
    (0, common_1.Get)('2fa/generate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "generate2faQr", null);
__decorate([
    (0, common_1.Post)('2fa/enable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "enable2fa", null);
__decorate([
    (0, common_1.Post)('portal-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "portalLogin", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof forgot_password_dto_1.ForgotPasswordDto !== "undefined" && forgot_password_dto_1.ForgotPasswordDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof reset_password_dto_1.ResetPasswordDto !== "undefined" && reset_password_dto_1.ResetPasswordDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Patch)('contacts/:id/portal-access'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "togglePortalAccess", null);
__decorate([
    (0, common_1.Post)('portal/change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePortalPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./libs/auth/src/auth.module.ts"
/*!**************************************!*\
  !*** ./libs/auth/src/auth.module.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./libs/auth/src/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./libs/auth/src/auth.controller.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./jwt.strategy */ "./libs/auth/src/jwt.strategy.ts");
const google_strategy_1 = __webpack_require__(/*! ./google.strategy */ "./libs/auth/src/google.strategy.ts");
const two_factor_service_1 = __webpack_require__(/*! ./two-factor.service */ "./libs/auth/src/two-factor.service.ts");
const tenant_1 = __webpack_require__(/*! @crm/tenant */ "./libs/tenant/src/index.ts");
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
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, two_factor_service_1.TwoFactorService],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);


/***/ },

/***/ "./libs/auth/src/auth.service.ts"
/*!***************************************!*\
  !*** ./libs/auth/src/auth.service.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const tenant_1 = __webpack_require__(/*! @crm/tenant */ "./libs/tenant/src/index.ts");
const two_factor_service_1 = __webpack_require__(/*! ./two-factor.service */ "./libs/auth/src/two-factor.service.ts");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
let AuthService = class AuthService {
    prisma;
    jwtService;
    tenantService;
    twoFactorService;
    constructor(prisma, jwtService, tenantService, twoFactorService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.tenantService = tenantService;
        this.twoFactorService = twoFactorService;
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
            select: { id: true, email: true, name: true, role: true, tenantId: true },
        });
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        });
        return { user, token };
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
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        });
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    async verify2FA(userId, code) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isCodeValid = this.twoFactorService.isTwoFactorAuthenticationCodeValid(code, user);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('Wrong authentication code');
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        });
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
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
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
        });
        const { password, twoFactorSecret, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
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
        return { success: true };
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
        const contact = await this.prisma.contact.findFirst({
            where: { email: dto.email, portalPassword: { not: null } },
        });
        if (!contact || !contact.portalPassword)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isValid = await bcrypt.compare(dto.password, contact.portalPassword);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({
            sub: contact.id,
            email: contact.email,
            role: 'portal',
            tenantId: contact.tenantId,
            isPortal: true,
        });
        return { contact: { id: contact.id, name: contact.name, email: contact.email }, token };
    }
    async togglePortalAccess(contactId, dto, tenantId) {
        const contact = await this.prisma.contact.findFirst({
            where: { id: contactId, tenantId },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
        if (dto.enable && dto.password) {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            await this.prisma.contact.update({
                where: { id: contactId },
                data: { portalPassword: hashedPassword },
            });
            return { message: 'Portal access enabled' };
        }
        if (!dto.enable) {
            await this.prisma.contact.update({
                where: { id: contactId },
                data: { portalPassword: null },
            });
            return { message: 'Portal access disabled' };
        }
        return { message: 'No changes made' };
    }
    async changePortalPassword(user, dto) {
        if (!user.isPortal)
            throw new common_1.UnauthorizedException('Not a portal user');
        const contact = await this.prisma.contact.findUnique({
            where: { id: user.id },
            select: { portalPassword: true },
        });
        if (!contact?.portalPassword)
            throw new common_1.BadRequestException('Portal access not configured');
        const isValid = await bcrypt.compare(dto.currentPassword, contact.portalPassword);
        if (!isValid)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.contact.update({
            where: { id: user.id },
            data: { portalPassword: hashedPassword },
        });
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof tenant_1.TenantService !== "undefined" && tenant_1.TenantService) === "function" ? _c : Object, typeof (_d = typeof two_factor_service_1.TwoFactorService !== "undefined" && two_factor_service_1.TwoFactorService) === "function" ? _d : Object])
], AuthService);


/***/ },

/***/ "./libs/auth/src/decorators/current-user.decorator.ts"
/*!************************************************************!*\
  !*** ./libs/auth/src/decorators/current-user.decorator.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});


/***/ },

/***/ "./libs/auth/src/decorators/roles.decorator.ts"
/*!*****************************************************!*\
  !*** ./libs/auth/src/decorators/roles.decorator.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ },

/***/ "./libs/auth/src/dto/forgot-password.dto.ts"
/*!**************************************************!*\
  !*** ./libs/auth/src/dto/forgot-password.dto.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ForgotPasswordDto {
    email;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);


/***/ },

/***/ "./libs/auth/src/dto/login.dto.ts"
/*!****************************************!*\
  !*** ./libs/auth/src/dto/login.dto.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/auth/src/dto/register.dto.ts"
/*!*******************************************!*\
  !*** ./libs/auth/src/dto/register.dto.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/auth/src/dto/reset-password.dto.ts"
/*!*************************************************!*\
  !*** ./libs/auth/src/dto/reset-password.dto.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/auth/src/google.strategy.ts"
/*!******************************************!*\
  !*** ./libs/auth/src/google.strategy.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    configService;
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID') || 'placeholder_client_id',
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || 'placeholder_client_secret',
            callbackURL: configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:3001/api/auth/google/callback',
            scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar.events'],
            accessType: 'offline',
            prompt: 'consent',
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


/***/ },

/***/ "./libs/auth/src/guards/portal.guard.ts"
/*!**********************************************!*\
  !*** ./libs/auth/src/guards/portal.guard.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PortalGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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


/***/ },

/***/ "./libs/auth/src/guards/roles.guard.ts"
/*!*********************************************!*\
  !*** ./libs/auth/src/guards/roles.guard.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./libs/auth/src/decorators/roles.decorator.ts");
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


/***/ },

/***/ "./libs/auth/src/guards/tenant.guard.ts"
/*!**********************************************!*\
  !*** ./libs/auth/src/guards/tenant.guard.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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


/***/ },

/***/ "./libs/auth/src/index.ts"
/*!********************************!*\
  !*** ./libs/auth/src/index.ts ***!
  \********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = exports.Roles = exports.PortalGuard = exports.TenantGuard = exports.RolesGuard = exports.AuthService = exports.AuthModule = void 0;
var auth_module_1 = __webpack_require__(/*! ./auth.module */ "./libs/auth/src/auth.module.ts");
Object.defineProperty(exports, "AuthModule", ({ enumerable: true, get: function () { return auth_module_1.AuthModule; } }));
var auth_service_1 = __webpack_require__(/*! ./auth.service */ "./libs/auth/src/auth.service.ts");
Object.defineProperty(exports, "AuthService", ({ enumerable: true, get: function () { return auth_service_1.AuthService; } }));
var roles_guard_1 = __webpack_require__(/*! ./guards/roles.guard */ "./libs/auth/src/guards/roles.guard.ts");
Object.defineProperty(exports, "RolesGuard", ({ enumerable: true, get: function () { return roles_guard_1.RolesGuard; } }));
var tenant_guard_1 = __webpack_require__(/*! ./guards/tenant.guard */ "./libs/auth/src/guards/tenant.guard.ts");
Object.defineProperty(exports, "TenantGuard", ({ enumerable: true, get: function () { return tenant_guard_1.TenantGuard; } }));
var portal_guard_1 = __webpack_require__(/*! ./guards/portal.guard */ "./libs/auth/src/guards/portal.guard.ts");
Object.defineProperty(exports, "PortalGuard", ({ enumerable: true, get: function () { return portal_guard_1.PortalGuard; } }));
var roles_decorator_1 = __webpack_require__(/*! ./decorators/roles.decorator */ "./libs/auth/src/decorators/roles.decorator.ts");
Object.defineProperty(exports, "Roles", ({ enumerable: true, get: function () { return roles_decorator_1.Roles; } }));
var current_user_decorator_1 = __webpack_require__(/*! ./decorators/current-user.decorator */ "./libs/auth/src/decorators/current-user.decorator.ts");
Object.defineProperty(exports, "CurrentUser", ({ enumerable: true, get: function () { return current_user_decorator_1.CurrentUser; } }));


/***/ },

/***/ "./libs/auth/src/jwt.strategy.ts"
/*!***************************************!*\
  !*** ./libs/auth/src/jwt.strategy.ts ***!
  \***************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
            const contact = await this.prisma.contact.findUnique({
                where: { id: payload.sub },
                select: { id: true, name: true, email: true, tenantId: true },
            });
            if (!contact)
                throw new common_1.UnauthorizedException('Contact not found');
            return { ...contact, role: 'portal', isPortal: true };
        }
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, name: true, role: true, tenantId: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], JwtStrategy);


/***/ },

/***/ "./libs/auth/src/two-factor.service.ts"
/*!*********************************************!*\
  !*** ./libs/auth/src/two-factor.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const otplib_1 = __webpack_require__(/*! otplib */ "otplib");
const qrcode = __importStar(__webpack_require__(/*! qrcode */ "qrcode"));
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let TwoFactorService = class TwoFactorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateTwoFactorSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const otpauthUrl = otplib_1.authenticator.keyuri(user.email, 'CRM Pro', secret);
        return {
            secret,
            otpauthUrl,
        };
    }
    async generateQrCodeDataURL(otpauthUrl) {
        return qrcode.toDataURL(otpauthUrl);
    }
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, user) {
        return otplib_1.authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorSecret,
        });
    }
    async turnOnTwoFactorAuthentication(userId, code) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const isCodeValid = this.isTwoFactorAuthenticationCodeValid(code, user);
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


/***/ },

/***/ "./libs/automation/src/automation.controller.ts"
/*!******************************************************!*\
  !*** ./libs/automation/src/automation.controller.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AutomationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const automation_service_1 = __webpack_require__(/*! ./automation.service */ "./libs/automation/src/automation.service.ts");
const create_rule_dto_1 = __webpack_require__(/*! ./dto/create-rule.dto */ "./libs/automation/src/dto/create-rule.dto.ts");
const update_rule_dto_1 = __webpack_require__(/*! ./dto/update-rule.dto */ "./libs/automation/src/dto/update-rule.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
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
    update(id, dto, user) {
        return this.service.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.service.remove(id, user.tenantId);
    }
};
exports.AutomationController = AutomationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_rule_dto_1.CreateRuleDto !== "undefined" && create_rule_dto_1.CreateRuleDto) === "function" ? _b : Object, Object]),
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
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_rule_dto_1.UpdateRuleDto !== "undefined" && update_rule_dto_1.UpdateRuleDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AutomationController.prototype, "remove", null);
exports.AutomationController = AutomationController = __decorate([
    (0, common_1.Controller)('automation-rules'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof automation_service_1.AutomationService !== "undefined" && automation_service_1.AutomationService) === "function" ? _a : Object])
], AutomationController);


/***/ },

/***/ "./libs/automation/src/automation.module.ts"
/*!**************************************************!*\
  !*** ./libs/automation/src/automation.module.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const automation_service_1 = __webpack_require__(/*! ./automation.service */ "./libs/automation/src/automation.service.ts");
const automation_controller_1 = __webpack_require__(/*! ./automation.controller */ "./libs/automation/src/automation.controller.ts");
let AutomationModule = class AutomationModule {
};
exports.AutomationModule = AutomationModule;
exports.AutomationModule = AutomationModule = __decorate([
    (0, common_1.Module)({
        controllers: [automation_controller_1.AutomationController],
        providers: [automation_service_1.AutomationService],
        exports: [automation_service_1.AutomationService],
    })
], AutomationModule);


/***/ },

/***/ "./libs/automation/src/automation.service.ts"
/*!***************************************************!*\
  !*** ./libs/automation/src/automation.service.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AutomationService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let AutomationService = AutomationService_1 = class AutomationService {
    prisma;
    logger = new common_1.Logger(AutomationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.automationRule.create({
            data: {
                name: dto.name,
                event: dto.event,
                conditions: dto.conditions || undefined,
                actions: dto.actions,
                active: dto.active ?? true,
                tenantId,
            },
        });
    }
    async findAll(tenantId) {
        return this.prisma.automationRule.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
    }
    async update(id, dto, tenantId) {
        return this.prisma.automationRule.updateMany({
            where: { id, tenantId },
            data: dto,
        });
    }
    async remove(id, tenantId) {
        return this.prisma.automationRule.deleteMany({ where: { id, tenantId } });
    }
    async evaluate(event, payload, tenantId) {
        const rules = await this.prisma.automationRule.findMany({
            where: { tenantId, event, active: true },
            orderBy: { order: 'asc' },
        });
        for (const rule of rules) {
            try {
                const conditions = (rule.conditions || []);
                const meetsConditions = conditions.every((cond) => this.evaluateCondition(cond, payload));
                if (meetsConditions) {
                    const actions = rule.actions;
                    for (const action of actions) {
                        await this.executeAction(action, payload, tenantId);
                    }
                }
            }
            catch (err) {
                this.logger.error(`Rule "${rule.name}" failed: ${err}`);
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
    async executeAction(action, payload, tenantId) {
        const { type, config } = action;
        switch (type) {
            case 'assign_round_robin': {
                await this.handleRoundRobin(payload, tenantId, config);
                break;
            }
            case 'create_task': {
                await this.handleCreateTask(payload, tenantId, config);
                break;
            }
            case 'change_stage': {
                await this.handleChangeStage(payload, config);
                break;
            }
            case 'notify': {
                await this.handleNotify(payload, config);
                break;
            }
            default:
                this.logger.warn(`Unknown action type: ${type}`);
        }
    }
    async handleRoundRobin(payload, tenantId, config) {
        const role = config?.role || 'seller';
        const users = await this.prisma.user.findMany({
            where: { tenantId, role },
            orderBy: { createdAt: 'asc' },
            select: { id: true },
        });
        if (users.length === 0)
            return;
        const targetEntity = payload.entity;
        const targetId = payload.entityId;
        const lastAssignment = await this.prisma.auditLog.findFirst({
            where: { tenantId, entity: targetEntity, action: 'assigned' },
            orderBy: { createdAt: 'desc' },
        });
        const changes = (lastAssignment?.changes ?? {});
        const lastAssigneeId = changes?.assigneeId;
        const lastIndex = lastAssigneeId
            ? users.findIndex((u) => u.id === lastAssigneeId)
            : -1;
        const nextIndex = (lastIndex + 1) % users.length;
        const assigneeId = users[nextIndex].id;
        if (targetEntity === 'contact') {
            await this.prisma.contact.update({
                where: { id: targetId },
                data: { ownerId: assigneeId },
            });
        }
        else if (targetEntity === 'deal') {
            await this.prisma.deal.update({
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
    async handleCreateTask(payload, tenantId, config) {
        const dealId = payload?.id || payload?.entityId;
        if (!dealId)
            return;
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
            include: { contact: { select: { name: true } } },
        });
        if (!deal)
            return;
        const title = (config?.title || 'Seguimiento: {{deal.title}}')
            .replace('{{deal.title}}', deal.title)
            .replace('{{contact.name}}', deal.contact?.name || '');
        await this.prisma.activity.create({
            data: {
                type: 'task',
                subject: title,
                description: config?.description || '',
                dueDate: config?.dueDate ? new Date(config.dueDate) : undefined,
                dealId,
                ownerId: deal.ownerId,
                tenantId,
            },
        });
        await this.prisma.auditLog.create({
            data: {
                entity: 'deal',
                entityId: dealId,
                action: 'task_auto_created',
                tenantId,
                userId: deal.ownerId,
                changes: { title },
            },
        });
    }
    async handleChangeStage(payload, config) {
        const dealId = payload?.id || payload?.entityId;
        if (!dealId || !config?.stage)
            return;
        await this.prisma.deal.update({
            where: { id: dealId },
            data: { stage: config.stage },
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
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], AutomationService);


/***/ },

/***/ "./libs/automation/src/dto/create-rule.dto.ts"
/*!****************************************************!*\
  !*** ./libs/automation/src/dto/create-rule.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateRuleDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateRuleDto {
    name;
    event;
    conditions;
    actions;
    active;
    metadata;
}
exports.CreateRuleDto = CreateRuleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRuleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRuleDto.prototype, "event", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRuleDto.prototype, "conditions", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateRuleDto.prototype, "actions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateRuleDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateRuleDto.prototype, "metadata", void 0);


/***/ },

/***/ "./libs/automation/src/dto/update-rule.dto.ts"
/*!****************************************************!*\
  !*** ./libs/automation/src/dto/update-rule.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRuleDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_rule_dto_1 = __webpack_require__(/*! ./create-rule.dto */ "./libs/automation/src/dto/create-rule.dto.ts");
class UpdateRuleDto extends (0, mapped_types_1.PartialType)(create_rule_dto_1.CreateRuleDto) {
}
exports.UpdateRuleDto = UpdateRuleDto;


/***/ },

/***/ "./libs/automation/src/index.ts"
/*!**************************************!*\
  !*** ./libs/automation/src/index.ts ***!
  \**************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutomationService = exports.AutomationModule = void 0;
var automation_module_1 = __webpack_require__(/*! ./automation.module */ "./libs/automation/src/automation.module.ts");
Object.defineProperty(exports, "AutomationModule", ({ enumerable: true, get: function () { return automation_module_1.AutomationModule; } }));
var automation_service_1 = __webpack_require__(/*! ./automation.service */ "./libs/automation/src/automation.service.ts");
Object.defineProperty(exports, "AutomationService", ({ enumerable: true, get: function () { return automation_service_1.AutomationService; } }));


/***/ },

/***/ "./libs/campaigns/src/campaigns.controller.ts"
/*!****************************************************!*\
  !*** ./libs/campaigns/src/campaigns.controller.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CampaignsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const campaigns_service_1 = __webpack_require__(/*! ./campaigns.service */ "./libs/campaigns/src/campaigns.service.ts");
const create_campaign_dto_1 = __webpack_require__(/*! ./dto/create-campaign.dto */ "./libs/campaigns/src/dto/create-campaign.dto.ts");
let CampaignsController = class CampaignsController {
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
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof campaigns_service_1.CampaignsService !== "undefined" && campaigns_service_1.CampaignsService) === "function" ? _a : Object])
], CampaignsController);


/***/ },

/***/ "./libs/campaigns/src/campaigns.module.ts"
/*!************************************************!*\
  !*** ./libs/campaigns/src/campaigns.module.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const campaigns_service_1 = __webpack_require__(/*! ./campaigns.service */ "./libs/campaigns/src/campaigns.service.ts");
const campaigns_controller_1 = __webpack_require__(/*! ./campaigns.controller */ "./libs/campaigns/src/campaigns.controller.ts");
const email_1 = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
let CampaignsModule = class CampaignsModule {
};
exports.CampaignsModule = CampaignsModule;
exports.CampaignsModule = CampaignsModule = __decorate([
    (0, common_1.Module)({
        imports: [email_1.EmailModule],
        controllers: [campaigns_controller_1.CampaignsController],
        providers: [campaigns_service_1.CampaignsService],
        exports: [campaigns_service_1.CampaignsService],
    })
], CampaignsModule);


/***/ },

/***/ "./libs/campaigns/src/campaigns.service.ts"
/*!*************************************************!*\
  !*** ./libs/campaigns/src/campaigns.service.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CampaignsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const email_1 = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
let CampaignsService = CampaignsService_1 = class CampaignsService {
    prisma;
    emailService;
    logger = new common_1.Logger(CampaignsService_1.name);
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async create(dto, tenantId) {
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
                status: 'draft',
                totalRecipients: dto.contactIds.length,
                recipients: {
                    create: dto.contactIds.map((contactId) => ({
                        contactId,
                        email: '',
                    })),
                },
            },
            include: { recipients: true },
        });
        const contacts = await this.prisma.contact.findMany({
            where: { id: { in: dto.contactIds }, tenantId },
            select: { id: true, email: true },
        });
        const emailMap = new Map(contacts.map((c) => [c.id, c.email]));
        for (const recipient of campaign.recipients) {
            const email = emailMap.get(recipient.contactId);
            if (email) {
                await this.prisma.campaignRecipient.update({
                    where: { id: recipient.id },
                    data: { email },
                });
            }
        }
        return campaign;
    }
    async findAll(tenantId) {
        return this.prisma.campaign.findMany({
            where: { tenantId },
            include: { _count: { select: { recipients: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const campaign = await this.prisma.campaign.findFirst({
            where: { id, tenantId },
            include: {
                recipients: {
                    include: { contact: { select: { id: true, name: true, email: true } } },
                },
            },
        });
        if (!campaign)
            throw new common_1.NotFoundException('Campaign not found');
        return campaign;
    }
    async send(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        if (campaign.status !== 'draft')
            throw new common_1.BadRequestException('Campaign already sent or sending');
        await this.prisma.campaign.update({ where: { id }, data: { status: 'sending' } });
        let sent = 0;
        for (const recipient of campaign.recipients) {
            try {
                await this.emailService.sendEmail({ to: recipient.email, subject: campaign.subject, body: campaign.body }, tenantId);
                await this.prisma.campaignRecipient.update({
                    where: { id: recipient.id },
                    data: { sent: true, sentAt: new Date() },
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
            where: { id },
            data: { status: 'sent', sentCount: sent, sentAt: new Date() },
        });
        return { message: 'Campaign sent', sent, total: campaign.recipients.length };
    }
    async getStats(id, tenantId) {
        const campaign = await this.findById(id, tenantId);
        const opened = campaign.recipients.filter((r) => r.opened).length;
        return {
            total: campaign.recipients.length,
            sent: campaign.recipients.filter((r) => r.sent).length,
            opened,
            openRate: campaign.recipients.length ? ((opened / campaign.recipients.length) * 100).toFixed(1) : '0',
        };
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = CampaignsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof email_1.EmailService !== "undefined" && email_1.EmailService) === "function" ? _b : Object])
], CampaignsService);


/***/ },

/***/ "./libs/campaigns/src/dto/create-campaign.dto.ts"
/*!*******************************************************!*\
  !*** ./libs/campaigns/src/dto/create-campaign.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateCampaignDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCampaignDto {
    name;
    subject;
    body;
    templateId;
    contactIds;
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
], CreateCampaignDto.prototype, "contactIds", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "scheduledAt", void 0);


/***/ },

/***/ "./libs/campaigns/src/index.ts"
/*!*************************************!*\
  !*** ./libs/campaigns/src/index.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignsService = exports.CampaignsModule = void 0;
var campaigns_module_1 = __webpack_require__(/*! ./campaigns.module */ "./libs/campaigns/src/campaigns.module.ts");
Object.defineProperty(exports, "CampaignsModule", ({ enumerable: true, get: function () { return campaigns_module_1.CampaignsModule; } }));
var campaigns_service_1 = __webpack_require__(/*! ./campaigns.service */ "./libs/campaigns/src/campaigns.service.ts");
Object.defineProperty(exports, "CampaignsService", ({ enumerable: true, get: function () { return campaigns_service_1.CampaignsService; } }));


/***/ },

/***/ "./libs/companies/src/companies.controller.ts"
/*!****************************************************!*\
  !*** ./libs/companies/src/companies.controller.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const companies_service_1 = __webpack_require__(/*! ./companies.service */ "./libs/companies/src/companies.service.ts");
const create_company_dto_1 = __webpack_require__(/*! ./dto/create-company.dto */ "./libs/companies/src/dto/create-company.dto.ts");
const update_company_dto_1 = __webpack_require__(/*! ./dto/update-company.dto */ "./libs/companies/src/dto/update-company.dto.ts");
const query_company_dto_1 = __webpack_require__(/*! ./dto/query-company.dto */ "./libs/companies/src/dto/query-company.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof companies_service_1.CompaniesService !== "undefined" && companies_service_1.CompaniesService) === "function" ? _a : Object])
], CompaniesController);


/***/ },

/***/ "./libs/companies/src/companies.module.ts"
/*!************************************************!*\
  !*** ./libs/companies/src/companies.module.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const companies_service_1 = __webpack_require__(/*! ./companies.service */ "./libs/companies/src/companies.service.ts");
const companies_controller_1 = __webpack_require__(/*! ./companies.controller */ "./libs/companies/src/companies.controller.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule],
        controllers: [companies_controller_1.CompaniesController],
        providers: [companies_service_1.CompaniesService],
        exports: [companies_service_1.CompaniesService],
    })
], CompaniesModule);


/***/ },

/***/ "./libs/companies/src/companies.service.ts"
/*!*************************************************!*\
  !*** ./libs/companies/src/companies.service.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CompaniesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
let CompaniesService = class CompaniesService {
    prisma;
    automation;
    audit;
    constructor(prisma, automation, audit) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
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
        const { search, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { industry: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.company.findMany({
                where,
                include: { owner: { select: { id: true, name: true, email: true } }, _count: { select: { contacts: true } } },
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
                contacts: { select: { id: true, name: true, email: true, status: true } },
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
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object])
], CompaniesService);


/***/ },

/***/ "./libs/companies/src/dto/create-company.dto.ts"
/*!******************************************************!*\
  !*** ./libs/companies/src/dto/create-company.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCompanyDto {
    name;
    industry;
    website;
    phone;
    address;
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
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateCompanyDto.prototype, "customFields", void 0);


/***/ },

/***/ "./libs/companies/src/dto/query-company.dto.ts"
/*!*****************************************************!*\
  !*** ./libs/companies/src/dto/query-company.dto.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class QueryCompanyDto {
    search;
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


/***/ },

/***/ "./libs/companies/src/dto/update-company.dto.ts"
/*!******************************************************!*\
  !*** ./libs/companies/src/dto/update-company.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCompanyDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_company_dto_1 = __webpack_require__(/*! ./create-company.dto */ "./libs/companies/src/dto/create-company.dto.ts");
class UpdateCompanyDto extends (0, mapped_types_1.PartialType)(create_company_dto_1.CreateCompanyDto) {
}
exports.UpdateCompanyDto = UpdateCompanyDto;


/***/ },

/***/ "./libs/companies/src/index.ts"
/*!*************************************!*\
  !*** ./libs/companies/src/index.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompaniesService = exports.CompaniesModule = void 0;
var companies_module_1 = __webpack_require__(/*! ./companies.module */ "./libs/companies/src/companies.module.ts");
Object.defineProperty(exports, "CompaniesModule", ({ enumerable: true, get: function () { return companies_module_1.CompaniesModule; } }));
var companies_service_1 = __webpack_require__(/*! ./companies.service */ "./libs/companies/src/companies.service.ts");
Object.defineProperty(exports, "CompaniesService", ({ enumerable: true, get: function () { return companies_service_1.CompaniesService; } }));


/***/ },

/***/ "./libs/contacts/src/contacts.controller.ts"
/*!**************************************************!*\
  !*** ./libs/contacts/src/contacts.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ContactsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const contacts_service_1 = __webpack_require__(/*! ./contacts.service */ "./libs/contacts/src/contacts.service.ts");
const create_contact_dto_1 = __webpack_require__(/*! ./dto/create-contact.dto */ "./libs/contacts/src/dto/create-contact.dto.ts");
const update_contact_dto_1 = __webpack_require__(/*! ./dto/update-contact.dto */ "./libs/contacts/src/dto/update-contact.dto.ts");
const query_contact_dto_1 = __webpack_require__(/*! ./dto/query-contact.dto */ "./libs/contacts/src/dto/query-contact.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let ContactsController = class ContactsController {
    contactsService;
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    create(dto, user) {
        return this.contactsService.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.contactsService.findAll(query, user.tenantId);
    }
    findOne(id, user) {
        return this.contactsService.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.contactsService.update(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.contactsService.remove(id, user.tenantId);
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_contact_dto_1.CreateContactDto !== "undefined" && create_contact_dto_1.CreateContactDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof query_contact_dto_1.QueryContactDto !== "undefined" && query_contact_dto_1.QueryContactDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_contact_dto_1.UpdateContactDto !== "undefined" && update_contact_dto_1.UpdateContactDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "remove", null);
exports.ContactsController = ContactsController = __decorate([
    (0, common_1.Controller)('contacts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof contacts_service_1.ContactsService !== "undefined" && contacts_service_1.ContactsService) === "function" ? _a : Object])
], ContactsController);


/***/ },

/***/ "./libs/contacts/src/contacts.module.ts"
/*!**********************************************!*\
  !*** ./libs/contacts/src/contacts.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const contacts_service_1 = __webpack_require__(/*! ./contacts.service */ "./libs/contacts/src/contacts.service.ts");
const contacts_controller_1 = __webpack_require__(/*! ./contacts.controller */ "./libs/contacts/src/contacts.controller.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let ContactsModule = class ContactsModule {
};
exports.ContactsModule = ContactsModule;
exports.ContactsModule = ContactsModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule, webhooks_1.WebhooksModule],
        controllers: [contacts_controller_1.ContactsController],
        providers: [contacts_service_1.ContactsService],
        exports: [contacts_service_1.ContactsService],
    })
], ContactsModule);


/***/ },

/***/ "./libs/contacts/src/contacts.service.ts"
/*!***********************************************!*\
  !*** ./libs/contacts/src/contacts.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ContactsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let ContactsService = class ContactsService {
    prisma;
    automation;
    audit;
    webhooks;
    constructor(prisma, automation, audit, webhooks) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
        this.webhooks = webhooks;
    }
    async create(dto, ownerId, tenantId) {
        const contact = await this.prisma.contact.create({
            data: { ...dto, ownerId, tenantId },
        });
        await this.audit.log({
            entity: 'contact', entityId: contact.id, action: 'created',
            changes: { name: dto.name, email: dto.email },
            userId: ownerId, tenantId,
        });
        await this.automation.evaluate('contact.created', { ...contact, entity: 'contact', entityId: contact.id }, tenantId);
        await this.webhooks.emit('contact.created', { ...contact, entity: 'contact', entityId: contact.id }, tenantId);
        return contact;
    }
    async findAll(query, tenantId) {
        const { search, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { companyName: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.contact.findMany({
                where,
                include: { owner: { select: { id: true, name: true, email: true } } },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.contact.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findById(id, tenantId) {
        const contact = await this.prisma.contact.findFirst({
            where: { id, tenantId },
            include: { owner: { select: { id: true, name: true, email: true } }, deals: true },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
        return contact;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const updated = await this.prisma.contact.update({ where: { id }, data: dto });
        await this.audit.log({
            entity: 'contact', entityId: id, action: 'updated',
            changes: dto, userId: updated.ownerId, tenantId,
        });
        await this.webhooks.emit('contact.updated', { ...updated, entity: 'contact', entityId: id }, tenantId);
        return updated;
    }
    async remove(id, tenantId) {
        const contact = await this.findById(id, tenantId);
        await this.audit.log({
            entity: 'contact', entityId: id, action: 'deleted',
            changes: { name: contact.name, email: contact.email },
            userId: contact.ownerId, tenantId,
        });
        return this.prisma.contact.delete({ where: { id } });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object, typeof (_d = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _d : Object])
], ContactsService);


/***/ },

/***/ "./libs/contacts/src/dto/create-contact.dto.ts"
/*!*****************************************************!*\
  !*** ./libs/contacts/src/dto/create-contact.dto.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateContactDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
class CreateContactDto {
    name;
    email;
    phone;
    companyName;
    position;
    status;
    companyId;
    customFields;
}
exports.CreateContactDto = CreateContactDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ContactStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof client_1.ContactStatus !== "undefined" && client_1.ContactStatus) === "function" ? _a : Object)
], CreateContactDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], CreateContactDto.prototype, "customFields", void 0);


/***/ },

/***/ "./libs/contacts/src/dto/query-contact.dto.ts"
/*!****************************************************!*\
  !*** ./libs/contacts/src/dto/query-contact.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.QueryContactDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class QueryContactDto {
    search;
    page = 1;
    limit = 20;
}
exports.QueryContactDto = QueryContactDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryContactDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryContactDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryContactDto.prototype, "limit", void 0);


/***/ },

/***/ "./libs/contacts/src/dto/update-contact.dto.ts"
/*!*****************************************************!*\
  !*** ./libs/contacts/src/dto/update-contact.dto.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContactDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_contact_dto_1 = __webpack_require__(/*! ./create-contact.dto */ "./libs/contacts/src/dto/create-contact.dto.ts");
class UpdateContactDto extends (0, mapped_types_1.PartialType)(create_contact_dto_1.CreateContactDto) {
}
exports.UpdateContactDto = UpdateContactDto;


/***/ },

/***/ "./libs/contacts/src/index.ts"
/*!************************************!*\
  !*** ./libs/contacts/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContactsService = exports.ContactsModule = void 0;
var contacts_module_1 = __webpack_require__(/*! ./contacts.module */ "./libs/contacts/src/contacts.module.ts");
Object.defineProperty(exports, "ContactsModule", ({ enumerable: true, get: function () { return contacts_module_1.ContactsModule; } }));
var contacts_service_1 = __webpack_require__(/*! ./contacts.service */ "./libs/contacts/src/contacts.service.ts");
Object.defineProperty(exports, "ContactsService", ({ enumerable: true, get: function () { return contacts_service_1.ContactsService; } }));


/***/ },

/***/ "./libs/custom-fields/src/custom-fields.controller.ts"
/*!************************************************************!*\
  !*** ./libs/custom-fields/src/custom-fields.controller.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const custom_fields_service_1 = __webpack_require__(/*! ./custom-fields.service */ "./libs/custom-fields/src/custom-fields.service.ts");
const create_custom_field_dto_1 = __webpack_require__(/*! ./dto/create-custom-field.dto */ "./libs/custom-fields/src/dto/create-custom-field.dto.ts");
const update_custom_field_dto_1 = __webpack_require__(/*! ./dto/update-custom-field.dto */ "./libs/custom-fields/src/dto/update-custom-field.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_custom_field_dto_1.UpdateCustomFieldDto !== "undefined" && update_custom_field_dto_1.UpdateCustomFieldDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomFieldsController.prototype, "remove", null);
exports.CustomFieldsController = CustomFieldsController = __decorate([
    (0, common_1.Controller)('custom-fields'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof custom_fields_service_1.CustomFieldsService !== "undefined" && custom_fields_service_1.CustomFieldsService) === "function" ? _a : Object])
], CustomFieldsController);


/***/ },

/***/ "./libs/custom-fields/src/custom-fields.module.ts"
/*!********************************************************!*\
  !*** ./libs/custom-fields/src/custom-fields.module.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const custom_fields_service_1 = __webpack_require__(/*! ./custom-fields.service */ "./libs/custom-fields/src/custom-fields.service.ts");
const custom_fields_controller_1 = __webpack_require__(/*! ./custom-fields.controller */ "./libs/custom-fields/src/custom-fields.controller.ts");
let CustomFieldsModule = class CustomFieldsModule {
};
exports.CustomFieldsModule = CustomFieldsModule;
exports.CustomFieldsModule = CustomFieldsModule = __decorate([
    (0, common_1.Module)({
        controllers: [custom_fields_controller_1.CustomFieldsController],
        providers: [custom_fields_service_1.CustomFieldsService],
        exports: [custom_fields_service_1.CustomFieldsService],
    })
], CustomFieldsModule);


/***/ },

/***/ "./libs/custom-fields/src/custom-fields.service.ts"
/*!*********************************************************!*\
  !*** ./libs/custom-fields/src/custom-fields.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/custom-fields/src/dto/create-custom-field.dto.ts"
/*!***************************************************************!*\
  !*** ./libs/custom-fields/src/dto/create-custom-field.dto.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/custom-fields/src/dto/update-custom-field.dto.ts"
/*!***************************************************************!*\
  !*** ./libs/custom-fields/src/dto/update-custom-field.dto.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCustomFieldDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_custom_field_dto_1 = __webpack_require__(/*! ./create-custom-field.dto */ "./libs/custom-fields/src/dto/create-custom-field.dto.ts");
class UpdateCustomFieldDto extends (0, mapped_types_1.PartialType)(create_custom_field_dto_1.CreateCustomFieldDto) {
}
exports.UpdateCustomFieldDto = UpdateCustomFieldDto;


/***/ },

/***/ "./libs/custom-fields/src/index.ts"
/*!*****************************************!*\
  !*** ./libs/custom-fields/src/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldsService = exports.CustomFieldsModule = void 0;
var custom_fields_module_1 = __webpack_require__(/*! ./custom-fields.module */ "./libs/custom-fields/src/custom-fields.module.ts");
Object.defineProperty(exports, "CustomFieldsModule", ({ enumerable: true, get: function () { return custom_fields_module_1.CustomFieldsModule; } }));
var custom_fields_service_1 = __webpack_require__(/*! ./custom-fields.service */ "./libs/custom-fields/src/custom-fields.service.ts");
Object.defineProperty(exports, "CustomFieldsService", ({ enumerable: true, get: function () { return custom_fields_service_1.CustomFieldsService; } }));


/***/ },

/***/ "./libs/dashboard/src/dashboard.controller.ts"
/*!****************************************************!*\
  !*** ./libs/dashboard/src/dashboard.controller.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DashboardController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const dashboard_service_1 = __webpack_require__(/*! ./dashboard.service */ "./libs/dashboard/src/dashboard.service.ts");
const export_service_1 = __webpack_require__(/*! ./export.service */ "./libs/dashboard/src/export.service.ts");
let DashboardController = class DashboardController {
    service;
    exportService;
    constructor(service, exportService) {
        this.service = service;
        this.exportService = exportService;
    }
    getSummary(from, to, user) {
        return this.service.getSummary(user.tenantId, from, to);
    }
    getPipeline(user) {
        return this.service.getPipelineStages(user.tenantId);
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof dashboard_service_1.DashboardService !== "undefined" && dashboard_service_1.DashboardService) === "function" ? _a : Object, typeof (_b = typeof export_service_1.ExportService !== "undefined" && export_service_1.ExportService) === "function" ? _b : Object])
], DashboardController);


/***/ },

/***/ "./libs/dashboard/src/dashboard.module.ts"
/*!************************************************!*\
  !*** ./libs/dashboard/src/dashboard.module.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dashboard_service_1 = __webpack_require__(/*! ./dashboard.service */ "./libs/dashboard/src/dashboard.service.ts");
const export_service_1 = __webpack_require__(/*! ./export.service */ "./libs/dashboard/src/export.service.ts");
const dashboard_controller_1 = __webpack_require__(/*! ./dashboard.controller */ "./libs/dashboard/src/dashboard.controller.ts");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, export_service_1.ExportService],
        exports: [dashboard_service_1.DashboardService, export_service_1.ExportService],
    })
], DashboardModule);


/***/ },

/***/ "./libs/dashboard/src/dashboard.service.ts"
/*!*************************************************!*\
  !*** ./libs/dashboard/src/dashboard.service.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let DashboardService = DashboardService_1 = class DashboardService {
    prisma;
    logger = new common_1.Logger(DashboardService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(tenantId, from, to) {
        const dateFilter = from || to
            ? { createdAt: { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) } }
            : {};
        const [totalContacts, totalDeals, totalCompanies, totalActivities] = await Promise.all([
            this.prisma.contact.count({ where: { tenantId, ...dateFilter } }),
            this.prisma.deal.count({ where: { tenantId, ...dateFilter } }),
            this.prisma.company.count({ where: { tenantId, ...dateFilter } }),
            this.prisma.activity.count({ where: { tenantId, ...dateFilter } }),
        ]);
        const closedDeals = await this.prisma.deal.aggregate({
            where: { tenantId, stage: 'closed_won', ...dateFilter },
            _sum: { value: true },
            _count: true,
        });
        return {
            totalContacts,
            totalDeals,
            totalCompanies,
            totalActivities,
            closedDealsValue: closedDeals._sum.value || 0,
            closedDealsCount: closedDeals._count,
        };
    }
    async getPipelineStages(tenantId) {
        const stages = await this.prisma.pipelineStage.findMany({
            where: { tenantId },
            orderBy: { order: 'asc' },
        });
        const counts = await Promise.all(stages.map((stage) => this.prisma.deal.count({ where: { tenantId, stage: stage.name } })));
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
            const agg = await this.prisma.deal.aggregate({
                where: { tenantId, stage: stage.name },
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
        const deals = await this.prisma.deal.findMany({
            where: { tenantId, expectedCloseDate: { gte: now, lte: end } },
            select: { title: true, value: true, stage: true, expectedCloseDate: true, contact: { select: { name: true } } },
        });
        const monthly = {};
        for (let i = 0; i < months; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            monthly[key] = { total: 0, weighted: 0, deals: [] };
        }
        for (const deal of deals) {
            if (!deal.expectedCloseDate)
                continue;
            const key = `${deal.expectedCloseDate.getFullYear()}-${String(deal.expectedCloseDate.getMonth() + 1).padStart(2, '0')}`;
            if (!monthly[key])
                continue;
            monthly[key].total += deal.value;
            monthly[key].weighted += deal.value * (stageWeights[deal.stage] || 0);
            monthly[key].deals.push({ title: deal.title, value: deal.value, stage: deal.stage, contact: deal.contact?.name });
        }
        return Object.entries(monthly).map(([month, data]) => ({
            month,
            total: data.total,
            weighted: Math.round(data.weighted * 100) / 100,
            deals: data.deals.length,
        }));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], DashboardService);


/***/ },

/***/ "./libs/dashboard/src/export.service.ts"
/*!**********************************************!*\
  !*** ./libs/dashboard/src/export.service.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const ExcelJS = __importStar(__webpack_require__(/*! exceljs */ "exceljs"));
const PDFDocument = __webpack_require__(/*! pdfkit */ "pdfkit");
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


/***/ },

/***/ "./libs/dashboard/src/index.ts"
/*!*************************************!*\
  !*** ./libs/dashboard/src/index.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportService = exports.DashboardService = exports.DashboardModule = void 0;
var dashboard_module_1 = __webpack_require__(/*! ./dashboard.module */ "./libs/dashboard/src/dashboard.module.ts");
Object.defineProperty(exports, "DashboardModule", ({ enumerable: true, get: function () { return dashboard_module_1.DashboardModule; } }));
var dashboard_service_1 = __webpack_require__(/*! ./dashboard.service */ "./libs/dashboard/src/dashboard.service.ts");
Object.defineProperty(exports, "DashboardService", ({ enumerable: true, get: function () { return dashboard_service_1.DashboardService; } }));
var export_service_1 = __webpack_require__(/*! ./export.service */ "./libs/dashboard/src/export.service.ts");
Object.defineProperty(exports, "ExportService", ({ enumerable: true, get: function () { return export_service_1.ExportService; } }));


/***/ },

/***/ "./libs/deals/src/deals.controller.ts"
/*!********************************************!*\
  !*** ./libs/deals/src/deals.controller.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DealsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const deals_service_1 = __webpack_require__(/*! ./deals.service */ "./libs/deals/src/deals.service.ts");
const create_deal_dto_1 = __webpack_require__(/*! ./dto/create-deal.dto */ "./libs/deals/src/dto/create-deal.dto.ts");
const update_deal_dto_1 = __webpack_require__(/*! ./dto/update-deal.dto */ "./libs/deals/src/dto/update-deal.dto.ts");
const query_deal_dto_1 = __webpack_require__(/*! ./dto/query-deal.dto */ "./libs/deals/src/dto/query-deal.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let DealsController = class DealsController {
    dealsService;
    constructor(dealsService) {
        this.dealsService = dealsService;
    }
    create(dto, user) {
        return this.dealsService.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.dealsService.findAll(query, user.tenantId);
    }
    getPipeline(user) {
        return this.dealsService.getPipeline(user.tenantId);
    }
    findOne(id, user) {
        return this.dealsService.findById(id, user.tenantId);
    }
    update(id, dto, user) {
        return this.dealsService.update(id, dto, user.tenantId);
    }
    updateStage(id, stage, user) {
        return this.dealsService.updateStage(id, stage, user.tenantId);
    }
    convertFromLead(id, dto, user) {
        return this.dealsService.convertFromLead(id, dto, user.tenantId);
    }
    remove(id, user) {
        return this.dealsService.remove(id, user.tenantId);
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_deal_dto_1.CreateDealDto !== "undefined" && create_deal_dto_1.CreateDealDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof query_deal_dto_1.QueryDealDto !== "undefined" && query_deal_dto_1.QueryDealDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pipeline'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "getPipeline", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_deal_dto_1.UpdateDealDto !== "undefined" && update_deal_dto_1.UpdateDealDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/stage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('stage')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Post)(':id/convert'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "convertFromLead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "remove", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.Controller)('deals'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof deals_service_1.DealsService !== "undefined" && deals_service_1.DealsService) === "function" ? _a : Object])
], DealsController);


/***/ },

/***/ "./libs/deals/src/deals.module.ts"
/*!****************************************!*\
  !*** ./libs/deals/src/deals.module.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DealsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const deals_service_1 = __webpack_require__(/*! ./deals.service */ "./libs/deals/src/deals.service.ts");
const deals_controller_1 = __webpack_require__(/*! ./deals.controller */ "./libs/deals/src/deals.controller.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let DealsModule = class DealsModule {
};
exports.DealsModule = DealsModule;
exports.DealsModule = DealsModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule, webhooks_1.WebhooksModule, shared_1.SharedModule],
        controllers: [deals_controller_1.DealsController],
        providers: [deals_service_1.DealsService],
        exports: [deals_service_1.DealsService],
    })
], DealsModule);


/***/ },

/***/ "./libs/deals/src/deals.service.ts"
/*!*****************************************!*\
  !*** ./libs/deals/src/deals.service.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.DealsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
const shared_2 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let DealsService = class DealsService {
    prisma;
    automation;
    audit;
    webhooks;
    realtime;
    constructor(prisma, automation, audit, webhooks, realtime) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
        this.webhooks = webhooks;
        this.realtime = realtime;
    }
    async create(dto, ownerId, tenantId) {
        const currency = dto.currency ?? 'MXN';
        const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
        if (!validCurrencies.includes(currency)) {
            throw new common_1.BadRequestException(`Invalid currency: ${currency}`);
        }
        const deal = await this.prisma.deal.create({
            data: {
                title: dto.title,
                value: dto.value ?? 0,
                currency: currency,
                stage: dto.stage ?? 'lead',
                contactId: dto.contactId,
                ownerId,
                tenantId,
                expectedCloseDate: dto.expectedCloseDate ? new Date(dto.expectedCloseDate) : undefined,
                customFields: dto.customFields,
                convertedFromLead: dto.convertedFromLead ?? false,
                convertedFromId: dto.convertedFromId,
            },
            include: { contact: { select: { id: true, name: true, email: true } } },
        });
        await this.audit.log({
            entity: 'deal', entityId: deal.id, action: 'created',
            changes: { title: dto.title, value: dto.value, stage: dto.stage },
            userId: ownerId, tenantId,
        });
        await this.automation.evaluate('deal.created', { ...deal, entity: 'deal', entityId: deal.id }, tenantId);
        await this.webhooks.emit('deal.created', { ...deal, entity: 'deal', entityId: deal.id }, tenantId);
        return deal;
    }
    async findAll(query, tenantId) {
        const { search, stage, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (stage)
            where.stage = stage;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { contact: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.deal.findMany({
                where,
                include: {
                    contact: { select: { id: true, name: true, email: true } },
                    owner: { select: { id: true, name: true } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.deal.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async getPipeline(tenantId) {
        const [stages, deals] = await Promise.all([
            this.prisma.pipelineStage.findMany({
                where: { tenantId },
                orderBy: { order: 'asc' },
            }),
            this.prisma.deal.findMany({
                where: { tenantId },
                include: {
                    contact: { select: { id: true, name: true, email: true } },
                    owner: { select: { id: true, name: true } },
                },
                orderBy: { updatedAt: 'desc' },
            }),
        ]);
        const stagesWithDeals = stages.map((stage) => ({
            ...stage,
            deals: deals.filter((d) => d.stage === stage.name),
        }));
        return { stages: stagesWithDeals };
    }
    async findById(id, tenantId) {
        const deal = await this.prisma.deal.findFirst({
            where: { id, tenantId },
            include: {
                contact: { select: { id: true, name: true, email: true, phone: true } },
                owner: { select: { id: true, name: true, email: true } },
                activities: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal not found');
        return deal;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const data = { ...dto };
        if (dto.currency !== undefined) {
            const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD', 'GBP', 'ARS', 'CLP', 'COP', 'PEN', 'BRL'];
            if (!validCurrencies.includes(dto.currency)) {
                throw new common_1.BadRequestException(`Invalid currency: ${dto.currency}`);
            }
            data.currency = dto.currency;
        }
        if (dto.expectedCloseDate)
            data.expectedCloseDate = new Date(dto.expectedCloseDate);
        const updated = await this.prisma.deal.update({ where: { id }, data });
        await this.audit.log({
            entity: 'deal', entityId: id, action: 'updated',
            changes: dto, userId: updated.ownerId, tenantId,
        });
        await this.webhooks.emit('deal.updated', { ...updated, entity: 'deal', entityId: id }, tenantId);
        return updated;
    }
    async updateStage(id, stage, tenantId) {
        await this.findById(id, tenantId);
        const updated = await this.prisma.deal.update({ where: { id }, data: { stage } });
        await this.audit.log({
            entity: 'deal', entityId: id, action: 'stage_changed',
            changes: { stage }, userId: updated.ownerId, tenantId,
        });
        await this.automation.evaluate('deal.stage_changed', { ...updated, entity: 'deal', entityId: id }, tenantId);
        await this.webhooks.emit('deal.stage_changed', { ...updated, entity: 'deal', entityId: id }, tenantId);
        this.realtime.broadcastToTenant(tenantId, 'deal:updated', updated);
        return updated;
    }
    async convertFromLead(id, dto, tenantId) {
        const deal = await this.findById(id, tenantId);
        if (deal.convertedFromLead)
            throw new common_1.BadRequestException('Already converted');
        if (dto.contactStatus) {
            await this.prisma.contact.update({
                where: { id: deal.contactId },
                data: { status: dto.contactStatus },
            });
        }
        return this.prisma.deal.update({
            where: { id },
            data: {
                convertedFromLead: true,
                stage: dto.stage || 'qualified',
                value: dto.value ?? deal.value,
            },
        });
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.deal.delete({ where: { id } });
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object, typeof (_d = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _d : Object, typeof (_e = typeof shared_2.RealtimeGateway !== "undefined" && shared_2.RealtimeGateway) === "function" ? _e : Object])
], DealsService);


/***/ },

/***/ "./libs/deals/src/dto/create-deal.dto.ts"
/*!***********************************************!*\
  !*** ./libs/deals/src/dto/create-deal.dto.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.CreateDealDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDealDto {
    title;
    value;
    stage;
    contactId;
    expectedCloseDate;
    customFields;
    convertedFromLead;
    convertedFromId;
    currency;
}
exports.CreateDealDto = CreateDealDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDealDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "stage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "contactId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "expectedCloseDate", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateDealDto.prototype, "customFields", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDealDto.prototype, "convertedFromLead", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "convertedFromId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDealDto.prototype, "currency", void 0);


/***/ },

/***/ "./libs/deals/src/dto/query-deal.dto.ts"
/*!**********************************************!*\
  !*** ./libs/deals/src/dto/query-deal.dto.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.QueryDealDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class QueryDealDto {
    search;
    stage;
    page = 1;
    limit = 20;
}
exports.QueryDealDto = QueryDealDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDealDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryDealDto.prototype, "stage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryDealDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryDealDto.prototype, "limit", void 0);


/***/ },

/***/ "./libs/deals/src/dto/update-deal.dto.ts"
/*!***********************************************!*\
  !*** ./libs/deals/src/dto/update-deal.dto.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDealDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_deal_dto_1 = __webpack_require__(/*! ./create-deal.dto */ "./libs/deals/src/dto/create-deal.dto.ts");
class UpdateDealDto extends (0, mapped_types_1.PartialType)(create_deal_dto_1.CreateDealDto) {
}
exports.UpdateDealDto = UpdateDealDto;


/***/ },

/***/ "./libs/deals/src/index.ts"
/*!*********************************!*\
  !*** ./libs/deals/src/index.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DealsService = exports.DealsModule = void 0;
var deals_module_1 = __webpack_require__(/*! ./deals.module */ "./libs/deals/src/deals.module.ts");
Object.defineProperty(exports, "DealsModule", ({ enumerable: true, get: function () { return deals_module_1.DealsModule; } }));
var deals_service_1 = __webpack_require__(/*! ./deals.service */ "./libs/deals/src/deals.service.ts");
Object.defineProperty(exports, "DealsService", ({ enumerable: true, get: function () { return deals_service_1.DealsService; } }));


/***/ },

/***/ "./libs/email/src/dto/create-imap-config.dto.ts"
/*!******************************************************!*\
  !*** ./libs/email/src/dto/create-imap-config.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
    __metadata("design:type", String)
], CreateImapConfigDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateImapConfigDto.prototype, "useTLS", void 0);


/***/ },

/***/ "./libs/email/src/dto/create-smtp-config.dto.ts"
/*!******************************************************!*\
  !*** ./libs/email/src/dto/create-smtp-config.dto.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/email/src/dto/create-template.dto.ts"
/*!***************************************************!*\
  !*** ./libs/email/src/dto/create-template.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/email/src/dto/send-email.dto.ts"
/*!**********************************************!*\
  !*** ./libs/email/src/dto/send-email.dto.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/email/src/email.controller.ts"
/*!********************************************!*\
  !*** ./libs/email/src/email.controller.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./libs/email/src/email.service.ts");
const imap_service_1 = __webpack_require__(/*! ./imap.service */ "./libs/email/src/imap.service.ts");
const create_smtp_config_dto_1 = __webpack_require__(/*! ./dto/create-smtp-config.dto */ "./libs/email/src/dto/create-smtp-config.dto.ts");
const create_imap_config_dto_1 = __webpack_require__(/*! ./dto/create-imap-config.dto */ "./libs/email/src/dto/create-imap-config.dto.ts");
const create_template_dto_1 = __webpack_require__(/*! ./dto/create-template.dto */ "./libs/email/src/dto/create-template.dto.ts");
const send_email_dto_1 = __webpack_require__(/*! ./dto/send-email.dto */ "./libs/email/src/dto/send-email.dto.ts");
let EmailController = class EmailController {
    emailService;
    imapService;
    constructor(emailService, imapService) {
        this.emailService = emailService;
        this.imapService = imapService;
    }
    getConfig(user) {
        return this.emailService.getSmtpConfig(user.tenantId);
    }
    upsertConfig(dto, user) {
        return this.emailService.upsertSmtpConfig(user.tenantId, dto);
    }
    getImapConfig(user) {
        return this.imapService.getConfig(user.tenantId);
    }
    upsertImapConfig(dto, user) {
        return this.imapService.upsertConfig(user.tenantId, dto);
    }
    syncImap(user) {
        return this.imapService.syncMailbox(user.tenantId);
    }
    getTemplates(user) {
        return this.emailService.getTemplates(user.tenantId);
    }
    createTemplate(dto, user) {
        return this.emailService.createTemplate(dto, user.tenantId);
    }
    updateTemplate(id, dto, user) {
        return this.emailService.updateTemplate(id, dto, user.tenantId);
    }
    send(dto, user) {
        return this.emailService.sendEmail(dto, user.tenantId);
    }
    getHistory(contactId, user) {
        return this.emailService.getHistory(user.tenantId, contactId);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Get)('config'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Put)('config'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_smtp_config_dto_1.CreateSmtpConfigDto !== "undefined" && create_smtp_config_dto_1.CreateSmtpConfigDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "upsertConfig", null);
__decorate([
    (0, common_1.Get)('imap-config'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getImapConfig", null);
__decorate([
    (0, common_1.Put)('imap-config'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_imap_config_dto_1.CreateImapConfigDto !== "undefined" && create_imap_config_dto_1.CreateImapConfigDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "upsertImapConfig", null);
__decorate([
    (0, common_1.Post)('imap-sync'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "syncImap", null);
__decorate([
    (0, common_1.Get)('templates'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('templates'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_template_dto_1.CreateTemplateDto !== "undefined" && create_template_dto_1.CreateTemplateDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof create_template_dto_1.CreateTemplateDto !== "undefined" && create_template_dto_1.CreateTemplateDto) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof send_email_dto_1.SendEmailDto !== "undefined" && send_email_dto_1.SendEmailDto) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "send", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('contactId')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getHistory", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
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
exports.EmailTrackingController = EmailTrackingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_h = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _h : Object])
], EmailTrackingController);


/***/ },

/***/ "./libs/email/src/email.module.ts"
/*!****************************************!*\
  !*** ./libs/email/src/email.module.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./libs/email/src/email.service.ts");
const email_controller_1 = __webpack_require__(/*! ./email.controller */ "./libs/email/src/email.controller.ts");
const imap_service_1 = __webpack_require__(/*! ./imap.service */ "./libs/email/src/imap.service.ts");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        controllers: [email_controller_1.EmailController, email_controller_1.EmailTrackingController],
        providers: [email_service_1.EmailService, imap_service_1.ImapService],
        exports: [email_service_1.EmailService, imap_service_1.ImapService],
    })
], EmailModule);


/***/ },

/***/ "./libs/email/src/email.service.ts"
/*!*****************************************!*\
  !*** ./libs/email/src/email.service.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const nodemailer = __importStar(__webpack_require__(/*! nodemailer */ "nodemailer"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
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
        return this.prisma.smtpConfig.upsert({
            where: { tenantId },
            create: { ...dto, tenantId },
            update: dto,
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
            const contact = await this.prisma.contact.findFirst({
                where: { tenantId, email: { equals: dto.to, mode: 'insensitive' } },
            });
            await this.prisma.email.create({
                data: {
                    direction: 'outbound',
                    subject,
                    body: body.substring(0, 5000),
                    fromEmail: config.fromEmail,
                    toEmail: dto.to,
                    contactId: contact?.id,
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
    }
    async getHistory(tenantId, contactId) {
        const where = { tenantId };
        if (contactId)
            where.contactId = contactId;
        return this.prisma.email.findMany({
            where,
            include: { contact: { select: { id: true, name: true, email: true } } },
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
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], EmailService);


/***/ },

/***/ "./libs/email/src/imap.service.ts"
/*!****************************************!*\
  !*** ./libs/email/src/imap.service.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const imapflow_1 = __webpack_require__(/*! imapflow */ "imapflow");
let ImapService = ImapService_1 = class ImapService {
    prisma;
    logger = new common_1.Logger(ImapService_1.name);
    clients = new Map();
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertConfig(tenantId, dto) {
        const config = await this.prisma.imapConfig.upsert({
            where: { tenantId },
            create: { ...dto, tenantId },
            update: dto,
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
                    const textBody = msg.source?.toString() || '';
                    const contact = await this.prisma.contact.findFirst({
                        where: { tenantId, email: { equals: from, mode: 'insensitive' } },
                    });
                    await this.prisma.email.create({
                        data: {
                            direction: 'inbound',
                            subject,
                            body: textBody.substring(0, 10000),
                            fromEmail: from,
                            toEmail: to,
                            contactId: contact?.id,
                            tenantId,
                            messageId: envelope.messageId,
                        },
                    });
                    if (contact) {
                        await this.prisma.activity.create({
                            data: {
                                type: 'email',
                                subject: `Email from ${from}: ${subject}`,
                                description: textBody.substring(0, 500),
                                contactId: contact.id,
                                ownerId: contact.ownerId,
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


/***/ },

/***/ "./libs/email/src/index.ts"
/*!*********************************!*\
  !*** ./libs/email/src/index.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImapService = exports.EmailService = exports.EmailModule = void 0;
var email_module_1 = __webpack_require__(/*! ./email.module */ "./libs/email/src/email.module.ts");
Object.defineProperty(exports, "EmailModule", ({ enumerable: true, get: function () { return email_module_1.EmailModule; } }));
var email_service_1 = __webpack_require__(/*! ./email.service */ "./libs/email/src/email.service.ts");
Object.defineProperty(exports, "EmailService", ({ enumerable: true, get: function () { return email_service_1.EmailService; } }));
var imap_service_1 = __webpack_require__(/*! ./imap.service */ "./libs/email/src/imap.service.ts");
Object.defineProperty(exports, "ImapService", ({ enumerable: true, get: function () { return imap_service_1.ImapService; } }));


/***/ },

/***/ "./libs/leads/src/dto/create-lead.dto.ts"
/*!***********************************************!*\
  !*** ./libs/leads/src/dto/create-lead.dto.ts ***!
  \***********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryLeadDto = exports.UpdateLeadDto = exports.CreateLeadDto = void 0;
class CreateLeadDto {
    name;
    email;
    phone;
    company;
    source;
    status;
    score;
    notes;
}
exports.CreateLeadDto = CreateLeadDto;
class UpdateLeadDto {
    name;
    email;
    phone;
    company;
    source;
    status;
    score;
    notes;
}
exports.UpdateLeadDto = UpdateLeadDto;
class QueryLeadDto {
    search;
    status;
    source;
    page;
    limit;
}
exports.QueryLeadDto = QueryLeadDto;


/***/ },

/***/ "./libs/leads/src/index.ts"
/*!*********************************!*\
  !*** ./libs/leads/src/index.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsService = exports.LeadsModule = void 0;
var leads_module_1 = __webpack_require__(/*! ./leads.module */ "./libs/leads/src/leads.module.ts");
Object.defineProperty(exports, "LeadsModule", ({ enumerable: true, get: function () { return leads_module_1.LeadsModule; } }));
var leads_service_1 = __webpack_require__(/*! ./leads.service */ "./libs/leads/src/leads.service.ts");
Object.defineProperty(exports, "LeadsService", ({ enumerable: true, get: function () { return leads_service_1.LeadsService; } }));


/***/ },

/***/ "./libs/leads/src/leads.controller.ts"
/*!********************************************!*\
  !*** ./libs/leads/src/leads.controller.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const leads_service_1 = __webpack_require__(/*! ./leads.service */ "./libs/leads/src/leads.service.ts");
const create_lead_dto_1 = __webpack_require__(/*! ./dto/create-lead.dto */ "./libs/leads/src/dto/create-lead.dto.ts");
let LeadsController = class LeadsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(query, user) {
        return this.service.findAll(query, user.tenantId);
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
    convert(id, dto, user) {
        return this.service.convert(id, dto.contactId, dto.dealTitle, user.id, user.tenantId);
    }
    recalculateScore(id, user) {
        return this.service.recalculateScore(id, user.tenantId);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_lead_dto_1.CreateLeadDto !== "undefined" && create_lead_dto_1.CreateLeadDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_lead_dto_1.QueryLeadDto !== "undefined" && create_lead_dto_1.QueryLeadDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_lead_dto_1.UpdateLeadDto !== "undefined" && create_lead_dto_1.UpdateLeadDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/convert'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "convert", null);
__decorate([
    (0, common_1.Post)(':id/recalculate-score'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "recalculateScore", null);
exports.LeadsController = LeadsController = __decorate([
    (0, common_1.Controller)('leads'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof leads_service_1.LeadsService !== "undefined" && leads_service_1.LeadsService) === "function" ? _a : Object])
], LeadsController);


/***/ },

/***/ "./libs/leads/src/leads.module.ts"
/*!****************************************!*\
  !*** ./libs/leads/src/leads.module.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeadsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const leads_service_1 = __webpack_require__(/*! ./leads.service */ "./libs/leads/src/leads.service.ts");
const leads_controller_1 = __webpack_require__(/*! ./leads.controller */ "./libs/leads/src/leads.controller.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let LeadsModule = class LeadsModule {
};
exports.LeadsModule = LeadsModule;
exports.LeadsModule = LeadsModule = __decorate([
    (0, common_1.Module)({
        imports: [webhooks_1.WebhooksModule],
        controllers: [leads_controller_1.LeadsController],
        providers: [leads_service_1.LeadsService],
        exports: [leads_service_1.LeadsService],
    })
], LeadsModule);


/***/ },

/***/ "./libs/leads/src/leads.service.ts"
/*!*****************************************!*\
  !*** ./libs/leads/src/leads.service.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.LeadsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let LeadsService = class LeadsService {
    prisma;
    webhooks;
    constructor(prisma, webhooks) {
        this.prisma = prisma;
        this.webhooks = webhooks;
    }
    async create(dto, ownerId, tenantId) {
        const lead = await this.prisma.lead.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                company: dto.company,
                source: dto.source || 'web',
                status: dto.status || 'new',
                score: dto.score ?? 0,
                notes: dto.notes,
                ownerId,
                tenantId,
            },
        });
        await this.webhooks.emit('lead.created', lead, tenantId);
        return lead;
    }
    async findAll(query, tenantId) {
        const { search, status, source, page = 1, limit = 20 } = query;
        const where = { tenantId };
        if (status)
            where.status = status;
        if (source)
            where.source = source;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
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
        return { data, total, page, limit };
    }
    async findById(id, tenantId) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, tenantId },
            include: { owner: { select: { id: true, name: true, email: true } } },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return lead;
    }
    async update(id, dto, tenantId) {
        await this.findById(id, tenantId);
        const updated = await this.prisma.lead.update({ where: { id }, data: dto });
        await this.webhooks.emit('lead.updated', updated, tenantId);
        return updated;
    }
    async remove(id, tenantId) {
        await this.findById(id, tenantId);
        return this.prisma.lead.delete({ where: { id } });
    }
    async convert(id, contactId, dealTitle, userId, tenantId) {
        const lead = await this.findById(id, tenantId);
        const deal = dealTitle
            ? await this.prisma.deal.create({
                data: {
                    title: dealTitle,
                    contactId,
                    ownerId: userId || lead.ownerId,
                    tenantId: tenantId,
                    stage: 'lead',
                    convertedFromLead: true,
                    convertedFromId: id,
                },
            })
            : null;
        await this.prisma.lead.update({
            where: { id },
            data: {
                status: 'converted',
                convertedContactId: contactId,
                convertedDealId: deal?.id || null,
            },
        });
        return { lead: { ...lead, status: 'converted', convertedContactId: contactId, convertedDealId: deal?.id }, deal };
    }
    async recalculateScore(id, tenantId) {
        const lead = await this.findById(id, tenantId);
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
        return updated;
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _b : Object])
], LeadsService);


/***/ },

/***/ "./libs/notifications/src/index.ts"
/*!*****************************************!*\
  !*** ./libs/notifications/src/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = exports.NotificationsModule = void 0;
var notifications_module_1 = __webpack_require__(/*! ./notifications.module */ "./libs/notifications/src/notifications.module.ts");
Object.defineProperty(exports, "NotificationsModule", ({ enumerable: true, get: function () { return notifications_module_1.NotificationsModule; } }));
var notifications_service_1 = __webpack_require__(/*! ./notifications.service */ "./libs/notifications/src/notifications.service.ts");
Object.defineProperty(exports, "NotificationsService", ({ enumerable: true, get: function () { return notifications_service_1.NotificationsService; } }));


/***/ },

/***/ "./libs/notifications/src/notifications.controller.ts"
/*!************************************************************!*\
  !*** ./libs/notifications/src/notifications.controller.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const notifications_service_1 = __webpack_require__(/*! ./notifications.service */ "./libs/notifications/src/notifications.service.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
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


/***/ },

/***/ "./libs/notifications/src/notifications.module.ts"
/*!********************************************************!*\
  !*** ./libs/notifications/src/notifications.module.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const notifications_service_1 = __webpack_require__(/*! ./notifications.service */ "./libs/notifications/src/notifications.service.ts");
const notifications_controller_1 = __webpack_require__(/*! ./notifications.controller */ "./libs/notifications/src/notifications.controller.ts");
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


/***/ },

/***/ "./libs/notifications/src/notifications.service.ts"
/*!*********************************************************!*\
  !*** ./libs/notifications/src/notifications.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/pipeline-stages/src/dto/create-pipeline-stage.dto.ts"
/*!*******************************************************************!*\
  !*** ./libs/pipeline-stages/src/dto/create-pipeline-stage.dto.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreatePipelineStageDto {
    name;
    order;
    color;
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


/***/ },

/***/ "./libs/pipeline-stages/src/dto/update-pipeline-stage.dto.ts"
/*!*******************************************************************!*\
  !*** ./libs/pipeline-stages/src/dto/update-pipeline-stage.dto.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePipelineStageDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_pipeline_stage_dto_1 = __webpack_require__(/*! ./create-pipeline-stage.dto */ "./libs/pipeline-stages/src/dto/create-pipeline-stage.dto.ts");
class UpdatePipelineStageDto extends (0, mapped_types_1.PartialType)(create_pipeline_stage_dto_1.CreatePipelineStageDto) {
}
exports.UpdatePipelineStageDto = UpdatePipelineStageDto;


/***/ },

/***/ "./libs/pipeline-stages/src/index.ts"
/*!*******************************************!*\
  !*** ./libs/pipeline-stages/src/index.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesService = exports.PipelineStagesModule = void 0;
var pipeline_stages_module_1 = __webpack_require__(/*! ./pipeline-stages.module */ "./libs/pipeline-stages/src/pipeline-stages.module.ts");
Object.defineProperty(exports, "PipelineStagesModule", ({ enumerable: true, get: function () { return pipeline_stages_module_1.PipelineStagesModule; } }));
var pipeline_stages_service_1 = __webpack_require__(/*! ./pipeline-stages.service */ "./libs/pipeline-stages/src/pipeline-stages.service.ts");
Object.defineProperty(exports, "PipelineStagesService", ({ enumerable: true, get: function () { return pipeline_stages_service_1.PipelineStagesService; } }));


/***/ },

/***/ "./libs/pipeline-stages/src/pipeline-stages.controller.ts"
/*!****************************************************************!*\
  !*** ./libs/pipeline-stages/src/pipeline-stages.controller.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.PipelineStagesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const pipeline_stages_service_1 = __webpack_require__(/*! ./pipeline-stages.service */ "./libs/pipeline-stages/src/pipeline-stages.service.ts");
const create_pipeline_stage_dto_1 = __webpack_require__(/*! ./dto/create-pipeline-stage.dto */ "./libs/pipeline-stages/src/dto/create-pipeline-stage.dto.ts");
const update_pipeline_stage_dto_1 = __webpack_require__(/*! ./dto/update-pipeline-stage.dto */ "./libs/pipeline-stages/src/dto/update-pipeline-stage.dto.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
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
};
exports.PipelineStagesController = PipelineStagesController;
__decorate([
    (0, common_1.Post)(),
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_pipeline_stage_dto_1.UpdatePipelineStageDto !== "undefined" && update_pipeline_stage_dto_1.UpdatePipelineStageDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PipelineStagesController.prototype, "remove", null);
exports.PipelineStagesController = PipelineStagesController = __decorate([
    (0, common_1.Controller)('pipeline-stages'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof pipeline_stages_service_1.PipelineStagesService !== "undefined" && pipeline_stages_service_1.PipelineStagesService) === "function" ? _a : Object])
], PipelineStagesController);


/***/ },

/***/ "./libs/pipeline-stages/src/pipeline-stages.module.ts"
/*!************************************************************!*\
  !*** ./libs/pipeline-stages/src/pipeline-stages.module.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PipelineStagesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const pipeline_stages_service_1 = __webpack_require__(/*! ./pipeline-stages.service */ "./libs/pipeline-stages/src/pipeline-stages.service.ts");
const pipeline_stages_controller_1 = __webpack_require__(/*! ./pipeline-stages.controller */ "./libs/pipeline-stages/src/pipeline-stages.controller.ts");
let PipelineStagesModule = class PipelineStagesModule {
};
exports.PipelineStagesModule = PipelineStagesModule;
exports.PipelineStagesModule = PipelineStagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [pipeline_stages_controller_1.PipelineStagesController],
        providers: [pipeline_stages_service_1.PipelineStagesService],
        exports: [pipeline_stages_service_1.PipelineStagesService],
    })
], PipelineStagesModule);


/***/ },

/***/ "./libs/pipeline-stages/src/pipeline-stages.service.ts"
/*!*************************************************************!*\
  !*** ./libs/pipeline-stages/src/pipeline-stages.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
};
exports.PipelineStagesService = PipelineStagesService;
exports.PipelineStagesService = PipelineStagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], PipelineStagesService);


/***/ },

/***/ "./libs/products/src/index.ts"
/*!************************************!*\
  !*** ./libs/products/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = exports.ProductsModule = void 0;
var products_module_1 = __webpack_require__(/*! ./products.module */ "./libs/products/src/products.module.ts");
Object.defineProperty(exports, "ProductsModule", ({ enumerable: true, get: function () { return products_module_1.ProductsModule; } }));
var products_service_1 = __webpack_require__(/*! ./products.service */ "./libs/products/src/products.service.ts");
Object.defineProperty(exports, "ProductsService", ({ enumerable: true, get: function () { return products_service_1.ProductsService; } }));


/***/ },

/***/ "./libs/products/src/products.controller.ts"
/*!**************************************************!*\
  !*** ./libs/products/src/products.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ProductsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./libs/products/src/products.service.ts");
let ProductsController = class ProductsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.tenantId);
    }
    findAll(category, user) {
        return this.service.findAll(user.tenantId, category);
    }
    getCategories(user) {
        return this.service.getCategories(user.tenantId);
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
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('products/categories'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getCategories", null);
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
    __metadata("design:paramtypes", [String, Object, Object]),
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
    __metadata("design:paramtypes", [Object, Object]),
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
    __metadata("design:paramtypes", [Object, Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ },

/***/ "./libs/products/src/products.module.ts"
/*!**********************************************!*\
  !*** ./libs/products/src/products.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./libs/products/src/products.service.ts");
const products_controller_1 = __webpack_require__(/*! ./products.controller */ "./libs/products/src/products.controller.ts");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ },

/***/ "./libs/products/src/products.service.ts"
/*!***********************************************!*\
  !*** ./libs/products/src/products.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, tenantId) {
        return this.prisma.product.create({ data: { ...dto, tenantId } });
    }
    async findAll(tenantId, category) {
        const where = { tenantId };
        if (category)
            where.category = category;
        return this.prisma.product.findMany({ where, orderBy: { name: 'asc' } });
    }
    async findById(id, tenantId) {
        const product = await this.prisma.product.findFirst({ where: { id, tenantId } });
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
    async getCategories(tenantId) {
        const products = await this.prisma.product.findMany({
            where: { tenantId, category: { not: null } },
            select: { category: true },
            distinct: ['category'],
        });
        return products.map((p) => p.category).filter(Boolean);
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


/***/ },

/***/ "./libs/quotes/src/dto/create-quote.dto.ts"
/*!*************************************************!*\
  !*** ./libs/quotes/src/dto/create-quote.dto.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateQuoteDto {
    dealId;
    contactId;
    notes;
    currency;
    items;
    discountPercent;
    taxPercent;
}
exports.CreateQuoteDto = CreateQuoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "dealId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "contactId", void 0);
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
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "discountPercent", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "taxPercent", void 0);


/***/ },

/***/ "./libs/quotes/src/index.ts"
/*!**********************************!*\
  !*** ./libs/quotes/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesService = exports.QuotesModule = void 0;
var quotes_module_1 = __webpack_require__(/*! ./quotes.module */ "./libs/quotes/src/quotes.module.ts");
Object.defineProperty(exports, "QuotesModule", ({ enumerable: true, get: function () { return quotes_module_1.QuotesModule; } }));
var quotes_service_1 = __webpack_require__(/*! ./quotes.service */ "./libs/quotes/src/quotes.service.ts");
Object.defineProperty(exports, "QuotesService", ({ enumerable: true, get: function () { return quotes_service_1.QuotesService; } }));


/***/ },

/***/ "./libs/quotes/src/quotes.controller.ts"
/*!**********************************************!*\
  !*** ./libs/quotes/src/quotes.controller.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const quotes_service_1 = __webpack_require__(/*! ./quotes.service */ "./libs/quotes/src/quotes.service.ts");
const create_quote_dto_1 = __webpack_require__(/*! ./dto/create-quote.dto */ "./libs/quotes/src/dto/create-quote.dto.ts");
let QuotesController = class QuotesController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(user) {
        if (user.isPortal) {
            return this.service.findAll(user.tenantId, user.id);
        }
        return this.service.findAll(user.tenantId);
    }
    findById(id, user) {
        if (user.isPortal) {
            return this.service.findById(id, user.tenantId, user.id);
        }
        return this.service.findById(id, user.tenantId);
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_quote_dto_1.CreateQuoteDto !== "undefined" && create_quote_dto_1.CreateQuoteDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_quote_dto_1.CreateQuoteDto !== "undefined" && create_quote_dto_1.CreateQuoteDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "send", null);
__decorate([
    (0, common_1.Post)(':id/request-approval'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "requestApproval", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuotesController.prototype, "generatePayment", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuotesController.prototype, "getPdf", null);
exports.QuotesController = QuotesController = __decorate([
    (0, common_1.Controller)('quotes'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof quotes_service_1.QuotesService !== "undefined" && quotes_service_1.QuotesService) === "function" ? _a : Object])
], QuotesController);


/***/ },

/***/ "./libs/quotes/src/quotes.module.ts"
/*!******************************************!*\
  !*** ./libs/quotes/src/quotes.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const quotes_service_1 = __webpack_require__(/*! ./quotes.service */ "./libs/quotes/src/quotes.service.ts");
const quotes_controller_1 = __webpack_require__(/*! ./quotes.controller */ "./libs/quotes/src/quotes.controller.ts");
const stripe_webhook_controller_1 = __webpack_require__(/*! ./stripe-webhook.controller */ "./libs/quotes/src/stripe-webhook.controller.ts");
let QuotesModule = class QuotesModule {
};
exports.QuotesModule = QuotesModule;
exports.QuotesModule = QuotesModule = __decorate([
    (0, common_1.Module)({
        controllers: [quotes_controller_1.QuotesController, stripe_webhook_controller_1.StripeWebhookController],
        providers: [quotes_service_1.QuotesService],
        exports: [quotes_service_1.QuotesService],
    })
], QuotesModule);


/***/ },

/***/ "./libs/quotes/src/quotes.service.ts"
/*!*******************************************!*\
  !*** ./libs/quotes/src/quotes.service.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuotesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const stripe_1 = __importDefault(__webpack_require__(/*! stripe */ "stripe"));
const PDFDocument = __webpack_require__(/*! pdfkit */ "pdfkit");
let QuotesService = QuotesService_1 = class QuotesService {
    prisma;
    logger = new common_1.Logger(QuotesService_1.name);
    appUrl;
    stripe;
    constructor(prisma) {
        this.prisma = prisma;
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
                dealId: dto.dealId,
                contactId: dto.contactId,
                currency: currency,
                status: 'draft',
                subtotal: Math.round(subtotal * 100) / 100,
                discountTotal: Math.round(discountTotal * 100) / 100,
                taxTotal: Math.round(taxTotal * 100) / 100,
                grandTotal: Math.round(grandTotal * 100) / 100,
                discountPercent: dto.discountPercent || 0,
                notes: dto.notes,
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
            include: { items: true, contact: { select: { id: true, name: true, email: true } } },
        });
    }
    async findAll(tenantId, contactId) {
        const where = { tenantId };
        if (contactId)
            where.contactId = contactId;
        return this.prisma.quote.findMany({
            where,
            include: {
                contact: { select: { id: true, name: true, email: true } },
                deal: { select: { id: true, title: true } },
                items: true,
                approvalRequest: { select: { id: true, status: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId, contactId) {
        const where = { id, tenantId };
        if (contactId)
            where.contactId = contactId;
        const quote = await this.prisma.quote.findFirst({
            where,
            include: {
                contact: { select: { id: true, name: true, email: true, companyName: true } },
                deal: { select: { id: true, title: true, stage: true } },
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
                dealId: dto.dealId,
                contactId: dto.contactId,
                currency: currency,
                subtotal: Math.round(subtotal * 100) / 100,
                discountTotal: Math.round(discountTotal * 100) / 100,
                taxTotal: Math.round(taxTotal * 100) / 100,
                grandTotal: Math.round(grandTotal * 100) / 100,
                discountPercent: dto.discountPercent || 0,
                notes: dto.notes,
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
        if (quote.contact?.email) {
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
        await this.prisma.quote.update({ where: { id }, data: { status: 'approved' } });
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
            doc.font('Helvetica').text(quote.contact?.name || 'Cliente sin nombre', 50, 145);
            if (quote.contact?.companyName)
                doc.text(quote.contact.companyName, 50, 160);
            if (quote.contact?.email)
                doc.text(quote.contact.email, 50, 175);
            doc.font('Helvetica-Bold').text('Detalles:', 350, 130);
            doc.font('Helvetica').text(`Fecha: ${new Date(quote.createdAt).toLocaleDateString()}`, 350, 145);
            doc.text(`Moneda: ${quote.currency}`, 350, 160);
            doc.text(`Negocio: ${quote.deal?.title || 'N/A'}`, 350, 175);
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
            y += 20;
            doc.text(`Impuesto (${quote.taxTotal > 0 ? quote.items[0]?.taxPercent || 0 : 0}%):`, tX, y, { width: 100 });
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
                await this.prisma.quote.update({
                    where: { id: quoteId },
                    data: { status: 'converted', stripePaymentIntentId: session.payment_intent },
                });
                this.logger.log(`Quote ${quoteId} marked as converted via Stripe`);
            }
        }
    }
    async sendQuoteEmail(quote) {
        try {
            const { EmailService } = __webpack_require__(/*! @crm/email */ "./libs/email/src/index.ts");
        }
        catch { }
    }
};
exports.QuotesService = QuotesService;
exports.QuotesService = QuotesService = QuotesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], QuotesService);


/***/ },

/***/ "./libs/quotes/src/stripe-webhook.controller.ts"
/*!******************************************************!*\
  !*** ./libs/quotes/src/stripe-webhook.controller.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripeWebhookController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const quotes_service_1 = __webpack_require__(/*! ./quotes.service */ "./libs/quotes/src/quotes.service.ts");
const express_1 = __webpack_require__(/*! express */ "express");
const stripe_1 = __importDefault(__webpack_require__(/*! stripe */ "stripe"));
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
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], StripeWebhookController.prototype, "handleWebhook", null);
exports.StripeWebhookController = StripeWebhookController = __decorate([
    (0, common_1.Controller)('webhooks/stripe'),
    __metadata("design:paramtypes", [typeof (_a = typeof quotes_service_1.QuotesService !== "undefined" && quotes_service_1.QuotesService) === "function" ? _a : Object])
], StripeWebhookController);


/***/ },

/***/ "./libs/role-permissions/src/index.ts"
/*!********************************************!*\
  !*** ./libs/role-permissions/src/index.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(/*! ./role-permissions.module */ "./libs/role-permissions/src/role-permissions.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./role-permissions.service */ "./libs/role-permissions/src/role-permissions.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./role-permissions.controller */ "./libs/role-permissions/src/role-permissions.controller.ts"), exports);


/***/ },

/***/ "./libs/role-permissions/src/role-permissions.controller.ts"
/*!******************************************************************!*\
  !*** ./libs/role-permissions/src/role-permissions.controller.ts ***!
  \******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RolePermissionsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const role_permissions_service_1 = __webpack_require__(/*! ./role-permissions.service */ "./libs/role-permissions/src/role-permissions.service.ts");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
let RolePermissionsController = class RolePermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(user) {
        return this.service.findAll(user.tenantId);
    }
    findByRole(role, user) {
        return this.service.findByRole(role, user.tenantId);
    }
    setPermission(body, user) {
        return this.service.setPermission(body.role, body.permission, body.enabled, user.tenantId);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':role'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "findByRole", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "setPermission", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, common_1.Controller)('role-permissions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof role_permissions_service_1.RolePermissionsService !== "undefined" && role_permissions_service_1.RolePermissionsService) === "function" ? _a : Object])
], RolePermissionsController);


/***/ },

/***/ "./libs/role-permissions/src/role-permissions.module.ts"
/*!**************************************************************!*\
  !*** ./libs/role-permissions/src/role-permissions.module.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermissionsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const role_permissions_service_1 = __webpack_require__(/*! ./role-permissions.service */ "./libs/role-permissions/src/role-permissions.service.ts");
const role_permissions_controller_1 = __webpack_require__(/*! ./role-permissions.controller */ "./libs/role-permissions/src/role-permissions.controller.ts");
let RolePermissionsModule = class RolePermissionsModule {
};
exports.RolePermissionsModule = RolePermissionsModule;
exports.RolePermissionsModule = RolePermissionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [role_permissions_controller_1.RolePermissionsController],
        providers: [role_permissions_service_1.RolePermissionsService],
        exports: [role_permissions_service_1.RolePermissionsService],
    })
], RolePermissionsModule);


/***/ },

/***/ "./libs/role-permissions/src/role-permissions.service.ts"
/*!***************************************************************!*\
  !*** ./libs/role-permissions/src/role-permissions.service.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RolePermissionsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
let RolePermissionsService = class RolePermissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object])
], RolePermissionsService);


/***/ },

/***/ "./libs/shared/src/encryption.service.ts"
/*!***********************************************!*\
  !*** ./libs/shared/src/encryption.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const crypto = __importStar(__webpack_require__(/*! crypto */ "crypto"));
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


/***/ },

/***/ "./libs/shared/src/index.ts"
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeGateway = exports.RealtimeModule = exports.EncryptionService = exports.PrismaService = exports.PrismaModule = exports.SharedModule = void 0;
var shared_module_1 = __webpack_require__(/*! ./shared.module */ "./libs/shared/src/shared.module.ts");
Object.defineProperty(exports, "SharedModule", ({ enumerable: true, get: function () { return shared_module_1.SharedModule; } }));
var prisma_1 = __webpack_require__(/*! ./prisma */ "./libs/shared/src/prisma/index.ts");
Object.defineProperty(exports, "PrismaModule", ({ enumerable: true, get: function () { return prisma_1.PrismaModule; } }));
Object.defineProperty(exports, "PrismaService", ({ enumerable: true, get: function () { return prisma_1.PrismaService; } }));
var encryption_service_1 = __webpack_require__(/*! ./encryption.service */ "./libs/shared/src/encryption.service.ts");
Object.defineProperty(exports, "EncryptionService", ({ enumerable: true, get: function () { return encryption_service_1.EncryptionService; } }));
var realtime_module_1 = __webpack_require__(/*! ./realtime/realtime.module */ "./libs/shared/src/realtime/realtime.module.ts");
Object.defineProperty(exports, "RealtimeModule", ({ enumerable: true, get: function () { return realtime_module_1.RealtimeModule; } }));
var realtime_gateway_1 = __webpack_require__(/*! ./realtime/realtime.gateway */ "./libs/shared/src/realtime/realtime.gateway.ts");
Object.defineProperty(exports, "RealtimeGateway", ({ enumerable: true, get: function () { return realtime_gateway_1.RealtimeGateway; } }));


/***/ },

/***/ "./libs/shared/src/prisma/index.ts"
/*!*****************************************!*\
  !*** ./libs/shared/src/prisma/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = exports.PrismaModule = void 0;
var prisma_module_1 = __webpack_require__(/*! ./prisma.module */ "./libs/shared/src/prisma/prisma.module.ts");
Object.defineProperty(exports, "PrismaModule", ({ enumerable: true, get: function () { return prisma_module_1.PrismaModule; } }));
var prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./libs/shared/src/prisma/prisma.service.ts");
Object.defineProperty(exports, "PrismaService", ({ enumerable: true, get: function () { return prisma_service_1.PrismaService; } }));


/***/ },

/***/ "./libs/shared/src/prisma/prisma.module.ts"
/*!*************************************************!*\
  !*** ./libs/shared/src/prisma/prisma.module.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./libs/shared/src/prisma/prisma.service.ts");
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


/***/ },

/***/ "./libs/shared/src/prisma/prisma.service.ts"
/*!**************************************************!*\
  !*** ./libs/shared/src/prisma/prisma.service.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
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


/***/ },

/***/ "./libs/shared/src/realtime/realtime.gateway.ts"
/*!******************************************************!*\
  !*** ./libs/shared/src/realtime/realtime.gateway.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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
    broadcastToTenant(tenantId, event, payload) {
        this.server.to(`tenant_${tenantId}`).emit(event, payload);
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
exports.RealtimeGateway = RealtimeGateway = RealtimeGateway_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], RealtimeGateway);


/***/ },

/***/ "./libs/shared/src/realtime/realtime.module.ts"
/*!*****************************************************!*\
  !*** ./libs/shared/src/realtime/realtime.module.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RealtimeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const realtime_gateway_1 = __webpack_require__(/*! ./realtime.gateway */ "./libs/shared/src/realtime/realtime.gateway.ts");
let RealtimeModule = class RealtimeModule {
};
exports.RealtimeModule = RealtimeModule;
exports.RealtimeModule = RealtimeModule = __decorate([
    (0, common_1.Module)({
        providers: [realtime_gateway_1.RealtimeGateway],
        exports: [realtime_gateway_1.RealtimeGateway],
    })
], RealtimeModule);


/***/ },

/***/ "./libs/shared/src/shared.module.ts"
/*!******************************************!*\
  !*** ./libs/shared/src/shared.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_1 = __webpack_require__(/*! ./prisma */ "./libs/shared/src/prisma/index.ts");
const encryption_service_1 = __webpack_require__(/*! ./encryption.service */ "./libs/shared/src/encryption.service.ts");
const realtime_module_1 = __webpack_require__(/*! ./realtime/realtime.module */ "./libs/shared/src/realtime/realtime.module.ts");
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


/***/ },

/***/ "./libs/teams/src/index.ts"
/*!*********************************!*\
  !*** ./libs/teams/src/index.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsService = exports.TeamsModule = void 0;
var teams_module_1 = __webpack_require__(/*! ./teams.module */ "./libs/teams/src/teams.module.ts");
Object.defineProperty(exports, "TeamsModule", ({ enumerable: true, get: function () { return teams_module_1.TeamsModule; } }));
var teams_service_1 = __webpack_require__(/*! ./teams.service */ "./libs/teams/src/teams.service.ts");
Object.defineProperty(exports, "TeamsService", ({ enumerable: true, get: function () { return teams_service_1.TeamsService; } }));


/***/ },

/***/ "./libs/teams/src/teams.controller.ts"
/*!********************************************!*\
  !*** ./libs/teams/src/teams.controller.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TeamsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const teams_service_1 = __webpack_require__(/*! ./teams.service */ "./libs/teams/src/teams.service.ts");
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
    __metadata("design:paramtypes", [Object, Object]),
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
    __metadata("design:paramtypes", [String, Object, Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof teams_service_1.TeamsService !== "undefined" && teams_service_1.TeamsService) === "function" ? _a : Object])
], TeamsController);


/***/ },

/***/ "./libs/teams/src/teams.module.ts"
/*!****************************************!*\
  !*** ./libs/teams/src/teams.module.ts ***!
  \****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const teams_service_1 = __webpack_require__(/*! ./teams.service */ "./libs/teams/src/teams.service.ts");
const teams_controller_1 = __webpack_require__(/*! ./teams.controller */ "./libs/teams/src/teams.controller.ts");
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService],
        exports: [teams_service_1.TeamsService],
    })
], TeamsModule);


/***/ },

/***/ "./libs/teams/src/teams.service.ts"
/*!*****************************************!*\
  !*** ./libs/teams/src/teams.service.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
                _count: { select: { contacts: true, deals: true, tickets: true, tasks: true, leads: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId) {
        const team = await this.prisma.team.findFirst({
            where: { id, tenantId },
            include: {
                members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } },
                _count: { select: { contacts: true, deals: true, tickets: true, tasks: true, leads: true } },
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


/***/ },

/***/ "./libs/tenant-settings/src/index.ts"
/*!*******************************************!*\
  !*** ./libs/tenant-settings/src/index.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsService = exports.TenantSettingsModule = void 0;
var tenant_settings_module_1 = __webpack_require__(/*! ./tenant-settings.module */ "./libs/tenant-settings/src/tenant-settings.module.ts");
Object.defineProperty(exports, "TenantSettingsModule", ({ enumerable: true, get: function () { return tenant_settings_module_1.TenantSettingsModule; } }));
var tenant_settings_service_1 = __webpack_require__(/*! ./tenant-settings.service */ "./libs/tenant-settings/src/tenant-settings.service.ts");
Object.defineProperty(exports, "TenantSettingsService", ({ enumerable: true, get: function () { return tenant_settings_service_1.TenantSettingsService; } }));


/***/ },

/***/ "./libs/tenant-settings/src/tenant-settings.controller.ts"
/*!****************************************************************!*\
  !*** ./libs/tenant-settings/src/tenant-settings.controller.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const tenant_settings_service_1 = __webpack_require__(/*! ./tenant-settings.service */ "./libs/tenant-settings/src/tenant-settings.service.ts");
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TenantSettingsController.prototype, "update", null);
exports.TenantSettingsController = TenantSettingsController = __decorate([
    (0, common_1.Controller)('tenant-settings'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_settings_service_1.TenantSettingsService !== "undefined" && tenant_settings_service_1.TenantSettingsService) === "function" ? _a : Object])
], TenantSettingsController);


/***/ },

/***/ "./libs/tenant-settings/src/tenant-settings.module.ts"
/*!************************************************************!*\
  !*** ./libs/tenant-settings/src/tenant-settings.module.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantSettingsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tenant_settings_service_1 = __webpack_require__(/*! ./tenant-settings.service */ "./libs/tenant-settings/src/tenant-settings.service.ts");
const tenant_settings_controller_1 = __webpack_require__(/*! ./tenant-settings.controller */ "./libs/tenant-settings/src/tenant-settings.controller.ts");
let TenantSettingsModule = class TenantSettingsModule {
};
exports.TenantSettingsModule = TenantSettingsModule;
exports.TenantSettingsModule = TenantSettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tenant_settings_controller_1.TenantSettingsController],
        providers: [tenant_settings_service_1.TenantSettingsService],
        exports: [tenant_settings_service_1.TenantSettingsService],
    })
], TenantSettingsModule);


/***/ },

/***/ "./libs/tenant-settings/src/tenant-settings.service.ts"
/*!*************************************************************!*\
  !*** ./libs/tenant-settings/src/tenant-settings.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/tenant/src/dto/create-tenant.dto.ts"
/*!**************************************************!*\
  !*** ./libs/tenant/src/dto/create-tenant.dto.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ },

/***/ "./libs/tenant/src/dto/update-tenant.dto.ts"
/*!**************************************************!*\
  !*** ./libs/tenant/src/dto/update-tenant.dto.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTenantDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_tenant_dto_1 = __webpack_require__(/*! ./create-tenant.dto */ "./libs/tenant/src/dto/create-tenant.dto.ts");
class UpdateTenantDto extends (0, mapped_types_1.PartialType)(create_tenant_dto_1.CreateTenantDto) {
    status;
}
exports.UpdateTenantDto = UpdateTenantDto;


/***/ },

/***/ "./libs/tenant/src/index.ts"
/*!**********************************!*\
  !*** ./libs/tenant/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantService = exports.TenantModule = void 0;
var tenant_module_1 = __webpack_require__(/*! ./tenant.module */ "./libs/tenant/src/tenant.module.ts");
Object.defineProperty(exports, "TenantModule", ({ enumerable: true, get: function () { return tenant_module_1.TenantModule; } }));
var tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./libs/tenant/src/tenant.service.ts");
Object.defineProperty(exports, "TenantService", ({ enumerable: true, get: function () { return tenant_service_1.TenantService; } }));


/***/ },

/***/ "./libs/tenant/src/tenant.controller.ts"
/*!**********************************************!*\
  !*** ./libs/tenant/src/tenant.controller.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TenantController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./libs/tenant/src/tenant.service.ts");
const create_tenant_dto_1 = __webpack_require__(/*! ./dto/create-tenant.dto */ "./libs/tenant/src/dto/create-tenant.dto.ts");
const update_tenant_dto_1 = __webpack_require__(/*! ./dto/update-tenant.dto */ "./libs/tenant/src/dto/update-tenant.dto.ts");
let TenantController = class TenantController {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    create(dto) {
        return this.tenantService.create(dto);
    }
    findAll() {
        return this.tenantService.findAll();
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
exports.TenantController = TenantController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_tenant_dto_1.CreateTenantDto !== "undefined" && create_tenant_dto_1.CreateTenantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_tenant_dto_1.UpdateTenantDto !== "undefined" && update_tenant_dto_1.UpdateTenantDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantController.prototype, "remove", null);
exports.TenantController = TenantController = __decorate([
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [typeof (_a = typeof tenant_service_1.TenantService !== "undefined" && tenant_service_1.TenantService) === "function" ? _a : Object])
], TenantController);


/***/ },

/***/ "./libs/tenant/src/tenant.module.ts"
/*!******************************************!*\
  !*** ./libs/tenant/src/tenant.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tenant_service_1 = __webpack_require__(/*! ./tenant.service */ "./libs/tenant/src/tenant.service.ts");
const tenant_controller_1 = __webpack_require__(/*! ./tenant.controller */ "./libs/tenant/src/tenant.controller.ts");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);


/***/ },

/***/ "./libs/tenant/src/tenant.service.ts"
/*!*******************************************!*\
  !*** ./libs/tenant/src/tenant.service.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/tickets/src/dto/create-ticket.dto.ts"
/*!***************************************************!*\
  !*** ./libs/tickets/src/dto/create-ticket.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.AddMessageDto = exports.CreateTicketDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateTicketDto {
    subject;
    description;
    priority;
    contactId;
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
], CreateTicketDto.prototype, "contactId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTicketDto.prototype, "assignedTo", void 0);
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


/***/ },

/***/ "./libs/tickets/src/index.ts"
/*!***********************************!*\
  !*** ./libs/tickets/src/index.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = exports.TicketsModule = void 0;
var tickets_module_1 = __webpack_require__(/*! ./tickets.module */ "./libs/tickets/src/tickets.module.ts");
Object.defineProperty(exports, "TicketsModule", ({ enumerable: true, get: function () { return tickets_module_1.TicketsModule; } }));
var tickets_service_1 = __webpack_require__(/*! ./tickets.service */ "./libs/tickets/src/tickets.service.ts");
Object.defineProperty(exports, "TicketsService", ({ enumerable: true, get: function () { return tickets_service_1.TicketsService; } }));


/***/ },

/***/ "./libs/tickets/src/tickets.controller.ts"
/*!************************************************!*\
  !*** ./libs/tickets/src/tickets.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TicketsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const tickets_service_1 = __webpack_require__(/*! ./tickets.service */ "./libs/tickets/src/tickets.service.ts");
const create_ticket_dto_1 = __webpack_require__(/*! ./dto/create-ticket.dto */ "./libs/tickets/src/dto/create-ticket.dto.ts");
let TicketsController = class TicketsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto, user) {
        return this.service.create(dto, user.id, user.tenantId);
    }
    findAll(status, user) {
        if (user.isPortal) {
            return this.service.findAll(user.tenantId, status, user.id);
        }
        return this.service.findAll(user.tenantId, status);
    }
    getSla(user) {
        return this.service.getSlaStatus(user.tenantId);
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_ticket_dto_1.CreateTicketDto !== "undefined" && create_ticket_dto_1.CreateTicketDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sla'),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getSla", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_ticket_dto_1.AddMessageDto !== "undefined" && create_ticket_dto_1.AddMessageDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "addMessage", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof tickets_service_1.TicketsService !== "undefined" && tickets_service_1.TicketsService) === "function" ? _a : Object])
], TicketsController);


/***/ },

/***/ "./libs/tickets/src/tickets.module.ts"
/*!********************************************!*\
  !*** ./libs/tickets/src/tickets.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const tickets_service_1 = __webpack_require__(/*! ./tickets.service */ "./libs/tickets/src/tickets.service.ts");
const tickets_controller_1 = __webpack_require__(/*! ./tickets.controller */ "./libs/tickets/src/tickets.controller.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let TicketsModule = class TicketsModule {
};
exports.TicketsModule = TicketsModule;
exports.TicketsModule = TicketsModule = __decorate([
    (0, common_1.Module)({
        imports: [automation_1.AutomationModule, audit_1.AuditModule, webhooks_1.WebhooksModule],
        controllers: [tickets_controller_1.TicketsController],
        providers: [tickets_service_1.TicketsService],
        exports: [tickets_service_1.TicketsService],
    })
], TicketsModule);


/***/ },

/***/ "./libs/tickets/src/tickets.service.ts"
/*!*********************************************!*\
  !*** ./libs/tickets/src/tickets.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TicketsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const automation_1 = __webpack_require__(/*! @crm/automation */ "./libs/automation/src/index.ts");
const audit_1 = __webpack_require__(/*! @crm/audit */ "./libs/audit/src/index.ts");
const webhooks_1 = __webpack_require__(/*! @crm/webhooks */ "./libs/webhooks/src/index.ts");
let TicketsService = TicketsService_1 = class TicketsService {
    prisma;
    automation;
    audit;
    webhooks;
    logger = new common_1.Logger(TicketsService_1.name);
    constructor(prisma, automation, audit, webhooks) {
        this.prisma = prisma;
        this.automation = automation;
        this.audit = audit;
        this.webhooks = webhooks;
    }
    async create(dto, userId, tenantId) {
        const slaHours = { low: 72, medium: 48, high: 24, critical: 8 };
        const slaDeadline = new Date();
        slaDeadline.setHours(slaDeadline.getHours() + (slaHours[dto.priority || 'medium'] || 48));
        const ticket = await this.prisma.ticket.create({
            data: {
                subject: dto.subject,
                description: dto.description,
                priority: dto.priority || 'medium',
                contactId: dto.contactId,
                assignedTo: dto.assignedTo,
                tenantId,
                slaDeadline,
            },
            include: { contact: { select: { id: true, name: true, email: true } } },
        });
        await this.audit.log({
            entity: 'ticket', entityId: ticket.id, action: 'created',
            changes: { subject: dto.subject, priority: dto.priority, contactId: dto.contactId },
            userId, tenantId,
        });
        await this.automation.evaluate('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
        await this.webhooks.emit('ticket.created', { ...ticket, entity: 'ticket', entityId: ticket.id }, tenantId);
        return ticket;
    }
    async findAll(tenantId, status, contactId) {
        const where = { tenantId };
        if (status)
            where.status = status;
        if (contactId)
            where.contactId = contactId;
        return this.prisma.ticket.findMany({
            where,
            include: {
                contact: { select: { id: true, name: true, email: true } },
                assignee: { select: { id: true, name: true } },
                _count: { select: { messages: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id, tenantId, contactId) {
        const where = { id, tenantId };
        if (contactId)
            where.contactId = contactId;
        const ticket = await this.prisma.ticket.findFirst({
            where,
            include: {
                contact: { select: { id: true, name: true, email: true, portalPassword: true } },
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
            changes: dto, userId: before.assignedTo || before.contactId || '', tenantId,
        });
        await this.automation.evaluate('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
        await this.webhooks.emit('ticket.updated', { ...updated, entity: 'ticket', entityId: id }, tenantId);
        return updated;
    }
    async addMessage(ticketId, dto, userId, tenantId) {
        await this.findById(ticketId, tenantId);
        return this.prisma.ticketMessage.create({
            data: {
                ticketId,
                authorId: userId,
                content: dto.content,
                isInternal: dto.isInternal || false,
            },
            include: { author: { select: { id: true, name: true } } },
        });
    }
    async getSlaStatus(tenantId) {
        const now = new Date();
        const tickets = await this.prisma.ticket.findMany({
            where: { tenantId, status: { notIn: ['resolved', 'closed'] } },
            select: { id: true, number: true, subject: true, priority: true, slaDeadline: true, status: true },
        });
        return tickets.map((t) => ({
            ...t,
            slaBreached: t.slaDeadline ? t.slaDeadline < now : false,
            slaRemainingHours: t.slaDeadline ? Math.round((t.slaDeadline.getTime() - now.getTime()) / 3600000) : null,
        }));
    }
    async createFromEmail(from, subject, body, tenantId) {
        const contact = await this.prisma.contact.findFirst({
            where: { tenantId, email: { equals: from, mode: 'insensitive' } },
        });
        const ticket = await this.create({ subject: `[Email] ${subject}`, description: body.substring(0, 2000), contactId: contact?.id }, contact?.ownerId || '', tenantId);
        this.logger.log(`Ticket #${ticket.number} created from email: ${subject}`);
        return ticket;
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = TicketsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.PrismaService !== "undefined" && shared_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof automation_1.AutomationService !== "undefined" && automation_1.AutomationService) === "function" ? _b : Object, typeof (_c = typeof audit_1.AuditService !== "undefined" && audit_1.AuditService) === "function" ? _c : Object, typeof (_d = typeof webhooks_1.WebhooksService !== "undefined" && webhooks_1.WebhooksService) === "function" ? _d : Object])
], TicketsService);


/***/ },

/***/ "./libs/time-tracking/src/index.ts"
/*!*****************************************!*\
  !*** ./libs/time-tracking/src/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingService = exports.TimeTrackingModule = void 0;
var time_tracking_module_1 = __webpack_require__(/*! ./time-tracking.module */ "./libs/time-tracking/src/time-tracking.module.ts");
Object.defineProperty(exports, "TimeTrackingModule", ({ enumerable: true, get: function () { return time_tracking_module_1.TimeTrackingModule; } }));
var time_tracking_service_1 = __webpack_require__(/*! ./time-tracking.service */ "./libs/time-tracking/src/time-tracking.service.ts");
Object.defineProperty(exports, "TimeTrackingService", ({ enumerable: true, get: function () { return time_tracking_service_1.TimeTrackingService; } }));


/***/ },

/***/ "./libs/time-tracking/src/time-tracking.controller.ts"
/*!************************************************************!*\
  !*** ./libs/time-tracking/src/time-tracking.controller.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TimeTrackingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const time_tracking_service_1 = __webpack_require__(/*! ./time-tracking.service */ "./libs/time-tracking/src/time-tracking.service.ts");
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
    __metadata("design:paramtypes", [Object, Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof time_tracking_service_1.TimeTrackingService !== "undefined" && time_tracking_service_1.TimeTrackingService) === "function" ? _a : Object])
], TimeTrackingController);


/***/ },

/***/ "./libs/time-tracking/src/time-tracking.module.ts"
/*!********************************************************!*\
  !*** ./libs/time-tracking/src/time-tracking.module.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeTrackingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const time_tracking_service_1 = __webpack_require__(/*! ./time-tracking.service */ "./libs/time-tracking/src/time-tracking.service.ts");
const time_tracking_controller_1 = __webpack_require__(/*! ./time-tracking.controller */ "./libs/time-tracking/src/time-tracking.controller.ts");
let TimeTrackingModule = class TimeTrackingModule {
};
exports.TimeTrackingModule = TimeTrackingModule;
exports.TimeTrackingModule = TimeTrackingModule = __decorate([
    (0, common_1.Module)({
        controllers: [time_tracking_controller_1.TimeTrackingController],
        providers: [time_tracking_service_1.TimeTrackingService],
        exports: [time_tracking_service_1.TimeTrackingService],
    })
], TimeTrackingModule);


/***/ },

/***/ "./libs/time-tracking/src/time-tracking.service.ts"
/*!*********************************************************!*\
  !*** ./libs/time-tracking/src/time-tracking.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "./libs/uploads/src/index.ts"
/*!***********************************!*\
  !*** ./libs/uploads/src/index.ts ***!
  \***********************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsService = exports.UploadsModule = void 0;
var uploads_module_1 = __webpack_require__(/*! ./uploads.module */ "./libs/uploads/src/uploads.module.ts");
Object.defineProperty(exports, "UploadsModule", ({ enumerable: true, get: function () { return uploads_module_1.UploadsModule; } }));
var uploads_service_1 = __webpack_require__(/*! ./uploads.service */ "./libs/uploads/src/uploads.service.ts");
Object.defineProperty(exports, "UploadsService", ({ enumerable: true, get: function () { return uploads_service_1.UploadsService; } }));


/***/ },

/***/ "./libs/uploads/src/uploads.controller.ts"
/*!************************************************!*\
  !*** ./libs/uploads/src/uploads.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const uploads_service_1 = __webpack_require__(/*! ./uploads.service */ "./libs/uploads/src/uploads.service.ts");
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof uploads_service_1.UploadsService !== "undefined" && uploads_service_1.UploadsService) === "function" ? _a : Object])
], UploadsController);


/***/ },

/***/ "./libs/uploads/src/uploads.module.ts"
/*!********************************************!*\
  !*** ./libs/uploads/src/uploads.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const uploads_service_1 = __webpack_require__(/*! ./uploads.service */ "./libs/uploads/src/uploads.service.ts");
const uploads_controller_1 = __webpack_require__(/*! ./uploads.controller */ "./libs/uploads/src/uploads.controller.ts");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({ dest: './uploads' })],
        controllers: [uploads_controller_1.UploadsController],
        providers: [uploads_service_1.UploadsService],
        exports: [uploads_service_1.UploadsService],
    })
], UploadsModule);


/***/ },

/***/ "./libs/uploads/src/uploads.service.ts"
/*!*********************************************!*\
  !*** ./libs/uploads/src/uploads.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
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


/***/ },

/***/ "./libs/webhooks/src/index.ts"
/*!************************************!*\
  !*** ./libs/webhooks/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksService = exports.WebhooksModule = void 0;
var webhooks_module_1 = __webpack_require__(/*! ./webhooks.module */ "./libs/webhooks/src/webhooks.module.ts");
Object.defineProperty(exports, "WebhooksModule", ({ enumerable: true, get: function () { return webhooks_module_1.WebhooksModule; } }));
var webhooks_service_1 = __webpack_require__(/*! ./webhooks.service */ "./libs/webhooks/src/webhooks.service.ts");
Object.defineProperty(exports, "WebhooksService", ({ enumerable: true, get: function () { return webhooks_service_1.WebhooksService; } }));


/***/ },

/***/ "./libs/webhooks/src/webhooks.controller.ts"
/*!**************************************************!*\
  !*** ./libs/webhooks/src/webhooks.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.WebhooksController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const webhooks_service_1 = __webpack_require__(/*! ./webhooks.service */ "./libs/webhooks/src/webhooks.service.ts");
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebhooksController.prototype, "remove", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof webhooks_service_1.WebhooksService !== "undefined" && webhooks_service_1.WebhooksService) === "function" ? _a : Object])
], WebhooksController);


/***/ },

/***/ "./libs/webhooks/src/webhooks.module.ts"
/*!**********************************************!*\
  !*** ./libs/webhooks/src/webhooks.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const webhooks_service_1 = __webpack_require__(/*! ./webhooks.service */ "./libs/webhooks/src/webhooks.service.ts");
const webhooks_controller_1 = __webpack_require__(/*! ./webhooks.controller */ "./libs/webhooks/src/webhooks.controller.ts");
let WebhooksModule = class WebhooksModule {
};
exports.WebhooksModule = WebhooksModule;
exports.WebhooksModule = WebhooksModule = __decorate([
    (0, common_1.Module)({
        controllers: [webhooks_controller_1.WebhooksController],
        providers: [webhooks_service_1.WebhooksService],
        exports: [webhooks_service_1.WebhooksService],
    })
], WebhooksModule);


/***/ },

/***/ "./libs/webhooks/src/webhooks.service.ts"
/*!***********************************************!*\
  !*** ./libs/webhooks/src/webhooks.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhooksService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhooksService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const res = await fetch(wh.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...(wh.secret ? { 'X-Webhook-Secret': wh.secret } : {}) },
                    body: JSON.stringify({ event, payload, timestamp: new Date().toISOString() }),
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


/***/ },

/***/ "./libs/whatsapp/src/index.ts"
/*!************************************!*\
  !*** ./libs/whatsapp/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappService = exports.WhatsappModule = void 0;
var whatsapp_module_1 = __webpack_require__(/*! ./whatsapp.module */ "./libs/whatsapp/src/whatsapp.module.ts");
Object.defineProperty(exports, "WhatsappModule", ({ enumerable: true, get: function () { return whatsapp_module_1.WhatsappModule; } }));
var whatsapp_service_1 = __webpack_require__(/*! ./whatsapp.service */ "./libs/whatsapp/src/whatsapp.service.ts");
Object.defineProperty(exports, "WhatsappService", ({ enumerable: true, get: function () { return whatsapp_service_1.WhatsappService; } }));


/***/ },

/***/ "./libs/whatsapp/src/whatsapp.controller.ts"
/*!**************************************************!*\
  !*** ./libs/whatsapp/src/whatsapp.controller.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
exports.WhatsappController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_1 = __webpack_require__(/*! @crm/auth */ "./libs/auth/src/index.ts");
const whatsapp_service_1 = __webpack_require__(/*! ./whatsapp.service */ "./libs/whatsapp/src/whatsapp.service.ts");
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WhatsappController.prototype, "send", null);
exports.WhatsappController = WhatsappController = __decorate([
    (0, common_1.Controller)('whatsapp'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [typeof (_a = typeof whatsapp_service_1.WhatsappService !== "undefined" && whatsapp_service_1.WhatsappService) === "function" ? _a : Object])
], WhatsappController);


/***/ },

/***/ "./libs/whatsapp/src/whatsapp.module.ts"
/*!**********************************************!*\
  !*** ./libs/whatsapp/src/whatsapp.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhatsappModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const whatsapp_service_1 = __webpack_require__(/*! ./whatsapp.service */ "./libs/whatsapp/src/whatsapp.service.ts");
const whatsapp_controller_1 = __webpack_require__(/*! ./whatsapp.controller */ "./libs/whatsapp/src/whatsapp.controller.ts");
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        controllers: [whatsapp_controller_1.WhatsappController],
        providers: [whatsapp_service_1.WhatsappService],
        exports: [whatsapp_service_1.WhatsappService],
    })
], WhatsappModule);


/***/ },

/***/ "./libs/whatsapp/src/whatsapp.service.ts"
/*!***********************************************!*\
  !*** ./libs/whatsapp/src/whatsapp.service.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_1 = __webpack_require__(/*! @crm/shared */ "./libs/shared/src/index.ts");
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


/***/ },

/***/ "@nestjs/bullmq"
/*!*********************************!*\
  !*** external "@nestjs/bullmq" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/bullmq");

/***/ },

/***/ "@nestjs/cache-manager"
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/cache-manager");

/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/mapped-types"
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
(module) {

module.exports = require("@nestjs/mapped-types");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/platform-express"
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
(module) {

module.exports = require("@nestjs/platform-express");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/throttler"
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/throttler");

/***/ },

/***/ "@nestjs/websockets"
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
(module) {

module.exports = require("@nestjs/websockets");

/***/ },

/***/ "@prisma/client"
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
(module) {

module.exports = require("@prisma/client");

/***/ },

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "csv-parser"
/*!*****************************!*\
  !*** external "csv-parser" ***!
  \*****************************/
(module) {

module.exports = require("csv-parser");

/***/ },

/***/ "exceljs"
/*!**************************!*\
  !*** external "exceljs" ***!
  \**************************/
(module) {

module.exports = require("exceljs");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

/***/ },

/***/ "googleapis"
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
(module) {

module.exports = require("googleapis");

/***/ },

/***/ "helmet"
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
(module) {

module.exports = require("helmet");

/***/ },

/***/ "imapflow"
/*!***************************!*\
  !*** external "imapflow" ***!
  \***************************/
(module) {

module.exports = require("imapflow");

/***/ },

/***/ "nestjs-pino"
/*!******************************!*\
  !*** external "nestjs-pino" ***!
  \******************************/
(module) {

module.exports = require("nestjs-pino");

/***/ },

/***/ "node-cron"
/*!****************************!*\
  !*** external "node-cron" ***!
  \****************************/
(module) {

module.exports = require("node-cron");

/***/ },

/***/ "nodemailer"
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
(module) {

module.exports = require("nodemailer");

/***/ },

/***/ "otplib"
/*!*************************!*\
  !*** external "otplib" ***!
  \*************************/
(module) {

module.exports = require("otplib");

/***/ },

/***/ "passport-google-oauth20"
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
(module) {

module.exports = require("passport-google-oauth20");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "pdfkit"
/*!*************************!*\
  !*** external "pdfkit" ***!
  \*************************/
(module) {

module.exports = require("pdfkit");

/***/ },

/***/ "qrcode"
/*!*************************!*\
  !*** external "qrcode" ***!
  \*************************/
(module) {

module.exports = require("qrcode");

/***/ },

/***/ "socket.io"
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
(module) {

module.exports = require("socket.io");

/***/ },

/***/ "stripe"
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
(module) {

module.exports = require("stripe");

/***/ },

/***/ "uuid"
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
(module) {

module.exports = require("uuid");

/***/ },

/***/ "crypto"
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
(module) {

module.exports = require("crypto");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "stream"
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
(module) {

module.exports = require("stream");

/***/ }

/******/ 	});
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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/api/src/main.ts");
/******/ 	
/******/ })()
;