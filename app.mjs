import express from "express";
import dotenv from "dotenv";
import notFound from "./middleware/404.mjs";
import errorHandler from "./middleware/error-handler.mjs";
import connectDB from "./db/connect.mjs";
import productsRouter from "./routes/products.mjs";
import "express-async-errors";
dotenv.config();
const app = express();

//MIDDLEWARE
app.use(express.json());

// ROUTES'

app.get("/", (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>');
});

app.use("/api/v1/products", productsRouter);

// PRODUCTS ROUTE

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`sever is running on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
