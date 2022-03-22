import {setStatusBarTranslucent, StatusBar} from 'expo-status-bar'
import React from 'react'

import { StyleSheet,SafeAreaView, Screen, Dimensions, FlatList, ScrollView,Text, View, TouchableOpacity, Pressable, Alert, ImageBackground, Image} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import {Camera} from 'expo-camera'
import { useEffect, useState } from 'react'
import Amplify, { photoPlaceholder, Storage } from 'aws-amplify'
//import ProgressBar from './node_modules/react-native-progress/Bar'
import * as Progress from 'react-native-progress';

import { withAuthenticator } from 'aws-amplify-react-native';


import { NavigationContainer } from '@react-navigation/native';
//Amplify.configure(config)

import ImageUploadS3 from './ImageUploadS3'

  
var allImages = []
var allPatients = []


//class Test extends React.Component {
function Test({route,navigation}){
    const name = route.params;
    console.log(name)
    const actualname = name.params.name.item.item
    console.log("name", name.params.name.temp)

async function componentDidMount (filepath) {
      console.log("in component", filepath)
      await fetchImages(filepath, { level: "public" }) // (path, access)
      this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
const getImagesUri = async (data) => {
    let count, foo
    let uriArray = []
    for (count = 0; count < data.length; count++) {
        foo = data[count]['key']
        // Given the key, the get method below returns the uri of every image
        await Storage.get(foo)
            .then(bar => {
                // shorten the uri for fast parsing
                shortUri = bar.substr(0, 102)
                uriArray.push(bar)
            })
            .catch(err => console.log(err))
        // add an uri key to the data array of objects
        data[count]['uri'] = uriArray[count]
    }
}
const fetchImages = async(path, access) => {
//const fetchImages = async (path, access) =>  {
    console.log("in fetchimages", path)
    try {
    await Storage.list(path, access)
        .then(async (res) => {
            // Get rid of the first item in the returned array which is the folder itself !!! (blame AWS )
            //res = res.slice(1)
            // Clone the original array of data to avoid mutating the original data
            resModified = [].concat(res)
            // Sort the images by descending publication date
            resModified.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
            // Add the uri of every image stored in S3
            await getImagesUri(resModified) // (data)
            // Store the up to drrate data in the allImages array
           console.log("resModified", path, resModified)
           global.allImages = []
           global.allImages = [...resModified];
           console.log("global.all images in the fetch images", global.allImages)

        })
        .catch(err => console.log(err))
     return global.allImages;}
     catch(e){
       console.log(e)
     }

}
const removeImageFromS3 = async (name) => {
    await Storage.remove(name)
        .then(result => console.log('Deleted', result),
        Alert.alert(
            "Image Deleted Successfully",
            "",
            [
              
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        
        
        )
        .catch(err => console.log(err));
}

  
//render() {
    
    //console.log("help")
    
    
  
  //  console.log(Object.values(d ))
    //console.log(global.allImages)
    
    const filepath = 'images/' + actualname + "/"
    console.log("filepath",filepath)
    //fetchImages('images/', { level: "public" })
    //var d = await this.fetchImages(filepath, { level: "public" })};
    
    //console.log(global.allImages)
    console.log("in the actual before return," , global.allImages)
    //async  => {
    //await fetchImages(filepath, { level: "public" })};
    //const r = await fetchImages(filepath, { level: "public" });
    //console.log("r",r)
    return (
      
      //console.log("calling component"),
      componentDidMount(filepath),
      
      
      console.log("in return", global.allImages),
       <SafeAreaView style={styles.container}>
       <FlatList
         //ref={(ref) => { flatListRef = ref }}
         data={Object.values(global.allImages)}
         
         renderItem={(item) => {
            
							// format the date by removing unnecessary details
							let uploadDateImage = String(item.item.lastModified).substr(0, 15)
							//console.log("item", item.item.key)
                            //console.log(name)
							return (

								<View>	
									<Image
										source={{ uri: item.item.uri }}
										style={styles.imageStyle}
									/>
									<View style={styles.headerStyle}>
										<Ionicons 
											name="md-trash"
											style={{ color: '#004', fontSize: 30}}
											onPress={() => {
												
												Alert.alert(
										"Are you sure you want to delete the image?",
											"",
										[
										{ text: "no", onPress: () => console.log("cancelled, not wanting to delete")},
						  				{ text: "yes", onPress: () => removeImageFromS3(item.item.key) }//console.log("OK Pressed") }
										]
					  					);
												//this.removeImageFromS3(item.item.key)
												
												}}
										/>
										<Text style={{fontSize: 16}}>{uploadDateImage}</Text>
                                        <Text style={{fontSize: 16}}>{item.item.key.slice(7,-15)}</Text>
										
									</View>			
								</View>
							)
						}
						}
					///>
         //renderItem={this.renderItem}
         //keyExtractor={item => item.id}
      />
     </SafeAreaView>
      );
  //  }
}
               
// function Test() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Test</Text>
//       </View>
//     );
//   }
export default(Test)

let { width } = Dimensions.get('window')
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerStyle: {
		flexDirection: 'row', 
		alignItems: 'stretch',
		justifyContent: 'space-between',
		padding: 13
	}, 
	buttonStyle: {
		fontSize: 40,
		color: '#4286f4'
	},
	item: {
		backgroundColor: '#4286f4',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	  },
	  title: {
		fontSize: 32,
	  },
	imageStyle: { 
		width: width, 
		height: width, 
		marginBottom: 12
	}
})