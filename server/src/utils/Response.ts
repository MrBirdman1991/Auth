export interface IJsonResponse {
  code: number;
  message: string;
  isSuccess: boolean;
  data?: object;
}

export class SuccessResponse implements IJsonResponse {
  public data: object;
  public code: number;
  public message: string;
  public isSuccess: boolean;

  constructor(code: number = 200, message: string = "success", data: object = {}) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.isSuccess = true;
  }
}

export class ErrorResponse implements IJsonResponse  {
  public data: object;
  public code: number;
  public message: string;
  public isSuccess: boolean;

  constructor(code: number = 500, message: string = "An unknown error occurred", data: object = {}) {
    this.code = code;
    this.data = data;
    this.message = message.trim().length === 0 ? "An unknown error occurred" : message;
    this.isSuccess = false;
  }
}
