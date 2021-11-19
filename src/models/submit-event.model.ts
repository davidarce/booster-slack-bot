interface User {
  id: string;
  username: string;
  name: string;
}

interface View {
  id: string;
  state: State;
}

interface State {
  values: Values;
}

interface Values {
  [key: string]: Item;
}

interface Item {
  value: string;
}

export class SubmitEvent {
  constructor(type: string, user: User, view: View) {
    this.type = type;
    this.user = user;
    this.view = view;
  }

  type: string;

  user: User;

  view: View;
}
