export class Event {
  constructor(
    type: string,
    channel: string,
    user: string,
    text: string,
    ts: string
  ) {
    this.type = type;
    this.channel = channel;
    this.user = user;
    this.text = text;
    this.ts = ts;
  }

  type: string;

  channel: string;

  user: string;

  text: string;

  ts: string;
}
