import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';

//data
//import chatRooms from '../data/ChatRooms';
import users from '../data/Users';

//Components
import ContactListItem from '../components/ContactListItem/ContactListItem';
//import NewMessageButton from '../components/NewMessageButton/NewMessageButton';

const Contacts = () => {

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
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

export default Contacts;
