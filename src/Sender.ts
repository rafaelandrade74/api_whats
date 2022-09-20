import { create, Whatsapp, Message, SocketState } from 'venom-bot'

class Sender {
    private client: Whatsapp
    private isConnected: boolean
    constructor() {
    }
    async GetConnected() {
        if (this.isConnected) return await this.client.getConnectionState()
        return "RESUMING"
    }
    async sendText(to: string, body: string) {
        this.GetConnected().then(() => {
            this.client.sendText(to, body).then(() => console.log("msg enviada!"))
        })
    }
    async sendImage(to: string, pathImagem: string, titleImage: string, body: string) {
        this.GetConnected().then(() => {
            this.client.sendImageFromBase64(to, pathImagem, titleImage, body).then(() => console.log("imagem enviada!"))
        })
    }
    async getAllChats() {
        return await this.client.getAllChats().then((dados) => {
            return dados
        })
    }

    async initialize(sessao: string) {
        const qr = (asciiQR: string) => { }
        // const status = (statusSession: string, session: string) => {
        //     // isLogged || notLogged || browserClosed || qrReadSuccess || noOpenBrowser || deleteToken
        // };
        const start = (client: Whatsapp) => {
            this.client = client
            this.isConnected = true
            this.GetConnected().then((statusCon) => console.log(statusCon)).catch((erro) => console.error(erro))
        }

        await create(sessao, qr)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender
