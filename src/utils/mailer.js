import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    }
})

const sendMail = async (email, subject, html ) => {
    try {
        const info = await transporter.sendMail({
                from: process.env.GMAIL_MAIL, 
                to: email,
                subject: subject,
                html: html
            })
        return {
        id: info.messageId, 
        de: info.envelope.from, 
        para: info.envelope.to, 
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response
        }
    } catch (error) {
        throw error
    }
}

export default sendMail
