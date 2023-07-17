import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

function WPEdit(props) {
  const [wp, setWp] = useState([]);
  const [nama, setNama] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kantor, setKantor] = useState("HOME");
  const { id } = useParams();
  const navigate = useNavigate();
  const [listKantor, setList] = useState([]);

  useEffect(() => {
    props.refreshToken();
    getWpById();
    getKantor();
  }, []);

  const getWpById = async () => {
    const response = await props.axiosJWT.get(
      `http://localhost:5000/wp/${id}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    setWp(response.data);
    setNama(response.data.nama);
    setNomorHP(response.data.nomorHP);
    setAlamat(response.data.alamat);
    setKantor(response.data.kantor);
  };

  const getKantor = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/kantor", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setList(response.data);
  };

  const updateWp = async (e) => {
    const response = window.confirm("Yakin ingin mengubah data ini?");
    if (response) {
      e.preventDefault();
      if (nomorHP !== wp.nomorHP) {
        try {
          const wp = (
            await props.axiosJWT.get("http://localhost:5000/wp", {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            })
          ).data;
          const foundNomorHp = wp.filter((e) => e.nomorHP === nomorHP);
          if (foundNomorHp.length === 0) {
            try {
              await axios.patch(`http://localhost:5000/wp/edit/${id}`, {
                nama,
                nomorHP,
                alamat,
                kantor,
              });
              navigate("/wp");
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Nomor Handphone WP Sudah Ada!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await axios.patch(`http://localhost:5000/wp/edit/${id}`, {
            nama,
            nomorHP,
            alamat,
            kantor,
          });
          navigate("/wp");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2>Tambah WP Baru</h2>

          <div className="card">
            <form onSubmit={updateWp}>
              <div className="my-4">
                <label>Nama</label>
                <input
                  type="text"
                  id="nama"
                  className="input-text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>No Handphone</label>
                <input
                  type="text"
                  id="no_hp"
                  className="input-text"
                  value={nomorHP}
                  onChange={(e) => setNomorHP(e.target.value)}
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
              <div className="my-4">
                <label>Kantor</label>
                <select
                  id="kantor"
                  className="input-text"
                  value={kantor}
                  onChange={(e) => setKantor(e.target.value)}
                >
                  {listKantor.map((kantor) => (
                    <option value={kantor.kodeKantor}>
                      {kantor.kodeKantor} - {kantor.statusKantor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex">
                <Link
                  to="/wp"
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

export default WPEdit;
