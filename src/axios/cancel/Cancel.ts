export default class Cancel {
  message?: string;
  constructor(message?: string) {
    this.message = message;
  }
}

export function isCancel(v: any): boolean {
  return v instanceof Cancel;
}
