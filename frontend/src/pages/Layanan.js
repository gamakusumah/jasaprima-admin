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

function JenisLayanan(props) {
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    props.refreshToken();
    getLayanan();
  }, []);

  const getLayanan = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/layanan", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setLayanan(response.data);
  };

  const deleteLayanan = async (id) => {
    const response = window.confirm("Yakin ingin menghapus data ini?");
    if (response) {
      try {
        await axios.delete(`http://localhost:5000/layanan/${id}`);
        getLayanan();
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
          <h2 className="text">Data Layanan</h2>

          <div className=" my-4 flex">
            <Link to="/layanan/tambah" className="btn-blue py-2 px-4">
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
                    Kode
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Nama Layanan
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Harga K
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Harga N
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Waktu
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left w-10">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {layanan.map((lay, i) => (
                  <tr className="bg-white" key={lay._id}>
                    <td className="table-cell">{i + 1}</td>
                    <td className="table-cell">{lay.kode}</td>
                    <td className="table-cell">{lay.namaLayanan}</td>
                    <td className="table-cell">
                      Rp{lay.hargaK.toLocaleString("id")}
                    </td>
                    <td className="table-cell">
                      Rp{lay.hargaN.toLocaleString("id")}
                    </td>
                    <td className="table-cell">{lay.waktu} hari</td>
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
                          to={`/layanan/edit/${lay._id}`}
                          className="bg-yellow-400 p-1 m-1 rounded flex items-center justify-center"
                        >
                          <MdEdit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteLayanan(lay._id)}
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

export default JenisLayanan;
