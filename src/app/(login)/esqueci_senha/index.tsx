'use client'
import { useState, ChangeEvent } from "react";
import { IoIosClose } from "react-icons/io";
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

// Components
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

// Contexts
import { useApp } from '@/app/context/App/context';

// Utils
import { formatCPF } from "@/app/utils";

// Services
import { api } from "@/app/services/api";
interface FormData {
    email: string;
    cpf: string;
    password: string;
    password_confirmation: string;
    code: string;
}

interface ApiResponse {
    code: string;
}  

export default function EsqueciSenha(): JSX.Element {    
    const {setVisible} = useApp();
    const [step, setStep] = useState<'stepOne' | 'stepTwo'>('stepOne');
    const [formData, setFormData] = useState<FormData>({
        email: '',
        cpf: '',
        password: '',
        password_confirmation: '',
        code: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function handleForgotPassword(event: any) {
        event.preventDefault();

        try {
            const res: AxiosResponse<ApiResponse>  = await api.post('forgot-password', {
                email: formData.email,
                cpf: formData.cpf.replace(/[^\d]/g, ''),
            })

            toast.success('Um código foi gerado automaticamente')

            setStep('stepTwo')
            setFormData({ ...formData, code: res.data.code })
        } catch (err: any) {
            toast.error(err?.response.data.message)
        }
    }

    async function handleResetPassword(event: any) {
        event.preventDefault();

        try {
            await api.post('reset-password', {
                code: formData.code,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            })

            toast.success('Senha alterado com sucesso.')
            setVisible('Login')
        } catch (err: any) {
            toast.error(err?.response.data.message)
        }
    }

    return (
        <div className="w-full min-h-full flex-col flex items-center justify-center">
            <div className="max-w-[378px] text-center bg-gray rounded-3xl overflow-auto ">
                <div className="w-full relative justify-end flex p-2">
                    <button  onClick={() => setVisible('')} 
                        className="rounded-full bg-purple text-gray p-1 md:p-2 flex items-center justify-center focus:outline-none"
                    >
                        <IoIosClose className="text-3xl" />
                    </button>
                </div>

                <div className="p-11">
                    <h1 className="text-purple text-2xl mb-14">Esqueci minha senha</h1>

                    <div className={`${step === 'stepOne' ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                        <div className={`${step === 'stepOne' ? 'block' : 'hidden'} duration-300`}>
                            <form onSubmit={(e) => handleForgotPassword(e)}>
                                <Input
                                    onChange={handleChange}
                                    value={formData?.email}
                                    placeholder="E-mail"
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="mb-6 rounded-full"
                                />

                                <Input
                                    onChange={handleChange}                        
                                    placeholder="CPF"
                                    id="cpf"
                                    value={formatCPF(formData.cpf)}
                                    name="cpf"
                                    className="mb-6 rounded-full"
                                />

                                <Button
                                    type="submit"
                                    className="mb-6 mx-auto w-52"
                                    bgColor="purple"
                                    textColor="gray"
                                    onClick={() => {}}
                                    size="sm"
                                >
                                    Enviar
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className={`${step === 'stepTwo' ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                        <div className={`${step === 'stepTwo' ? 'block' : 'hidden'} duration-300`}>
                            <form onSubmit={(e) => handleResetPassword(e)}>
                                <Input
                                    onChange={handleChange}
                                    value={formData?.code}
                                    placeholder="Código"
                                    type="text"
                                    id="code"
                                    name="code"
                                    className="mb-6 rounded-full"
                                />

                                <Input
                                    onChange={handleChange}                        
                                    placeholder="Senha"
                                    id="password"
                                    value={formData.password}
                                    type="password"
                                    name="password"
                                    className="mb-6 rounded-full"
                                />

                                <Input
                                    onChange={handleChange}                        
                                    placeholder="Confirme a sua senha"
                                    id="password_confirmation"
                                    type="password"
                                    value={formData.password_confirmation}
                                    name="password_confirmation"
                                    className="mb-6 rounded-full"
                                />

                                <Button
                                    type="submit"
                                    className="mb-6 mx-auto w-52"
                                    bgColor="purple"
                                    textColor="gray"
                                    onClick={() => {}}
                                    size="sm"
                                >
                                    Resetar senha
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
