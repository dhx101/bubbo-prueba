const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
  });
  app.use(cors({
	origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8081'],
	credentials: true,
  }));

const bookRoutes = require("./api/routes/book.routes");
app.get("/", (req, res, next) => {
	res.status(200).json({
		status: 200,
		data: {
			method: "GET",
			message: "Bienvenido a la app. Estás en la ruta base",
		},
	});
});

app.use("/books", bookRoutes);

app.disable("x-powered-by");
app.use((req, res, next) => {
	let error = new Error();
	error.status = 404;
	error.message = "NOT FOUND";
	next(error);
});

app.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
	console.log(`Server open in port ${PORT} http://localhost:${PORT}`);
});
