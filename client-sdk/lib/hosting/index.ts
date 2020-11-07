// import Lambda, { InvocationRequest } from 'aws-sdk/clients/lambda';
import { FileHostingRequest, FileHostingResult } from './types';
import FormData from "form-data"
import Axios from "axios"
const axios = Axios.create(
    {
        baseURL: "https://api.bridged.cc/hosting/dev"
    }
)



export async function upload(request: FileHostingRequest) {
    const form = new FormData()
    form.append('file', request.file.toString())
    const res = await axios.post('/resources', form)
    return res.data
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