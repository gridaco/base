import Lambda, { InvocationRequest } from 'aws-sdk/clients/lambda';


const lambda = new Lambda()


const params: InvocationRequest = {
    FunctionName: "resource-hosting",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({ key: "value" })
};


export async function upload() {
    const res = await lambda.invoke(params).promise()
    return res.$response.data
}