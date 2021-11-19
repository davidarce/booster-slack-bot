export class InteractiveEvent {
  constructor(channel_id: string, user_id: string, trigger_id: string) {
    this.channel_id = channel_id;
    this.user_id = user_id;
    this.trigger_id = trigger_id;
  }

  channel_id: string;

  user_id: string;

  trigger_id: string;
}
