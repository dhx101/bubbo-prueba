// const { db } = require("../../utils/firebase");
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore");

const serviceAccount = require("../../prueba-tecnica-bubble-firebase-adminsdk-igbky-46b0240cd4.json");
const { auth } = require("firebase-admin");

initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();
const getBooks = async (req, res) => {
	const booksRef = db.collection("books");
	console.log("Obteniendo libros");
	try {
		const snapshot = await booksRef.get();
		const books = [];
		snapshot.forEach((doc) => {
			books.push({ id: doc.id, ...doc.data() });
		});
		console.log(books);
		return res.status(200).json(books);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getBook = async (req, res) => {
	try {
		const bookRef = db.collection("books").doc(req.params.id);
		const doc = await bookRef.get();
		const book = [];
		if (!doc.exists) {
			console.log("No existe ese documento");
            return res.status(200).json({message: "Documento no existe"})
		} else {
			console.log("Documento:", doc.data());
			book.push(doc.data());
			res.json(book);
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const postBook = async (req, res) => {
	try {
		// console.log(req.body);
		const bookRef = await db.collection("books").add(req.body);
		console.log("Added document with ID: ", bookRef.id);
		return res.status(201).json({ id: bookRef.id });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateBook = async (req, res) => {
	console.log(req.params.id, req.body);
	try {
		const bookRef = db.collection("books").doc(req.params.id);
		if (req.body.name && req.body.author && req.body.pages) {
			await bookRef.update({
				name: req.body.name,
				author: req.body.author,
				pages: req.body.pages,
			});
			console.log("Changed document with ID: ", req.params.id);
			return res.status(200).json({ message: "Cambio realizado" });
		} else {
			return res.status(500).json({ error: "Falta un valor" });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteBook = async (req, res) => {
	console.log("Borrando libro");
	console.log(req.params.id);
	try {
		await db.collection("books").doc(req.params.id).delete();
        console.log(req.params.id);
		return res.status(200).json({message: "Elemento borrado con exito"});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getBooks,
	getBook,
	postBook,
	updateBook,
	deleteBook,
};
