'use client'

import { useState, useRef } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { BsCheckLg, BsX, BsFillPinMapFill } from 'react-icons/bs'
import { SiMicrosoftexcel } from "react-icons/si";
import toast from 'react-hot-toast';
import Image from "next/image";

// Components
import { Table } from '@/app/components/Table';
import { Modal } from '@/app/components/Modal';
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { TextArea } from "@/app/components/TextArea";
import { Upload } from "@/app/components/Upload";
import { Select } from "@/app/components/Select";
import { Overlay } from "@/app/components/Overlay";

// Hooks
import { useFetchClient } from "@/app/hooks/useFetchClient";

// Utils
import { DateFormat, formatHour } from '@/app/utils'

// Services
import { api } from "@/app/services/api";

export default function Destinos() {
    const [showModal, setShowModal] = useState<'Visualizar' | 'Editar' | 'Deletar' | 'Cadastrar' | ''>('')
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<any>({
        name: '',
        coordinates: '',
        slogan_phrase: '',
        continent_id: '',
        banner_image_upload_file: '',
        map_image_upload_file: '',
        primary_attraction_title: '',
        primary_attraction_upload_file: '',
        introduction: '',
        secondary_attraction_title: '',
        secondary_attraction_upload_file: '',
        secondary_attraction_description: '',
        tertiary_attraction_title: '',
        tertiary_attraction_upload_file: '',
        tertiary_attraction_description: '',
        stars: '',
        flight_time_from_br: '',
        when_to_go: '',
        ideal_time_of_days: '',
        good_to_know_description: '',
        top_visualization: '',
        top_hype: '',
        top_romance: '',
        top_adventurous: '',
        is_sponsored: '',
        top_cost_benefit: '',
    });
    const [showImage, setShowImage] = useState({open: false, url: ''})
    const options = [{name: 'Ativo', id: 1}, {name: 'Inativo', id: 0}]
    const { data, mutate } = useFetchClient('admin/destinations?with_uploads=true')   

    const continents = useFetchClient('admin/continents')

    const dataTable = data?.data.map((item : any) => ({
        banner: (
            <button  onClick={() => setShowImage({open: true, url: item.banner_image_url})}>
                <Image 
                    src={item.banner_image_url} 
                    alt="destinos travelmoon" 
                    width={58} 
                    height={58}
                    className="w-[58px] h-[58px] object-cover rounded-full" 
                />
            </button>
        ),
        destino: item?.name,
        slogan: item.slogan_phrase,
        coordenadas: item.coordinates,
        patrocinado: item.is_sponsored ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        'top visualização': item.top_visualization ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        'top hype': item.top_hype ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        'top romance': item.top_romance ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        'top aventureiro': item.top_adventurous ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        'top custo benefício': item.top_cost_benefit ? <BsCheckLg className="text-2xl text-success" /> : <BsX className="text-2xl text-red-400" />,
        data: DateFormat(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'dd/MM/yyyy'),
        'ações': (
            <div className="flex gap-4">
                <HiOutlineEye
                    className="text-2xl text-blue-400"
                    onClick={() => {
                        setFormData(item)
                        setShowModal('Visualizar')
                    }}
                />
                <HiOutlinePencil
                    className="text-2xl text-yellow-400"
                    onClick={() => {
                        setShowModal('Editar')
                        setFormData({
                            name: item?.name,
                            cpf: item.cpf,
                            email: item.email,
                            ...item
                        })

                    }}
                />
                <BsFillPinMapFill 
                    onClick={() => item.active ? handleInactiveDestination(item.id) : handleActiveDestination(item.id)} 
                    className={`text-2xl ${item.active ? 'text-red-400' : 'text-gray'}`}
                /> 
            </div>
        )
    }))

    async function handleInactiveDestination(id : string) {
        try {
            await api.put(`admin/destinations/${id}/inactive`)
            
            mutate()

            toast.success('Destino inativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleActiveDestination(id : string) {
        try {
            await api.put(`admin/destinations/${id}/active`)
            
            mutate()

            toast.success('Destino ativado com sucesso !')
        } catch (err) {
            toast.error('Error, tente novamente !')
        }
    }

    async function handleRegisterDestination(event: any) {
        event.preventDefault();

        const newFormData = new FormData();

        for (const key in formData) {
            newFormData.append(key, formData[key]);
        }

        try {
            await api.post('admin/destinations', newFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data', // Importante para enviar FormData
                },
            });
            
            mutate()

            handleClearState()

            toast.success('Destino criado com sucesso !')

            setShowModal('')
            
        } catch(error: any) {
            toast.error(error?.response.data.message)
        }
    }

    async function handleFileUpload(event: any) {
        if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
            const file = fileInputRef?.current?.files[0];

            try {
                const formData = new FormData();
                formData.append('file', file);

                await api.post('admin/destinations/create/excel', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                })

                mutate()

                toast.success('Upload enviado com sucesso !')
            } catch (error: any) {
                toast.error(error?.response.data.message)
            }
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
            coordinates: '',
            slogan_phrase: '',
            continent_id: '',
            banner_image_upload_file: '',
            map_image_upload_file: '',
            primary_attraction_title: '',
            primary_attraction_upload_file: '',
            introduction: '',
            secondary_attraction_title: '',
            secondary_attraction_upload_file: '',
            secondary_attraction_description: '',
            tertiary_attraction_title: '',
            tertiary_attraction_upload_file: '',
            tertiary_attraction_description: '',
            stars: '',
            flight_time_from_br: '',
            when_to_go: '',
            ideal_time_of_days: '',
            good_to_know_description: '',
            is_sponsored: '',
            top_visualization: '',
            top_hype: '',
            top_romance: '',
            top_adventurous: '',
            top_cost_benefit: '',
        });
    }

    return (
        <div>
            <h1 className='text-sm md:text-2xl text-black-300'>Destinos</h1>
            
            {dataTable && 
                <Table data={dataTable}>
                    <div className='flex flex-row'>
                        <button className="relative px-6 py-4 bg-success text-white rounded-full cursor-pointer flex flex-row items-center mr-2">
                            <SiMicrosoftexcel size={16} className="mr-2 text-white" /> Upload Excel

                            <input 
                                type='file' 
                                ref={fileInputRef}
                                accept=".xlsx, .xls"
                                className="absolute w-full h-full opacity-0 cursor-pointer left-0 top-0"
                                onChange={handleFileUpload} 
                            />
                        </button>
                       
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
                    </div>
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


            {/* visualizar destinos */}
            <Modal
                isOpen={showModal === 'Visualizar'}
                onClose={() => setShowModal('')}
                title='Visualizar Destino'
            >
                <Input
                    border="gray"
                    color="black"
                    label="Destino"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.name}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Coordenadas"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.coordinates}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Slogan"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.slogan_phrase}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <div>
                    <label>Banner</label>
                    <div className="w-full relative md:max-h-[150px] aspect-square mt-2 mb-6">
                        <Image 
                            src={formData?.banner_image_url} 
                            alt={formData?.banner_image_url} 
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div>
                    <label>Mapa</label>
                    <div className="w-full relative md:max-h-[150px] aspect-square mt-2 mb-6">
                        <Image 
                            src={formData?.map_image_url} 
                            alt={formData?.map_image_url} 
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <Input
                    border="gray"
                    color="black"
                    label="Título 01"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.primary_attraction_title}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <TextArea
                    rows={5}
                    border="gray"
                    color="black"
                    label="Descrição 01"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.introduction}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />  

                <div>
                    <label>Image 01</label>
                    <div className="w-full relative md:max-h-[150px] aspect-square mt-2 mb-6">
                        <Image 
                            src={formData?.primary_attraction_upload_url} 
                            alt={formData?.primary_attraction_upload_url} 
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <Input
                    border="gray"
                    color="black"
                    label="Título 02"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.secondary_attraction_title}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <TextArea
                    rows={5}
                    border="gray"
                    color="black"
                    label="Descrição 02"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.secondary_attraction_description}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                /> 

                <div>
                    <label>Image 02</label>
                    <div className="w-full relative md:max-h-[150px] aspect-square mt-2 mb-6">
                        <Image 
                            src={formData?.secondary_attraction_upload_url} 
                            alt={formData?.secondary_attraction_upload_url} 
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <Input
                    border="gray"
                    color="black"
                    label="Título 03"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.tertiary_attraction_title}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <TextArea
                    rows={5}
                    border="gray"
                    color="black"
                    label="Descrição 03"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.tertiary_attraction_description}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                /> 

                <div>
                    <label>Image 03</label>
                    <div className="w-full relative md:max-h-[150px] aspect-square mt-2 mb-6">
                        <Image 
                            src={formData?.tertiary_attraction_upload_url} 
                            alt={formData?.tertiary_attraction_upload_url} 
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                    <div className="grid-cols-1">
                        <Input
                            border="gray"
                            color="black"
                            label="Quando ir"
                            className="rounded-md mb-6 mt-2"
                            defaultValue={formData?.when_to_go}
                            background={showModal === 'Visualizar' ? 'gray' : 'white'}
                            disabled={showModal === 'Visualizar'}
                        />
                    </div>
                    <div className="grid-cols-1">
                        <Input
                            border="gray"
                            color="black"
                            label="Qtd. de dias ideal"
                            className="rounded-md mb-6 mt-2"
                            defaultValue={formData?.ideal_time_of_days}
                            background={showModal === 'Visualizar' ? 'gray' : 'white'}
                            disabled={showModal === 'Visualizar'}
                        />
                    </div>
                    <div className="grid-cols-1">
                        <Input
                            border="gray"
                            color="black"
                            label="Horário de voo"
                            className="rounded-md mb-6 mt-2"
                            defaultValue={formData?.flight_time_from_br}
                            background={showModal === 'Visualizar' ? 'gray' : 'white'}
                            disabled={showModal === 'Visualizar'}
                        />
                    </div>
                    <div className="grid-cols-1">
                        <Input
                            border="gray"
                            color="black"
                            label="Moeda local"
                            className="rounded-md mb-6 mt-2"
                            defaultValue={formData?.kind_of_trip}
                            background={showModal === 'Visualizar' ? 'gray' : 'white'}
                            disabled={showModal === 'Visualizar'}
                        />
                    </div>
                </div>

                <Input
                    border="gray"
                    color="black"
                    label="Estrelas"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.stars}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <TextArea
                    rows={5}
                    border="gray"
                    color="black"
                    label="Bom saber"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.good_to_know_description}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Patrocinado"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.is_sponsored ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Top visualizações"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.top_visualization ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Top hype"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.top_hype ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Top romance"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.top_romance ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Top aventureiro"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.top_adventurous ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                />

                <Input
                    border="gray"
                    color="black"
                    label="Top custo beneficio"
                    className="rounded-md mb-6 mt-2"
                    defaultValue={formData?.top_cost_benefit ? 'Ativado' : 'Inativo'}
                    background={showModal === 'Visualizar' ? 'gray' : 'white'}
                    disabled={showModal === 'Visualizar'}
                /> 
            </Modal>

            {/* cadastrar destinos */}
            <Modal
                isOpen={showModal === 'Cadastrar'}
                onClose={() => setShowModal('')}
                title='Cadastrar Destino'
            >
                <form onSubmit={(event) => handleRegisterDestination(event)}>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        border="gray"
                        color="black"
                        value={formData?.name}
                        label="Destino"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="coordinates"
                        id="coordinates"
                        value={formData?.coordinates}
                        border="gray"
                        color="black"
                        label="Coordenadas"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="continent_id"
                        id="continent_id"
                        value={formData?.continent_id}
                        border="gray"
                        color="black"
                        label="Continente"
                        className="rounded-md mb-6 mt-2"
                        options={continents?.data?.data}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="slogan_phrase"
                        id="slogan_phrase"
                        value={formData?.slogan_phrase}
                        border="gray"
                        color="black"
                        label="Slogan"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Upload
                        name="banner_image_upload_file"
                        id="banner_image_upload_file"
                        border="gray"
                        color="black"
                        title="Banner"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.banner_image_upload_file?.name}
                    </Upload>

                    <Upload
                        name="map_image_upload_file"
                        id="map_image_upload_file"
                        border="gray"
                        color="black"
                        title="Mapa"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.map_image_upload_file?.name}
                    </Upload>

                    <Input
                        type="text"
                        name="primary_attraction_title"
                        id="primary_attraction_title"
                        border="gray"
                        value={formData?.primary_attraction_title}
                        color="black"
                        label="Title 01"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Upload
                        name="primary_attraction_upload_file"
                        id="primary_attraction_upload_file"
                        border="gray"
                        color="black"
                        title="Imagem 01"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.primary_attraction_upload_file?.name}
                    </Upload>

                    <TextArea
                        rows={5}
                        type="text"
                        name="introduction"
                        id="introduction"
                        border="gray"
                        value={formData?.introduction}
                        color="black"
                        label="Introdução"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="secondary_attraction_title"
                        id="secondary_attraction_title"
                        border="gray"
                        color="black"
                        value={formData?.secondary_attraction_title}
                        label="Título 02"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Upload
                        name="secondary_attraction_upload_file"
                        id="secondary_attraction_upload_file"
                        border="gray"
                        color="black"
                        title="Imagem 02"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.secondary_attraction_upload_file?.name}
                    </Upload>

                    <TextArea
                        rows={5}
                        type="text"
                        name="secondary_attraction_description"
                        id="secondary_attraction_description"
                        border="gray"
                        color="black"
                        value={formData?.secondary_attraction_description}
                        label="Descrição 02"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Input
                        type="text"
                        name="tertiary_attraction_title"
                        id="tertiary_attraction_title"
                        border="gray"
                        value={formData?.tertiary_attraction_title}
                        color="black"
                        label="Título 03"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Upload
                        name="tertiary_attraction_upload_file"
                        id="tertiary_attraction_upload_file"
                        border="gray"
                        color="black"
                        title="Imagem 03"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    >
                        {formData?.tertiary_attraction_upload_file?.name}
                    </Upload>

                    <TextArea
                        rows={5}
                        type="text"
                        name="tertiary_attraction_description"
                        id="tertiary_attraction_description"
                        border="gray"
                        value={formData?.tertiary_attraction_description}
                        color="black"
                        label="Descrição 03"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="grid-cols-1">
                            <Input  
                                type="month"
                                name="when_to_go"
                                id="when_to_go"
                                border="gray"
                                color="black"
                                value={formData?.when_to_go}
                                label="Quando ir"
                                className="rounded-md mb-6 mt-2"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid-cols-1">
                            <Input
                                type="number"
                                name="ideal_time_of_days"
                                id="ideal_time_of_days"
                                border="gray"
                                value={formData?.ideal_time_of_days}
                                color="black"
                                label="Qtd. de dias ideal"
                                className="rounded-md mb-6 mt-2"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid-cols-1">
                            <Input
                                type="text"
                                name="flight_time_from_br"
                                id="flight_time_from_br"
                                border="gray"
                                color="black"
                                value={formatHour(formData?.flight_time_from_br)}
                                label="Tempo de Voo"
                                className="rounded-md mb-6 mt-2"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid-cols-1">
                            <Input
                                type="text"
                                name="flight_time_from_br"
                                id="flight_time_from_br"
                                border="gray"
                                color="black"
                                value={formatHour(formData?.flight_time_from_br)}
                                label="Moeda local"
                                className="rounded-md mb-6 mt-2"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <Input
                        type="number"
                        name="stars"
                        id="stars"
                        value={formData?.stars}
                        border="gray"
                        color="black"
                        label="Estrelas"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        maxLength={5}
                        required
                    />

                    <TextArea
                        rows={5}
                        type="text"
                        name="good_to_know_description"
                        id="good_to_know_description"
                        border="gray"
                        color="black"
                        value={formData?.good_to_know_description}
                        label="Bom saber"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="is_sponsored"
                        id="is_sponsored"
                        border="gray"
                        color="black"
                        placeholder={formData?.is_sponsored}
                        options={options}
                        label="Patrocinado"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="top_visualization"
                        id="top_visualization"
                        placeholder={formData?.top_visualization}
                        border="gray"
                        color="black"
                        options={options}
                        label="Top visualizações"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="top_hype"
                        id="top_hype"
                        border="gray"
                        color="black"
                        placeholder={formData?.top_hype}
                        options={options}
                        label="Top Hype"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="top_romance"
                        id="top_romance"
                        border="gray"
                        color="black"
                        placeholder={formData?.top_romance}
                        options={options}
                        label="Top romance"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="top_adventurous"
                        id="top_adventurous"
                        border="gray"
                        color="black"
                        placeholder={formData?.top_adventurous}
                        options={options}
                        label="Top aventureiro"
                        className="rounded-md mb-6 mt-2"
                        onChange={handleChange}
                        required
                    />

                    <Select
                        name="top_cost_benefit"
                        id="top_cost_benefit"
                        border="gray"
                        color="black"
                        placeholder={formData?.top_cost_benefit}
                        options={options}
                        label="Top custo beneficio"
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
        </div>
    )
}

