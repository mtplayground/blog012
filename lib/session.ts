export const SESSION_COOKIE_NAME = 'admin_session';

type SessionPayload = {
  exp: number;
};

function decodeBase64Url(value: string): Uint8Array {
  const padded = value.padEnd(Math.ceil(value.length / 4) * 4, '=');
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const output = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    output[index] = binary.charCodeAt(index);
  }

  return output;
}

function decodePayload(encodedPayload: string): SessionPayload | null {
  try {
    const payloadBytes = decodeBase64Url(encodedPayload);
    const payloadJson = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(payloadJson) as SessionPayload;

    if (!Number.isInteger(payload.exp)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function verifySessionToken(token: string, sessionSecret: string): Promise<boolean> {
  const [encodedPayload, encodedSignature] = token.split('.');

  if (!encodedPayload || !encodedSignature) {
    return false;
  }

  const payload = decodePayload(encodedPayload);

  if (!payload || payload.exp <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(sessionSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(encodedSignature),
      new TextEncoder().encode(encodedPayload)
    );

    return isValid;
  } catch {
    return false;
  }
}
