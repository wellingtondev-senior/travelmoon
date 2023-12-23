'use client'

import { useState, ChangeEvent } from "react";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { BsPlusCircle, BsPeople } from "react-icons/bs";
import toast from 'react-hot-toast';

// Components
import { Table } from '@/app/components/Table'
import { Modal } from '@/app/components/Modal'
import { Input } from "@/app/components/Input"
import { Button } from "@/app/components/Button";

// Hooks
import { useFetchClient } from '@/app/hooks/useFetchClient'

// Utils
import { DateFormat, formatCPF } from '@/app/utils'

// Services
import { api } from "@/app/services/api";

export default function Inbox() {
    const [showModal, setShowModal] = useState<'Visualizar' | 'Editar' | 'Deletar' | 'Cadastrar' | ''>('')
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        cpf: '',
        state: '',
        city: '',
        photo: ''
    })
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [error, setError] = useState('')

    // chamada a api
    const { data, mutate } = useFetchClient('admin/users?with_uploads=true')

    console.log(data)

    const dataTable = data?.data.map((item : any) => ({
        name: item.name,
        cpf: formatCPF(item.cpf),
        email: item.email,
        estado: item.state.name,
        cidade: item.city.name,
        role: item.admin ? 'Administrador' : 'Usuário',
        ativo: item.active ? 'Ativo' : 'Inativo',
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy'),
        'ações': (
            <div className="flex gap-4">
                <HiOutlineEye
                    className="text-2xl text-blue-400"
                    onClick={() => {
                        setSelectedUser(item)
                        setShowModal('Visualizar')
                        setFormData(item)
                    }}
                />
                <HiOutlinePencil
                    className="text-2xl text-yellow-400"
                    onClick={() => {
                        setShowModal('Editar')
                        setFormData({
                            name: item.name,
                            ...item
                        })
                    }}
                />
                {item.active ? 
                    <BsPeople onClick={() => handleInactiveUser(item.id)} className="text-2xl text-red-400" /> 
                    : 
                    <BsPeople onClick={() => handleActiveUser(item.id)} className="text-2xl text-gray"/>
                }
            </div>
        )
    }))

    async function handleInactiveUser(id : string) {
        try {
            await api.put(`admin/users/${id}/inactive`)
            
            mutate()

            toast.success('Usuário inativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleActiveUser(id : string) {
        try {
            await api.put(`admin/users/${id}/active`)
            
            mutate()

            toast.success('Usuário ativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleEditUser(event: any) {
        event.preventDefault();

        try {
            await api.put(`admin/users/${formData?.id}`, { 
                name: formData?.name,
            })

            mutate()

            handleClearState()

            toast.success('Tag editado com sucesso !')

            setShowModal('')

        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }
   
    async function handleRegisterUser(event: any) {
        event.preventDefault();

        if(formData.password !== formData.password_confirmation) {
            setError('senhas precisam ser iguais')

            return
        }

        try {
            await api.post('admin/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                is_admin: true
            })
            
            mutate()
            
            handleClearState()

            setError('')

            toast.success('Usuário criado com sucesso !')

            setShowModal('')
            
        } catch(error: any) {
            toast.error(error?.response.data.message)
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
            id: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            city: '',
            cpf: '',
            state: '',
            photo: ''
        })
    }

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300'>Usuários</h1>

            {dataTable && 
                <Table data={dataTable}>
                    <Button
                        onClick={() => {
                            setShowModal('Cadastrar')
                            setSelectedUser(null)
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
        
            {/* cadastrar usuário */}
            <Modal
                isOpen={showModal === 'Cadastrar'}
                onClose={() => setShowModal('')}
                title='Cadastrar Usuário'
            >
                <form onSubmit={(event) => handleRegisterUser(event)}>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        border="gray"
                        color="black"
                        value={formData.name}
                        background='white'
                        label="Nome"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="email"
                        id="email"
                        border="gray"
                        value={formData.email}
                        color="black"
                        background='white'
                        label="Email"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        border="gray"
                        color="black"
                        background='white'
                        label="Senha"
                        value={formData.password}
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                        minLength={8}
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        border="gray"
                        color="black"
                        background='white'
                        label="Confirmar Senha"
                        value={formData.password_confirmation}
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        minLength={8}
                        required
                    />

                    <span className="text-red-400">{error}</span>

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

            {/* visualizar usuário */}
            <Modal
                isOpen={showModal === 'Visualizar'}
                onClose={() => setShowModal('')}
                title='Visualizar Usuário'
            >
                <Input
                    type="text"
                    name="name"
                    id="name"
                    border="gray"
                    color="black"
                    defaultValue={selectedUser?.name}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Nome"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="CPF"
                    id="CPF"
                    border="gray"
                    color="black"
                    defaultValue={formatCPF(selectedUser?.cpf)}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="CPF"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="email"
                    id="email"
                    border="gray"
                    color="black"
                    defaultValue={selectedUser?.email}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Email"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="estado"
                    id="estado"
                    border="gray"
                    color="black"
                    defaultValue={selectedUser?.state.name}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Estado"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="cidade"
                    id="cidade"
                    border="gray"
                    color="black"
                    defaultValue={selectedUser?.city.name}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Cidade"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    type="text"
                    name="role"
                    id="role"
                    border="gray"
                    color="black"
                    value={selectedUser?.admin ? 'Administrador' : 'Usuário'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    label="Role"
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />
            </Modal>

            {/* editar usuário */}
            <Modal
                isOpen={showModal === 'Editar'}
                onClose={() => setShowModal('')}
                title='Editar Usuário'
            >
                <form onSubmit={(e) => handleEditUser(e)}>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        border="gray"
                        color="black"
                        value={formData?.name}
                        background='white'
                        label="Nome"
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
