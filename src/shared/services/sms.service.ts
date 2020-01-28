import { Injectable } from '@nestjs/common';
import * as messagebird from 'messagebird';
import { ConfigService } from '@nestjs/config';
import { Message } from 'messagebird/types/messages';

@Injectable()
export class SmsService {
  private _apiKey: string;
  private _messageObject: messagebird.MessageBird;
  public constructor(config: ConfigService) {
    this._apiKey = config.get('MESSAGEBIRD_API_KEY') as string;
    // tslint:disable-next-line:no-any
    this._messageObject = (messagebird as any)(
      this._apiKey
    ) as messagebird.MessageBird;
  }
  public async sendSms(phone: string, code: string): Promise<Message | null> {
    const params = {
      body: `Plese enter this code - ${code}`,
      originator: 'MessageBird',
      recipients: [`+${phone}`],
    };
    return new Promise((res, rej) => {
      this._messageObject.messages.create(params, (err, message) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.log(err);
          rej(err);
          return;
        }
        res(message);
      });
    });
  }
}
