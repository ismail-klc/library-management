import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ismail000728@gmail.com',
        pass: 'zkhrkhyternravhi'
    }
})