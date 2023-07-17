import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

function JenisLayananEdit(props) {
  const [namaLayanan, setLayanan] = useState("");
  const [kode, setKode] = useState("");
  const [hargaN, setHargaN] = useState(0);
  const [hargaK, setHargaK] = useState(0);
  const [waktu, setWaktu] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    props.refreshToken();
    getLayananById();
  }, []);

  const getLayananById = async () => {
    const response = await axios.get(`http://localhost:5000/layanan/${id}`, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setLayanan(response.data.namaLayanan);
    setKode(response.data.kode);
    setHargaN(response.data.hargaN);
    setHargaK(response.data.hargaK);
    setWaktu(response.data.waktu);
  };

  const updateLayanan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/layanan/edit/${id}`, {
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
          <h2>Ubah Layanan</h2>

          <div class="card">
            <form onSubmit={updateLayanan}>
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
                <label>Nama Layanan</label>
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
                  value={hargaK}
                  onChange={(e) => setHargaK(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Harga N</label>
                <input
                  type="number"
                  className="input-text"
                  value={hargaN}
                  onChange={(e) => setHargaN(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Waktu</label>
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

export default JenisLayananEdit;
