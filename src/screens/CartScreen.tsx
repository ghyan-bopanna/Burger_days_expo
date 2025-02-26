import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Config/firebase";
import ItemHolder from "../components/ItemHolder";

interface CartItem {
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
      const items: CartItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CartItem),
      }));
      setCartItems(items);
      calculateTotal(items);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const calculateTotal = (items: CartItem[]): void => {
    const tot = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(tot);
  };

  const updateQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<void> => {
    const cartItemRef = doc(db, "cart", itemId);
    try {
      // find the matching cart item
      const item = cartItems.find((item) => item.id === itemId);
      if (!item) return;
      if (quantity === -1 && item.quantity === 1) {
        await deleteDoc(cartItemRef);
        return;
      }
      await updateDoc(cartItemRef, {
        quantity: increment(quantity),
      });
    } catch (error) {
      console.error("Error updating item quantity: ", error);
    }
  };

  const renderItem = ({ item }: { item: CartItem }): JSX.Element => (
    <ItemHolder
      imgUrl={item.imgUrl}
      name={item.name}
      price={item.price}
      itemId={item.id}
      quantity={item.quantity}
      updateQuantity={updateQuantity}
      hideDesc={true}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Platter</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={() =>
          navigation.navigate("OrderConfirm", { total, cartItems })
        }
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  list: {
    alignItems: "center",
  },
  total: {
    color: "white",
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  placeOrderButton: {
    backgroundColor: "tomato",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  placeOrderText: {
    color: "white",
    fontSize: 18,
  },
});

export default CartScreen;
