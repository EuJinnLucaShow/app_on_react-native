import { StyleSheet, Text, View } from 'react-native';

export default function AuthTextLink({ text, linkText, onPress }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{text}</Text>
      <Text
        style={{ ...styles.text, textDecorationLine: 'underline' }}
        onPress={onPress}
      >
        {linkText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  text: {
    marginTop: 16,
    color: '#1B4371',
    textAlign: 'center',
  },
});
