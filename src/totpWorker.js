// Simple TOTP logic for the worker
const BITS_IN_BYTE = 8;
const STEP_SECONDS = 30;

function base32ToBuffer(base32) {
    const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let buffer = [];
    let bits = 0, value = 0;
    base32 = base32.replace(/=+$/, '').toUpperCase();
    for (let i = 0; i < base32.length; i++) {
        const idx = map.indexOf(base32.charAt(i));
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        while (bits >= BITS_IN_BYTE) {
            bits -= BITS_IN_BYTE;
            buffer.push((value >> bits) & 0xFF);
        }
    }
    return new Uint8Array(buffer).buffer;
}

async function generateTOTP(secret) {
    try {
        const keyBuf = base32ToBuffer(secret);
        const epoch = Math.floor(Date.now() / 1000);
        const timeStep = Math.floor(epoch / STEP_SECONDS);
        const counterBuf = new ArrayBuffer(8);
        const view = new DataView(counterBuf);
        view.setUint32(4, timeStep, false);

        const cryptoKey = await self.crypto.subtle.importKey('raw', keyBuf, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
        const hmac = await self.crypto.subtle.sign('HMAC', cryptoKey, counterBuf);
        const hmacView = new DataView(hmac);
        const offset = hmacView.getUint8(hmac.byteLength - 1) & 0x0F;
        const code = (hmacView.getUint32(offset, false) & 0x7FFFFFFF) % 1000000;
        return code.toString().padStart(6, '0');
    } catch (e) { return "------"; }
}

function decodeKey(hex) {
    if (hex.length % 2 !== 0) return hex;
    let s = '';
    for (let i = 0; i < hex.length; i += 2) s += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return s;
}

self.onmessage = async (e) => {
    const { keys } = e.data;
    const codes = {};

    for (const id in keys) {
        const secret = id === 'key3' ? keys[id] : decodeKey(keys[id]);
        codes[id] = await generateTOTP(secret);
    }

    self.postMessage({ codes });
};
