import React from "react";
import axios from "axios";
import LogoJP from "../assets/img/jp-logo.png";
import {
  MdHomeFilled,
  MdListAlt,
  MdCreditCard,
  MdPeopleAlt,
  MdDirectionsCarFilled,
  MdAdminPanelSettings,
  MdAccountBalance,
  MdMap,
  MdFactCheck,
  MdPrint,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar(props) {
  const navigate = useNavigate();

  function showSidebar() {
    const sidebar = document.getElementById("sidebar");
    const hamMenu = document.getElementById("icon-menu");
    const hamClose = document.getElementById("icon-close");

    sidebar.classList.toggle("hidden");
    hamMenu.classList.toggle("hidden");
    hamClose.classList.toggle("hidden");
  }

  const Keluar = async () => {
    const confirm = window.confirm("Yakin ingin keluar?");
    if (confirm) {
      try {
        await axios.delete("http://localhost:5000/keluar");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <nav
        id="sidebar"
        className="w-[216px] py-5 h-screen border-r font-poppins text-center bg-white fixed hidden md:block"
      >
        <div>
          <Link to="/" className="flex items-center justify-center">
            <img src={LogoJP} className="h-6" alt="Jasa Prima Logo" />
            <span className="text-xl font-bold mx-1">Jasa Prima</span>
          </Link>
        </div>
        <ul className="my-6 mx-2 text-secondary">
          <li className="rounded hover:text-white hover:bg-redjp">
            <Link to="/dashboard" className="nav-link">
              <MdHomeFilled size={20} />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <hr className="my-2" />
          <li className="rounded hover:text-white hover:bg-redjp">
            <Link to="/transaksi" className="nav-link">
              <MdListAlt size={20} />
              <span className="ml-3">Daftar Transaksi</span>
            </Link>
          </li>
          {/* <li className="rounded hover:text-white hover:bg-redjp">
            <Link to="/pembayaran" className="nav-link">
              <MdCreditCard size={20} />
              <span className="ml-3">Pembayaran</span>
            </Link>
          </li> */}
          <li className="rounded hover:text-white hover:bg-redjp">
            <Link to="/wp" className="nav-link">
              <MdPeopleAlt size={20} />
              <span className="ml-3">Wajib Pajak</span>
            </Link>
          </li>
          <li className="rounded hover:text-white hover:bg-redjp">
            <Link to="/kendaraan" className="nav-link">
              <MdDirectionsCarFilled size={20} />
              <span className="ml-3">Kendaraan</span>
            </Link>
          </li>
          <hr className="my-2" />

          {props.level === "Master" || props.level === "dev" ? (
            <>
              {props.level === "dev" ? (
                <li className="rounded hover:text-white hover:bg-redjp">
                  <Link to="/admin" className="nav-link">
                    <MdAdminPanelSettings size={20} />
                    <span className="ml-3">Admin</span>
                  </Link>
                </li>
              ) : null}
              <li className="rounded hover:text-white hover:bg-redjp">
                <Link to="/kantor" className="nav-link">
                  <MdAccountBalance size={20} />
                  <span className="ml-3">Kantor</span>
                </Link>
              </li>
              <hr className="my-2" />
              <li className="rounded hover:text-white hover:bg-redjp">
                <Link to="/layanan" className="nav-link">
                  <MdFactCheck size={20} />
                  <span className="ml-3">Layanan</span>
                </Link>
              </li>
              <li className="rounded hover:text-white hover:bg-redjp">
                <Link to="/area" className="nav-link">
                  <MdMap size={20} />
                  <span className="ml-3">Area</span>
                </Link>
              </li>
              <hr className="my-2" />
              {/* <li className="rounded hover:text-white hover:bg-redjp">
                <Link to="/laporan" className="nav-link">
                  <MdPrint size={20} />
                  <span className="ml-3">Laporan</span>
                </Link>
              </li> */}
            </>
          ) : null}
        </ul>
        <button
          type="button"
          className="py-2 px-10 btn-red font-normal"
          onClick={() => Keluar()}
        >
          Keluar
        </button>
      </nav>

      <button
        type="button"
        id="hamburger"
        className="bg-redjp text-white p-2.5 fixed right-3 bottom-3 rounded-full md:hidden"
        onClick={showSidebar}
      >
        <span id="icon-menu">
          <MdMenu size={30} />
        </span>
        <span id="icon-close" className="hidden">
          <MdClose size={30} />
        </span>
      </button>
    </section>
  );
}

export default Sidebar;
