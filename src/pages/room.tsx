import { Suspense } from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import amaLogo from "../assets/ama-logo.svg";
import { Messages } from "../components/messages";
import { CreateMessageForm } from "../components/create-message-form";
import { useParams } from "react-router-dom";

export function Room() {
  const { roomId } = useParams();
  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Link copiado para a área de transferência");
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="w-full flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />
        <span className="text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>
        <button
          onClick={handleShareRoom}
          type="submit"
          className="flex ml-auto items-center justify-between gap-1.5 bg-zinc-800 rounded-lg px-3 py-1.5 text-zinc-300 font-medium text-sm hover:bg-zinc-700 transition-colors"
        >
          <p>Compartilhar</p>
          <Share2 className="size-4" />
        </button>
      </div>
      <div className="w-full h-px bg-zinc-900" />
      <CreateMessageForm />
      <Suspense fallback={<p>Carregando...</p>}>
        <Messages />
      </Suspense>
    </div>
  );
}
