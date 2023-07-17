import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MdOutlineAdd,
  MdOutlinePrint,
  MdRemoveRedEye,
  MdEdit,
  MdDelete,
  MdSearch,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import JsPDF from "jspdf";

function Transaksi(props) {
  const [transaksi, setTransaksi] = useState([]);
  const [search, setSearch] = useState("");
  const [listKantor, setListKantor] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    props.refreshToken();
    getTransaksi();
    getKantor();
  }, []);

  const getTransaksi = async () => {
    const response = await props.axiosJWT.get(
      "http://localhost:5000/transaksi",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    setTransaksi(response.data);
  };

  const getKantor = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/kantor", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setListKantor(response.data);
  };

  const deleteTransaksi = async (id) => {
    const response = window.confirm("Yakin ingin menghapus data ini?");
    if (response) {
      try {
        await axios.delete(`http://localhost:5000/transaksi/${id}`);
        getTransaksi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeURL = async (field, value) => {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    value === "Semua" || value === ""
      ? searchParams.delete(field)
      : searchParams.set(field, value);

    // const obj = Object.fromEntries(searchParams);
    const newUrl = `/transaksi?${searchParams.toString()}`;
    navigate(newUrl);

    const response = await props.axiosJWT.get(
      `http://localhost:5000/transaksi-filter?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    setTransaksi(response.data);
  };

  const generatePDF = () => {
    const report = new JsPDF("landscape", "pt", "a4");
    report.html(document.querySelector("#table-transaksi")).then(() => {
      report.save("report.pdf");
    });
  };
  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2 className="text">Daftar Transaksi</h2>

          <div className="mt-7 mb-4 flex">
            <Link to="/transaksi/tambah" className="btn-blue p-2">
              <span className="inline-block">
                <MdOutlineAdd size="25" />
              </span>
              <span className="ml-1">Tambah Transaksi</span>
            </Link>
            <DownloadTableExcel
              filename="Daftar Transaksi"
              sheet="Transaksi"
              currentTableRef={tableRef.current}
            >
              <button type="button" className="btn-green p-2">
                <MdOutlinePrint size="25" />
                <span className="ml-1">Cetak Tabel</span>
              </button>
            </DownloadTableExcel>
            {/* <button onClick={generatePDF} type="button">
              Export PDF
            </button> */}
          </div>

          {/* Filter */}
          <div className="card">
            <h6 className="text -base font-bold">Filter</h6>
            {/* <label for="cari">Cari</label> */}
            <form action="">
              <div className="grid grid-cols-5 gap-2">
                <div className="my-2">
                  <label className="block">Cari</label>
                  <div className="w-full flex items-center border pr-2 mt-2 rounded box-border">
                    <input
                      type="text"
                      id="cari"
                      className="mr-2 input-text mt-0 border-0"
                      placeholder="Nomor Bon / Nomor Polisi"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <label>
                      <MdSearch size={25} />
                    </label>
                  </div>
                </div>
                <div className="my-2">
                  <label className="block">Dari Tanggal</label>
                  <input
                    type="date"
                    id="tanggal"
                    className="input-text"
                    onChange={(e) => changeURL("from", e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label className="block">Sampai Tanggal</label>
                  <input
                    type="date"
                    id="tanggal"
                    className="input-text"
                    onChange={(e) => changeURL("to", e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <label className="block">Kantor</label>
                  <select
                    id="kantor"
                    className="input-text"
                    onChange={(e) => changeURL("kantor", e.target.value)}
                  >
                    <option value="Semua">Semua</option>
                    {listKantor.map((item) => (
                      <option value={item.kodeKantor}>{item.kodeKantor}</option>
                    ))}
                  </select>
                </div>
                <div className="my-2">
                  <label className="block">Status Transaksi</label>
                  <select
                    id="status"
                    className="input-text"
                    onChange={(e) => changeURL("status", e.target.value)}
                  >
                    <option value="Semua">Semua</option>
                    <option value="Sedang Diproses">Sedang Diproses</option>
                    <option value="Menunggu Pelunasan">
                      Menunggu Pelunasan
                    </option>
                    <option value="Menunggu Pengambilan">
                      Menunggu Pengambilan
                    </option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              {/* <div className="flex items-center mt-2">
                <label>Status</label>
                <div className="px-2 ml-2 overflow-scroll whitespace-nowrap lg:overflow-auto">
                  <button className="btn-red px-3 py-2 mx-0.5 rounded-full">
                    Semua
                  </button>
                  <button className="btn-secondary px-3 py-2 mx-0.5 rounded-full">
                    Diproses
                  </button>
                  <button className="btn-secondary px-3 py-2 mx-0.5 rounded-full">
                    Menunggu Pelunasan
                  </button>
                  <button className="btn-secondary px-3 py-2 mx-0.5 rounded-full">
                    Selesai
                  </button>
                </div>
              </div> */}
            </form>
          </div>

          <div className="overflow-auto rounded-tl rounded-tr shadow max-h-[80vh]">
            <table
              className="table-auto w-full"
              ref={tableRef}
              id="table-transaksi"
            >
              <thead className="bg-white border-b-2 border-gray-200 sticky top-0 ">
                <tr>
                  <th className="table-cell text-primary font-semibold text-left">
                    No
                  </th>
                  <th className="table-cell font-semibold text-left">
                    Tanggal
                  </th>
                  <th className="table-cell font-semibold text-left">
                    No. Bon
                  </th>
                  <th className="table-cell font-semibold text-left">NoPol</th>
                  <th className="table-cell font-semibold text-left">
                    Layanan
                  </th>
                  <th className="table-cell font-semibold text-left">Area</th>
                  <th className="table-cell font-semibold text-left">Kantor</th>
                  <th className="table-cell font-semibold text-left">Berkas</th>
                  <th className="table-cell font-semibold text-left">
                    Total Harga (Rp)
                  </th>
                  <th className="table-cell font-semibold text-left">
                    Tunggakan (Rp)
                  </th>
                  <th className="table-cell font-semibold text-left">Status</th>
                  <th className="table-cell font-semibold text-left w-10">
                    Opsi
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi
                  .filter((tr) => {
                    return search.toLowerCase() === ""
                      ? tr
                      : tr.noBon.toLowerCase().includes(search) ||
                          tr.noPol.nomor.toLowerCase().includes(search);
                  })
                  .map((tr, i) => {
                    let date = new Date(tr.createdAt);
                    let tgl = date.toLocaleDateString("id");
                    let tunggakan = tr.pembayaran.total - tr.harga.total;
                    return (
                      <tr className="bg-white border-b-2" key={tr._id}>
                        <td className="table-cell">{i + 1}</td>
                        <td className="table-cell font-semibold">{tgl}</td>
                        <td className="table-cell">{tr.noBon}</td>
                        <td className="table-cell">{tr.noPol.nomor}</td>
                        <td className="table-cell">
                          {tr.layanan.nama} -{" "}
                          {tr.layanan.ktp === true ? "K" : "N"}
                        </td>
                        <td className="table-cell">{tr.area}</td>
                        <td className="table-cell">{tr.kantor}</td>
                        <td className="table-cell">{tr.berkas}</td>
                        <td className="table-cell">
                          {tr.harga.total.toLocaleString(`id-ID`)}
                        </td>
                        <td className="table-cell">
                          {tunggakan < 0 ? (
                            tunggakan.toLocaleString(`id-ID`)
                          ) : (
                            <span className="badge-green">Lunas</span>
                          )}
                        </td>
                        <td className="table-cell">
                          {tr.status === "Selesai" ? (
                            <span className="badge-green">{tr.status}</span>
                          ) : tr.status === "Menunggu Pengambilan" ? (
                            <span className="badge-blue">{tr.status}</span>
                          ) : tr.status === "Menunggu Pelunasan" ? (
                            <span className="badge-yellow">{tr.status}</span>
                          ) : (
                            <span className="badge-gray">{tr.status}</span>
                          )}
                        </td>
                        <td className="table-cell">
                          <div className="h-full flex flex-col justify-around text-white lg:flex-row">
                            <Link
                              to={`/transaksi/${tr._id}`}
                              className="bg-blue-400 p-1 m-1 rounded flex items-center justify-center"
                            >
                              <span>
                                <MdRemoveRedEye size={18} />
                              </span>
                            </Link>
                            <Link
                              to={`/transaksi/edit/${tr._id}`}
                              className="bg-yellow-400 p-1 m-1 rounded flex items-center justify-center"
                            >
                              <MdEdit size={18} />
                            </Link>
                            <button
                              onClick={() => deleteTransaksi(tr._id)}
                              className="bg-red-400 p-1 m-1 rounded flex items-center justify-center"
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* <div className="w-full p-3 bg-white border-t-2 rounded-bl rounded-br ">
      <button className="bg-white text-blue-500 py-1 px-3 rounded-tl rounded-bl border-2">
        Previous
      </button>
      <button className="bg-blue-500 py-1 px-3 text-white">1</button>
      <button className="bg-white text-blue-500 py-1 px-3 rounded-tr rounded-br border-2">
        Next
      </button>
    </div> */}
        </section>
      </main>
    </>
  );
}

export default Transaksi;
