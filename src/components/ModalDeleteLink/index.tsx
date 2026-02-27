import React, { useState } from "react";
import { toast } from "react-toastify";
import { ModalDelete } from "../ModalDelete/ModalDelete";

interface DeleteSiteProps {
  id: string;
  deleteLink: (linkId: string) => Promise<any>;
  onDeleteSuccess: (id: string) => void;
}

const DeleteSiteModal: React.FC<DeleteSiteProps> = ({
  id,
  deleteLink,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      const response = await deleteLink(id);

      if (response.status === 200) {
        onDeleteSuccess(id);
        toast.success("Link excluído com sucesso");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Erro ao excluir o link");
    }
  };

  return (
    <ModalDelete
      title={"Excluir Link"}
      subtitle={"Realmente deseja excluir este link?"}
      onDelete={handleDelete}
    ></ModalDelete>
  );
};

export default DeleteSiteModal;
