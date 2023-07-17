import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KendaraanTambah(props) {
  const [noPol, setNoPol] = useState("");
  const [tglPajak, setTglPajak] = useState("");
  const [tglSTNK, setTglSTNK] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    props.refreshToken();
  });

  const saveKendaraan = async (e) => {
    e.preventDefault();
    try {
      const kendaraan = (
        await props.axiosJWT.get("http://localhost:5000/kendaraan", {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        })
      ).data;
      const foundNoPol = kendaraan.filter((e) => e.noPol === noPol);
      if (foundNoPol.length === 0) {
        try {
          axios.post("http://localhost:5000/kendaraan/tambah", {
            noPol,
            tglPajak,
            tglSTNK,
          });
          navigate("/kendaraan");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Nomor Polisi Kendaraan Sudah Ada!");
      }
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
          <h2>Tambah Kendaraan Baru</h2>

          <div className="card">
            <form onSubmit={saveKendaraan}>
              <div className="my-4">
                <label>Nomor Polisi</label>
                <input
                  type="text"
                  className="input-text"
                  value={noPol}
                  onChange={(e) => setNoPol(e.target.value.toUpperCase())}
                />
              </div>
              <div className="my-4">
                <label>Tanggal Pajak</label>
                <input
                  type="text"
                  className="input-text"
                  value={tglPajak}
                  onChange={(e) => setTglPajak(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Tanggal STNK</label>
                <input
                  type="text"
                  className="input-text"
                  value={tglSTNK}
                  onChange={(e) => setTglSTNK(e.target.value)}
                />
              </div>

              <div className="flex">
                <Link
                  to="/kendaraan"
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

export default KendaraanTambah;
