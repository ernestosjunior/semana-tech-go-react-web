import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  amountOfReactions,
  text,
  answered = false,
  id: messageId,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  async function handleReaction() {
    if (!roomId) return;

    try {
      await createMessageReaction({ messageId, roomId });
      setHasReacted(true);
    } catch (error) {
      toast.error("Falha ao reagir a mensagem, tente novamente!");
    }
  }

  async function handleRemoveReaction() {
    if (!roomId) return;

    try {
      await removeMessageReaction({ messageId, roomId });
      setHasReacted(false);
    } catch (error) {
      toast.error("Falha ao remover reação, tente novamente!");
    }
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={handleRemoveReaction}
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          <span>Curtir pergunta ({amountOfReactions})</span>
        </button>
      ) : (
        <button
          onClick={handleReaction}
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          <span>Curtir pergunta ({amountOfReactions})</span>
        </button>
      )}
    </li>
  );
}
