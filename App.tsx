import {setStatusBarTranslucent, StatusBar} from 'expo-status-bar'
import React from 'react'

import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert, ImageBackground, Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {Camera} from 'expo-camera'
import { useEffect, useState } from 'react'
import Amplify, { photoPlaceholder, Storage } from 'aws-amplify'
//import ProgressBar from './node_modules/react-native-progress/Bar'
import * as Progress from 'react-native-progress';
//import { ProgressBar } from "./node_modules/react-bootstrap";
//import AsyncStorage from '@react-native-community/async-storage';
// Amplify Auth
import { withAuthenticator } from 'aws-amplify-react-native';
//import Amplify from 'aws-amplify';
//import progress_bar from './components/progressBar'
// Get the aws resources configuration parameters
import config from './src/aws-exports'; // if you are using Amplify CLI
import ImageUploadS3 from './components/ImageUploadS3'
import Test from './components/AppLoader'
import { NavigationContainer } from '@react-navigation/native';
//Amplify.configure(config)

//Try to get rid of unhandled promise rejection
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

//import uploadResource from './components/uploadResource';
//import uploadImageToS3 from './components/ImageUploadS3';

//import '@aws-amplify/ui-react/styles.css'
//import { AmplifyProvider } from '@aws-amplify/ui-react'
//import { withAuthenticator } from '@aws-amplify/ui-react';


let camera: Camera


function Home({navigation}) {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }


  const __takePicture = async () => {
    try{
      const photo: any = await camera.takePictureAsync()
    //uploadResource(photo)
    //console.log(photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
    console.log("Photo" + photo)
    const capturedImage = photo
    //console.log(capturedImage)
    }
    catch(error) {console.error(error) }
  }
  	// Upload an image to S3
	


  const __retakePicture = () => {
    //console.log(capturedImage)
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
    //console.log(capturedImage)
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
const savePhoto = () => {
//<ImageUploadS3 
 //temp = {this.uploadImageToS3}/>
//  setisLoading(true)  // happens before upload resource try to add a sleep in react? 
//     uploadResource(capturedImage)
//     setisLoading(false) //if upload occurs, then set loading to false
//     setCapturedImage(null)
//     setPreviewVisible(false)
//     setStartCamera(false)
//     Alert.alert("Your photo was saved!")
}

const uploadImageToS3 = async uri => {
  console.log("in uploadImageToS3")
  console.log("uri", uri.uri)
  const response = await fetch(uri.uri)
  console.log("response" + response)
  const blob = await response.blob() // format the data for images 
  console.log("blob" + blob)
  // generate a unique random name for every single image 'fixed length'
  //const [password] = useState(0)
  //var name = prompt("What is your name", "Type you name here");
  //alert("Hi " + name + "\nHope you are enjoying JavaScript!");
  //var password = set.State(Alert.prompt("Enter patient identifier"))
  //console.log("password", password)
  
  const selection = await new Promise((resolve) => {
    Alert.prompt(
    'Enter patient identifier',
    "Don't forget to add A at the end for anesthesia record and _ for _record",
    [
      {text: "Record 1",
      onPress: (password) => resolve(password +"A")
    },
    
      {
      text: 'Record 2',
      onPress: (password) => resolve(password + "B") //console.log('OK Pressed, patient identifier: ' + password)
      //filename = password + '.jpeg'
      },
      {text: "cancel", 
      onPress: () => console.log("cancelled")}
    ],
    'plain-text'
         )
  })
    //console.log("selection" , selection)
  
    // if (selection) {
    //   this.setState({ userSelection: selection });
    // }
  console.log("Selection:" + selection)
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  //console.log(allPatients)
  const folder = 'images' + "/" + selection.slice(0,-1)	
  console.log("Folder" + folder)
  //filename will have the patientIdentifier_A or B_date-month-year
  const filename = selection + "-" + date + "-" + month + "-" + year+ '.jpeg' //Math.random().toString(18).slice(3).substr(0, 10) + '.jpeg'
  console.log("filename" , filename)
  //console.log("patients",allPatients )
  await Storage.put(folder + '/' + filename, blob, {
    progressCallback(progress) {
      const prog = parseInt(progress.loaded/progress.total*100)
      console.log(prog+"%");
      if (prog == 100){

        Alert.alert(
          "Image Uploaded Successfully",
          "",
          [
            
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
          );
      }
      },
    contentType: 'image/jpeg',
    level: 'public'
  })
    .then(() => {
      // every time a new image is added, we call all the items again
      //this.fetchImages('images/', { level: "public" })
    })
    .catch(err => console.log(err))
  Alert.alert("Image was successfully uploaded!")
  }

  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }
  // const fetchResourceFromURI = async uri => {
  //   const response = await fetch(uri);
  //   console.log(response);
  //   const blob = await response.blob();
  //   return blob;
  // }


  // const uploadResource = async photo => {
  //   var percentage = 0
  //   if (isLoading) return;
  //   setisLoading(true);
  //   const img = await fetchResourceFromURI(photo.uri);
  //   console.log("befoire"),
  //   console.log(img),

  //   uploadResource
  //   console.log("after")
  // }
  
  return (
    
    <>
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} uploadImageToS3={uploadImageToS3(capturedImage)} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 150,
              borderRadius: 4,
              backgroundColor: '#00094B',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50
            }}
          >
            
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
				      <ImageUploadS3 />
			    </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
    </> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


const CameraPreview = ({photo, retakePicture,uploadImageToS3, _takePicture, update_progress}: any) => {
  console.log('sdsfds', photo)
  const percentage =.1
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              //onPress={savePhoto && update_progress}
              onPress={uploadImageToS3} //() => { savePhoto; update_progress }}  ImageUploadS3
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
        
      </ImageBackground>
      
    </View>
    
  ) 
}

  function Conference({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Conference Details</Text>
      </View>
    );
  }
  
 
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Take Picture" component={Home} />
        <Stack.Screen name="Home" component={ImageUploadS3} />
        <Stack.Screen name="Conference" component={Conference} />
        <Stack.Screen name="Patient Identifier" component= {Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App, {includeGreetings: true});

