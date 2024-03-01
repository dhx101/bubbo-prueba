import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export const Editar = ({ navigation, route }) => {
	const { id } = route.params;
	console.log(id);

	const [libro, setLibro] = useState(null);
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [pages, setPages] = useState("");
	useEffect(() => {
		const getBook = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/books/${id}`);
				console.log(res.data[0]);
				setLibro(res.data[0]);
			} catch (error) {
				console.log(error);
			}
		};
		getBook(id);
	}, [id]);

	const [newBook, setNewBook] = useState("");
	const addBook = async (id, data) => {
		try {
			await axios.post(`http://localhost:3000/books/${id}`, data);
			console.log(`Nuevo libro añadido`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View>
			<Text>Agrega tu nuevo libro</Text>
			<TextInput
				placeholder="Nombre del libro"
				onChangeText={(text) => {
					setName(text);
				}}
                defaultValue={libro?.name}
			/>
			<TextInput
				placeholder="Autor del libro"
				onChangeText={(text) => {
					setAuthor(text);
				}}
                defaultValue={libro?.author}
			/>
			<TextInput
				placeholder="Páginas del libro"
				onChangeText={(text) => {
					setPages(text);
				}}
                defaultValue={libro?.pages}
			/>
			<View>
				<Pressable
					onPress={() => {
						if (!name || !author || !pages) {
							console.log("need all data to work");
						} else {
							const myNewBook = {
								name: name,
								author: author,
								pages: pages,
							};
							setNewBook(myNewBook);
							addBook(myNewBook);
							console.log(myNewBook, "Libro en la base de datos");
						}
					}}>
					<Text>Enviar</Text>
				</Pressable>
			</View>
		</View>
	);
};
