import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Masuk from "./pages/Masuk.js";
import { Dashboard } from "./pages/Dashboard.js";
import Transaksi from "./pages/Transaksi.js";
import TransaksiTambah from "./pages/TransaksiTambah.js";
import TransaksiEdit from "./pages/TransaksiEdit.js";
import DetailTransaksi from "./pages/DetailTransaksi.js";
import PembayaranTambah from "./pages/PembayaranTambah.js";
import WP from "./pages/WP.js";
import WPTambah from "./pages/WPTambah.js";
import WPEdit from "./pages/WPEdit.js";
import Kendaraan from "./pages/Kendaraan.js";
import KendaraanTambah from "./pages/KendaraanTambah.js";
import KendaraanEdit from "./pages/KendaraanEdit.js";
import Admin from "./pages/Admin.js";
import AdminTambah from "./pages/AdminTambah.js";
import AdminEdit from "./pages/AdminEdit.js";
import Kantor from "./pages/Kantor.js";
import KantorTambah from "./pages/KantorTambah";
import KantorEdit from "./pages/KantorEdit.js";
import Layanan from "./pages/Layanan.js";
import LayananTambah from "./pages/LayananTambah.js";
import LayananEdit from "./pages/LayananEdit.js";
import Area from "./pages/Area.js";
import AreaTambah from "./pages/AreaTambah.js";
import AreaEdit from "./pages/AreaEdit.js";
import axios from "axios";
import jwt_decode from "jwt-decode";

function App() {
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const [nama, setNama] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://jasaprima-admin-api.vercel.app/token");
      setToken(response.data.accessToken);
      const decode = jwt_decode(response.data.accessToken);
      setExpired(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get("https://jasaprima-admin-api.vercel.app/token");
        config.headers.Authorization = `JWT ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwt_decode(response.data.accessToken);
        setExpired(decode.exp);
        setNama(decode.nama);
        setLevel(decode.level);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="App md:flex">
      <Routes>
        <Route path="/" element={<Masuk />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              refreshToken={refreshToken}
              token={token}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/transaksi"
          element={
            <Transaksi
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/transaksi/tambah"
          element={
            <TransaksiTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/transaksi/edit/:id"
          element={
            <TransaksiEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/transaksi/:id"
          element={
            <DetailTransaksi
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/pembayaran/:id"
          element={
            <PembayaranTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/wp"
          element={
            <WP
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/wp/tambah"
          element={
            <WPTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/wp/edit/:id"
          element={
            <WPEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kendaraan"
          element={
            <Kendaraan
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kendaraan/tambah"
          element={
            <KendaraanTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kendaraan/edit/:id"
          element={
            <KendaraanEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/admin/tambah"
          element={
            <AdminTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kantor"
          element={
            <Kantor
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kantor/tambah"
          element={
            <KantorTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/kantor/edit/:id"
          element={
            <KantorEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/layanan"
          element={
            <Layanan
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/layanan/tambah"
          element={
            <LayananTambah
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/layanan/edit/:id"
          element={
            <LayananEdit
              token={token}
              refreshToken={refreshToken}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/area"
          element={
            <Area
              refreshToken={refreshToken}
              token={token}
              axiosJWT={axiosJWT}
              nama={nama}
              level={level}
            />
          }
        />
        <Route
          path="/area/tambah"
          element={
            <AreaTambah refreshToken={refreshToken} nama={nama} level={level} />
          }
        />
        <Route
          path="/area/edit/:id"
          element={
            <AreaEdit refreshToken={refreshToken} nama={nama} level={level} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
