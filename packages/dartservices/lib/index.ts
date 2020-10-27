import Axios from "axios"
import { CompileDDCResponse, CompileRequest, CompileResponse, } from "./types"

const DEFAULT_BASE_URL = "https://dart-services.appspot.com/"
const BASE_URLS = [
    "https://dart-services.appspot.com/"
]

const API_PATH = "api/dartservices/v2"

const axios = Axios.create({
    baseURL: DEFAULT_BASE_URL + API_PATH
})

/**
 * use this for flutter code compile
 * @param source 
 */
export async function compileDDC(source: string): Promise<CompileDDCResponse> {
    const res = await axios.post<CompileDDCResponse>("/compileDDC", <CompileRequest>{
        source: source,
    })
    return res.data
}

/**
 * use this for pure dart code compile. code with flutter dependency will refuse to compile.
 * @param source 
 */
export async function compile(source: string): Promise<CompileResponse> {
    const res = await axios.post<CompileResponse>("/compile", <CompileRequest>{
        source: source,
    })
    return res.data
}
