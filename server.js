const express = require("express");
const routes = require("./routes/index");
const PORT = 3000;
const app = express();
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("./docs/swagger");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/public", express.static("public"));
app.use("/scripts", express.static("scripts"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

// Routes
app.use("/", routes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});

app.listen(PORT);
console.log("Listening on port ", PORT);
