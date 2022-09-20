import Sender from "./Sender"
import express, { Request, Response } from "express"
import { markAsUntransferable } from "worker_threads"

const sender = new Sender()
sender.initialize("ws-sender-dev").then(() => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.get('/status', (req: Request, res: Response) => {
        sender.GetConnected().then((resposta) => {
            return res.status(200).json({ status: resposta })
        }).catch((erro) => {
            return res.status(500).json({ status: "error", message: erro })
        })
    })

    app.post('/send', (req: Request, res: Response) => {

        try {
            const { numero, mensagem } = req.body
            sender.sendText(numero, mensagem)
                .then(() => {
                    return res.status(200).json({ status: "sucess", message: "Msg enviada!" })
                }).catch((erro) => {
                    console.error(erro);
                    return res.status(500).json({ status: "error", message: erro })
                })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: error })
        }
    })
    app.post('/sendimg', (req: Request, res: Response) => {

        try {
            const { numero, caminhoImagem, titulo, mensagem } = req.body
            sender.sendImage(numero, caminhoImagem, titulo, mensagem)
                .then(() => {
                    return res.status(200).json({ status: "sucess", message: "Img enviada!" })
                }).catch((erro) => {
                    console.error(erro);
                    return res.status(500).json({ status: "error", message: erro })
                })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: error })
        }
    })

    app.post('/chatname', (req: Request, res: Response) => {
        class Grupo {
            Nome: string
            Id: string
            constructor(nome: string, id: string) {
                this.Nome = nome
                this.Id = id
            }
        }

        try {
            const { nome } = req.body
            sender.getAllChats().then((chats) => {
                let list: Grupo[] = []

                const grupos = chats.filter(a => a.isGroup == true && a.name.toLowerCase().includes(nome.toLowerCase()))
                grupos.forEach(a => {
                    let grupo = new Grupo(a.name, a.id._serialized)
                    list.push(grupo)
                })

                console.log(list)
                return res.status(200).json({ status: "sucess", message: list })
            }).catch((erro) => {
                console.error(erro);
                return res.status(500).json({ status: "error", message: erro })
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: error })
        }
    })


    app.listen(3000, () => {
        console.log('📶 servidor iniciado!')
    })
})
