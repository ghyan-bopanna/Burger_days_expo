import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DisplayScreen = ({ route }) => {
  const { name, imgUrl, desc } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default DisplayScreen;
