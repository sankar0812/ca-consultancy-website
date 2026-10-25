const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry';
const TIMEOUT_MS = 20000;

export class ApiError extends Error {
  constructor(message, fieldErrors = null) {
    super(message);
    this.name = 'ApiError';
    this.fieldErrors = fieldErrors;
  }
}

/** Sends the enquiry to the serverless function. Resolves only if the server confirms delivery. */
export async function postEnquiry(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (error) {
    throw new ApiError(
      error.name === 'AbortError'
        ? 'The request took too long. Please try again.'
        : 'We could not reach the server. Check your connection and try again.'
    );
  } finally {
    clearTimeout(timer);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    throw new ApiError(
      data?.message ||
        'Your enquiry could not be sent. Please try again, or email us directly using the address on this page.',
      data?.fieldErrors || null
    );
  }
  return data;
}
