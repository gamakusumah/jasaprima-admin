import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KantorTambah(props) {
  const [kodeKantor, setKode] = useState("");
  const [wilayahKantor, setWilayah] = useState("");
  const [statusKantor, setStatus] = useState("Cabang");
  const [alamatKantor, setAlamat] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    props.refreshToken();
  });

  const saveKantor = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/kantor/tambah", {
        kodeKantor,
        wilayahKantor,
        statusKantor,
        alamatKantor,
      });
      navigate("/kantor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2>Tambah Kantor Baru</h2>

          <div className="card">
            <form onSubmit={saveKantor}>
              <div className="my-4">
                <label>Kode Kantor</label>
                <input
                  type="text"
                  id="kode_kantor"
                  className="input-text"
                  value={kodeKantor}
                  onChange={(e) => setKode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="my-4">
                <label>Wilayah Kantor</label>
                <input
                  type="text"
                  className="input-text"
                  value={wilayahKantor}
                  onChange={(e) => setWilayah(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Status Kantor</label>
                <select
                  id="status_kantor"
                  className="input-text"
                  value={statusKantor}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Cabang">Cabang</option>
                  <option value="Pusat">Pusat</option>
                </select>
              </div>
              <div className="my-4">
                <label>Alamat Kantor</label>
                <textarea
                  id="alamat_kantor"
                  cols="30"
                  rows="10"
                  className="input-text h-24"
                  value={alamatKantor}
                  onChange={(e) => setAlamat(e.target.value)}
                ></textarea>
              </div>
              <div className="flex">
                <Link
                  to="/kantor"
                  className="btn-red flex px-3 py-2 mr-2 items-center justify-center"
                >
                  <span className="inline-block mr-1">
                    <MdOutlineArrowBack size={20} />
                  </span>
                  <span>Batal</span>
                </Link>
                <button
                  type="submit"
                  className="btn-blue items-center px-3 py-2 justify-center"
                >
                  <span className="inline-block mr-1">
                    <MdSave size={20} />
                  </span>
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default KantorTambah;
