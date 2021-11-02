import { Router } from 'itty-router'
import { AwsClient } from 'aws4fetch'
import { Buffer } from 'buffer'

declare let AWS_ID: string
declare let AWS_SECRET: string
const aws = new AwsClient({ accessKeyId: AWS_ID, secretAccessKey: AWS_SECRET })

declare let S3_REGION: string
declare let S3_BUCKET: string

const endpoint = 'https://s3.' + S3_REGION + '.amazonaws.com/' + S3_BUCKET + '/'

const router = Router()

type JSONBody = {
  body: string
}

type Type = {
  mimeType: string
  suffix: string
}

const signatures: { [key: string]: Type } = {
  R0lGODdh: { mimeType: 'image/gif', suffix: 'gif' },
  R0lGODlh: { mimeType: 'image/gif', suffix: 'gif' },
  iVBORw0KGgo: { mimeType: 'image/png', suffix: 'png' },
  '/9j/': { mimeType: 'image/jpg', suffix: 'jpg' },
}

const detectType = (b64: string) => {
  for (const s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s]
    }
  }
}

const createHash = async (buffer: ArrayBuffer) => {
  const digest = await crypto.subtle.digest(
    {
      name: 'MD5',
    },
    buffer,
  )
  const hashArray = Array.from(new Uint8Array(digest))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

router.post('/upload', async (request: Request) => {
  const json: JSONBody = await request.json()

  const body = Buffer.from(json.body, 'base64')
  const type = detectType(json.body)
  const filename = (await createHash(body)) + '.' + type?.suffix
  const uploadUrl = endpoint + filename

  console.log('Try to upload to S3...')
  const res = await aws.fetch(uploadUrl, {
    body: body,
    method: 'PUT',
    headers: {
      'x-amz-acl': 'public-read',
      'Content-Type': type?.mimeType,
    },
  })

  console.log(res.status + ' : ' + res.statusText)

  return new Response(
    JSON.stringify({
      status: res.status,
      url: uploadUrl,
    }),
    {
      headers: { 'content-type': 'application/json' },
      status: 200,
    },
  )
})

export { router }
