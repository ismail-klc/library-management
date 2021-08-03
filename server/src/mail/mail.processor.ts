import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailerService } from '@nestjs-modules/mailer';
import { transporter } from './transporter';


@Processor('mail')
export class MailProcessor {

    @Process('confirmation')
    async handleMail(job: Job<{ email: string, code: string }>) {
        console.log(job.data);

        try {
            await transporter.sendMail({
                to: job.data.email,
                from: 'library_management@gmail.com',
                subject: 'Testing Nest MailerModule ✔',
                text: 'welcome',
                html: `<b>welcome</b> code: ${job.data.code}`, // HTML body content
            })

            console.log(`Sending confirmation email to '${job.data.email}' completed`)
        } catch (error) {
            console.log(error);
        }
    }
}