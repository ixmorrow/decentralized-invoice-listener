"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decentralized_invoices_json_1 = __importDefault(require("./idl/decentralized_invoices.json"));
const anchor = __importStar(require("@project-serum/anchor"));
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("./utils/utils");
var cron = require('node-cron');
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
const programId = new web3_js_1.PublicKey("JCjA4ujSA9usvV2HJUZaUDaBwNNK1dCHhjaBwDYP1rPs");
const cluster = (0, web3_js_1.clusterApiUrl)("devnet");
const connection = new web3_js_1.Connection(cluster);
const wallet = new anchor.Wallet(utils_1.walletKeypair);
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
const program = new anchor.Program(decentralized_invoices_json_1.default, programId, provider);
// event listeners
program.addEventListener("CreateInvoiceEvent", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event.topic);
    console.log(event.uuid);
}));
program.addEventListener("PayInvoiceEvent", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event.topic);
    console.log(event.uuid);
    console.log(event.amount);
}));
program.addEventListener("ExpireInvoiceEvent", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event.topic);
    console.log(event.uuid);
}));
program.addEventListener("UpdateInvoiceEvent", (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(event.topic);
    console.log(event.uuid);
}));
