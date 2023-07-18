import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AdminRoute from "./routes/AdminRoute.js";
import WpRoute from "./routes/WpRoute.js";
import KantorRoute from "./routes/KantorRoute.js";
import LayananRoute from "./routes/LayananRoute.js";
import TransaksiRoute from "./routes/TransaksiRoute.js";
import AreaRoute from "./routes/AreaRoute.js";
import Kendaraan from "./routes/KendaraanRoute.js";

dotenv.config();
const app = express();
mongoose.connect(
  "mongodb+srv://gama:l9wcum03029ZM9oA@cluster0.sckbglc.mongodb.net/jasaprima_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected"));

app.use(
  cors({
    credentials: true,
    origin: "https://jasaprima-admin-api.vercel.app/",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(AdminRoute);
app.use(WpRoute);
app.use(KantorRoute);
app.use(LayananRoute);
app.use(TransaksiRoute);
app.use(AreaRoute);
app.use(Kendaraan);
app.get(
  ("/",
  (req, res) => {
    res.json("Welcome");
  })
);

app.listen(5000, () => console.log("Server up and running..."));
