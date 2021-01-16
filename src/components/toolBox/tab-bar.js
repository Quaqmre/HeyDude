import React from 'react';
import {View, Text} from 'react-native';
import ButtonBox from '../styledComponents/TouchableOpacity';
import MessageSquare from '../icons/MessageSquare';
import LogIn from '../icons/LogIn';
import Box from '../styledComponents/View';

function TabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <ButtonBox
            alignItems="center"
            justifyContent="center"
            key={label}
            pt={6}
            flexDirection="column"
            height={54}
            flex={1}
            onPress={onPress}>
            {label === 'Chats' && <MessageSquare stroke="#EA7AF4" />}
            <Box size={3} bg={isFocused ? '#EA7AF4' : 'white'} mt={6} />
          </ButtonBox>
        );
      })}
    </View>
  );
}

export default TabBar;
