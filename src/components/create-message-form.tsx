import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessage } from "../http/create-message";

export function CreateMessageForm() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  async function handleCreateMessage(data: FormData) {
    const message = data.get("message")?.toString().trim();

    if (!message || !roomId) {
      return;
    }

    try {
      await createMessage({ roomId, message });
    } catch (error) {
      return toast.error("Falha ao criar a pergunta!");
    }
  }

  return (
    <form
      action={handleCreateMessage}
      className="w-full flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1 max-h-[45px]"
    >
      <input
        type="text"
        name="message"
        placeholder="Nome da Sala"
        autoComplete="off"
        className="flex-1 bg-transparent text-sm mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
        required
      />
      <button
        type="submit"
        className="flex items-center justify-between gap-1.5 bg-orange-400 rounded-lg px-3 py-1.5 text-orange-950 font-medium text-sm hover:bg-orange-500 transition-colors"
      >
        <p>Criar pergunta</p>
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
