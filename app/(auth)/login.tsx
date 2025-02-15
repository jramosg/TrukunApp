import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Animated,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/Card";
import { brandColors } from "@/constants/Colors";
import ThemedTextInput from "@/components/ThemedTextInput";
import TrukunButton from "@/components/Button";
import { useSessionStore } from "@/store";
import { TrukunToast, ToastRef } from "@/components";

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <TrukunButton
        size="small"
        variant="text"
        onPress={() => router.navigate("SignUp")}
      >
        <ThemedText color="secondaryText">{`${t(
          "Ez daukazu kontua?"
        )} `}</ThemedText>
        <ThemedText color="primaryMain">{`${t("Kontua egin")} `}</ThemedText>
      </TrukunButton>
    </View>
  );
};

const PasswordContainer = ({ password, setPassword }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.passwordContainer}>
      <ThemedTextInput
        style={styles.input}
        placeholder={t("Password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoComplete="current-password"
      />
      <TrukunButton
        onPress={() => router.navigate("/PasswordRecovery")}
        title={t("Pasahitza ahaztu duzu?")}
        variant="text"
        size="small"
      />
    </View>
  );
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const toastRef = useRef<ToastRef>(null);

  // Animated values
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const SignIn = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toastRef.current?.show({
          type: "error",
          text: t(error.message) || t("An error occurred. Please try again"),
          duration: 2000,
        });
      }
      else {
        router.replace("/")
      }
    } catch (error) {
      setMessage(t("An error occurred. Please try again"));
    } finally {
      setLoading(false);
    }
  };

  const signUpwithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <LinearGradient
      colors={[brandColors.primaryMain, brandColors.primary1000]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.landingActions,
          {
            opacity: cardAnim,
            transform: [
              {
                translateY: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0], // Start from 20 and move to 0
                }),
              },
              {
                scale: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1], // Scale from 0.9 to 1
                }),
              },
            ],
          },
        ]}
      >
        <Card style={styles.landingActions} elevation={0}>
          <ThemedText color="primaryMain" type="headline2">
            {t("Saioa hasi")}
          </ThemedText>

          <View style={styles.inputsContainer}>
            <ThemedTextInput
              style={styles.input}
              placeholder={t("Email")}
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
            />
            <PasswordContainer password={password} setPassword={setPassword} />
          </View>
          <TrukunButton
            onPress={SignIn}
            disabled={loading}
            title={loading ? t("Hasten...") : t("Saioa hasi")}
          />
          <TrukunButton
            style={styles.googleButton}
            onPress={signUpwithGoogle}
            title={t("Google-rekin hasi saioa")}
            icon="logo-google"
          ></TrukunButton>
          <SignUp />
        </Card>
      </Animated.View>

      {loading && <ActivityIndicator size="large" color="#fff" />}

      {message ? <ThemedText>{message}</ThemedText> : null}
      <TrukunToast ref={toastRef} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  landingActions: {
    width: "100%",
    borderRadius: 24,
    padding: 16,
    justifyContent: "center",
    gap: 10,
    paddingTop: 56,
  },
  inputsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  footer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 16,
  },
  passwordContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  googleButton: {
    backgroundColor: "#4285F4",
  },
});
