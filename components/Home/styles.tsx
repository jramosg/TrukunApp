import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  paddingHor: {
    paddingHorizontal: 24,
  },
  card: {
    flexDirection: "column",
    gap: 15,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8, // Rounded top-left corner
    borderTopRightRadius: 8, // Rounded top-right corner
  },
  newsContainer: {
    paddingHorizontal: 20,
  },
});

export default homeStyles;
