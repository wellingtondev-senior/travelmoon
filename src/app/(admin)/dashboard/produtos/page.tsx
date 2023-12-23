'use client'

import { useState } from "react";
import { HiOutlineEye, HiOutlinePencil} from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { BsCheckLg, BsX, BsPlusCircle } from 'react-icons/bs'
import toast from 'react-hot-toast';
import Image from "next/image";

// Components
import { Table } from '@/app/components/Table'
import { Modal } from '@/app/components/Modal'
import { Button } from '@/app/components/Button'
import { Input } from "@/app/components/Input";
import { Upload } from "@/app/components/Upload";
import { Select } from "@/app/components/Select";
import { Overlay } from "@/app/components/Overlay";

// Hooks
import { useFetchClient } from '@/app/hooks/useFetchClient'

// Utils
import { DateFormat, formatCurrency } from '@/app/utils'

// Services
import { api } from "@/app/services/api";

export default function Produtos() {
    const options = [{name: 'Ativo', id: 1}, {name: 'Inativo', id: 0}]
    const [showModal, setShowModal] = useState<'Visualizar' | 'Editar' | 'Deletar' | 'Cadastrar' | ''>('')
    const [showEditImage, setShowEditImage] = useState(false)
    const [showImage, setShowImage] = useState({open: false, url: ''})
    const [formData, setFormData] = useState<any>({
        name: '',
        image_upload_file: '',
        minimal_price_in_cents: '',
        is_sponsored: '',
        tags_ids: [],
        destination_id: ''
    })

    const { data, mutate } = useFetchClient('admin/products?with_uploads=true')
    const optionsDestination = useFetchClient('admin/destinations?with_uploads=true')   
    const optionsTag = useFetchClient('admin/tags')

    const dataTable = data?.data.map((item: any) => ({
        banner: (
            <button  onClick={() => setShowImage({open: true, url: item.image_url})}>
                <Image 
                    src={item.image_url} 
                    alt="destinos travelmoon" 
                    width={58} 
                    height={58}
                    className="w-[58px] h-[58px] object-cover rounded-full" 
                />
            </button>
        ),
        nome: item.name,
        preço: formatCurrency(item.minimal_price_in_cents),
        patrocinado: item.is_sponsored ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy'),
        'ações': (
            <div className="flex gap-4">
                <HiOutlineEye
                    className="text-2xl text-blue-400"
                    onClick={() => {
                        setShowModal('Visualizar')
                        setFormData(item)
                    }}
                />
                <HiOutlinePencil
                    className="text-2xl text-yellow-400"
                    onClick={() => {
                        setShowModal('Editar')
                        setFormData(item)
                        setShowEditImage(false)
                    }}
                />
                {item.active ?
                    <MdOutlineProductionQuantityLimits onClick={() => handleInactiveProduct(item.id)} className="text-2xl text-red-400" />
                    :
                    <MdOutlineProductionQuantityLimits onClick={() => handleActiveProduct(item.id)} className="text-2xl text-gray" />
                }
            </div>
        )
    }))

    async function handleInactiveProduct(id : string) {
        try {
            await api.put(`admin/products/${id}/inactive`)
            
            mutate()

            toast.success('Produto inativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleActiveProduct(id : string){
        try {
            await api.put(`admin/products/${id}/active`)
            
            mutate()

            toast.success('Produto ativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleRegisterProduct(event: any) {
        event.preventDefault();

        const newFormData = new FormData();

        for (const key in formData) {
            if(key === 'minimal_price_in_cents') {
                // Remove non-digit characters from the value
                const formattedValue = formData.minimal_price_in_cents.replace(/[^0-9]/g, '');
                newFormData.append('minimal_price_in_cents', formattedValue);
            } else if(key === 'tags_ids') {
                newFormData.append('tags_ids[0]', formData.tags_ids);
            } else {
                newFormData.append(key, formData[key]);
            }
        }

        try {
            await api.post('admin/products', newFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Importante para enviar FormData
                },
            });
            
            mutate()

            handleClearState()

            toast.success('Produto criado com sucesso !')

            setShowModal('')
            
        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }

    async function handleEditProduct(event: any) {
        event.preventDefault();
        
        const newFormData = new FormData();

        for (const key in formData) {
            if (key === 'minimal_price_in_cents') {
                // Remove non-digit characters from the value
                const formattedValue = formData.minimal_price_in_cents.replace(/[^0-9]/g, '');
                newFormData.append('minimal_price_in_cents', formattedValue);
            } else if (key === 'is_sponsored') {
                const res: any = formData.is_sponsored && formData.is_sponsored === '1' ? 1 : 0
                newFormData.append('is_sponsored', res);
            } else {
                newFormData.append(key, formData[key]);
            }
        }

        try {
            await api.put(`admin/products/${formData?.id}`, newFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Importante para enviar FormData
                },
            });

            mutate()

            handleClearState()

            toast.success('Produto editado com sucesso !')

            setShowModal('')

        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }

    const handleChange = async (event: any) => {
        const { name, value, files } = event.target;

       if (files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],
            });

        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    function handleClearState() {
        setFormData({
            name: '',
            image_upload_file: '',
            minimal_price_in_cents: '',
            is_sponsored: '',
            tags_ids: '',
            destination_id: ''
        })
    }

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300'>Produtos</h1>

            {dataTable && 
                <Table data={dataTable}>
                    <Button
                        onClick={() => {
                            setShowModal("Cadastrar")
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

            <Overlay isOpen={showImage.open} isClose={() => setShowImage({open: false, url: ''})}>
                {showImage.url && (
                    <div className="w-11/12 relative lg:max-h-[696px] md:max-h-[350px] aspect-square">
                        <Image 
                            src={showImage.url} 
                            alt="travelmoon" 
                            fill
                            className="object-cover" 
                        />
                    </div>
                )}
            </Overlay>

              {/* visualizar produtos */}
              <Modal
                isOpen={showModal === 'Visualizar'}
                onClose={() => setShowModal('')}
                title='Visualizar Produto'
            >
                <Input
                    name="name"
                    id="name"
                    border="gray"
                    value={formData?.name}
                    color="black"
                    label="Nome"
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    name="minimal_price_in_cents"
                    id="minimal_price_in_cents"
                    border="gray"
                    value={formatCurrency(formData?.minimal_price_in_cents)}
                    color="black"
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                    label="Preço"
                    className="rounded-md mb-6 mt-2"
                />

                <Input
                    name="minimal_price_in_cents"
                    id="minimal_price_in_cents"
                    border="gray"
                    value={formData?.is_sponsored ? 'Ativo': 'Inativo'}
                    color="black"
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                    label="Patrocinado"
                    className="rounded-md mb-6 mt-2"
                />
            </Modal>
            
            {/* cadastrar produtos */}
            <Modal
                isOpen={showModal === 'Cadastrar'}
                onClose={() => setShowModal('')}
                title='Cadastrar Produto'
            >
                <form onSubmit={(event) => handleRegisterProduct(event)}>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        border="gray"
                        value={formData?.name}
                        color="black"
                        label="Nome"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="destination_id"
                        id="destination_id"
                        border="gray"
                        placeholder={formData?.destination_id}
                        value={formData?.destination_id}
                        color="black"
                        label="Destinos"
                        className="rounded-md mb-6 mt-2"
                        options={optionsDestination?.data?.data}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text" 
                        name="minimal_price_in_cents"
                        id="minimal_price_in_cents"
                        border="gray"
                        value={formatCurrency(formData?.minimal_price_in_cents)}
                        color="black"
                        label="Preço"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="tags_ids"
                        id="tags_ids"
                        border="gray"
                        placeholder={formData?.tags_ids}
                        value={formData?.tags_ids}
                        color="black"
                        label="Tags"
                        className="rounded-md mb-6 mt-2"
                        options={optionsTag?.data?.data}
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="is_sponsored"
                        id="is_sponsored"
                        placeholder={formData?.is_sponsored}
                        value={formData?.is_sponsored}
                        border="gray"
                        color="black"
                        label="Patrocinado"
                        className="rounded-md mb-6 mt-2"
                        options={options}
                        onChange={handleChange}
                        required
                    />

                    <Upload
                        name="image_upload_file"
                        id="image_upload_file"
                        border="gray"
                        color="black"
                        title="Banner"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.image_upload_file?.name}
                    </Upload>

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

            {/* editar produtos */}
            <Modal
                isOpen={showModal === 'Editar'}
                onClose={() => setShowModal('')}
                title='Editar Produto'
            >

                <form onSubmit={(event) => handleEditProduct(event)}>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        border="gray"
                        value={formData?.name}
                        color="black"
                        label="Nome"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                    />

                    <Input
                        type="text" 
                        name="minimal_price_in_cents"
                        id="minimal_price_in_cents"
                        border="gray"
                        value={formatCurrency(formData?.minimal_price_in_cents)}
                        color="black"
                        label="Preço"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                    />

                    <Select
                        name="is_sponsored"
                        id="is_sponsored"
                        placeholder={formData?.is_sponsored ? 'Ativo' : 'Inativo'}
                        border="gray"
                        value={formData?.is_sponsored}
                        color="black"
                        label="Patrocinado"
                        className="rounded-md mb-6 mt-2"
                        options={options}
                        onChange={handleChange}
                    />

                    {showEditImage ?
                        <Upload
                            name="image_upload_file"
                            id="image_upload_file"
                            border="gray"
                            color="black"
                            title="Banner"
                            className="rounded-md mb-6 mt-2"
                            onChange={handleChange}
                        >
                            {formData?.image_upload_file?.name}
                        </Upload>
                        :
                        <div onClick={() => setShowEditImage(true)}>
                            <label className="mb-2">Banner</label>
                            <div className="w-full relative md:max-h-[150px] aspect-square mb-6">
                                {formData?.image_url &&
                                    <Image 
                                        src={formData?.image_url} 
                                        alt="travelmoon" 
                                        fill
                                        className="object-cover mt-2 mb-6 rounded-md" 
                                    />
                                }
                            </div>
                        </div>
                    }

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
