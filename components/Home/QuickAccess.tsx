import { useTranslation } from "react-i18next";
import { ThemedText } from "../ThemedText";
import styles from "./styles";

function QuickAccess() {
  const { t } = useTranslation();
  return (
    <ThemedText type="subhead" style={[styles.paddingHor]}>
      {t("Sarbide zuzenak")}
    </ThemedText>
  );
}

export default QuickAccess;
