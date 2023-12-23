import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  isOpen?: boolean;
  title?: string;
  disabled?: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
    return (
      <div>
        <div
          className={`
            overflow-x-hidden 
            overflow-y-auto 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            bg-neutral-800/70
            ${isOpen ? 'fixed' : 'hidden'}
          `}
        >
        <div className="flex justify-center items-center min-h-full m-6">
          <div
            className="
              translate
              border-0    
              md:rounded-lg 
              shadow-lg 
              relative 
              w-full
              md:w-4/6
              lg:w-1/3
              bg-white 
              outline-none 
              focus:outline-none
              h-auto" // Adicione a classe max-h-screen para limitar a altura do modal
          >
            <div className="flex items-center p-6 rounded-t justify-center relative border-gray">
              <div className="text-lg font-semibold">{title}</div>
              <button
                className="
                  p-1
                  border-0 
                  hover:opacity-70
                  transition
                  absolute
                  right-9"
                onClick={() => onClose()}
              >
                <IoMdClose size={18} />
              </button>
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
        </div>
        </div>
    );
  }
  