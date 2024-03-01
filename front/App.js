import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Book } from "./components/book/Book";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./components/home/Home";
import { BookInfo } from "./components/bookInfo/BookInfo";
import { Editar } from "./components/editar/Editar";
import { NewBook } from "./components/newBook/NewBook";

export default function App() {
	

	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: 'Home' }}
    />
    <Stack.Screen
      name="BookInfo"
      component={BookInfo}
      options={{ title: 'BookInfo' }}
    />
    <Stack.Screen
      name="EditBook"
      component={Editar}
      options={{ title: 'Editar Libro' }}
    />
    <Stack.Screen
      name="NewBook"
      component={NewBook}
      options={{ title: 'Nuevo Libro' }}
    />
    </Stack.Navigator>
		</NavigationContainer>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	book: {
		borderWidth: "1px",
		borderColor: "#000000",
	},
});
