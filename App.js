import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import Calculator from './src/components/Calculator';

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <Calculator />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
