import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

//amplify
import Amplify from 'aws-amplify';
import {Auth} from '@aws-amplify/auth'
//const config = require('./src/aws-exports').default;
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig)

// >>New - Configuring Auth Module
Auth.configure(awsconfig);

import { withAuthenticator } from 'aws-amplify-react-native';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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