import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function JenisLayananTambah(props) {
  const [namaLayanan, setLayanan] = useState("");
  const [kode, setKode] = useState("");
  const [hargaN, setHargaN] = useState(0);
  const [hargaK, setHargaK] = useState(0);
  const [waktu, setWaktu] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    props.refreshToken();
  });

  const saveLayanan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/layanan/tambah", {
        namaLayanan,
        kode,
        hargaN,
        hargaK,
        waktu,
      });
      navigate("/layanan");
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
          <h2>Tambah Jenis Layanan Baru</h2>

          <div class="card">
            <form onSubmit={saveLayanan}>
              <div className="my-4">
                <label>Kode Layanan</label>
                <input
                  type="text"
                  className="input-text"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label for="nama_layanan">Nama Layanan</label>
                <input
                  type="text"
                  id="nama_layanan"
                  className="input-text"
                  value={namaLayanan}
                  onChange={(e) => setLayanan(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Harga K</label>
                <input
                  type="number"
                  className="input-text"
                  onChange={(e) => setHargaK(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label for="hargaN">Harga N</label>
                <input
                  type="number"
                  id="hargaN"
                  className="input-text"
                  onChange={(e) => setHargaN(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label for="waktu">Waktu</label>
                <input
                  type="number"
                  id="waktu"
                  className="input-text"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                />
              </div>

              <div className="flex">
                <Link
                  to="/layanan"
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

export default JenisLayananTambah;
