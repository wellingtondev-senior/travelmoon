'use client'
import { useState, useEffect, Fragment, ChangeEvent, FormEvent } from "react";
import { IoIosClose } from "react-icons/io";
import toast from 'react-hot-toast';

// Pages
import Sucesso from "@/app/(login)/cadastro/sucesso";

// Components
import { Button } from '@/app/components/Button'
import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";

// Contexts
import { useApp } from '@/app/context/App/context';

// Utils
import { formatCPF } from "@/app/utils";

// Services
import { api } from '@/app/services/api'
interface FormData {
  name: string;
  email: string;
  cpf: string;
  password: string;
  passwordConfirm: string;
  login: string;
  state_id: string;
  city_id: string;
  photo: string;
}

export default function Cadastro(): JSX.Element {
    const [step, setStep] = useState<'stepOne' | 'stepTwo' | 'stepThree'>('stepOne');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        cpf: '',
        password: '',
        passwordConfirm: '',
        login: '',
        state_id: '',
        city_id: '',
        photo: ''
    });
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [showMsgSuccess, setShowMsgSuccess] = useState<boolean>(false);
    const {setVisible} = useApp()

    async function handleSignUp(): Promise<void> {
        try {
            await api.post('signup', {
                name: formData.name,
                email: formData.email,
                cpf: formData.cpf.replace(/[^\d]/g, ''),
                password: formData.password,
                password_confirmation: formData.passwordConfirm,
                state_id: formData.state_id,
                city_id: formData.city_id,
                photo_content: `data:image/png;base64,${formData.photo}`,
                login: formData.login
            });

            setShowMsgSuccess(true);
        } catch (error: any) {
            toast.error(error?.response.data.message)
        }
    }

    useEffect(() => {
        async function getStates(): Promise<void> {
            try {
                const res = await api.get('open/states?per_page=27');
                setStates(res.data.data);
            } catch (err: any) {
                throw new Error(err);
            }
        }

        getStates();
    }, []);

    useEffect(() => {
        async function getCitys(): Promise<void> {
            if (formData.state_id.length) {
                try {
                    const res = await api.get(`open/cities-from-state/${formData.state_id}`);
                    setCities(res.data.data);
                } catch (err: any) {
                    throw new Error(err);
                }
            }
        }

        getCitys();
    }, [formData.state_id]);

    function handleFileUpload(file: File | null): void {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64String = reader.result?.toString().split(',')[1]; // Get the base64 part of the result

                if (base64String) {
                    setFormData((prevData) => ({
                        ...prevData,
                        photo: base64String
                    }));
                }
            };

            reader.onerror = () => {
                console.error('Error reading the file.');
            };
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitStepOne = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setStep('stepTwo');
    };

    const handleSubmitStepTwo = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setStep('stepThree');
    };

    const handleSubmitStepThree = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleSignUp();
    };
    
    return (
        <Fragment>
            {!showMsgSuccess ?
                <div className="w-full min-h-full flex-col flex items-center justify-center">
                    <div className="max-w-[378px] text-center bg-gray rounded-3xl overflow-auto ">
                        <div className="w-full relative justify-end flex p-2">
                            <button 
                                onClick={() => setVisible('')} 
                                className="rounded-full bg-purple text-gray p-1 md:p-2 flex items-center justify-center focus:outline-none"
                            >
                                <IoIosClose className="text-3xl" />
                            </button>
                        </div>

                        <div className='p-11'>
                                    
                            <h1 className="text-purple text-2xl mb-14">Preencha seus dados pra se cadastrar</h1>
                        
                            <div className={`${step === 'stepOne' ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                                <div className={`${step === 'stepOne' ? 'block' : 'hidden'} duration-300`}>
                                    <form onSubmit={(e) => handleSubmitStepOne(e)}>
                                        <Input 
                                            placeholder="Nome completo" 
                                            required
                                            type="text"
                                            minLength={12}
                                            className="mb-6 rounded-full"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            placeholder="E-mail" 
                                            required
                                            type="email"
                                            className="mb-6 rounded-full"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            placeholder="CPF" 
                                            required
                                            type="text"
                                            maxLength={14}
                                            minLength={14}
                                            className="mb-6 rounded-full"
                                            id="cpf"
                                            name="cpf"
                                            value={formatCPF(formData.cpf)}
                                            onChange={handleChange}
                                        />

                                        <Button
                                            type="submit"
                                            className="mx-auto"
                                            bgColor="purple"
                                            textColor="gray"
                                            size="sm"
                                        >
                                            Pŕoximo
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            <div className={`${step === 'stepTwo' ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                                <div className={`${step === 'stepTwo' ? 'block' : 'hidden'} duration-300`}>
                                    <form onSubmit={(e) => handleSubmitStepTwo(e)}>
                                        <Select 
                                            id="state_id"
                                            name="state_id"
                                            value={formData.state_id}
                                            onChange={(e) => {handleChange(e), setCities([]) }}
                                            options={states}
                                            className="mb-6 w-full"
                                            required
                                            placeholder="Estado"
                                        >
                                        </Select>
                                    
                                        <Select 
                                            id="city_id"
                                            name="city_id"
                                            value={formData.city_id}
                                            onChange={handleChange}
                                            options={cities}
                                            className="mb-6"
                                            required
                                            placeholder="Cidade"
                                            disabled={!formData.state_id}
                                        >
                                            <option value="">Cidade</option>
                                        </Select>

                                        <div className="mb-6">
                                            <div className="relative overflow-hidden w-full">
                                                <Button type="button" textColor="purple" border="purple" className="w-full px-5 justify-start">
                                                   {formData.photo ? '1 arquivo selecionado' : 'Envie sua foto'}
                                                </Button>
                                                
                                                <Input 
                                                    type="file" 
                                                    className="absolute w-full h-full opacity-0 cursor-pointer left-0 top-0" 
                                                    onChange={(e: any) => handleFileUpload(e.target.files[0])}
                                                    id="photo"
                                                    name="photo"
                                                />
                                            </div>
                                        </div>

                                        <div className="underline text-purple cursor-pointer mb-6">
                                            <span onClick={() => setStep("stepOne")} className="text-base">voltar</span>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mx-auto"
                                            bgColor="purple"
                                            textColor="gray"
                                            size="sm"
                                        >
                                            Pŕoximo
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            <div className={`${step === 'stepThree' ? 'relative right-0' : 'relative right-full'} duration-1000`}>
                                <div className={`${step === 'stepThree' ? 'block' : 'hidden'} duration-300`}>
                                    <form onSubmit={(e) => handleSubmitStepThree(e)}>
                                        <Input
                                            placeholder="Usuário" 
                                            type="text"
                                            required
                                            className="mb-6 rounded-full"
                                            id="login"
                                            name="login"
                                            value={formData.login}
                                            onChange={handleChange}
                                        />

                                        <Input 
                                            placeholder="Senha" 
                                            type="password"
                                            required
                                            className="mb-6 rounded-full"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />

                                        <Input 
                                            placeholder="Repetir a senha" 
                                            type="password"
                                            required
                                            className="mb-6 rounded-full"
                                            id="passwordConfirm"
                                            name="passwordConfirm"
                                            value={formData.passwordConfirm}
                                            onChange={handleChange}
                                        />

                                        <div className="underline text-purple cursor-pointer mb-6 text-base">
                                            <span onClick={() => setStep("stepTwo")}>voltar</span>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mx-auto"
                                            bgColor="purple"
                                            textColor="gray"
                                            size="sm"
                                        >
                                            Confirmar
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Sucesso onClose={() => setVisible('')} />
            }
        </Fragment>
    )
} 
