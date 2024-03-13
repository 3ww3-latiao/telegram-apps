import type { CreateRequestIdFunc } from '../../types/request-id.js';

/**
 * Creates function which generated request identifiers.
 */
export function createRequestIdGenerator(): CreateRequestIdFunc {
  let requestId = 0;

  return () => {
    requestId += 1;
    return requestId.toString();
  };
}
