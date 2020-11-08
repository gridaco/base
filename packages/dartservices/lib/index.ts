import Axios, { AxiosInstance } from "axios"
import { CompileDDCResponse, CompileRequest, CompileResponse, } from "./types"
import { decorateJavascript } from "./utils/deocrate-js"

const DEFAULT_BASE_URL = "https://dart-services.appspot.com/"
const BASE_URLS = [
    "https://dart-services.appspot.com/"
]
const API_PATH = "api/dartservices/v2"


export class DartServices {
    readonly axios: AxiosInstance;
    constructor(private baseUrl: string) {
        this.axios = Axios.create({
            baseURL: baseUrl + API_PATH
        })
    }

    /**
     * use this for flutter code compile
     * @param source 
     */
    async compileDDC(source: string): Promise<CompileDDCResponse> {
        try {
            const res = await this.axios.post("/compileDDC", <CompileRequest>{
                source: source,
            })
            return res.data
        } catch (e) {
            return {
                error: e.response.data.error,
                sucess: false
            }
        }
    }

    /**
     * use this for pure dart code compile. code with flutter dependency will refuse to compile.
     * @param source 
     */
    async compile(source: string): Promise<CompileResponse> {
        const res = await this.axios.post<CompileResponse>("/compile", <CompileRequest>{
            source: source,
        })
        return res.data
    }

    /**
     * compiles and build decorated js
     * @param source 
     */
    async compileComplete(source: string): Promise<CompileResponse> {
        const compiled = await this.compileDDC(source)
        if (compiled.error) {
            return {
                error: compiled.error,
                sucess: false
            }
        } else {
            const complete = decorateJavascript(compiled?.result, { modulesBaseUrl: compiled.modulesBaseUrl });
            return {
                result: complete,
                sourceMap: null,
                error: null,
                sucess: true
            };
        }
    }
}

export const defaultClient = new DartServices(DEFAULT_BASE_URL);

export async function compileComplete(source: string): Promise<CompileResponse> {
    return await defaultClient.compileComplete(source);
}