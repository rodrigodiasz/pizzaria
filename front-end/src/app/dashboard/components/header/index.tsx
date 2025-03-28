"use client";

import Link from "next/link";
import Image from "next/image";
import logoImg from "/public/logo.svg";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();
  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    toast.success("Logout feito com sucesso!")
    router.replace("/");
  }
  return (
    <header className="container mx-auto p-5">
      <div className="flex justify-between">
        <Link href={"/dashboard"}>
          <Image
            src={logoImg}
            alt="logo"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <nav className="flex gap-5">
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/product"}>Cardapio</Link>
          <form action={handleLogout}>
            <button>
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
