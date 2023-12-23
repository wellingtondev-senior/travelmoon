import { IoIosClose } from "react-icons/io";

interface SucessoProps {
    onClose: () => void;
}

export default function Sucesso({onClose}: SucessoProps) {
    return (
        <div className="w-full min-h-full flex-col flex items-center justify-center">
            <div className="max-w-[378px] text-center bg-gray rounded-3xl overflow-auto ">
                <div className="w-full relative justify-end flex p-2">
                    <button 
                        onClick={() => onClose()}
                        className="rounded-full bg-purple text-gray p-1 md:p-2 flex items-center justify-center focus:outline-none"
                    >
                        <IoIosClose className="text-3xl" />
                    </button>
                </div>

                <div className="p-11">
                    <h1 className="text-purple text-2xl mb-14">Cadastro concluido com sucesso.</h1>

                    <button 
                        onClick={() => onClose()}
                        className="bg-purple text-gray py-5 w-52 my-6 rounded-full"
                    >
                        Voltar ao inicio
                    </button>
                </div>
            </div>
        </div>
    )
} 
