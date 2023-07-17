import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

function AreaEdit(props) {
  const [kode, setKode] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    props.refreshToken();
    getAreaById();
  }, []);

  const getAreaById = async () => {
    const response = await props.axiosJWT.get(
      `http://localhost:5000/area/${id}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    setKode(response.data.kode);
    setWilayah(response.data.wilayah);
    setKota(response.data.kota);
    setAlamat(response.data.alamat);
  };

  const updateArea = async (e) => {
    e.preventDefault();
    try {
      axios.patch(`http://localhost:5000/area/edit/${id}`, {
        kode,
        wilayah,
        kota,
        alamat,
      });
      navigate("/area");
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
          <h2>Ubah Area</h2>

          <div className="card">
            <form onSubmit={updateArea}>
              <div className="my-4">
                <label>Kode</label>
                <input
                  type="text"
                  id="kode"
                  className="input-text"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Wilayah</label>
                <input
                  type="text"
                  id="no_hp"
                  className="input-text"
                  value={wilayah}
                  onChange={(e) => setWilayah(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Kota</label>
                <input
                  type="text"
                  className="input-text"
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Alamat</label>
                <textarea
                  id="alamat"
                  cols="30"
                  rows="10"
                  className="input-text h-24"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                ></textarea>
                {/* <input type="text" id="alamat" className="input-text" /> */}
              </div>

              <div className="flex">
                <Link
                  to="/area"
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

export default AreaEdit;
