import React, {useState, useEffect} from 'react';
import Box from '../styledComponents/View';
import ButtonBox from '../styledComponents/TouchableOpacity';
import TextBox from '../styledComponents/Text';
import {useDispatch} from 'react-redux';
import userActions from '../../redux/actions/userActions';
import userPb from '../../protoFiles/user_pb';

function RegisterPage({route, navigation}) {
  const dispatch = useDispatch();
  const {userData} = route.params;
  const [chatsName, setChatsName] = useState({name1: '', name2: ''});

  const [ws, setWs] = useState(new WebSocket('ws://137.117.231.134:9001'));

  useEffect(() => {
    connect();
  }, []);

  const onPress = () => {
    //dispatch(userActions.loginUser(values));
    navigation.navigate('Chat');
  };
  var Buffer = require('buffer/').Buffer;
  const connect = () => {
    ws.onopen = () => {
      console.log('connected websocket main component');
      console.log(userData);
      var userDataByte = JSON.stringify(userData);
      const buf = Buffer.from(userDataByte);
      ws.send(buf);

      var userMessage = new userPb.UserMessage();
      var command = new userPb.Command();
      command.setInput(userPb.Input.LSUSER);
      //command.setMessage(message.text);
      userMessage.setCommand(command);

      const serializeUserMessage = userMessage.serializeBinary();
      ws.send(serializeUserMessage);
      //setWs(ws);
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

  const handleReceive = (data) => {
    const receivedMessage = userPb.Message.deserializeBinary(data).toString();
    
  };

  return (
    <Box flex={1}>
      <Box mt={5}>
        <ButtonBox
          justifyContent="center"
          alignItems="flex-start"
          onPress={onPress}
          bg="#EA7AF4"
          height={70}>
          <TextBox ml={15} fontSize={23} fontFamily="Cochin" color="#2d3047">
            Süha
          </TextBox>
        </ButtonBox>
        <Box mb={2} height={3} width={[1]} mt={2} bg="#693668" />
        <ButtonBox
          justifyContent="center"
          alignItems="flex-start"
          onPress={onPress}
          bg="#EA7AF4"
          height={70}>
          <TextBox ml={15} fontSize={23} fontFamily="Cochin" color="#2d3047">
            Akif
          </TextBox>
        </ButtonBox>
        <Box height={3} width={[1]} mt={2} bg="#693668" />
      </Box>
    </Box>
  );
}

export default RegisterPage;
