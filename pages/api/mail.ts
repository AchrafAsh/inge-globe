import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('sending email....')
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'aitsidihammou.achraf@gmail.com',
                pass: process.env.GMAIL_SECRET
            }
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Fred Foo 👻" <${process.env.EMAIL_FROM}>`,
            to: 'mumeinogakusei@gmail.com',
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: '<b>Hello world?</b>'
        })

        console.log({ info })

        res.status(200).json(info)
    } catch (error) {
        console.error(error)
        return res.status(400).send(error)
    }
}
