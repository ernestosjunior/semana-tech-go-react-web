import amaLogo from "../assets/ama-logo.svg";
import { CreateRoomForm } from "../components/create-room-form";

export function CreateRoom() {
  return (
    <main className="h-[100dvh] flex justify-center items-center px-4">
      <div className="w-full max-w-[450px] flex flex-col justify-center items-center gap-6">
        <img src={amaLogo} alt="AMA" className="h-10" />
        <p className="text-center leading-relaxed text-zinc-300">
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas
          mais importantes para a comunidade.
        </p>
        <CreateRoomForm />
      </div>
    </main>
  );
}
