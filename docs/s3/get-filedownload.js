module.exports = {
    post:{
        tags:['File'],
        description: "uploads file to S3 bucket",
        parameters:[{
            in: "path",
            name: "filekey",
            schema: {
              type: "string"
            },
            required: true,
            description: "s3 object key"
          }],
        responses:{
            200: {
                description: "A software bug prediction file",
                schema: {
                  type: "file"
                }
              }
        }
    }
}