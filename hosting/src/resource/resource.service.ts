import { Injectable } from '@nestjs/common';
import S3 from "aws-sdk/clients/s3"
import { FileHostingResult } from "@bridged.xyz/client-sdk/lib/hosting/types"
import { nanoid } from 'nanoid';
const s3 = new S3({
    region: "us-west-1"
})

const FILE_HOSTING_BUKET = 'resource-hosting';
const SITE_HOSTING_BUKET = 'site-hosting';


@Injectable()
export class ResourceService {
    async upload(file: Buffer, name: string): Promise<FileHostingResult> {
        // File name you want to save as in S3
        const key = `${nanoid(8)}-${name}`
        // Setting up S3 upload parameters
        const params: S3.Types.PutObjectRequest = {
            Bucket: FILE_HOSTING_BUKET,
            Key: key,
            ACL: 'public-read',
            Body: file // Buffer.from(file)
        };

        // Uploading files to the bucket
        await s3.upload(params).promise()
        var url = s3.getSignedUrl('getObject', {
            Bucket: FILE_HOSTING_BUKET,
            Key: key,
        });

        return <FileHostingResult>{
            url: url,
            key: key
        }
    }
}
