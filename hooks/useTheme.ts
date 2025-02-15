import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase"; // Import your Supabase instance
import { useSessionStore } from "@/store";
import { useColorScheme } from "react-native";

// Define Theme type for better typing
type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light"); // Set the initial theme type
  const systemTheme = useColorScheme(); // Get the system's theme (light/dark)
  const { user } = useSessionStore();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Check if the user has a theme set in Supabase
        const userTheme = user?.theme as Theme;

        if (userTheme) {
          setTheme(userTheme); // Set theme from user data in Supabase
        } else {
          // If no user theme, check AsyncStorage for a saved theme
          const storedTheme = (await AsyncStorage.getItem(
            "theme"
          )) as Theme | null;
          if (storedTheme) {
            setTheme(storedTheme); // Set theme from AsyncStorage
          } else {
            // If no theme is saved, use the system color scheme as a fallback
            setTheme(systemTheme || "light");
          }
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();
  }, [user, systemTheme]); // Re-run when user or system theme changes

  // Function to save the theme and update it in both Supabase and AsyncStorage
  const saveTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    supabase.auth.updateUser({ data: { theme: newTheme } }).catch((error) => {
      console.error("Failed to update theme in Supabase:", error);
    });
    AsyncStorage.setItem("theme", newTheme).catch((error) => {
      console.error("Error saving theme:", error);
    });
  };
  return {
    theme,
    setTheme: saveTheme, // Expose saveTheme function as setTheme
  };
}
