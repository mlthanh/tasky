export enum ErrorSource {
  PRISMA = 'PRISMA',
  EXTERNAL_API = 'EXTERNAL_API',
  AUTH = 'AUTH',
  UNKNOWN = 'UNKNOWN'
}

type ErrorResponse = {
  code: string;
  message: string;
  source?: ErrorSource;
};

export const successResponse = <T>(data: T) => ({
  success: true,
  data,
  error: null as null
});

export const errorResponse = (
  code: string,
  message: string,
  source: ErrorSource = ErrorSource.UNKNOWN
) => ({
  success: false,
  data: null as null,
  error: { code, message, source } as ErrorResponse
});
