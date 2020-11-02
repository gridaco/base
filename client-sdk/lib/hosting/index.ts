import Lambda, { InvocationRequest } from 'aws-sdk/clients/lambda';
import { FileHostingRequest, FileHostingResult } from './types';


const lambda = new Lambda()

const SERVICE_NAME_RESOURCE_HOSTING = "resource-hosting"

export async function upload(request: FileHostingRequest): Promise<FileHostingResult> {
    const params: InvocationRequest = {
        FunctionName: SERVICE_NAME_RESOURCE_HOSTING,
        InvocationType: "RequestResponse",
        Payload: request
    };

    const result = await (await lambda.invoke(params).promise()).$response.data
    return result as FileHostingResult
}