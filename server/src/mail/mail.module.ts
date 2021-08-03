import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailProcessor } from './mail.processor';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'mail',
        }),
    ],
    providers: [MailProcessor],
    exports: [MailProcessor, BullModule]
})

export class MailModule { }
