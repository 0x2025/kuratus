import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const BUCKET = process.env.BUCKET;
const client = new S3Client([{
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}]);

export async function GetItem(key: string) {
    try {
        const fileRes = await client.send(new GetObjectCommand({
            Key: key,
            Bucket: BUCKET
        }))

        if (fileRes.$metadata.httpStatusCode == 404) {
            return null;
        }

        const asString = await fileRes.Body?.transformToString();

        return JSON.parse(asString ?? '');
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function PutItem(key: string, object: any) {
    await client.send(new PutObjectCommand({
        Key: key,
        Bucket: BUCKET,
        Body: Buffer.from(JSON.stringify(object)),
        ContentType: 'application/json'
    }))
}
