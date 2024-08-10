interface RemoveMessageReactionRequest {
  messageId: string;
  roomId: string;
}

export async function removeMessageReaction({
  messageId,
  roomId,
}: RemoveMessageReactionRequest) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/react`,
    {
      method: "DELETE",
    }
  );

  const data: { count: number } = await response.json();

  return { amountOfReaction: data.count };
}
