import AsyncStorage from "@react-native-async-storage/async-storage";

const zustandStorage = {
  setItem: async (name: string, value: string | number | boolean) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error("Error storing item:", error);
    }
  },
  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error retrieving item:", error);
      return null;
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
};

export default zustandStorage;
