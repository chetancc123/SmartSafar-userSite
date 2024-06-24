// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
// import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// // import { WebSocketProvider, useWebSocket, ReadyState } from 'react-native-websocket';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// export default function ChatBot() {
//     const [messages, setMessages] = useState([]);
//     const [messageText, setMessageText] = useState('');
//     const [socketUrl, setSocketUrl] = useState('ws://localhost:8080/portfolio'); // Your Spring Boot WebSocket URL

//     const addNewChat = () => {
//         console.log("new user added to chatting");
//     };

//     const goBack = () => {
//         console.log("go back button pressed!");
//     };

//     const renderMessage = ({ item }) => (
//         <View style={item.sender === 'user' ? styles.senderMessage : styles.reciverMessage}>
//             <Text style={{ fontSize: 17, color: 'gray' }}>{item.text}</Text>
//             <Text style={{ color: 'gray' }}>{item.time}</Text>
//         </View>
//     );

//     const { sendWebSocketMessage, lastMessage, readyState } = useWebSocket(socketUrl);

//     useEffect(() => {
//         if (lastMessage) {
//             const newMessage = { text: lastMessage.data, sender: 'server', time: new Date().toLocaleTimeString() };
//             setMessages(prevMessages => [newMessage, ...prevMessages]); // Add new message to the beginning of the array
//         }
//     }, [lastMessage]);

//     const sendMessage = () => {
//         if (sendWebSocketMessage && messageText.trim() !== '') {
//             // Send message to WebSocket server
//             sendWebSocketMessage(messageText);
//             setMessageText(''); // Clear the text input
//         }
//     };

//     // Add error handling
//     if (!sendWebSocketMessage) {
//         return (
//             <View style={styles.container}>
//                 <Text>Error: WebSocket connection not initialized.</Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : null}
//                 keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}
//             >
//                 <View style={styles.mainContainer}>
//                     <View style={styles.header}>
//                         <View style={styles.backButton}>
//                             <TouchableOpacity onPress={goBack}>
//                                 <AntDesign name="left" size={20} color="black" />
//                             </TouchableOpacity>
//                             <Text style={{ fontSize: 20, fontWeight: 'bold', color: "gray" }}>Back</Text>
//                         </View>
//                         <View><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chat</Text></View>
//                         <View style={styles.logoButton}>
//                             <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Rido</Text>
//                             <Text style={{ color: "white", fontSize: 10 }}>Safty Sharing Ride</Text>
//                         </View>
//                     </View>

//                     <FlatList
//                         data={messages}
//                         renderItem={renderMessage}
//                         keyExtractor={(item, index) => index.toString()}
//                         inverted // Reverse the order of messages
//                     />

//                     <View style={styles.writeMessage}>
//                         <TouchableOpacity onPress={addNewChat}>
//                             <AntDesign name="pluscircle" size={24} color="lightgreen" />
//                         </TouchableOpacity>
//                         <View style={styles.inputBox}>
//                             <TextInput
//                                 placeholder='Enter text'
//                                 style={styles.textInputBox}
//                                 value={messageText}
//                                 onChangeText={setMessageText}
//                             />
//                         </View>
//                         <TouchableOpacity onPress={sendMessage}>
//                             <MaterialCommunityIcons name="send-outline" size={24} color="blue" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         backgroundColor: 'lightblue',
//         paddingHorizontal: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 10,
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     logoButton: {
//         alignItems: 'center',
//     },
//     writeMessage: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 10,
//     },
//     inputBox: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: 'white',
//         borderWidth: 1,
//         borderRadius: 10,
//         flex: 1,
//         marginRight: 10,
//         paddingHorizontal: 10,
//     },
//     textInputBox: {
//         flex: 1,
//         fontSize: 20,
//     },
//     senderMessage: {
//         // Styles for messages sent by the user
//         backgroundColor: 'lightgray',
//         padding: 10,
//         borderRadius: 10,
//         marginBottom: 10,
//         maxWidth: '70%',
//         alignSelf: 'flex-end',
//     },
//     reciverMessage: {
//         // Styles for received messages
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 10,
//         marginBottom: 10,
//         maxWidth: '70%',
//         alignSelf: 'flex-start',
//     },
// });
