import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import TrukunButton from "@/components/Button";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  console.log(theme);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="headline1" align="center" color="dangerMain">
        404
      </ThemedText>
      <ThemedText type="headline2" align="center" color="dangerMain">
        {`${t("Oops! galdu egin zara!")} 😅`}
      </ThemedText>
      <Image
        source={{
          uri: "https://i.gifer.com/origin/26/264162db570a4614c8fd7dc15c757b8e_w200.gif",
        }}
        resizeMode="contain"
        style={styles.image}
      />
      <TrukunButton
        onPress={() => router.navigate("/")}
        title={t("Etxera itzuli")}
        icon="arrow-forward-outline"
      ></TrukunButton>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16
  },
  errorText: {
    color: "red",
    fontSize: 48,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default NotFoundPage;
