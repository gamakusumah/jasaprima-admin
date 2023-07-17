import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MdOutlineAdd,
  MdOutlinePrint,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { Link } from "react-router-dom";

function Kantor(props) {
  const [kantor, setKantor] = useState([]);

  useEffect(() => {
    props.refreshToken();
    getKantor();
  }, []);

  const getKantor = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/kantor", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setKantor(response.data);
  };

  const deleteKantor = async (id) => {
    const response = window.confirm("Yakin ingin menghapus data ini?");
    if (response) {
      try {
        await axios.delete(`http://localhost:5000/kantor/${id}`);
        getKantor();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2 className="text">Data Kantor</h2>

          <div className="my-4 flex">
            <Link to="/kantor/tambah" className="btn-blue py-2 px-4">
              <span className="inline-block">
                <MdOutlineAdd size="25" />
              </span>
              <span className="ml-1">Tambah Baru</span>
            </Link>
            <Link className="btn-green py-2 px-4">
              <MdOutlinePrint size="25" />
              <span className="ml-1">Cetak Tabel</span>
            </Link>
          </div>

          <div className="overflow-auto rounded-tl rounded-tr shadow">
            <table className="w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="table-cell font-semibold tracking-wide text-left w-10">
                    No.
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Kode Kantor
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Wilayah Kantor
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Status Kantor
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Alamat
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left w-10">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {kantor.map((ktr, i) => (
                  <tr className="bg-white" key={ktr._id}>
                    <td className="table-cell">
                      <a
                        href=""
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {i + 1}
                      </a>
                    </td>
                    <td className="table-cell">{ktr.kodeKantor}</td>
                    <td className="table-cell">{ktr.wilayahKantor}</td>
                    <td className="table-cell">{ktr.statusKantor}</td>
                    <td className="table-cell">{ktr.alamatKantor}</td>
                    <td className="table-cell">
                      <div className="h-full flex flex-col justify-around text-white lg:flex-row">
                        <a
                          href="#"
                          className="bg-blue-400 p-1 m-1 rounded flex items-center justify-center"
                        >
                          <span>
                            <MdRemoveRedEye size={18} />
                          </span>
                        </a>
                        <Link
                          to={`/kantor/edit/${ktr._id}`}
                          className="bg-yellow-400 p-1 m-1 rounded flex items-center justify-center"
                        >
                          <MdEdit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteKantor(ktr._id)}
                          href="#"
                          className="bg-red-400 p-1 m-1 rounded flex items-center justify-center"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-3 bg-white border-t-2 rounded-bl rounded-br ">
            <button className="bg-white text-blue-500 py-1 px-3 rounded-tl rounded-bl border-2">
              Previous
            </button>
            <button className="bg-blue-500 py-1 px-3 text-white">1</button>
            <button className="bg-white text-blue-500 py-1 px-3 rounded-tr rounded-br border-2">
              Next
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Kantor;
