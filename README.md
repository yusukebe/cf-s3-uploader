# cf-s3-uploader

Cloudflare Worker for uploading images to Amazon S3.

## Variables

Set secret variables:

- `NAME` - User name of basic auth
- `PASS` - User password of basic auth
- `AWS_ID` - AWS access key ID
- `AWS_SECRET` - AWS secret access key

```bash
$ wrangler secret put NAME
```

## Installation

To install on your Cloudflare Workers:

```bash
$ wrangler publish
```

## Endpoints

### `/upload`

Header:

To pass the Basic Auth, add the Base64 string of "user:pass" to `Authorization` header.

```
Authorization: Basic ...
```

Body:

Value of `body` is Basic64 string of image binary.

```json
{
  "body": "Base64 Text..."
}
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## LICENSE

MIT
