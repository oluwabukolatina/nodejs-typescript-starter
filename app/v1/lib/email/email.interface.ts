import { UnknownInterface } from '../unknown.interface';

export interface MailAttachmentInterface {
  filename: string;
  type: string;
  content: string;
  // eslint-disable-next-line camelcase
  content_id: string;
  disposition: string;
}
export interface MailInterface {
  subject: string;
  from: { email: string; name?: string } | UnknownInterface;
  to: string | Array<string> | UnknownInterface;
  html: string;
  text?: string;
  attachments?: MailAttachmentInterface | UnknownInterface;
}
