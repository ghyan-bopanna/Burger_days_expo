import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.ibb.co/MCNH5yD/image-fx-3.png" }} // Replace with the actual user image URL
        style={styles.profileImage}
      />
      <Text style={styles.text}>Hello Daniel !!</Text>
      <TextInput
        style={styles.textField}
        placeholder="Change Name"
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  textField: {
    height: 40,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "black",
  },
});

export default ProfileScreen;
