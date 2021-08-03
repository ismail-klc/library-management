import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { transporter } from './transporter';


@Processor('mail')
export class MailProcessor {

    // process that creates a code to verify the student email
    @Process('confirmation')
    async handleConfirmationMail(job: Job<{ email: string, code: string }>) {
        try {
            await transporter.sendMail({
                to: job.data.email,
                from: 'library_management@gmail.com',
                subject: 'Welcome to Library, Verify Your Email ✔',
                text: 'welcome',
                html: `<b>welcome</b> code: ${job.data.code}`
            })

            console.log(`Sending confirmation email to '${job.data.email}' completed`)
        } catch (error) {
            console.log(error);
        }
    }

    // process that informs the student about borrow operation
    @Process('borrow-info')
    async handleBorrowInfoMail(job: Job<{ email: string, book: string, date: Date }>) {
        try {
            await transporter.sendMail({
                to: job.data.email,
                from: 'library_management@gmail.com',
                subject: 'Information About Borrowed Book ✔',
                text: 'welcome',
                html: `<b>The book which name is ${job.data.book} was
                        borrowed by you in ${job.data.date}</b>`
            })

            console.log(`Sending information email to '${job.data.email}' completed`)
        } catch (error) {
            console.log(error);
        }
    }
}