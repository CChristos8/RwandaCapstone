import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	Image,
	Alert,
	prompt,
	Dimensions,
	FlatList,
	Button,
	TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify from '@aws-amplify/core'
import Storage from '@aws-amplify/storage'
import config from '../src/aws-exports'
import ViewPager from '@react-native-community/viewpager';

Amplify.configure(config)

class PatientImages extends React.Component {
    render () {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
         <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
         />
        </View>
    );
  }
}
