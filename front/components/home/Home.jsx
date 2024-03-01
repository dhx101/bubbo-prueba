import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Button, StyleSheet } from "react-native";
import { Book } from "../book/Book";
import axios from "axios";

export const Home = ({ navigation }) => {
	const [libros, setLibros] = useState(null);
	const getBooks = async () => {
		console.log(`http://localhost:3000/`);
		try {
			const res = await axios.get(`http://localhost:3000/books`);
			console.log(res.data);
			setLibros(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBooks();
	}, []);

	return (
		<>
			<View>
				<Pressable
					style={styles.buttonAdd}
					onPress={() => navigation.navigate("NewBook")}>
					<Text>Nuevo libro</Text>
				</Pressable>
				{libros?.map((item, index) => (
					<View
						key={index}
						style={styles.book}>
						<Book book={item} />
						<Pressable
							style={styles.button}
							onPress={() =>
								navigation.navigate("BookInfo", {
									id: item.id,
								})
							}>
							<Text>More info</Text>
						</Pressable>
					</View>
				))}
				<Pressable
					style={styles.button}
					onPress={() => navigation.navigate("EditBook")}>
					<Text>editar</Text>
				</Pressable>
			</View>
		</>
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
	buttonAdd: {
		backgroundColor: "#04AA6D",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "8px",
		paddingHorizontal: "20px",
	},
});
