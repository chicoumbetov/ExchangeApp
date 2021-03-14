import React from 'react';
import {
    View, Text, Image,
    TouchableWithoutFeedback
} from 'react-native';
import { User } from '../../types';
import styles from './style';

//hook
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import {
    createChatRoom, createChatRoomUser
} from '../../src/graphql/mutations';

export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {

    const { user } = props;
    const navigation = useNavigation();

    const onClick = async () => {
        //navigate to chat room with this user
        //console.warn("yep")  checking that it works
        try {
            //1. Create a new Chat Room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                    input: {}
                }
                )
            )

            if (!newChatRoomData) {
                console.log(" Failed to create to a chat room ")
                return;
            }
            //check the path to data
            //console.log(newChatRoomData);

            const newChatRoom = newChatRoomData.data.createChatRoom;
            // check that it came
            //console.log(newChatRoom);

            // 2. Add `user` to the Chat Room
            //newUserChatRoom :
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: user.id,
                        chatRoomID: newChatRoom.id,
                    },

                }
                )
            )

            // 3. Add authenticated user to the Chat Room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id,
                    }
                }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                //name: user.name,  //opens always first dialog
                name: "Hardcoded name",
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onClick} >
            <View style={styles.container}>
                <View style={styles.leftContainer}>

                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ContactListItem;