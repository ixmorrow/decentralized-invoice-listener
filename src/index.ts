import express from 'express'
import DecentralizedInvoices from './idl/decentralized_invoices.json'
import * as anchor from '@project-serum/anchor'
import { PublicKey, Keypair, Connection, clusterApiUrl } from '@solana/web3.js'
import { safeAirdrop, walletKeypair } from './utils/utils'
var cron = require('node-cron')
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port}`))

const programId = new PublicKey("JCjA4ujSA9usvV2HJUZaUDaBwNNK1dCHhjaBwDYP1rPs")
const cluster = clusterApiUrl("devnet")
const connection = new Connection(cluster)

const wallet = new anchor.Wallet(walletKeypair)
const provider = new anchor.AnchorProvider(connection, wallet, {commitment: "confirmed"})
const program = new anchor.Program(
    DecentralizedInvoices as anchor.Idl,
    programId,
    provider
);

// event listeners
program.addEventListener("CreateInvoiceEvent", async (event) => {
    console.log(event.topic)
    console.log(event.uuid)
})

program.addEventListener("PayInvoiceEvent", async (event) => {
    console.log(event.topic)
    console.log(event.uuid)
    console.log(event.amount)
})

program.addEventListener("ExpireInvoiceEvent", async (event) => {
    console.log(event.topic)
    console.log(event.uuid)
})

program.addEventListener("UpdateInvoiceEvent", async (event) => {
    console.log(event.topic)
    console.log(event.uuid)
})
