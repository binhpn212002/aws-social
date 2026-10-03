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

    notificationWs.route("$connect", {
      handler: "infra/lambda-handler/websocket/connect.handler",
      environment: {
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "jwt-secret-key",
      },
    });

    notificationWs.route("$disconnect", {
      handler: "infra/lambda-handler/websocket/disconnect.handler",
      environment: {
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
      },
    });

    notificationWs.route("$default", {
      handler: "infra/lambda-handler/websocket/default.handler",
      environment: {
        WEBSOCKET_ENDPOINT: notificationWs.managementEndpoint,
      },
      permissions: [
        {
          actions: ["execute-api:ManageConnections"],
          resources: ["*"],
        },
      ],
    });

    const notificationDlq = new sst.aws.Queue("NotificationDLQ", {
      transform: {
        queue: {
          queueName: "social-notification-dlq",
        },
      },
    });

    notificationDlq.subscribe({
      handler: "infra/lambda-handler/notification/dlq-consumer.handler",
      environment: {
        API_INTERNAL_URL: process.env.API_INTERNAL_URL || "http://localhost:3000/api/v1",
        INTERNAL_API_SECRET: process.env.INTERNAL_API_SECRET || "internal-secret-token",
      },
    });

    const notificationQueue = new sst.aws.Queue("NotificationQueue", {
      dlq: {
        queue: notificationDlq.arn,
        retry: 3,
      },
      transform: {
        queue: {
          queueName: "social-notification-queue",
          visibilityTimeout: 30,
        },
      },
    });

    notificationQueue.subscribe({
      handler: "infra/lambda-handler/notification/consumer.handler",
      batch: {
        size: 10,
        window: "2 seconds",
        response: "reportBatchItemFailures",
      },
      environment: {
        WEBSOCKET_ENDPOINT: notificationWs.managementEndpoint,
        API_INTERNAL_URL: process.env.API_INTERNAL_URL || "http://localhost:3000/api/v1",
        INTERNAL_API_SECRET: process.env.INTERNAL_API_SECRET || "internal-secret-token",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
      },
      permissions: [
        {
          actions: ["execute-api:ManageConnections"],
          resources: ["*"],
        },
      ],
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
      notificationQueueUrl: notificationQueue.url,
      notificationQueueArn: notificationQueue.arn,
      notificationDlqUrl: notificationDlq.url,
      notificationDlqArn: notificationDlq.arn,
    };
  },
});
