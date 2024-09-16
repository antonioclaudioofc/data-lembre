"use client";

import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Header } from "@/components/Header";
import Link from "next/link";
import { REGISTER } from "../constants/routes";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      console.log("Preencha os campos");
      setIsLoading(false);
      return;
    }

    const isOk = await signIn(email, password);
    setIsLoading(false);

    if (isOk === true) {
      router.push("/");
    } else if (typeof isOk === "string") {
      console.log(isOk);
    } else {
      console.log("Erro ao registrar! Tente novamente.");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Icon className="text-pink-500" size="4rem" name="today" fill="1" />
      <Header
        title="Bem vindo(a) de Volta"
        subtitle="Preencha as informações abaixo"
      />
      <form className="mt-10" onSubmit={onSubmit}>
        <fieldset className="grid gap-4 w-72">
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insira seu e-mail"
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label
              className="text-gray-300 font-bold text-sm"
              htmlFor="password"
            >
              Senha
            </label>
            <Input
              type="password"
              icon={
                <Icon
                  className="text-gray-200 cursor-pointer hover:text-gray-300"
                  name="visibility_off"
                  size="1.25rem"
                />
              }
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira sua senha"
            />
          </div>
        </fieldset>
        <span className="text-pink-700 text-sm cursor-pointer block mt-2 mb-5 text-right hover:text-pink-600">
          Esqueceu a senha?
        </span>
        <Button disabled={isLoading} type="submit">
          Entrar
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}

        <p className="text-gray-400 mt-4 text-sm text-center">
          Não possui uma conta?{" "}
          <Link
            href={REGISTER}
            className="text-pink-700 cursor-pointer hover:text-pink-600"
          >
            Cadastre-se agora.
          </Link>
        </p>
      </form>
    </div>
  );
}
