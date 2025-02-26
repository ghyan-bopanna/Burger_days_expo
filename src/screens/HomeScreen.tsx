import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Config/firebase"; // Make sure the path to firebase.js is correct
import HomeBurger from "../../images/home_burger.jpg";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
      setFilteredData(items);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Display", { ...item })}
    >
      <Image source={{ uri: item.imgUrl }} style={styles.itemImage} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={HomeBurger} style={styles.image} />
      <Text style={styles.header}>Welcome to Burger Days !!</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.exploreMore}>New Additions!!</Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: height * 0.5,
    resizeMode: "cover",
    marginTop: 50,
  },
  searchBar: {
    height: 40,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "#333",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    width: 120, // Adjust width to make items square
    height: 120, // Adjust height to make items square
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  text: {
    color: "white",
  },
  exploreMore: {
    color: "white",
    fontSize: 24,
    marginTop: 3,
  },
});

export default HomeScreen;
