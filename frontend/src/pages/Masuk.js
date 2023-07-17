import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Masuk = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/masuk", {
        email,
        password,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <main className="w-screen h-screen px-4 flex items-center justify-center">
      <section className="p-6 bg-white text-center">
        <h1>Masuk Admin</h1>
        <span className="my-3 inline-block text-sm">
          Silahkan masukkan Email dan Password Anda untuk masuk.
        </span>
        <form onSubmit={Auth}>
          <span className="text-red-600 text-center">{msg}</span>
          <div className="my-4 text-left">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-text"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-4 text-left">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn-red w-full py-2">
            Masuk
          </button>
        </form>
        <a
          href=""
          className="text-blue-500 underline mt-3 inline-block hover:cursor-pointer"
        >
          Bantuan
        </a>
      </section>
    </main>
  );
};

export default Masuk;
