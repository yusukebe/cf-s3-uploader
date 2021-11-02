# cf-s3-uploader

Cloudflare Worker for uploading images to Amazon S3.

## Set up

First, git clone:

```bash
$ https://github.com/yusukebe/cf-s3-uploader.git
$ cd cf-s3-uploader
```

Copy `wrangler.exmple.toml` to `wrangler.tmol`:

```bash
$ cp wrangler.example.toml wrangler.toml
```

## Variables

### Environment variables

Enviroment variables are:

- `S3_BUCKET` - Your S3 bucket name
- `S3_REGION` - S3 region name

To set these, `wrangler.toml`

```toml
[vars]
S3_BUCKET = "your_bucket_name"
S3_REGION = "s3_region_name"
```

### Secret variables

Secret variables are:

- `NAME` - User name of basic auth
- `PASS` - User password of basic auth
- `AWS_ID` - AWS access key ID
- `AWS_SECRET` - AWS secret access key

To set these, use `wrangler secret put` command:

```bash
$ wrangler secret put NAME
```

## Publish

To publish to your Cloudflare Workers:

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
