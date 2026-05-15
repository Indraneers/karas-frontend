import axios, { AxiosError } from "axios";

export type FieldErrors = Record<string, string>;

export interface ApiErrorPayload {
  statusCode?: number;
  code?: string;
  message?: string;
  fieldErrors?: FieldErrors;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: FieldErrors;

  constructor(message: string, opts: { status: number; code: string; fieldErrors?: FieldErrors }) {
    super(message);
    this.name = "ApiError";
    this.status = opts.status;
    this.code = opts.code;
    this.fieldErrors = opts.fieldErrors ?? {};
  }

  get hasFieldErrors(): boolean {
    return Object.keys(this.fieldErrors).length > 0;
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}

export function toApiError(error: unknown): ApiError {
  if (isApiError(error)) return error;

  if (axios.isAxiosError(error)) {
    return fromAxios(error);
  }

  if (error instanceof Error) {
    return new ApiError(error.message, { status: 0, code: "ClientError" });
  }

  return new ApiError("Unknown error", { status: 0, code: "UnknownError" });
}

function fromAxios(error: AxiosError): ApiError {
  const response = error.response;

  if (!response) {
    return new ApiError("Network error — please check your connection", {
      status: 0,
      code: "NetworkError"
    });
  }

  const payload = (response.data ?? {}) as ApiErrorPayload;
  return new ApiError(payload.message ?? defaultMessageFor(response.status), {
    status: payload.statusCode ?? response.status,
    code: payload.code ?? `Http${ response.status }`,
    fieldErrors: payload.fieldErrors
  });
}

function defaultMessageFor(status: number): string {
  if (status === 401) return "You are not signed in";
  if (status === 403) return "You do not have permission to do this";
  if (status === 404) return "Not found";
  if (status >= 500) return "Server error — please try again";
  return "Request failed";
}
