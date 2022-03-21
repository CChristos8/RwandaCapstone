/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import ProgressBar from 'react-native-progress/Bar'
import * as Progress from 'react-native-progress';
import config from 'C:/Users/mguir/RwandaCapstone/src/aws-exports';// if you are using Amplify CLI
Amplify.configure(config)
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import Amplify, { photoPlaceholder, Storage } from 'aws-amplify'
import React, { Component } from "react";
import { useState } from 'react'
//import {ProgressBar} from 'react-native-progress/Bar';
import  progress_bar from 'C:/Users/mguir/RwandaCapstone/components/progressBar';
import axios from 'axios';
import { photoPickerButton } from "aws-amplify";



const fetchResourceFromURI = async uri => {
  const response = await fetch(uri);
  console.log(response);
  const blob = await response.blob();
  return blob;
}

const per = async percentage => {
  <View>
  <Text>Hello, I am...</Text>
  <TextInput
    style={{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
    }}
    defaultValue="Name me!"
  />
</View>
}

const uploadResource = (photo,progressText, setProgressText) => {
//function uploadResource(photo){
  //if (isLoading) return;
  //setisLoading(true)
  //const [progressText, setProgressText] = useState('');
  const img = fetchResourceFromURI(photo.uri);
  return Storage.put(photo.uri, img, {
    level: 'public',
    contentType: photo.type,
    progressCallback(uploadProgress) {
      setProgressText(
        `Progress: ${Math.round(
          (uploadProgress.loaded / uploadProgress.total) * 100,
        )} %`,
      );
      console.log(progressText
       // `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
      );
    },
  })
    .then(res => {
      setProgressText('Upload Done: 100%');
      //setAsset(null);
      //setisLoading(false);
      Storage.get(res.key)
        .then(result => console.log(result))
        .catch(err => {
          setProgressText('Upload Error');
          console.log(err);
        });
    })
    .catch(err => {
      //setisLoading(false);
      setProgressText('Upload Error');
      console.log(err);
    }) //, console.log("text", progressText)
  
}

      // .then(res => {
      //   setProgressText('Upload Done: 100%');
      //   //setAsset(null);
      //   setisLoading(false);
      //   Storage.get(res.key)
      //     .then(result => console.log(result))
      //     .catch(err => {
      //       setProgressText('Upload Error');
      //       console.log(err);
      //     });
      // })
      // .catch(err => {
      //   setisLoading(false);
      //   setProgressText('Upload Error');
      //   console.log(err);
      // });
      

  //   Storage.put(photo, img, options).then(res => { 
  //       console.log(res)
  //       this.setState({ avatar: res.photo.url, uploadPercentage: 100 }, ()=>{
  //         setTimeout(() => {
  //           this.setState({ uploadPercentage: 0 })
  //         }, 1000);
  //       })
  //   })
  // }

//   render() {
//     //const {uploadPercentage} = this.state;
//     // console.log("render")
//     return (
//       <h1> "hi"</h1>,
//       this.uploadFile(props)
//         //<input type="file" className="form-control profile-pic-uploader" onChange={this.uploadFile} />
//       //  <ProgressBar now={uploadPercentage} />
//     )
//   };
// }




export default uploadResource;
