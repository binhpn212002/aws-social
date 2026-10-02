/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "social-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("SocialBucket", {
      access: "public",
      cors: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
        allowHeaders: ["*"],
      },
      policy: [
        {
          actions: ["s3:*"],
          principals: "*",
        },
      ],
      transform: {
        bucket: {
          bucket: "social-bucket-366518187546",
        },
      },
    });

    return {
      bucketName: bucket.name,
      bucketArn: bucket.arn,
    };
  },
});
