interface CreateMessageReactionRequest {
  messageId: string;
  roomId: string;
}

export async function createMessageReaction({
  messageId,
  roomId,
}: CreateMessageReactionRequest) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/react`,
    {
      method: "PATCH",
    }
  );

  const data: { count: number } = await response.json();

  return { amountOfReactions: data.count };
}
