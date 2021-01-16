import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {ArrowRightCircle} from '../icons/index.js';
import userPb from '../../protoFiles/user_pb';
import Box from '../styledComponents/View';
//import { variant } from 'styled-system';

function 
ChatPage({route, navigation}) {
  const {userData} = route.params;
  //var ws = JSON.stringify(wss);

  // const wsUrl = () => {
  //   const apiUrl = 'ws:';
  //   return `${apiUrl}//${ipAdress}`;
  // };
  var Buffer = require('buffer/').Buffer;
  const [isFocus, setFocus] = useState(false);

  const [message, setMessage] = useState({
    user: 'User',
    timestamp: new Date().getTime(),
    text: '',
  });
  const [chat, setChat] = useState({messages: []});
  // eslint-disable-next-line no-undef
  const [ws, setWs] = useState(new WebSocket('ws://137.117.231.134:9001'));

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    ws.onopen = () => {
      console.log('connected websocket main component');
      console.log(userData);
      var userDataByte = JSON.stringify(userData);
      const buf = Buffer.from(userDataByte);
      ws.send(buf);
      setWs(ws);
    };
    ws.onclose = (e) => {
      console.log(e.reason);
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket',
      );
      ws.close();
    };
    ws.onmessage = (e) => {
      handleReceive(e.data);
    };
  };

  const handleChangeText = (e) => {
    setMessage({user: 'User', text: e, timestamp: new Date().getTime()});
  };

  const handleReceive = (data) => {
    const desTextProtoc = userPb.Message.deserializeBinary(data).toString();
    const newChat = {...chat};
    newChat.messages.push({
      ...message,
      user: 'cpu',
      text: desTextProtoc,
    });
    setChat(newChat);
    console.log(`Received: ${desTextProtoc}`);
  };
  const handleSend = () => {
    if (message.text === '') {
      return;
    }
    var userMessage = new userPb.UserMessage();
    var letter = new userPb.Letter();
    letter.setMessage(message.text);
    userMessage.setLetter(letter);

    // var command = new userPb.Command();
    // command.setInput(userPb.Input.LSUSER);
    // command.setMessage(message.text);
    // userMessage.set(command);

    const serializeUserMessage = userMessage.serializeBinary();
    console.log('Sent:' + message.text);
    console.log('Sent:' + serializeUserMessage);
    ws.send(serializeUserMessage);

    const newChat = {...chat};
    newChat.messages.push({...message});
    setChat(newChat);
    setMessage({text: ''});
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursText = hours < 10 ? `0${hours}` : hours;
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursText}:${minutesText}`;
  };

  return (
    <Box mb={1} mt={1} flex={1} justifyContent="center" bg="white">
      <FlatList
        ref={(ref) => (this.flatList = ref)}
        onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
        onLayout={() => this.flatList.scrollToEnd({animated: true})}
        data={chat.messages}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <View
            style={{
              ...styles.messageContainer,
              ...(item.user !== 'User' ? styles.messageContainerReceived : {}),
            }}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
      />
      <View enabled={true} style={styles.inputContainer} behavior="padding">
        <TextInput
          style={styles.textInput}
          returnKeyType="send"
          onChangeText={handleChangeText}
          onSubmitEditing={handleSend}
          value={message.text}
          onFocus={() => setFocus(true)}
          autoCapitalize="sentences"
        />
        {isFocus && message.text.length > 0 && (
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Box>
              <ArrowRightCircle stroke="#EA7AF4" />
            </Box>
          </TouchableOpacity>
        )}
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#EA7AF4',
    borderRadius: 6,
    marginBottom: 5,
    flexDirection: 'row',
    maxWidth: 300,
  },
  messageContainerReceived: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#693668',
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
    marginEnd: 40,
  },
  messageTime: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginStart: 10,
    position: 'absolute',
    end: 10,
    bottom: 10,
  },

  inputContainer: {flexDirection: 'row', alignItems: 'center'},

  textInput: {
    marginBottom: 5,
    flex: 1,
    borderColor: '#EA7AF4',
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    height: 40,
  },
  sendButton: {paddingHorizontal: 10},
  sendButtonText: {color: '#448aff'},
});

export default ChatPage;
