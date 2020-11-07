// import Lambda, { InvocationRequest } from 'aws-sdk/clients/lambda';
import { FileHostingRequest, FileHostingResult } from './types';
import FormData from "form-data"
import Axios from "axios"
const axios = Axios.create(
    {
        baseURL: "https://hosting.bridged.cc/"
        // baseURL: "http://localhost:3000/dev"
    }
)



export async function upload(request: FileHostingRequest) {
    try {

        const form = new FormData()
        form.append('file', JSON.stringify(request.file), { filename: request.name })
        const header = form.getHeaders ? {
            'content-type': form.getHeaders()['content-type'],
            'content-length': form.getLengthSync()
        } : undefined
        const res = await axios.post('/resources', form, {
            headers: header
        })
        return res.data as FileHostingResult
    } catch (e) {
        throw e.response ?? e
    }
}

// const lambda = new Lambda({
//     region: "us-west-1"
// })
// const SERVICE_NAME_RESOURCE_HOSTING = "resource-hosting-dev-main"
// export async function uploadLambda(request: FileHostingRequest): Promise<FileHostingResult> {
//     const params: InvocationRequest = {
//         FunctionName: SERVICE_NAME_RESOURCE_HOSTING,
//         InvocationType: "RequestResponse",
//         Payload: JSON.stringify(request),
//     };

//     const result = await (await lambda.invoke(params).promise()).$response.data
//     return result as FileHostingResult
// }