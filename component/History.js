import * as React from 'react';
import { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import History_Upcoming from './History_Upcoming';
import History_Cancelled from './History_Cancelled';
import History_Completed from './History_Completed';

const Tab = createMaterialTopTabNavigator();

export default function History() {
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        console.log('Stored id:', storedId);
        setId(storedId || '');
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 18, fontWeight: "bold", borderRadius:10 },
          tabBarStyle: { backgroundColor: '#13C39C' },
          swipeEnabled: true,
          animationEnabled: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={History_Upcoming}
          initialParams={{ id }}
          options={{ tabBarLabel: 'Upcoming' }}
        />
        <Tab.Screen
          name="Settings"
          component={History_Completed}
          initialParams={{ id }}
          options={{ tabBarLabel: 'Completed' }}
        />
        <Tab.Screen
          name="Profile"
          component={History_Cancelled}
          initialParams={{ id }}
          options={{ tabBarLabel: 'Cancelled' }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
