import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export const Editar = ({ navigation, route }) => {
	const { id } = route.params;
	console.log(id);

	const [libro, setLibro] = useState(null);

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
	}, []);

	const [name, setName] = useState(libro?.name);
	const [author, setAuthor] = useState(libro?.author);
	const [pages, setPages] = useState(libro?.pages);
	const [newBook, setNewBook] = useState();

	const addBook = async (id, data) => {
		try {
			await axios.put(`http://localhost:3000/books/${id}`, data);
			console.log(`Libro con id ${id} ha sido modificiado`);
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
						 {
							const myNewBook = {
								name: name,
								author: author,
								pages: pages,
							};
							setNewBook(myNewBook);
							addBook(id, myNewBook);
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
