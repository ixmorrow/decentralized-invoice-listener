"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletKeypair = exports.delay = exports.safeAirdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
function safeAirdrop(address, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const acctInfo = yield connection.getAccountInfo(address, "confirmed");
        if (acctInfo == null || acctInfo.lamports < web3_js_1.LAMPORTS_PER_SOL) {
            let signature = yield connection.requestAirdrop(address, web3_js_1.LAMPORTS_PER_SOL);
            yield connection.confirmTransaction(signature);
        }
    });
}
exports.safeAirdrop = safeAirdrop;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
exports.walletKeypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from([
    157, 11, 208, 143, 193, 36, 171, 155, 188, 233,
    235, 129, 196, 246, 152, 249, 141, 227, 202, 113,
    169, 14, 39, 111, 185, 134, 170, 181, 224, 5,
    35, 200, 129, 143, 82, 84, 32, 132, 128, 25,
    89, 183, 252, 200, 253, 212, 251, 151, 109, 238,
    23, 55, 123, 25, 192, 199, 197, 215, 236, 150,
    183, 174, 175, 228
]));
