"use client"
import { useRef, FormEvent, useState } from "react";
import { MdWhatsapp , MdOutlineMailOutline } from "react-icons/md";
import toast from 'react-hot-toast';

// Components
import { Button } from "@/app/components/Button";

// Services
import { api } from "@/app/services/api";

type InputRefs = {
    message: HTMLTextAreaElement | null;
    email: HTMLInputElement | null;
    title: HTMLInputElement | null;
};

export default function FaleConosco() {
    const inputRef = useRef<InputRefs>({message: null, email: null, title: null})
    const [message, setMessage] = useState('')

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            await api.post('open/inbox', {
                message: inputRef.current.message?.value,
                title: inputRef.current.title?.value,
                email: inputRef.current.email?.value,
            })

            setMessage('')
            
            if (inputRef.current.message) (inputRef.current.message as HTMLTextAreaElement).value = '';
            if (inputRef.current.title) (inputRef.current.title as HTMLInputElement).value = '';
            if (inputRef.current.email) (inputRef.current.email as HTMLInputElement).value = '';

            toast.success('Mensagem enviada com sucesso !')

        } catch (err) {
            toast.error('Error ao enviar sua Mensagem, tente novamente mais tarde !')
        }
    };

    return (
        <div className="container mx-auto">
            <div className="py-20 px-8 lg:py-20 lg:px-8">
                <h1 className="mb-14 text-5xl md:mb-56 lg:text-9xl lg:mb-72 text-purple">Fale <br/> Conosco</h1>
                
                <hr className="divide-y border-purple"/>

                <div className="mt-6">
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="col-auto"></div>

                        <div className="grid-col-1 mb-16">
                            <p className="text-sm md:text-xl mb-4 text-purple"> 
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our
                                favourite cliffside retreats, Six Senses Uluwatu. A place that exceeds perfection, 
                                the next two days are to de-stress and unwind post wedding.
                            </p>
                            <p className="text-sm md:text-xl mb-4 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding. 
                            </p>
                            <p className="text-sm md:text-xl mb-16 text-purple">
                                After touching down in Bali, your heavenly Indonesia trip will begin at one of our favourite cliffside retreats, 
                                Six Senses Uluwatu. A place that exceeds perfection, the next two days are to de-stress and unwind post wedding.
                            </p>

                            <div className="flex justify-between">
                                <div className="flex flex-col items-center">
                                    <MdWhatsapp color="purple" className="mb-2 text-3xl lg:text-6xl" />
                                    <span className="mb-2 text-purple text-sm lg:text-3xl"> WhatsApp </span>
                                    <span className="text-purple text-xs lg:text-2xl"> 11 - 93873. 4913 </span>
                                </div>
                                <div className="mb-2 flex flex-col items-center">
                                    <MdOutlineMailOutline color="purple" className="mb-2 text-3xl lg:text-6xl" />
                                    <span className="mb-2 text-purple text-sm lg:text-3xl"> Email </span>
                                    <span className="text-purple text-xs lg:text-2xl"> talk@travelmoon.com </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className='bg-purple p-7 md:p-16 rounded-3xl mb-8 md:mb-16'>
                            <div className="flex flex-col">
                                <label className='text-white text-xs md:text-3xl mb-4 md:mb-9'>Nome</label>

                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Digite seu Nome"
                                    ref={value => inputRef.current.title = value} 
                                    className='text-white border-2 appearance-none bg-transparent rounded-full text-xs md:text-lg lg:text-3xl border-white py-4 px-7 mb-4 md:py-10 md:mb-9 md:px:14' 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label className='text-white text-xs md:text-3xl mb-4 md:mb-9'>Email</label>

                                <input 
                                    type="email"
                                    id="email"
                                    placeholder="Digite seu email"
                                    name="email"
                                    ref={value => inputRef.current.email = value}   
                                    className='text-white border-2 bg-transparent rounded-full text-xs lg:text-3xl border-white px-7 py-4 md:py-10 md:px:14' 
                                />
                            </div>
                        </div>

                        <div className='bg-purple p-7 md:p-16 rounded-3xl'>
                            <textarea 
                                maxLength={225}
                                onChange={e => setMessage(e.target.value)}
                                ref={value => inputRef.current.message = value}
                                id="message"
                                name="message"
                                placeholder="Digite sua mensagem aqui...."
                                rows={8} 
                                className='placeholder-white w-full text-white border-2 bg-transparent rounded-3xl text-xs lg:text-3xl border-white py-4 px-7 md:py-10 md:px:14' 
                            />
                            <span className="text-white relative top-5">{message.length} de 225 caracteres</span>
                        </div>

                        <Button type="submit" bgColor="purple" textColor="white" size="lg" className="mt-14 md:mt-20">
                            Enviar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}