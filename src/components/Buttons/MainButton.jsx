import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MainButton({ text, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onPress}>
      <Text style={styles.btnTitle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    alignItems: "center",
    padding: 16,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
