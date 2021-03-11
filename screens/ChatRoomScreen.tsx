import React from 'react';
import { Text, ImageBackground } from 'react-native';

import { useRoute } from '@react-navigation/native';

//import chatRoomData from '../data/Chats';
//import ChatMessage from '../components/ChatMessage/ChatMessage';
import BG from '../assets/images/BG.png';
//import InputBox from '../components/InputBox/InputBox';

const ChatRoomScreen = () => {

    const route = useRoute();
    //console.log(route.params)
    return (
        <ImageBackground 
            style={{width: '100%', height: '100%'}}
            source={BG}
        >
            <Text>Chat Room</Text>
        </ImageBackground>

    )
}

export default ChatRoomScreen;