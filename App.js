import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Platform } from "react-native";
import { falarComChatGPT } from "./service/api";
import LottieView from "lottie-react-native"; 

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const response = await falarComChatGPT(input);
    
    setMessages([...newMessages, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatArea}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.role === "user" ? styles.userMsg : styles.botMsg}>
            {msg.content}
          </Text>
        ))}
        
        {isTyping && (
          <View style={styles.typingContainer}>
            <LottieView
              source={require("./assets/typing.json")}
              autoPlay
              loop
              style={styles.typingAnimation}
            />
          </View>
        )}
      </ScrollView>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Digite sua pergunta..."
      />
      <Button title="Enviar" onPress={sendMessage} disabled={isTyping} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatArea: { flex: 1, marginBottom: 10 },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 5 },
  typingContainer: {
    alignSelf: "flex-start",
    padding: 10,
  },
  typingAnimation: {
    width: 150,
    height: 150,
    color: 'red'
  },
});
