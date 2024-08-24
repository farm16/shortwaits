import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
// import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export const EmailService: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const FORWARDEMAIL_HOST = configService.get<string>("FORWARDEMAIL_HOST");
    const FORWARDEMAIL_PORT = configService.get<string>("FORWARDEMAIL_PORT");
    const FORWARDEMAIL_USER = configService.get<string>("FORWARDEMAIL_USER");
    const FORWARDEMAIL_PASS = configService.get<string>("FORWARDEMAIL_PASS");

    console.log("====================================================================");
    console.log("===================Email Service Configuration======================");
    console.log("FORWARDEMAIL_HOST >>>", FORWARDEMAIL_HOST);
    console.log("FORWARDEMAIL_PORT >>>", FORWARDEMAIL_PORT);
    console.log("FORWARDEMAIL_USER >>>", FORWARDEMAIL_USER);
    console.log("FORWARDEMAIL_PASS >>>", FORWARDEMAIL_PASS);
    console.log("====================================================================");

    console.log(__dirname + "/views");
    return {
      transport: {
        host: FORWARDEMAIL_HOST,
        port: parseInt(FORWARDEMAIL_PORT),
        secure: true,
        auth: {
          user: FORWARDEMAIL_USER,
          pass: FORWARDEMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@shortwaits.com>',
      },
      verifyTransporters: true,
    };
  },
};
