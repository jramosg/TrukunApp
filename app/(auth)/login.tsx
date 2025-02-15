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
import { useNavigation, useTheme } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Card from "@/components/Card";
import { brandColors } from "@/constants/Colors";
import { router } from "expo-router";
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const signUpAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(signUpAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const SignIn = async () => {
    setLoading(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

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
      <Card style={styles.landingActions} elevation={0}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          }}
        >
          <ThemedText color="primaryMain" type="headline2">
            {t("Saioa hasi")}
          </ThemedText>
        </Animated.View>

        <View style={styles.inputsContainer}>
          <ThemedTextInput
            style={styles.input}
            placeholder={t("Email")}
            value={email}
            onChangeText={setEmail}
            inputMode="email"
            autoComplete="email"
          />
          <PasswordContainer password={password} setPassword={setPassword} />
        </View>
        {/* Animated Sign-in Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TrukunButton
            onPress={SignIn}
            disabled={loading}
            title={loading ? t("Hasten...") : t("Saioa hasi")}
          />
        </Animated.View>
        <TrukunButton
          style={styles.googleButton}
          onPress={signUpwithGoogle}
          title={t("Google-rekin hasi saioa")}
          icon="logo-google"
        ></TrukunButton>
        {/* Animated Sign-up Prompt */}
        <Animated.View
          style={{
            opacity: signUpAnim,
            transform: [
              {
                translateY: signUpAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
        >
          <SignUp />
        </Animated.View>
      </Card>

      {/* Animated Loading Indicator */}
      {loading && (
        <Animated.View style={{ transform: [{ scale: loadingAnim }] }}>
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>
      )}

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
