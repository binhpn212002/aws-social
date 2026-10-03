import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';

const apiGwClient = new ApiGatewayManagementApiClient({
  endpoint: process.env.WEBSOCKET_ENDPOINT,
});

export const handler = async (event: APIGatewayProxyEvent) => {
  const connectionId = event.requestContext.connectionId;
  let body: any = {};

  try {
    if (event.body) {
      body = JSON.parse(event.body);
    }
  } catch {
    body = { action: 'unknown' };
  }

  // Xử lý Heartbeat ping -> pong
  if (body.action === 'ping') {
    await apiGwClient.send(
      new PostToConnectionCommand({
        ConnectionId: connectionId!,
        Data: Buffer.from(
          JSON.stringify({ action: 'pong', timestamp: Date.now() }),
        ),
      }),
    );
    return { statusCode: 200, body: 'PONG' };
  }

  return { statusCode: 200, body: 'Received' };
};
