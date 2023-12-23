'use client'

import { useState } from "react";
import { AiFillApple, AiFillGoogleCircle } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { MdOutlineFacebook } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

// Components
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";

// Contexts
import { useApp } from '@/app/context/App/context';

// Utils
import { storeData } from '@/app/utils/storage'

// Services
import { api } from '@/app/services/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setVisible} = useApp()

  async function handleSignIn() {
    try {
      const res = await api.post("login", {
        email,
        password
      });

      storeData({ item: '@user', value: res.data.data })

      if (res.data.data.admin) {
        router.push('dashboard')
      } else {
        setVisible('')
      }
    } catch (err: any) {
      toast.error(err?.response.data.message)
    }
  }

  return (
    <div className="w-full min-h-full flex-col flex items-center justify-center">
      <div className="max-w-[378px] text-center bg-gray rounded-3xl ">
        <div className="w-full relative justify-end flex p-2">
          <button
            onClick={() => setVisible('')}
            className="rounded-full bg-purple text-gray p-1 md:p-2 flex items-center justify-center focus:outline-none"
          >
            <IoIosClose className="text-3xl" />
          </button>
        </div>

        <div className="p-11">
          <h1 className="text-purple text-2xl mb-14">Login</h1>

          <Input
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="text"
            id="email"
            name="email"
            className="mb-6 rounded-full"
          />

          <Input
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            id="password"
            name="password"
            className="mb-6 rounded-full"
          />

          <div className="mb-12 text-left">
            <a 
              className="text-purple underline text-sm" 
              onClick={() => setVisible('EsqueciSenha')}
            >
              Esqueci minha senha
            </a>
          </div>

          <Button
            type="submit"
            className="mb-6 mx-auto w-52"
            bgColor="purple"
            textColor="gray"
            onClick={() => handleSignIn()}
            size="sm"
          >
            Entrar
          </Button>

          <Button
            type="submit"
            className="mb-6 mx-auto w-52"
            border="purple"
            textColor="purple"
            onClick={() => setVisible('Cadastro')}
            size="sm"
          >
            Cadastro
          </Button>

          <div className="my-6">
            <span className="text-purple text-base">ou</span>
          </div>

          <div className="flex justify-center gap-x-4 mt-7 xl:mt-0">
            <button className="rounded-full border border-purple p-2 flex items-center justify-center focus:outline-none">
              <MdOutlineFacebook className="text-lg text-purple" />
            </button>

            <button className="rounded-full border border-purple p-2 flex items-center justify-center focus:outline-none">
              <AiFillGoogleCircle className="text-lg text-purple" />
            </button>

            <button className="rounded-full border border-purple p-2 flex items-center justify-center focus:outline-none">
              <AiFillApple className="text-lg text-purple" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
