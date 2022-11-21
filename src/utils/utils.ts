
import { PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'

export async function safeAirdrop(address: PublicKey, connection: Connection) {
    const acctInfo = await connection.getAccountInfo(address, "confirmed")

    if (acctInfo == null || acctInfo.lamports < LAMPORTS_PER_SOL) {
        let signature = await connection.requestAirdrop(
            address,
            LAMPORTS_PER_SOL
        )
        await connection.confirmTransaction(signature)
    }
}

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const walletKeypair = Keypair.fromSecretKey(Uint8Array.from([
    157,  11, 208, 143, 193,  36, 171, 155, 188, 233,
    235, 129, 196, 246, 152, 249, 141, 227, 202, 113,
    169,  14,  39, 111, 185, 134, 170, 181, 224,   5,
    35, 200, 129, 143,  82,  84,  32, 132, 128,  25,
    89, 183, 252, 200, 253, 212, 251, 151, 109, 238,
    23,  55, 123,  25, 192, 199, 197, 215, 236, 150,
    183, 174, 175, 228
]))