import { getConnectedFriends } from "./getUserConnections.js";
import { isUserOnline } from "./redis_presenseStore.js";
import { getSocketId } from "./redis_socketStore.js";

export const broadcastUserPresense = async (io, userId, status) => {
  const friends = await getConnectedFriends(userId);
  for (const friend of friends) {
    const friendId = friend._id.toString();
    const isOnline = await isUserOnline(friendId);
    if (!isOnline) continue;
    const friendSocketId = await getSocketId(friendId);
    if (friendSocketId) {
      io.to(friendSocketId).emit("presence:update", {
        userId,
        status,
      });
    }
  }
};
