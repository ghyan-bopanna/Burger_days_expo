//// filepath: /d:/gstudy/PES/SEM3/Expo/Backups/Burger project/Burger_days/src/components/ItemHolder.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import { doc, setDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";

const { width } = Dimensions.get("window");

interface ItemHolderProps {
  imgUrl: string;
  name: string;
  desc: string;
  price: number;
  itemId: string;
  quantity?: number;
  updateQuantity?: (itemId: string, quantity: number) => Promise<void>;
  hideDesc?: boolean;
}

const ItemHolder: React.FC<ItemHolderProps> = ({
  imgUrl,
  name,
  desc,
  price,
  itemId,
  quantity: initialQuantity,
  updateQuantity,
  hideDesc,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity || 0);

  useEffect(() => {
    if (quantity === 0 && updateQuantity) {
      removeItemFromCart();
    }
  }, [quantity]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    if (updateQuantity) updateQuantity(itemId, 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (updateQuantity) updateQuantity(itemId, -1);
    }
  };

  const addItemToCart = async () => {
    if (quantity > 0) {
      const cartItemRef = doc(db, "cart", itemId);
      try {
        await setDoc(
          cartItemRef,
          {
            itemId,
            name,
            imgUrl,
            desc,
            price,
            quantity: quantity,
          },
          { merge: true }
        );
        if (Platform.OS === "android") {
          ToastAndroid.show("Item added to cart", ToastAndroid.SHORT);
        } else {
          console.log("Item added to cart");
        }
      } catch (error) {
        console.error("Error adding item to cart: ", error);
      }
    }
  };

  const removeItemFromCart = async () => {
    const cartItemRef = doc(db, "cart", itemId);
    try {
      await deleteDoc(cartItemRef);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text style={styles.price}>${price}</Text>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        {!hideDesc && (
          <Text style={styles.desc} numberOfLines={5}>
            {desc}
          </Text>
        )}
        {!hideDesc && (
          <TouchableOpacity
            style={[styles.button, { opacity: quantity === 0 ? 0.5 : 1 }]}
            onPress={addItemToCart}
            disabled={quantity === 0}
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        )}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 10,
    width: width * 0.8,
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    color: "white",
    fontSize: 14,
    marginVertical: 5,
  },
  price: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
  },
  quantity: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default ItemHolder;
