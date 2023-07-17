import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { MdDelete, MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DetailTransaksi(props) {
  const [tanggalTransaksi, setTanggal] = useState(Date);
  const [noBon, setNoBon] = useState("");
  const [nama, setNama] = useState("");
  const [nomorHP, setNoHP] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noPol, setNoPol] = useState("");
  const [tglPajak, setTglPajak] = useState("");
  const [tglSTNK, setTglSTNK] = useState("");
  const [layanan, setLayanan] = useState("");
  const [ktp, setKTP] = useState(false);
  const [area, setArea] = useState("");
  const [persyaratan, setPersyaratan] = useState([]);
  const [hargaJasa, setHargaJasa] = useState(0);
  const [hargaPajak, setHargaPajak] = useState(0);
  const [hargaLain, setHargaLain] = useState(0);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [berkas, setBerkas] = useState("");
  const [kantor, setKantor] = useState("");
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [pembayaran, setPembayaran] = useState([]);
  const [statusPembayaran, setStatusPembayaran] = useState("");
  const [totalBayar, setTotalBayar] = useState(0);
  const [tunggakan, setTunggakan] = useState(0);
  const { id } = useParams();

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
    const date = new Date(response.data.createdAt);
    const tgl = date.toLocaleDateString("id");

    setTanggal(tgl);
    setNoBon(response.data.noBon);
    setNama(response.data.wp.nama);
    setNoHP(response.data.wp.nomorHP);
    setAlamat(response.data.wp.alamat);
    setNoPol(response.data.noPol.nomor);
    setTglPajak(response.data.noPol.tglPajak);
    setTglSTNK(response.data.noPol.tglSTNK);
    setLayanan(response.data.layanan.nama);
    setKTP(response.data.layanan.ktp);
    setArea(response.data.area);
    setPersyaratan(response.data.persyaratan);
    setBerkas(response.data.berkas);
    setKantor(response.data.kantor);
    setHargaJasa(response.data.harga.jasa);
    setHargaPajak(response.data.harga.pajak);
    setHargaTotal(response.data.harga.total);
    setStatus(response.data.status);
    setKeterangan(response.data.keterangan);
    setPembayaran(response.data.pembayaran.detail);
    setStatusPembayaran(response.data.pembayaran.status);
    setTotalBayar(response.data.pembayaran.total);
    setTunggakan(response.data.harga.total - response.data.pembayaran.total);
  };

  const deletePembayaran = async (idBayar, jumlahBayar) => {
    const update = pembayaran.filter((bayar) => bayar._id !== idBayar);
    const response = window.confirm("Yakin ingin menghapus data ini?");
    if (response) {
      let newStatusPembayaran =
        totalBayar - jumlahBayar < hargaTotal ? "Belum Lunas" : "Lunas";
      try {
        await axios.patch(`http://localhost:5000/transaksi/edit/${id}`, {
          "pembayaran.status": newStatusPembayaran,
          "pembayaran.detail": update,
        });
        getTransaksiById();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateStatus = async () => {
    const response = window.confirm("Yakin transaksi selesai diproses?");
    let newStatus = "";

    if (statusPembayaran === "Lunas" && status === "Menunggu Pengambilan") {
      newStatus = "Selesai";
    } else if (statusPembayaran === "Lunas") {
      newStatus = "Menunggu Pengambilan";
    } else if (statusPembayaran === "Belum Lunas") {
      newStatus = "Menunggu Pelunasan";
    }

    if (response) {
      try {
        await axios.patch(`http://localhost:5000/transaksi/edit/${id}`, {
          status: newStatus,
        });
        getTransaksiById();
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
          <h2 className="text">Detail Transaksi</h2>
          <div className="card">
            <table className="w-full text-left table-fixed">
              <tr>
                <td>Tanggal Transaksi</td>
                <td>Nomor Bon</td>
                <td>Kantor</td>
                <td>Status Pembayaran</td>
                <td>Status Transaksi</td>
              </tr>
              <tr className=" text-neutral-700">
                <th>{tanggalTransaksi}</th>
                <th>{noBon}</th>
                <th>{kantor}</th>
                <th className="py-1">
                  {statusPembayaran === "Belum Lunas" ? (
                    <span className="badge-yellow">Belum Lunas</span>
                  ) : (
                    <span className="badge-green">Lunas</span>
                  )}
                </th>
                <th>
                  {status === "Selesai" ? (
                    <span className="badge-green">{status}</span>
                  ) : status === "Menunggu Pengambilan" ? (
                    <span className="badge-blue">{status}</span>
                  ) : status === "Menunggu Pelunasan" ? (
                    <span className="badge-yellow">{status}</span>
                  ) : (
                    <span className="badge-gray">{status}</span>
                  )}
                </th>
              </tr>
            </table>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-5">
            <div className="card mt-0">
              <h6>Data WP</h6>
              <hr className="my-2" />
              <table className="w-full text-left border-separate border-spacing-y-2 ">
                <tr className="my-2">
                  <td className="w-1/3">Nama WP</td>
                  <td className="w-6">:</td>
                  <th>{nama}</th>
                </tr>
                <tr className="my-4">
                  <td>No Handphone</td>
                  <td>:</td>
                  <td>{nomorHP}</td>
                </tr>
                <tr>
                  <td className="align-top">Alamat</td>
                  <td className="align-top">:</td>
                  <td>{alamat}</td>
                </tr>
              </table>
            </div>
            <div className="card mt-0">
              <h6>Data Kendaraan</h6>
              <hr className="my-2" />
              <table className="w-full text-left border-separate border-spacing-y-2 ">
                <tr className="my-2">
                  <td className="w-1/3">Nomor Polisi</td>
                  <td className="w-6">:</td>
                  <th>{noPol}</th>
                </tr>
                <tr className="my-4">
                  <td>Tanggal Pajak</td>
                  <td>:</td>
                  <td>{tglPajak}</td>
                </tr>
                <tr>
                  <td>Tanggal STNK</td>
                  <td>:</td>
                  <td>{tglSTNK}</td>
                </tr>
              </table>
            </div>
            <div className="card my-0">
              <h6>Data Pengurusan</h6>
              <hr className="my-2" />
              <table className="w-full text-left border-separate border-spacing-y-2 ">
                <tr className="my-2">
                  <td className="w-1/3">Layanan</td>
                  <td className="w-6">:</td>
                  <th>
                    {layanan} - {ktp === true ? "K" : "N"}
                  </th>
                </tr>
                <tr className="my-4">
                  <td>Area</td>
                  <td>:</td>
                  <th>{area}</th>
                </tr>
                <tr>
                  <td>Persyaratan</td>
                  <td className="align-top">:</td>
                  <td>{persyaratan.toString()}</td>
                </tr>
                <tr>
                  <td>Berkas</td>
                  <td className="align-top">:</td>
                  <td>{berkas}</td>
                </tr>
                <tr>
                  <td>Keterangan</td>
                  <td className="align-top">:</td>
                  <td>{keterangan}</td>
                </tr>
              </table>
            </div>
            <div className="card my-0">
              <h6>Data Harga</h6>
              <hr className="my-2" />
              <table className="w-full text-left border-separate border-spacing-y-2 ">
                <tr>
                  <td className="w-1/3">Biaya Pengurusan</td>
                  <td className="w-6">:</td>
                  <td className="text-neutral-700 text-right">
                    Rp{hargaJasa.toLocaleString("id")}
                  </td>
                </tr>
                <tr>
                  <td>Pajak Terlampir</td>
                  <td>:</td>
                  <td className="text-neutral-700 text-right">
                    Rp{hargaPajak.toLocaleString("id")}
                  </td>
                </tr>
                <tr>
                  <td>Biaya Lainnya</td>
                  <td>:</td>
                  <td className="text-neutral-700 text-right">
                    Rp{hargaLain.toLocaleString("id")}
                  </td>
                </tr>
                <tr>
                  <th className="border-t text-neutral-700">TOTAL HARGA</th>
                  <td className="border-t">:</td>
                  <th className="text-neutral-700 text-xl border-t pt-3 text-right">
                    Rp{hargaTotal.toLocaleString("id")}
                  </th>
                </tr>
                <tr className="font-semibold">
                  <td>Total Pembayaran</td>
                  <td>:</td>
                  <td className="text-neutral-700 text-right">
                    -Rp{totalBayar.toLocaleString("id")}
                  </td>
                </tr>
                <tr>
                  <th className="border-t text-neutral-700">SISA PEMBAYARAN</th>
                  <td className="border-t">:</td>
                  <th className="text-neutral-700 text-xl border-t pt-3 text-right">
                    -Rp
                    {tunggakan.toLocaleString("id")}
                  </th>
                </tr>
              </table>
            </div>
          </div>

          <div className="card overflow-auto rounded-tl rounded-tr shadow my-5">
            <h6>Rincian Pembayaran</h6>
            <hr className="mt-2" />
            <table className="w-full my-3">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="table-cell text-primary font-semibold tracking-wide text-left w-10">
                    No.
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Tanggal Pembayaran
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Jumlah Pembayaran (Rp)
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left">
                    Metode Pembayaran
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left w-10">
                    Opsi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pembayaran.map((bayar, i) => {
                  let date = new Date(bayar.createdAt);
                  let tgl = date.toLocaleDateString("id");

                  return (
                    <tr className="bg-white border-b-2">
                      <td className="table-cell">{i + 1}</td>
                      <td className="table-cell font-bold">{tgl}</td>
                      <td className="table-cell">
                        {bayar.jumlah.toLocaleString("id")}
                      </td>
                      <td className="table-cell">{bayar.metode}</td>
                      <td className="table-cell">
                        {status !== "Selesai" ? (
                          <button
                            className="bg-red-400 text-white p-1 m-1 rounded flex items-center justify-center "
                            onClick={() =>
                              deletePembayaran(bayar._id, bayar.jumlah)
                            }
                          >
                            <MdDelete size={18} />
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            <div className="flex">
              {" "}
              <Link
                to="/transaksi"
                className="btn-red flex px-3 py-2 mr-2 items-center justify-center"
              >
                <span className="inline-block mr-1">
                  <MdOutlineArrowBack size={20} />
                </span>
                <span>Batal</span>
              </Link>
              {status === "Sedang Diproses" ||
              status === "Menunggu Pengambilan" ? (
                <button
                  className="btn-green items-center px-3 py-2 justify-center"
                  onClick={() => updateStatus()}
                >
                  <span className="inline-block mr-1"></span>
                  <span>
                    {status === "Menunggu Pengambilan"
                      ? "SELESAI"
                      : "Beres Diproses"}
                  </span>
                </button>
              ) : null}
            </div>
            {statusPembayaran === "Belum Lunas" ? (
              <Link
                to={`/pembayaran/${id}`}
                className="btn-blue items-center px-3 py-2 justify-center"
              >
                <span className="inline-block mr-1">
                  <MdSave size={20} />
                </span>
                <span>Tambah Pembayaran</span>
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}

export default DetailTransaksi;
