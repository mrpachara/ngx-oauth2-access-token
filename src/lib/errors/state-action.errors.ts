export class StateActionNotFoundError extends Error {
  constructor(
    actionName: string,
    message: string = 'State action %s is not found in STATE_ACTION_HANDLERS.',
  ) {
    super(message.replace(/\%s/, actionName));
  }
}
