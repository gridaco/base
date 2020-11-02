import { Injectable } from '@nestjs/common';
import S3 from "aws-sdk/clients/s3"
import { FileHostingResult } from "@bridged.xyz/client-sdk/lib/hosting/types"
const s3 = new S3({
    region: "us-west-1"
})

const FILE_HOSTING_BUKET = 'resource-hosting';
const SITE_HOSTING_BUKET = 'site-hosting';


@Injectable()
export class ResourceService {
    async upload(file): Promise<FileHostingResult> {
        // Setting up S3 upload parameters
        const params = {
            Bucket: FILE_HOSTING_BUKET,
            Key: 'cat.jpg', // File name you want to save as in S3
            Body: file
        };

        // Uploading files to the bucket
        const uploaded = await s3.upload(params).promise()

        var url = s3.getSignedUrl('getObject', params);
        return <FileHostingResult>{
            url: url
        }
    }
}
