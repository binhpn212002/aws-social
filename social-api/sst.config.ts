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

    const chatTable = new sst.aws.Dynamo("SocialChatTable", {
      fields: {
        PK: "string",
        SK: "string",
      },
      primaryIndex: { hashKey: "PK", rangeKey: "SK" },
      ttl: "ttl",
      transform: {
        table: {
          name: "social-chat-table",
        },
      },
    });

    const auditLogTable = new sst.aws.Dynamo("AuditLogTable", {
      fields: {
        PK: "string",
        SK: "string",
      },
      primaryIndex: { hashKey: "PK", rangeKey: "SK" },
      ttl: "ttl",
      transform: {
        table: {
          name: "social-audit-logs",
        },
      },
    });

    const notificationWs = new sst.aws.ApiGatewayWebSocket("NotificationWebSocket", {
      transform: {
        api: {
          name: "social-notification-ws",
        },
      },
    });

    return {
      bucketName: bucket.name,
      bucketArn: bucket.arn,
      chatTableName: chatTable.name,
      chatTableArn: chatTable.arn,
      auditLogTableName: auditLogTable.name,
      auditLogTableArn: auditLogTable.arn,
      websocketUrl: notificationWs.url,
      websocketManagementEndpoint: notificationWs.managementEndpoint,
    };
  },
});
