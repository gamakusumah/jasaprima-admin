import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

function PembayaranTambah(props) {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [pembayaran, setPembayaran] = useState([]);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);

  const [jumlah, setJumlah] = useState();
  const [metode, setMetode] = useState("Tunai");
  const navigate = useNavigate();

  useEffect(() => {
    props.refreshToken();
    getTransaksiById();
  }, []);

  const getTransaksiById = async () => {
    const response = await props.axiosJWT.get(
      `http://localhost:5000/transaksi/${id}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    setStatus(response.data.status);
    setHargaTotal(response.data.harga.total);
    setTotalPembayaran(response.data.pembayaran.total);
    setPembayaran(response.data.pembayaran.detail);
    setJumlah(response.data.harga.total - response.data.pembayaran.total);
  };

  const savePembayaran = async (e) => {
    const response = window.confirm("Tambah pembayaran?");
    if (response) {
      e.preventDefault();

      let total = jumlah + totalPembayaran;
      let statusPembayaran = total >= hargaTotal ? "Lunas" : "Belum Lunas";
      let newStatus =
        total >= hargaTotal && status === "Menunggu Pelunasan"
          ? "Menunggu Pengambilan"
          : status;

      pembayaran.push({ jumlah, metode });

      try {
        await axios.patch(`http://localhost:5000/transaksi/edit/${id}`, {
          status: newStatus,
          "pembayaran.status": statusPembayaran,
          "pembayaran.total": total,
          "pembayaran.detail": pembayaran,
        });
        navigate(`/transaksi/${id}`);
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
          <h2>Ubah Pembayaran</h2>

          <div className="card">
            <form onSubmit={savePembayaran}>
              <div className="my-4">
                <label>Jumlah Pembayaran (Rp)</label>
                <input
                  type="number"
                  className="input-text"
                  value={jumlah}
                  onChange={(e) => setJumlah(parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="my-4">
                <span>Metode Pembayaran</span>
                <select
                  className="input-text"
                  onChange={(e) => setMetode(e.target.value)}
                >
                  <option value="Tunai">Tunai</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>

              <div className="flex">
                <Link
                  to={`/transaksi/${id}`}
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

export default PembayaranTambah;
