import ERROR_CODE_MAP from 'constants/errorCodeMap';
import { ErrorResponse, HttpErrorResponse } from 'types';

export const isErrorResponse = (response: any): response is ErrorResponse => {
  if (typeof response.status !== 'number') {
    return false;
  }

  if (response.data === undefined) {
    return false;
  }

  return true;
};

export const isErrorCode = (data: unknown): data is keyof typeof ERROR_CODE_MAP => {
  if (typeof data !== 'string') {
    return false;
  }

  return Object.keys(ERROR_CODE_MAP).some((key) => key === data);
};

export const isHttpErrorResponse = (errorResponse: any): errorResponse is HttpErrorResponse => {
  if (!isErrorResponse(errorResponse)) {
    return false;
  }

  const { data } = errorResponse;

  if (typeof (data as any).message !== 'string') {
    return false;
  }

  if (!isErrorCode((data as any).errorCode)) {
    return false;
  }

  return true;
};
