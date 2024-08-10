import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetRoomMessagesResponse } from "../http/get-room-messages";

interface UseMessagesWebsockets {
  roomId: string;
}

type WebhookMessage =
  | { kind: "message_created"; value: { id: string; message: string } }
  | { kind: "message_answered"; value: { id: string } }
  | {
      kind: "message_reacted" | "message_remove_reacted";
      value: { id: string; count: number };
    };

export function useMessagesWebsockets({ roomId }: UseMessagesWebsockets) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onmessage = (event) => {
      const message: WebhookMessage = JSON.parse(event.data);
      console.log(message);
      switch (message.kind) {
        case "message_created":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              return {
                messages: [
                  ...(state?.messages ?? []),
                  {
                    id: message.value.id,
                    text: message.value.message,
                    amountOfReactions: 0,
                    answered: false,
                  },
                ],
              };
            }
          );
          break;
        case "message_answered":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }
              return {
                messages: state.messages.map((m) => {
                  if (m.id === message.value.id) {
                    return { ...m, answered: true };
                  }
                  return m;
                }),
              };
            }
          );
          break;
        case "message_reacted":
        case "message_remove_reacted":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }
              return {
                messages: state.messages.map((m) => {
                  if (m.id === message.value.id) {
                    return { ...m, amountOfReactions: message.value.count };
                  }
                  return m;
                }),
              };
            }
          );
          break;
        default:
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId]);
}
