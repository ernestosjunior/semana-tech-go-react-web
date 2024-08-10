import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useMessagesWebsockets } from "../hooks/use-messages-websocket";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebsockets({ roomId });

  const sortedMessages = data.messages.sort(
    (a, b) => b.amountOfReactions - a.amountOfReactions
  );

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((args) => (
        <Message key={args.id} {...args} />
      ))}
    </ol>
  );
}
