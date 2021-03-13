import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

//graphql configurations
import {
  Auth, API, graphqlOperation,
} from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

//amplify
import Amplify from 'aws-amplify';
//import {Auth} from '@aws-amplify/auth'
//const config = require('./src/aws-exports').default;
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig)

// >>New - Configuring Auth Module
Auth.configure(awsconfig);

import { withAuthenticator } from 'aws-amplify-react-native';

const randomImages = [
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg',
]

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

  //run this snippet only when App is mounted first time
  useEffect(() => {
    const fetchUser = async () => {
      //get Authentificated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      //console.log(userInfo);

      if (userInfo) {
        //get the user from Backend with the user Id from Auth
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            { id: userInfo.attributes.sub }
          )
        )

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          return;
        }

        //console.log(userData);

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey, I am using ExchangeApp',
        }

        console.log(newUser);

        //if there is no user is DB with the id, then create one
        await API.graphql(
          graphqlOperation(
            createUser,
            { input: newUser }
          )
        )
      }
    }
    fetchUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);