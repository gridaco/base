
export enum ExpireDuration {
    forever,
    day,
    week,
}

export interface FileHostingRequest {
    file: Blob | Uint8Array | string
    name: string
    private: boolean
    expires: ExpireDuration
}

export interface FileHostingResult {
    url: string
    private: boolean
}