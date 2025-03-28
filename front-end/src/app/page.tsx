import logoImg from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "../services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) {
        return;
      }
      const cookieStore = await cookies();
      const expressTime = 60 * 60 * 24 * 30 * 1000;
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
      });
    } catch (err) {
      console.log(err);
      return;
    }

    redirect("/dashboard");
  }
  return (
    <>
      <main className="container mx-auto flex items-center justify-center flex-col min-h-screen p-2">
        <div className="mb-5">
          <Image src={logoImg} alt="logo" />
        </div>

        <section className="flex flex-col items-center">
          <form
            className="flex flex-col gap-4 sm:w-150 w-70"
            action={handleLogin}
          >
            <input
              className="bg-dark-900 px-2 py-1.5 border-1 border-gray-10 rounded-md"
              type="email"
              placeholder="E-mail"
              required
              name="email"
            />
            <input
              className="bg-dark-900 px-2 py-1.5 border-1 border-gray-10 rounded-md"
              type="password"
              placeholder="Senha"
              required
              name="password"
            />
            <button className="py-1.5 bg-red-10 rounded-md" type="submit">
              Acessar
            </button>
          </form>

          <p className="mt-4">
            Não possui uma conta?{" "}
            <Link href="/signup" className="text-red-10 font-bold">
              Cadastre-se{" "}
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
