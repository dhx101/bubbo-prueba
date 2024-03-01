import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export const Book = ({ book }) => {
	console.log(book);
	return (
		<>
			<Text>Nombre: {book?.name}</Text>
			<Text>Autor: {book?.author}</Text>
			<Text>Páginas: {book?.pages}</Text>
		</>
	);
};
