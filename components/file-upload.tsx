import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const FileUpload = ({ value, onChange, setFile }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setFile(file);
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    },
    [onChange, setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      // ".pdf": [] adicionar para aceitar qualquer tipo de arquivo e atualizar o component para mostrar apenas se for imagem
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleDelete = () => {
    setFile(null);
    onChange("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div
        {...getRootProps()}
        className={`relative min-h-[200px] flex justify-center items-center border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer
                    ${isDragActive ? "border-blue-500 bg-blue-50 " : ""}`}
      >
        <input {...getInputProps()} />

        {value ? (
          <div className="flex items-center justify-center">
            <Image
              src={value}
              alt="Uploaded file"
              className="w-[100px] h-[100px] rounded-full"
              width={100}
              height={100}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="absolute top-2 right-2 text-white p-1 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <Trash2 color="red" size={16} />
            </button>
          </div>
        ) : (
          <p className="text-gray-500">
            {isDragActive
              ? "Solte o arquivo aqui..."
              : "Arraste e solte um arquivo aqui, ou clique para selecionar"}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
