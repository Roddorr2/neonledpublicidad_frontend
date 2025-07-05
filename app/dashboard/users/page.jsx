"use client";

import { useSearchParams } from "next/navigation";
import Pagination from "../components/Pagination";
import { useEffect, useState, Suspense } from "react";
import Modal_usuario from "./components/Modal_usuario";
import user_service from "./services/user.service";

const headers = ["id", "name", "email"];

function UsersTable() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [dataUpd, setdataUpdate] = useState(false);

  async function setProducts(page) {
    await user_service.userByPage(page).then((data) => {
      if (parseInt(data.status) === 200) {
        if (data.total > 0) {
          data.data.forEach((item) => {
            const fecha = new Date(item.created_at);
            item.created_at = fecha.toLocaleDateString("es-ES");
          });

          setData(data.data);
          setCount(data.total);
        }
      } else {
        console.error("Error al obtener datos");
      }
    });
  }

  function onDelete(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    user_service.delete(id).then(() => {
      fetchProducts();
    });
  }

  function onUpdate(idUpdate) {
    setdataUpdate(data.find((r) => r.id === idUpdate));
    setModal(true);
  }

  const fetchProducts = async () => {
    if (isNaN(currentPage)) {
      await setProducts(1);
      return;
    }
    await setProducts(parseInt(currentPage));
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Se ejecuta cuando cambia la query

  return (
    <>
      <button
        className="bg-blue-600 text-white p-2 rounded-md mb-4 font-bold"
        onClick={() => setModal(true)}
      >
        Crear
      </button>
      <Table headers={headers} data={data} onDelete={onDelete} onUpdate={onUpdate} />
      <Pagination count={count} />
      <Modal_usuario
        isVisible={modal}
        data={dataUpd}
        onclose={() => {
          setModal(false);
          setdataUpdate(false);
          fetchProducts();
        }}
      />
    </>
  );
}

export default function Page() {
  return (
    <main className="p-4 overflow-scroll flex flex-col w-full h-[100vh] flex-1">
      <h2 className="text-4xl font-bold mb-4">Usuarios</h2>
      <Suspense fallback={<p>Cargando usuarios...</p>}>
        <UsersTable />
      </Suspense>
    </main>
  );
}
