import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createRoom } from "../http/create-room";

export function CreateRoomForm() {
  const navigate = useNavigate();

  async function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString().trim();

    if (!theme) {
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });

      navigate(`/room/${roomId}`);
    } catch (error) {
      return toast.error("Falha ao criar a sala!");
    }
  }

  return (
    <form
      action={handleCreateRoom}
      className="w-full flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1 max-h-[45px]"
    >
      <input
        type="text"
        name="theme"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        className="flex-1 bg-transparent text-sm mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
        required
      />
      <button
        type="submit"
        className="flex items-center justify-between gap-1.5 bg-orange-400 rounded-lg px-3 py-1.5 text-orange-950 font-medium text-sm hover:bg-orange-500 transition-colors"
      >
        <p>Criar sala</p>
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
