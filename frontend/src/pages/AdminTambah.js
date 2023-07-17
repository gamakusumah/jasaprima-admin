import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function AdminTambah(props) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomorHP, setNomorHP] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [kantor, setKantor] = useState("HOME");
  const [level, setLevel] = useState("Master");
  const navigate = useNavigate();
  const [listKantor, setList] = useState([]);
  const [msg, setMsg] = useState("");

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
    setList(response.data);
  };

  const saveAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/tambah", {
        nama,
        email,
        nomorHP,
        password,
        confPassword,
        kantor,
        level,
      });
      navigate("/admin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2>Tambah Admin Baru</h2>

          <div className="card">
            <form onSubmit={saveAdmin}>
              <div className="my-4">
                <label for="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  className="input-text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="input-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label for="no_hp">No Handphone</label>
                <input
                  type="number"
                  id="no_hp"
                  className="input-text"
                  value={nomorHP}
                  onChange={(e) => setNomorHP(e.target.value)}
                />
              </div>
              <div className="my-4">
                <label>Password</label>
                <input
                  type="password"
                  className="input-text"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                />
              </div>
              <div className="my-4">
                <label>Konfirmasi Password</label>
                <input
                  type="password"
                  className="input-text"
                  onChange={(e) => setConfPassword(e.target.value)}
                  minLength={8}
                />
                <span className="text-red-600">{msg}</span>
              </div>
              <div className="my-4">
                <label for="kantor">Kantor</label>
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
              <div className="my-4">
                <label for="status">Status</label>
                <select
                  id="status"
                  className="input-text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="Master">Master</option>
                  <option value="Basic">Basic</option>
                  <option value="Owner">Owner</option>
                  <option value="dev">dev</option>
                </select>
              </div>

              <div className="flex">
                <Link
                  to="/admin"
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

export default AdminTambah;
