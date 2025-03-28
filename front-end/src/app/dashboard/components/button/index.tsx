"use client";
import { useFormStatus } from "react-dom";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="h-10 font-bold bg-green-10 rounded-md border-0"
    >
      {pending ? "Carregando..." : name}
    </button>
  );
}
