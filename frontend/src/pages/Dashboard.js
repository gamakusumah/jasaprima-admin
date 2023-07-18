import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function Dashboard(props) {
  const [transaksi, setTransaksi] = useState([]);
  let totalTunggakan = 0;

  useEffect(() => {
    props.refreshToken();
    getTransaksi();
  }, []);

  const getTransaksi = async (req, res) => {
    const response = await props.axiosJWT.get(
      "http://localhost:5000/transaksi-group",
      {
        headers: {
          Authorization: `JWT ${props.token}`,
        },
      }
    );
    setTransaksi(response.data);
  };

  return (
    <>
      <Sidebar level={props.level} />
      <main id="content" className="w-full p-4 md:ml-56 lg:overflow-hidden">
        <Header nama={props.nama} />
        <section className="my-7">
          <h2>Tunggakan</h2>
          <div className="overflow-auto rounded-tl rounded-tr shadow my-5 max-w-[50%]">
            <table className="w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="table-cell text-primary font-semibold tracking-wide text-left w-10 py-2">
                    No.
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left py-2">
                    Nama Kantor
                  </th>
                  <th className="table-cell font-semibold tracking-wide text-left py-2">
                    Total Tunggakan (Rp)
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((val, i) => {
                  totalTunggakan += val.sisaPembayaran;
                  return (
                    <tr className="bg-white border-b-2" key={val._id}>
                      <td className="table-cell py-2">{i + 1}</td>
                      <td className="table-cell py-2">{val._id}</td>
                      <td className="table-cell py-2">{val.sisaPembayaran}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-white">
                  <th
                    className="table-cell py-2 text-lg border-r-2 uppercase"
                    colSpan="2"
                  >
                    Total Tunggakan
                  </th>
                  <th className="table-cell py-2 text-lg">{totalTunggakan}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* <section className="my-7">
          <h2>Dashboard</h2>
          <div className="w-full grid lg:grid-cols-2 gap-6 my-7">
            <div>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded">
                    <label className="block">Total Semua Transaksi</label>
                    <span className="block mt-5 text-2xl font-bold">284</span>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <label className="block">Total Tagihan Pembayaran</label>
                    <span className="block mt-5 text-2xl font-bold">
                      Rp113.564.500
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded">
                    <label className="block">Total Pembayaran Masuk</label>
                    <span className="block mt-5 text-2xl font-bold">
                      Rp103.564.500
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <label className="block">Total Sisa Pembayaran</label>
                    <span className="block mt-5 text-2xl font-bold">
                      Rp10.000.000
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="font-bold">Transaksi Hari Ini</label>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded">
                      <label className="block">Jumlah Transaksi</label>
                      <span className="block mt-2 text-4xl font-bold">62</span>
                    </div>
                    <div className="bg-white p-4 rounded">
                      <label className="block">Diproses</label>
                      <span className="block mt-2 text-4xl font-bold">40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold">Detail Transaksi Hari Ini</label>
              <div className="card overflow-auto rounded-tl rounded-tr shadow text-center">
                <table className="w-full">
                  <thead className="bg-white border-b-2 border-gray-200">
                    <tr>
                      <th className="table-cell font-semibold tracking-wide">
                        No.
                      </th>
                      <th className="table-cell font-semibold tracking-wide">
                        Kode Kantor
                      </th>
                      <th className="table-cell font-semibold tracking-wide">
                        Jumlah Transaksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="table-cell">1.</td>
                      <td className="table-cell">Home</td>
                      <td className="table-cell">7</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">2.</td>
                      <td className="table-cell">JP-01</td>
                      <td className="table-cell">5</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">3.</td>
                      <td className="table-cell">JP-02</td>
                      <td className="table-cell">10</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">4.</td>
                      <td className="table-cell">JP-03</td>
                      <td className="table-cell">9</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="table-cell">5.</td>
                      <td className="table-cell">JP-04</td>
                      <td className="table-cell">12</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
