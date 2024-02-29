const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore");

const serviceAccount = require("../prueba-tecnica-bubble-firebase-adminsdk-igbky-46b0240cd4.json");

initializeApp({
	credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };
