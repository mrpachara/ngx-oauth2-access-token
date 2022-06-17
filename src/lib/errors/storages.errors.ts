export class AccessTokenNotFoundError extends Error {
  constructor(message: string = 'Access token is not found.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class AccessTokenExpiredError extends Error {
  constructor(message: string = 'Access token has expired.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class RefreshTokenNotFoundError extends Error {
  constructor(message: string = 'Refresh token is not found.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class StateNotFoundError extends Error {
  constructor(message: string = 'State not found.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class StateExpiredError extends Error {
  constructor(message: string = 'State has expired.') {
    super(message);

    this.name = this.constructor.name;
  }
}
