import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export const NewBook = () => {
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [pages, setPages] = useState("");

	const [newBook, setNewBook] = useState("");

	const addBook = async (data) => {

		try {
			 await axios.post(`http://localhost:3000/books`, data);
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
			/>
			<TextInput
				placeholder="Autor del libro"
				onChangeText={(text) => {
					setAuthor(text);
				}}
			/>
			<TextInput
				placeholder="Páginas del libro"
				onChangeText={(text) => {
					setPages(text);
				}}
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
							navigation.navigate("Home")
						}
					}}>
					<Text>Enviar</Text>
				</Pressable>
			</View>
		</View>
	);
};
