import { AntDesign } from '@expo/vector-icons';
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Diferente comportamento dependendo do sistema operacional
    >
      <View style={styles.headerBackground}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Coloque a lógica do botão de voltar aqui */ }}>
          <Text style={styles.backButton}><AntDesign name="back" size={24} color="black" /></Text>
        </TouchableOpacity>
        <Text style={styles.contactName}>Nome do Contato</Text>
      </View>
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
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
        <View style={{backgroundColor: 'gray', width: '100%'}}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua pergunta..."
          />
        <Button title="Enviar" onPress={sendMessage} disabled={isTyping} />
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
  chatArea: { flex: 1, marginBottom: 10,},
  chatContent: {
    flexGrow: 1, // Permite que o ScrollView expanda e ocupe todo o espaço disponível
    justifyContent: 'flex-end', // Coloca as mensagens na parte inferior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    backgroundColor: 'gray', // Cor da barra de cabeçalho
    width: '100%',
  },
  headerBackground: {
    backgroundColor: 'gray',
  },
  backButton: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  contactName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute', // Tornando o título "Contato" absoluto dentro da view
    left: '50%', // Posição centralizada horizontalmente
    transform: [{ translateX: '-50%' }]
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'white',
  },
  typingContainer: {
    alignSelf: "flex-start",
    padding: 10,
  },
  typingAnimation: {
    width: 150,
    height: 150,
  },
});