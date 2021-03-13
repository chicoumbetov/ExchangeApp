import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';

//data
//import chatRooms from '../data/ChatRooms';
import users from '../data/Users';

//Components
import ContactListItem from '../components/ContactListItem/ContactListItem';
//import NewMessageButton from '../components/NewMessageButton/NewMessageButton';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';

//types
import { User } from '../types';

const ContactsScreen = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const usersData = await API.graphql(
            graphqlOperation(
              listUsers
            )
          )
          //console.log(usersData);
          setUsers(usersData.data.listUsers.items)
        } catch (error) {
          console.log(error)
        }
    }
    fetchUsers();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item: User) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactsScreen;
