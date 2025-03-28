import logoImg from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../services/api";

export default function Signup() {
  async function handleRegister(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (name === "" || email === "" || password === "") {
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  }
  return (
    <main className="container mx-auto flex items-center justify-center flex-col min-h-screen">
      <div className="mb-5">
        <Image src={logoImg} alt="logo" />
      </div>
      <h1 className="text-2xl mb-4 font-bold">Criar Conta</h1>
      <section className="flex flex-col items-center">
        <form
          className="flex flex-col gap-4 sm:w-150 w-70"
          action={handleRegister}
        >
          <input
            className="bg-dark-900 px-2 py-1.5 border-1 border-gray-10 rounded-md"
            type="text"
            placeholder="Nome"
            required
            name="name"
          />
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
            Cadastrar
          </button>
        </form>

        <p className="mt-4">
          Ja possui uma conta?{" "}
          <Link href="/" className="text-red-10 font-bold">
            Login{" "}
          </Link>
        </p>
      </section>
    </main>
  );
}
