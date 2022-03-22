import {setStatusBarTranslucent, StatusBar} from 'expo-status-bar'
import React from 'react'

import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
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

//Amplify.configure(config)

//Try to get rid of unhandled promise rejection
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import uploadResource from './components/uploadResource';
import uploadImageToS3 from './components/ImageUploadS3';

//import '@aws-amplify/ui-react/styles.css'
//import { AmplifyProvider } from '@aws-amplify/ui-react'
//import { withAuthenticator } from '@aws-amplify/ui-react';


let camera: Camera


function App() {
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
    const capturedImage = photo
    //console.log(capturedImage)
    }
    catch(error) {console.error(error) }
  }


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
            <CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePicture={__retakePicture} />
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
              backgroundColor: '#050A30',
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


const CameraPreview = ({photo, retakePicture, savePhoto, _takePicture, update_progress}: any) => {
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
              onPress={ImageUploadS3} //() => { savePhoto; update_progress }}  
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

export default withAuthenticator(App, {includeGreetings: true});
