"use client";

import Image from "next/image";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import toast from "react-hot-toast";

// Components
import { Table } from "@/app/components/Table";
import { Modal } from "@/app/components/Modal";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { TextArea } from "@/app/components/TextArea";
import { Overlay } from "@/app/components/Overlay";
import { Select } from "@/app/components/Select";
import { Upload } from "@/app/components/Upload";

// Hooks
import { useFetchClient } from "@/app/hooks/useFetchClient";

// Utils
import { DateFormat } from "@/app/utils";

// Services
import { api } from "@/app/services/api";

export default function Experiencias() {
  const [showModal, setShowModal] = useState<"Visualizar" | "Editar" | "Deletar" | "Cadastrar" | "">("");
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    tag_id: "",
    main_image_upload_file: "",
    main_video_upload_file: "",
  });
  const [showVideo, setShowVideo] = useState({ open: false, url: "" });
  const [showImage, setShowImage] = useState({ open: false, url: "" });
  const [showEditImage, setShowEditImage] = useState(false);
  const [showEditVideo, setShowEditVideo] = useState(false);

  const { data, mutate } = useFetchClient(
    "admin/experiences?with_uploads=true&include[]=tag"
  );
  const options = useFetchClient("admin/tags");

  const dataTable = data?.data.map((item: any) => ({
    banner: (
      <button
        onClick={() => setShowImage({ open: true, url: item.main_image_url })}
      >
        <Image
          src={item.main_image_url}
          alt="experiencias travelmoon"
          width={58}
          height={58}
        />
      </button>
    ),
    video: (
      <video
        autoPlay
        loop
        muted
        className="w-[62px] h-[62px]"
        onClick={() => setShowVideo({ open: true, url: item.main_video_url })}
      >
        <source src={item.main_video_url} type="video/mp4" media="mp4" />
      </video>
    ),
    nome: item.name ?? "",
    descrição: item.description,
    data: DateFormat(item.created_at, "yyyy-MM-dd HH:mm:ss", "dd/MM/yyyy"),
    ações: (
      <div className="flex gap-4">
        <HiOutlineEye
          className="text-2xl text-blue-400"
          onClick={() => {
            setShowModal("Visualizar");
            setFormData({
              name: item.name,
              description: item.description,
              main_image_url: item.main_image_url,
              main_video_url: item.main_video_url,
            });
          }}
        />
        <HiOutlinePencil
          className="text-2xl text-yellow-400"
          onClick={() => {
            setShowModal("Editar");
            setFormData({
              name: item.name,
              description: item.description,
              main_image_url: item.main_image_url,
              main_video_url: item.main_video_url,
              ...item,
            });
          }}
        />
      </div>
    ),
  }));

  async function handleRegisterExperience(e: any) {
    e.preventDefault();

    const newFormData = new FormData();

    for (const key in formData) {
      newFormData.append(key, formData[key]);
    }

    try {
      await api.post("admin/experiences", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante para enviar FormData
        },
      });

      mutate();

      handleClearState();

      toast.success("Experiência criada com sucesso !");

      setShowModal("");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  }

  async function handleEditExperience(event: any) {
    event.preventDefault();

    const newFormData = new FormData();

    for (const key in formData) {
      newFormData.append(key, formData[key]);
    }

    try {
      await api.put(`admin/experiences/${formData?.id}`, newFormData, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante para enviar FormData
        },
      });

      mutate();

      handleClearState();

      toast.success("Experiência editada com sucesso !");

      setShowModal("");
    } catch (error: any) {
      toast.error(error?.response.data.message);
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
      name: "",
      description: "",
      tag_id: "",
      main_image_upload_file: "",
      main_video_upload_file: "",
    });
  }

  return (
    <div>
      <h1 className="text-sm md:text-2xl text-black-300">Experiências</h1>

      {dataTable && (
        <Table data={dataTable}>
          <Button
            onClick={() => {
              setShowModal("Cadastrar");
              handleClearState();
            }}
            bgColor="success"
            textColor="white"
            className="px-6"
          >
            <BsPlusCircle size={16} className="mr-2" /> Adicionar
          </Button>
        </Table>
      )}

      <Overlay
        isOpen={showVideo.open}
        isClose={() => setShowVideo({ open: false, url: "" })}
      >
        {showVideo.url && (
          <video autoPlay loop muted controls className="p-5">
            <source src={showVideo.url} type="video/mp4" media="mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        )}
      </Overlay>

      <Overlay
        isOpen={showImage.open}
        isClose={() => setShowImage({ open: false, url: "" })}
      >
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

      {/* cadastrar experiência */}
      <Modal
        isOpen={showModal === "Cadastrar"}
        onClose={() => setShowModal("")}
        title="Cadastrar Experiência"
      >
        <form onSubmit={(event) => handleRegisterExperience(event)}>
          <Input
            type="text"
            name="name"
            id="name"
            border="gray"
            color="black"
            value={formData?.name}
            label="Nome"
            className="rounded-md mb-6 mt-2"
            onChange={handleChange}
            required
          />

          <Select
            label="Tags"
            name="tag_id"
            id="tag_id"
            border="gray"
            color="black"
            placeholder={formData?.tag_id}
            value={formData?.tag_id}
            options={options?.data?.data}
            className="rounded-md mb-6 mt-2"
            onChange={handleChange}
            required
          />

          <Upload
            name="main_image_upload_file"
            id="main_image_upload_file"
            border="gray"
            color="black"
            title="Imagem"
            className="rounded-md mb-6 mt-2"
            onChange={handleChange}
            required
          >
            {formData?.main_image_upload_file?.name}
          </Upload>

          <Upload
            name="main_video_upload_file"
            id="main_video_upload_file"
            border="gray"
            color="black"
            title="Vídeo"
            className="rounded-md mb-6 mt-2"
            onChange={handleChange}
            required
          >
            {formData?.main_video_upload_file?.name}
          </Upload>

          <TextArea
            rows={5}
            type="text"
            name="description"
            id="description"
            border="gray"
            color="black"
            value={formData?.description}
            label="Descrição"
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

      {/* editar experiência */}
      <Modal
        isOpen={showModal === "Editar"}
        onClose={() => {
          setShowModal(""), setShowEditImage(false), setShowEditVideo(false);
        }}
        title="Editar Experiência"
      >
        <form onSubmit={(event) => handleEditExperience(event)}>
          <Input
            type="text"
            name="name"
            id="name"
            border="gray"
            color="black"
            value={formData?.name}
            label="Nome"
            className="rounded-md mb-6 mt-2"
            onChange={handleChange}
          />

          {showEditImage ? (
            <Upload
              name="main_image_upload_file"
              id="main_image_upload_file"
              border="gray"
              color="black"
              title="Imagem"
              className="rounded-md mb-6 mt-2"
              onChange={handleChange}
            >
              {formData?.main_image_upload_file?.name}
            </Upload>
          ) : (
            <div>
              <label className="mb-2">Imagem</label>
              <div
                className="w-full relative md:max-h-[150px] aspect-square mb-6"
                onClick={() => setShowEditImage(true)}
              >
                {formData?.main_image_url && (
                  <Image
                    src={formData?.main_image_url}
                    alt="travelmoon"
                    fill
                    className="object-cover mt-2 rounded-md"
                  />
                )}
              </div>
            </div>
          )}

          {showEditVideo ? (
            <Upload
              name="main_video_upload_file"
              id="main_video_upload_file"
              border="gray"
              color="black"
              title="Vídeo"
              className="rounded-md mb-6 mt-2"
              onChange={handleChange}
            >
              {formData?.main_video_upload_file?.name}
            </Upload>
          ) : (
            <div onClick={() => setShowEditVideo(true)}>
              <label className="mb-2">Vídeo</label>
              {formData?.main_video_url && (
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  className="w-full relative md:max-h-[150px] object-cover mt-2 mb-6 rounded-md"
                >
                  <source
                    src={formData?.main_video_url}
                    type="video/mp4"
                    media="mp4"
                  />
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              )}
            </div>
          )}
          <TextArea
            rows={5}
            type="text"
            name="description"
            id="description"
            border="gray"
            color="black"
            value={formData?.description}
            label="Descrição"
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

      {/* visualizar experiência */}
      <Modal
        isOpen={showModal === "Visualizar"}
        onClose={() => setShowModal("")}
        title="Visualizar Experiência"
      >
        <Input
          type="text"
          name="name"
          id="name"
          border="gray"
          color="black"
          defaultValue={formData?.name}
          background={showModal === "Visualizar" ? "gray" : "white"}
          label="Nome"
          disabled={showModal === "Visualizar"}
          className="rounded-md mb-6 mt-2"
        />

        <TextArea
          rows={5}
          name="description"
          id="description"
          border="gray"
          color="black"
          defaultValue={formData?.description}
          background={showModal === "Visualizar" ? "gray" : "white"}
          label="Descrição"
          disabled={showModal === "Visualizar"}
          className="rounded-md mb-6 mt-2"
        />
      </Modal>
    </div>
  );
}