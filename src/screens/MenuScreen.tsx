import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Config/firebase";
import ItemHolder from "../components/ItemHolder";
import CartIcon from "../../images/cart.png";

interface MenuItem {
  id: string;
  imgUrl: string;
  name: string;
  desc: string;
  price: number;
  items: boolean; // add other fields as needed
}

const MenuScreen: React.FC = () => {
  const [data, setData] = useState<MenuItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const items: MenuItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as MenuItem),
      }));
      setData(items);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: MenuItem }): JSX.Element => (
    <ItemHolder
      imgUrl={item.imgUrl}
      name={item.name}
      desc={item.desc}
      price={item.price}
      itemId={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Our Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Image source={CartIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  header: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 15,
  },
  cartIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  list: {
    alignItems: "center",
  },
});

export default MenuScreen;
