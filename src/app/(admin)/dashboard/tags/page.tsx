'use client'

import { useState, ChangeEvent } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { BsTags } from 'react-icons/bs'
import toast from 'react-hot-toast';

// Components
import { Table } from '@/app/components/Table'
import { Modal } from '@/app/components/Modal'
import { Input } from "@/app/components/Input"
import { Button } from "@/app/components/Button";

// Hooks
import { useFetchClient } from '@/app/hooks/useFetchClient'

// Utils
import { DateFormat } from '@/app/utils'

// Services
import { api } from "@/app/services/api";

type TagProps = {
    nome: '',
    tipo: '',
    alias: '',
    id?: ''
}

export default function Tags() {
    const [showModal, setShowModal] = useState<'Visualizar' | 'Editar' | 'Deletar' | 'Cadastrar' | ''>('')
    const [formData, setFormData] = useState<TagProps >({
        nome: '',
        tipo: '',
        alias: '',
        id: ''
    })

    const { data, mutate } = useFetchClient('admin/tags')

    const dataTable = data?.data.map((item : any) => ({
        nome: item.name,
        tipo: item.type,
        alias: item.alias,
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy'),
        'ações': (
            <div className="flex gap-4">
                <HiOutlineEye
                    className="text-2xl text-blue-400"
                    onClick={() => {
                        setFormData({
                            nome: item.name,
                            tipo: item.type,
                            alias: item.alias,
                            id: item.id
                        })
                        setShowModal('Visualizar')
                    }}
                />
                <HiOutlinePencil
                    className="text-2xl text-yellow-400"
                    onClick={() => {
                        setShowModal('Editar')
                        setFormData({
                            nome: item.name,
                            tipo: item.type,
                            alias: item.alias,
                            id: item.id
                        })
                    }}
                />
                {item.active ?  
                    <BsTags onClick={() => handleInactiveTag(item.id)} className="text-2xl text-red-400" /> 
                    : 
                    <BsTags onClick={() => handleActiveTag(item.id)} className="text-2xl text-gray"/>
                }
            </div>
        )
    }))

    async function handleRegisterTag(event: any) {
        event.preventDefault();

        try {
            await api.post('admin/tags', {
                name: formData?.nome,
                type: formData?.tipo,
            })
            
            mutate()

            handleClearState()

            toast.success('Tag criado com sucesso !')

            setShowModal('')
            
        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }

    async function handleEditTag(event: any) {
        event.preventDefault();

        try {
            await api.put(`admin/tags/${formData?.id}`, { 
                name: formData?.nome,
                type: formData?.tipo,
            })

            mutate()

            handleClearState()

            toast.success('Tag editado com sucesso !')

            setShowModal('')

        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }

    async function handleInactiveTag(id : string) {
        try {
            await api.put(`admin/tags/${id}/inactive`)
            
            mutate()

            toast.success('Tag inativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleActiveTag(id : string) {
        try {
            await api.put(`admin/tags/${id}/active`)
            
            mutate()

            toast.success('Tag ativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function handleClearState() {
        setFormData({
            nome: '',
            tipo: '',
            alias: ''
        })
    }

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300'>Tags</h1>
            
            {dataTable && 
                <Table data={dataTable}>
                    <Button
                        onClick={() => {
                            setShowModal('Cadastrar')
                            handleClearState()
                        }}
                        bgColor="success"
                        textColor='white'
                        className="px-6"
                    >
                        <BsPlusCircle size={16} className="mr-2" /> Adicionar
                    </Button>
                </Table>
            }

            {/* cadastrar tag */}
            <Modal
                isOpen={showModal === 'Cadastrar'}
                onClose={() => setShowModal('')}
                title='Cadastrar Tag'
            >
                <form onSubmit={(event) => handleRegisterTag(event)}>
                    <Input
                        type="text"
                        name="nome"
                        id="nome"
                        border="gray"
                        color="black"
                        value={formData?.nome}
                        label="Nome"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="tipo"
                        id="tipo"
                        border="gray"
                        color="black"
                        value={formData?.tipo}
                        label="Tipo"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        bgColor="purple"
                        textColor="gray"
                        className="px-10 mt-6 mx-auto"
                    >
                        Cadastrar
                    </Button>
                </form>
            </Modal>

            {/* visualizar tag */}
             <Modal
                isOpen={showModal === 'Visualizar'}
                onClose={() => setShowModal('')}
                title='Visualizar Tag'
            >
                <Input
                    type="text"
                    name="nome"
                    id="nome"
                    border="gray"
                    color="black"
                    defaultValue={formData?.nome}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Nome"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="tipo"
                    id="tipo"
                    border="gray"
                    color="black"
                    defaultValue={formData?.tipo}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Tipo"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="alias"
                    id="alias"
                    border="gray"
                    color="black"
                    defaultValue={formData?.alias}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Alias"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />
            </Modal>

            {/* editar tag */}
            <Modal
                isOpen={showModal === 'Editar'}
                onClose={() => setShowModal('')}
                title='Editar Tag'
            >
                <form onSubmit={(e) => handleEditTag(e)}>
                    <Input
                        type="text"
                        name="nome"
                        id="nome"
                        border="gray"
                        color="black"
                        value={formData?.nome}
                        background='white'
                        label="Nome"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                    />

                    <Input
                        type="text"
                        name="tipo"
                        id="tipo"
                        border="gray"
                        color="black"
                        value={formData?.tipo}
                        background='white'
                        label="Tipo"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        bgColor="purple"
                        textColor="gray"
                        className="px-10 mt-6 mx-auto"
                    >
                        Editar
                    </Button>
                </form>
            </Modal>
        </div>
    )
}
