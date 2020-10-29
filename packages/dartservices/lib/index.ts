import axios from "axios"
import { CompileDDCResponse, CompileRequest, CompileResponse, } from "./types"
import { decorateJavascript } from "./utils/deocrate-js"

const DEFAULT_BASE_URL = "https://dart-services.appspot.com/"
const BASE_URLS = [
    "https://dart-services.appspot.com/"
]
const API_PATH = "api/dartservices/v2"

axios.defaults.baseURL = DEFAULT_BASE_URL + API_PATH;

/**
 * use this for flutter code compile
 * @param source 
 */
export async function compileDDC(source: string): Promise<CompileDDCResponse> {
    const axios = require('axios');
    axios.defaults.baseURL = DEFAULT_BASE_URL + API_PATH;
    const res = await axios.post("/compileDDC", <CompileRequest>{
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

/**
 * compiles and build decorated js
 * @param source 
 */
export async function compileComplete(source: string): Promise<CompileResponse> {
    const compiled = await compileDDC(source)
    const complete = decorateJavascript(compiled.result, { modulesBaseUrl: compiled.modulesBaseUrl });
    return {
        result: complete,
        sourceMap: null,
        error: null
    };
}

