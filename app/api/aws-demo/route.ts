import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getAwsRegion, getS3Client } from '@/lib/aws/s3-client'

export async function GET() {
  const region = getAwsRegion()
  const bucket = process.env.AWS_DEMO_S3_BUCKET?.trim()

  if (!bucket) {
    return Response.json({
      ok: true,
      mode: 'stub' as const,
      message:
        'AWS_DEMO_S3_BUCKET no está configurado. El servidor responde; configurá bucket + IAM para listar objetos.',
      region,
    })
  }

  const prefix = process.env.AWS_DEMO_S3_PREFIX?.trim() ?? ''

  try {
    const result = await getS3Client().send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix || undefined,
        MaxKeys: 10,
      }),
    )

    return Response.json({
      ok: true,
      mode: 's3' as const,
      region,
      bucket,
      prefix,
      keyCount: result.KeyCount ?? 0,
      keys: (result.Contents ?? [])
        .map((item) => item.Key)
        .filter((key): key is string => Boolean(key)),
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error desconocido al llamar S3'

    return Response.json(
      {
        ok: false,
        mode: 's3' as const,
        region,
        bucket,
        prefix,
        error: message,
      },
      { status: 502 },
    )
  }
}
