'use client'

import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";

// Components
import { Table } from '@/app/components/Table'
import { Modal } from '@/app/components/Modal'
import { Input } from "@/app/components/Input"
import { TextArea } from "@/app/components/TextArea";

// Hooks
import { useFetchClient } from '@/app/hooks/useFetchClient'

// Utils
import { DateFormat } from '@/app/utils'

export default function Inbox() {
    const [showModal, setShowModal] = useState<'Visualizar' | 'Editar' | 'Deletar' | 'Cadastrar' | ''>('')
    const [formData, setFormData] = useState({
        email: '',
        titulo: '',
        mensagem: '',
    })

    const { data } = useFetchClient('admin/inbox')

    const dataTable = data?.data.map((item : any) => ({
        email: item.email,
        titulo: item.title,
        mensagem: item.message,
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy'),
        'ações': (
            <HiOutlineEye
                className="text-2xl text-blue-400"
                onClick={() => {
                    setFormData({
                        email: item.email,
                        titulo: item.title,
                        mensagem: item.message,
                    })
                    setShowModal('Visualizar')
                }}
            />    
        )
    }))

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300'>Inbox</h1>

           {dataTable && <Table data={dataTable} />}

           {/* visualizar tag */}
           <Modal
                isOpen={showModal === 'Visualizar'}
                onClose={() => setShowModal('')}
                title='Visualizar Inbox'
            >
                <Input
                    type="text"
                    name="email"
                    id="email"
                    border="gray"
                    color="black"
                    defaultValue={formData?.email}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Email"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="titulo"
                    id="titulo"
                    border="gray"
                    color="black"
                    defaultValue={formData?.titulo}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Titulo"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <TextArea
                    rows={5}
                    type="text"
                    name="mensagem"
                    id="mensagem"
                    border="gray"
                    color="black"
                    defaultValue={formData?.mensagem}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Mensagem"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />
            </Modal>
        </div>
    )
}
