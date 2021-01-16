import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from '../LoginPage';
import ChatPage from '../ChatPage';
import ChatsPage from '../ChatsPage';
import TabBar from '../../toolBox/tab-bar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Box from '../../styledComponents/View';
import {ThemeProvider} from 'styled-components';
import Theme from '../../styledComponents/Theme';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Chats" component={ChatsPage} />
    </Tab.Navigator>
  );
}

function App() {
  const isLogin = useSelector(state => state.authenticationReducer);
  // return isLogin ? (
  //   <ThemeProvider theme={Theme}>
  //     <Box flex={1}>
  //       <NavigationContainer>
  //         <ChatStack.Navigator initialRouteName="Home">
  //           <ChatStack.Screen name="Chats" component={HomeTabs} />
  //           <ChatStack.Screen name="Chat" component={ChatPage} />
  //         </ChatStack.Navigator>
  //       </NavigationContainer>
  //     </Box>
  //   </ThemeProvider>

  // ) : (
  return (
    <ThemeProvider theme={Theme}>
      <Box flex={1}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Chat" component={ChatPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
