import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native";

interface ThemedTextInputProps extends TextInputProps {
  style?: object;
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextInput
      style={[
        styles.input,
        { borderColor: theme.colors.border, color: theme.colors.text },
        style,
      ]}
      placeholderTextColor={"gray"}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default ThemedTextInput;
