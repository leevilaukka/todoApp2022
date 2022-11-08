import React from 'react';
import {Button, Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function WelcomePage({navigation, params}: any) {
  React.useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('HomePage');
    }
  }, []);

  return (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
        }}
    >
        <Text
            style={{
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                paddingTop: 20,
            }}
        >
            Welcome to Leevi's Todo App!
        </Text>
        <View
            style={{
                margin: 20,
            }}
        >
            <Button title="Login" onPress={() => navigation.navigate('LoginPage')} />
            <Button
                title="Signup"
                onPress={() => navigation.navigate('SignupPage')}
            />
        </View>
    </View>
  );
}
