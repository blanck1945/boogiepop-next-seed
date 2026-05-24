import { S3Client } from '@aws-sdk/client-s3'

export function getAwsRegion(): string {
  return (
    process.env.AWS_REGION?.trim() ||
    process.env.AWS_DEFAULT_REGION?.trim() ||
    'us-east-1'
  )
}

let cachedClient: S3Client | undefined

export function getS3Client(): S3Client {
  if (!cachedClient) {
    cachedClient = new S3Client({ region: getAwsRegion() })
  }
  return cachedClient
}
