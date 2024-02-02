// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
const client = new S3Client({

});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const file = await client.send(new GetObjectCommand({
      Key: 'item.json',
      Bucket: process.env.BUCKET
    }))
    res.status(200).json(await file.Body.transformToString());
    return;
  }
  res.status(200).json(process.env);
}
