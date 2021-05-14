**SoftwareBugPredictor**

A web application which uses machine learning techniques to predict the bugs in the source code during early stages of development when the GitHub link of the project is given as the input to the website.

The app is available at docker hub [here](https://hub.docker.com/r/softwarebugpredictor/predictorapp/tags?page=1&ordering=last_updated)

### Uploading to S3 bucket

Before uploading to s3 bucket the following environment variable is required
| env variable| description |
|-------------|----------|
| AWS_BUCKET_NAME| aws bucket name |
| AWS_BUCKET_REGION | aws bucket region |
| AWS_ACCESS_KEY | user access key |
| AWS_SECRET_KEY | user secret key |

REST API endpoints to upload file

| HTTP                      | description                                  |
| ------------------------- | -------------------------------------------- |
| POST /s3/upload           | upload file with the name `bugpredictorfile` |
| GET /s3/download/:keyfile | downloads file from s3 bucket                |

A `user has to be authenticated` to save a file in the S3 bucket.
Below is a format of the http headers to upload a file in s3 bucket;

```
POST /s3/upload HTTP/1.1
Content-Length: 223
Content-Type: multipart/form-data;
Content-Disposition: form-data; name="bugpredictorfile";
Content-Type:
```
