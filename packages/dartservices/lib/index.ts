import Axios from "axios"
import { CompileRequest, CompileResult } from "./types"

const DEFAULT_BASE_URL = "https://dart-services.appspot.com/"
const BASE_URLS = [
    "https://dart-services.appspot.com/"
]

const API_PATH = "api/dartservices/v2"

const axios = Axios.create({
    baseURL: DEFAULT_BASE_URL + API_PATH
})

export async function compileDDC(source: string): Promise<CompileResult> {
    const res = await axios.post<CompileResult>("/compileDDC", <CompileRequest>{
        source: source,
    })
    return res.data
}
