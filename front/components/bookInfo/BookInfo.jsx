import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const BookInfo = ({ navigation, route }) => {
	const { id } = route.params;
	console.log(id, "Linea 7");
	const deleteBooks = async (id) => {
		try {
			const res = await axios.delete(`http://localhost:3000/books/${id}`);
			console.log(`http://localhost:3000/books/${id}`);
		} catch (error) {
			console.log(error);
		}
	};
	const [libro, setLibro] = useState(null);
	useEffect(() => {
		const getBook = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/books/${id}`);
				console.log(res.data);
				setLibro(res.data[0]);
			} catch (error) {
				console.log(error);
			}
		};
		getBook();
	}, [id]);

	return (
		<View style={styles.book}>
			<Pressable onPress={() => navigation.navigate("Home")}>
				<Text>Go Home</Text>
			</Pressable>
			<Text>Nombre: {libro?.name}</Text>
			<Text>Autor: {libro?.author}</Text>
			<Text>Páginas: {libro?.pages}</Text>
			<View style={styles.edit}>
				<Pressable
					style={styles.button}
					onPress={() => {
						deleteBooks(id);
						navigation.navigate("Home");
					}}>
					<Text>Borrar el libro</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => navigation.navigate("EditBook", {
                        id: id
                    })}>
					<Text>Editar Libro</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	book: {
		borderWidth: "1px",
		borderColor: "#000000",
		gap: "10px",
	},
	button: {
		backgroundColor: "#008CBA",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "8px",
		paddingHorizontal: "20px",
	},
	edit: {
		display: "flex",
		flexDirection: "row",
		gap: "25px",
		justifyContent: "space-around",
		alignContent: "center",
	},
});
