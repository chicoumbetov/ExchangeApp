import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../types';
import moment from "moment";
import styles from './style';

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { message } = props;

    const isMyMessage = () => {
        return message.user.id === 'u1';
    }
    
    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? '#DCFBC5' : 'white',
                    marginLeft: isMyMessage() ? 40 : 0,
                    marginRight: isMyMessage() ? 0 : 40,
                }
            ]}>
                {/* if it is me( isMyId) then do not display name*/}
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
                
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>
                    {moment(message.createdAt).fromNow()};
            </Text>
            </View>

        </View>

    )
}

export default ChatMessage;