"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskDao = void 0;
const json2typescript_1 = require("json2typescript");
let addTaskDao = class addTaskDao {
    constructor() {
        this.Objectkey = '';
        this.subject = '';
    }
};
__decorate([
    (0, json2typescript_1.JsonProperty)("Objectkey", String, json2typescript_1.PropertyConvertingMode.MAP_NULLABLE)
], addTaskDao.prototype, "Objectkey", void 0);
__decorate([
    (0, json2typescript_1.JsonProperty)("subject", String, json2typescript_1.PropertyConvertingMode.MAP_NULLABLE)
], addTaskDao.prototype, "subject", void 0);
addTaskDao = __decorate([
    (0, json2typescript_1.JsonObject)("TaskToADD")
], addTaskDao);
exports.addTaskDao = addTaskDao;
