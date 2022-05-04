export interface MailAttachmentInterface {
  filename: string;
  type: string;
  content: string;
  content_id: string;
  disposition: string;
}
export interface MailInterface {
  subject: string;
  from: { email: string; name?: string } | any;
  to: string | Array<string> | any;
  html: string;
  text?: string;
  attachments?: MailAttachmentInterface | any;
}
