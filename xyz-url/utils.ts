
import { URL } from "url"
export function checkIfValidUrl(s): boolean {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
}


import { nanoid } from 'nanoid'
// calculate it here. https://zelark.github.io/nano-id-cc/
const RAND_RANGE = 16

export function generateHash() {
    return nanoid(RAND_RANGE)
}

export function buildShortUrl(id: string, host: string) {
    return `https://${host}/${id}`
}