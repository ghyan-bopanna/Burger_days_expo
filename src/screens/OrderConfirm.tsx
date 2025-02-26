import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";

interface OrderConfirmParams {
  total: number;
  cartItems: CartItem[]; // You can import or redefine CartItem interface here.
}

// If CartItem isn't defined elsewhere, you can define it locally:
interface CartItem {
  id: string;
  name: string;
  quantity: number;
  // add other fields if needed
}

const OrderConfirm = () => {
  const route = useRoute<RouteProp<{ params: OrderConfirmParams }, "params">>();
  const navigation = useNavigation();
  const { total, cartItems } = route.params;

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  const confirmOrder = async () => {
    try {
      const cartCollectionRef = collection(db, "cart");
      const snapshot = await getDocs(cartCollectionRef);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "cart", docSnap.id));
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      });
    } catch (error) {
      console.error("Error confirming order: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    color: "white",
    fontSize: 30,
    marginBottom: 30,
  },
  list: {
    width: "90%",
  },
  itemContainer: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemName: {
    color: "white",
    fontSize: 18,
  },
  itemQuantity: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  total: {
    color: "white",
    fontSize: 25,
    marginVertical: 50,
  },
  confirmButton: {
    backgroundColor: "tomato",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 50,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default OrderConfirm;
