/**
 * This is the server file for {{app_name}}
 * @author Sahil Siddiqui
 * @since Nov 02, 2022
 */
import express from "express";
import busboyBodyParser from "busboy-body-parser";
import bodyParser from "body-parser";
import cors from "cors";
import ActivateRoutes from "./routes";

const app = express();

// enable cors support
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-HTTP-Method-Override",
      "Accept",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

// call this to activate routes or define inside the route directory
ActivateRoutes(app);

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
app.get("/", (req, res) =>
  res.send(`<h1>{{app_name}} ${env} environment</h1>`)
);

// const port = process.env.NODE_ENV === "development" ? 3000 : 3001;

var server_port = process.env.PORT || process.env.PORT || 80;
var server_host = process.env.HOST || "0.0.0.0";

app.listen(server_port, server_host, () =>
  console.log(`Backend is running on port ${port}`)
);
