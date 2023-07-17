import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdSave, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function TransaksiTambah(props) {
  const [noBon, setNoBon] = useState("");
  const [nama, setNama] = useState("Unknown");
  const [nomorHP, setNomorHP] = useState("");
  const [alamat, setAlamat] = useState("");

  const [wilNoPol, setWilNoPol] = useState("D");
  const [noPol, setNoPol] = useState("");
  const [subNoPol, setSubNoPol] = useState("");
  const [tglPajak, setTglPajak] = useState("");
  const [tglSTNK, setTglSTNK] = useState("");

  const [layanan, setLayanan] = useState("Ulang");
  const [ktp, setKTP] = useState(false);
  const [area, setArea] = useState("B.BRT");
  const [persyaratan, setPersyaratan] = useState([]);
  const [hargaJasa, setHargaJasa] = useState(0);
  const [hargaPajak, setHargaPajak] = useState(0);
  const [hargaLain, setHargaLain] = useState(0);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [berkas, setBerkas] = useState("Ada");
  const [kantor, setKantor] = useState("HOME");
  const [status, setStatus] = useState("Sedang Diproses");
  const [keterangan, setKeterangan] = useState("");
  let statusPembayaran = "";
  const [jumlah, setJumlah] = useState(0);
  const [metode, setMetode] = useState("Tunai");

  const navigate = useNavigate();
  const [listLayanan, setListLayanan] = useState([]);
  const [listKantor, setListKantor] = useState([]);
  const [listArea, setListArea] = useState([]);

  useEffect(() => {
    props.refreshToken();
    getLayanan();
    getKantor();
    getArea();
  }, []);

  const tampil = async () => {
    // console.log(noBon);
    // console.log(nama);
    // console.log(nomorHP);
    // console.log(alamat);
    // console.log(noPol);
    // console.log(tglPajak);
    // console.log(tglSTNK);
    // console.log(layanan);
    // console.log(ktp);
    // console.log(area);
    // console.log(persyaratan);
    // console.log(hargaJasa);
    // console.log(hargaPajak);
    // console.log(hargaLain);
    // console.log(hargaTotal);
    // console.log(status);
    // console.log(keterangan);
    // console.log(statusPembayaran);
    // console.log(jumlah);
    // console.log(metode);
  };

  const getLayanan = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/layanan", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setListLayanan(response.data);
  };

  const getKantor = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/kantor", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setListKantor(response.data);
  };

  const getArea = async () => {
    const response = await props.axiosJWT.get("http://localhost:5000/area", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    setListArea(response.data);
  };

  const sum1 = (jasa) => {
    const total = parseInt(jasa) + parseInt(hargaPajak) + parseInt(hargaLain);
    if (!isNaN(jasa)) {
      setHargaJasa(jasa);
      setHargaTotal(total);
    }
  };

  const sum2 = (pajak) => {
    const total = parseInt(hargaJasa) + parseInt(pajak) + parseInt(hargaLain);
    if (!isNaN(pajak)) {
      setHargaPajak(pajak);
      setHargaTotal(total);
    }
  };

  const sum3 = (lain) => {
    const total = parseInt(hargaJasa) + parseInt(hargaPajak) + parseInt(lain);
    if (!isNaN(lain)) {
      setHargaLain(lain);
      setHargaTotal(total);
    }
  };

  const handleArea = (value) => {
    const inputArea = document.getElementById("area");
    const inputAreaLain = document.getElementById("areaLain");

    if (value === true) {
      inputArea.disabled = true;
      inputAreaLain.disabled = false;
    } else {
      inputArea.disabled = false;
      inputAreaLain.disabled = true;
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const syarat = persyaratan;

    // console.log(`${value} is ${checked}`);
    if (checked) {
      syarat.push(value);
      setPersyaratan(syarat);
    } else {
      setPersyaratan(syarat.filter((e) => e !== value));
    }
  };

  const saveTransaksi = async (e) => {
    const response = window.confirm("Tambah transaksi baru?");
    if (response) {
      e.preventDefault();
      const nomorPolisi = wilNoPol + " " + noPol + " " + subNoPol;
      jumlah === hargaTotal
        ? (statusPembayaran = "Lunas")
        : (statusPembayaran = "Belum Lunas");

      try {
        const transaksi = (
          await props.axiosJWT.get("http://localhost:5000/transaksi", {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
          })
        ).data;
        const foundNoBon = transaksi.filter((e) => e.noBon === noBon);
        if (foundNoBon.length === 0) {
          // Save Transaksi
          try {
            await axios.post("http://localhost:5000/transaksi/tambah", {
              noBon,
              "wp.nama": nama,
              "wp.nomorHP": nomorHP,
              "wp.alamat": alamat,
              "noPol.nomor": nomorPolisi,
              "noPol.tglPajak": tglPajak,
              "noPol.tglSTNK": tglSTNK,
              "layanan.nama": layanan,
              "layanan.ktp": ktp,
              area,
              berkas,
              kantor,
              persyaratan,
              "harga.jasa": hargaJasa,
              "harga.pajak": hargaPajak,
              "harga.lain": hargaLain,
              "harga.total": hargaTotal,
              status,
              keterangan,
              "pembayaran.status": statusPembayaran,
              "pembayaran.total": jumlah,
              "pembayaran.detail": [{ jumlah, metode }],
            });

            // Save WP Conditions
            if (nomorHP !== "") {
              const wp = await axios.get(
                `http://localhost:5000/wp/noHP/${nomorHP}`
              );
              if (wp.data !== null) {
                const kendaraan = wp.data.kendaraan;
                const found = kendaraan.find((e) => e === nomorPolisi);
                if (found === undefined) {
                  kendaraan.push(nomorPolisi);
                  try {
                    await axios.patch(
                      `http://localhost:5000/wp/edit/${wp.data._id}`,
                      {
                        kendaraan,
                      }
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }
              } else {
                try {
                  axios.post("http://localhost:5000/wp/tambah", {
                    nama,
                    nomorHP,
                    alamat,
                    kantor,
                    kendaraan: [nomorPolisi],
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }

          // Save Kendaraaan
          const findKendaraan = await axios.get(
            `http://localhost:5000/kendaraan/noPol/${nomorPolisi}`
          );
          if (findKendaraan.data === null) {
            try {
              axios.post("http://localhost:5000/kendaraan/tambah", {
                noPol: nomorPolisi,
                tglPajak,
                tglSTNK,
              });
              navigate("/transaksi");
            } catch (error) {
              console.log(error);
            }
          } else {
            navigate("/transaksi");
          }
        } else {
          alert("Nomor Bon Sudah!");
        }
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
          <h2>Tambah Transaksi Baru</h2>

          <form onSubmit={saveTransaksi}>
            <div className="lg:grid lg:grid-cols-3 lg:gap-4">
              <div className="col-span-2">
                <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                  <div className="card">
                    <h6>Data Wajib Pajak (WP)</h6>
                    <div className="my-4">
                      <label>Nama</label>
                      <input
                        type="text"
                        id="nama"
                        className="input-text"
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </div>
                    <div className="my-4">
                      <label>No Handphone</label>
                      <input
                        type="number"
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
                    </div>
                  </div>
                  <div className="card">
                    <h6>Data Kendaraan</h6>
                    <div className="my-4">
                      <label>Nomor Polisi</label>
                      <div className="grid grid-cols-5 gap-4">
                        <input
                          type="text"
                          className="input-text text-center"
                          minLength="1"
                          maxLength={2}
                          value={wilNoPol}
                          required
                          onChange={(e) =>
                            setWilNoPol(e.target.value.toUpperCase())
                          }
                        />
                        <input
                          type="number"
                          className="input-text col-span-3 text-center"
                          minLength="1"
                          maxLength={4}
                          placeholder="1234"
                          value={noPol}
                          required
                          onChange={(e) =>
                            setNoPol(e.target.value.toUpperCase())
                          }
                        />
                        <input
                          type="text"
                          className="input-text text-center"
                          minLength="1"
                          maxLength={3}
                          placeholder="XXX"
                          value={subNoPol}
                          required
                          onChange={(e) =>
                            setSubNoPol(e.target.value.toUpperCase())
                          }
                        />
                      </div>
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
                  </div>
                </div>
                <div className="card">
                  <h6>Data Pengurusan</h6>
                  <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="lg:h-72 lg:grid lg:grid-rows-3">
                      <div className="my-4">
                        <label>Nomor Bon</label>
                        <input
                          type="text"
                          className="input-text"
                          value={noBon}
                          onChange={(e) =>
                            setNoBon(e.target.value.toUpperCase())
                          }
                          required
                        />
                      </div>
                      <div className="my-4 lg:grid lg:grid-cols-2 lg:gap-2">
                        <div>
                          <label>Area</label>
                          <select
                            className="input-text"
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                          >
                            {listArea.map((ar) => (
                              <option value={ar.kode}>
                                {ar.kode} - {ar.wilayah}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="checkbox align-middle">
                            <label>Area Lainnya</label>
                            <input
                              type="checkbox"
                              className="input-checkbox ml-1"
                              onChange={(e) => handleArea(e.target.checked)}
                            />
                          </div>
                          <input
                            type="text"
                            id="areaLain"
                            className="input-text"
                            onChange={(e) =>
                              setArea(e.target.value.toUpperCase())
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className="my-4">
                        <label>Layanan</label>
                        <div className="lg:grid lg:grid-cols-3 mt-2">
                          <div className="lg:col-span-2">
                            <select
                              className="input-text mt-0"
                              value={layanan}
                              onChange={(e) => setLayanan(e.target.value)}
                            >
                              {listLayanan.map((lay) => (
                                <option value={lay.kode}>{lay.kode}</option>
                              ))}
                            </select>
                          </div>
                          <div className="checkbox ml-3 align-middle">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="K"
                              onChange={(e) => setKTP(e.target.checked)}
                            />
                            <label>KTP</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="my-7 w-[95%] mx-auto bg-gray-300 lg:hidden" />

                    <div className="lg:h-72 lg:grid lg:grid-rows-3">
                      <div className="my-4">
                        <label>Syarat Pengurusan</label>
                        <div className="my-2 lg:grid lg:grid-cols-3">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="STNK Asli"
                              onChange={handleChange}
                            />
                            <label>STNK Asli</label>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="KTP Asli"
                              onChange={handleChange}
                            />
                            <label>KTP Asli</label>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="BPKB Asli"
                              onChange={handleChange}
                            />
                            <label>BPKB Asli</label>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="FC STNK"
                              onChange={handleChange}
                            />
                            <label>FC STNK</label>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="FC KTP"
                              onChange={handleChange}
                            />
                            <label>FC KTP</label>
                          </div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              value="FC BPKB"
                              onChange={handleChange}
                            />
                            <label>FC BPKB</label>
                          </div>
                        </div>
                      </div>
                      <div className="my-4 lg:grid lg:grid-cols-2 lg:gap-2">
                        <div>
                          <label>Berkas</label>
                          <select
                            className="input-text"
                            value={berkas}
                            onChange={(e) => setBerkas(e.target.value)}
                          >
                            <option value="Ada">Ada</option>
                            <option value="Tidak Ada">Tidak Ada</option>
                          </select>
                        </div>
                        <div>
                          <label>Kantor</label>
                          <select
                            className="input-text"
                            value={kantor}
                            onChange={(e) => setKantor(e.target.value)}
                          >
                            {listKantor.map((kan) => (
                              <option value={kan.kodeKantor}>
                                {kan.kodeKantor}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="my-4">
                        <label>Keterangan</label>
                        <input
                          type="text"
                          id="keterangan"
                          className="input-text"
                          value={keterangan}
                          onChange={(e) => setKeterangan(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card">
                  <h6>Data Harga</h6>
                  <div className="my-4">
                    <label>Biaya Pengurusan (Rp)</label>
                    <div className="lg:grid lg:grid-cols-3">
                      <input
                        type="number"
                        className="input-text lg:col-span-2"
                        min="1"
                        onChange={(e) => sum1(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        className="input-text"
                        value=".000"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Pajak Terlampir (Rp)</label>
                    <div className="lg:grid lg:grid-cols-3">
                      <input
                        type="number"
                        className="input-text lg:col-span-2"
                        min="1"
                        onChange={(e) => sum2(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        className="input-text"
                        value=".000"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Biaya Lain (Rp)</label>
                    <div className="lg:grid lg:grid-cols-3">
                      <input
                        type="number"
                        className="input-text lg:col-span-2"
                        min="0"
                        onChange={(e) => sum3(e.target.value)}
                      />
                      <input
                        type="text"
                        className="input-text"
                        value=".000"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Total Harga (Rp)</label>
                    <div className="lg:grid lg:grid-cols-3">
                      <input
                        type="number"
                        className="input-text lg:col-span-2"
                        min="1"
                        value={hargaTotal.toLocaleString("id")}
                        disabled
                      />
                      <input
                        type="text"
                        className="input-text"
                        value=".000"
                        disabled
                      />
                    </div>
                  </div>

                  <hr className="my-5" />

                  <h6>Data Pembayaran</h6>
                  <div className="mt-2 mb-4">
                    <label>Jumlah Pembayaran (Rp)</label>
                    <div className="lg:grid lg:grid-cols-3">
                      <input
                        id="jumlah"
                        type="number"
                        className="input-text lg:col-span-2"
                        min="1"
                        onChange={(e) => setJumlah(parseInt(e.target.value))}
                        required
                      />
                      <input
                        type="text"
                        className="input-text"
                        value=".000"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label>Metode Pembayaran</label>
                    <select
                      id="metode"
                      className="input-text"
                      value={metode}
                      onChange={(e) => setMetode(e.target.value)}
                    >
                      <option value="Tunai">Tunai</option>
                      <option value="Transfer">Transfer</option>
                    </select>
                  </div>
                </div>
                <div className="lg:grid lg:grid-cols-2">
                  <Link
                    to="/transaksi"
                    className="btn-red flex px-3 py-4 mr-2 items-center justify-center"
                  >
                    <span className="inline-block mr-1">
                      <MdOutlineArrowBack size={20} />
                    </span>
                    <span>Batal</span>
                  </Link>
                  <button
                    type="submit"
                    className="btn-blue items-center px-3 py-4 justify-center"
                  >
                    <span className="inline-block mr-1">
                      <MdSave size={20} />
                    </span>
                    <span>Simpan</span>
                  </button>
                  {/* <button type="button" onClick={() => tampil()}>
              Tampil
            </button> */}
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default TransaksiTambah;
