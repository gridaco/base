/**
 * originated from dart_services.proto
 * https://github.com/dart-lang/dart-pad/tree/master/protos
 */


interface BaseCompileResponse {
    sucess: boolean
    result?: string
    error?: ErrorMessage
    took?: number
}

interface CompileResponse extends BaseCompileResponse {
    sourceMap?: string
}

interface CompileDDCResponse extends BaseCompileResponse {
    modulesBaseUrl?: string
}

interface CompileRequest {
    // The Dart source.
    source: string
    // Return the Dart to JS source map; optional (defaults to false).
    returnSourceMap?: boolean
}

interface AnalysisResults {
    issues: AnalysisIssue
    // The package imports parsed from the source.
    packageImports: string

    // Make this response compatible with BadRequest
    error: ErrorMessage
}

interface ErrorMessage {
    message: string
}

interface AnalysisIssue {
    kind: string
    line: number
    message: string
    sourceName: string
    hasFixes: boolean
    charStart: number
    charLength: number
}




export {
    CompileRequest,
    CompileDDCResponse,
    CompileResponse
}