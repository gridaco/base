
export enum ExpireDuration {
    forever,
    day,
    week,
}

export interface FileHostingRequest {
    file: Blob | string | Buffer
    name: string
    private?: boolean
    expires?: ExpireDuration
}

export interface FileHostingResult {
    url: string
    key: string
    private: boolean
}