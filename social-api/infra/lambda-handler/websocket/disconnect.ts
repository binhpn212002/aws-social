import { APIGatewayProxyEvent } from 'aws-lambda';
import { getRedisClient } from '../utils/redis.util';

export const handler = async (event: APIGatewayProxyEvent) => {
  const connectionId = event.requestContext.connectionId;
  console.log(`[WebSocket Disconnect] ConnectionId: ${connectionId}`);

  try {
    const redis = getRedisClient();
    const userId = await redis.get(`ws:conn:${connectionId}:user`);

    const pipeline = redis.pipeline();
    if (userId) {
      pipeline.srem(`ws:user:${userId}:connections`, connectionId!);
      console.log(
        `[WebSocket Cleanup] Removed connection ${connectionId} for User: ${userId}`,
      );
    }
    pipeline.del(`ws:conn:${connectionId}:user`);
    await pipeline.exec();

    return { statusCode: 200, body: 'Disconnected successfully' };
  } catch (error) {
    console.error(
      `[WebSocket Disconnect Error] ConnectionId: ${connectionId}`,
      error,
    );
    return { statusCode: 200, body: 'Disconnect recorded with errors' };
  }
};
