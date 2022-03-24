import {setStatusBarTranslucent, StatusBar} from 'expo-status-bar'
import {useState,useEffect, React} from 'react'

import { StyleSheet,SafeAreaView, Screen, Dimensions, FlatList, ScrollView,Text, View, TouchableOpacity, Pressable, Alert, ImageBackground, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Amplify, { photoPlaceholder, Storage } from 'aws-amplify'
import PatientImages from './PatientImages'

  
var allImages = []
var allPatients = []

async function fetchImages (path, access) {
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
             return resModified,
             console.log("global.all images in the fetch images", global.allImages)
  
          })
          .catch(err => console.log(err))
     //  return global.allImages;}
        }
       catch(e){
         console.log(e)
       }
       //console.log("response", response)
  
  }
 
	
			

async function componentDidMount (filepath) {
    console.log("in component", filepath)
    await fetchImages(filepath, { level: "public" }) // (path, access)
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    console.log("in compondnetditne", global.allImages)
  }
getImagesUri = async (data) => {
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
removeImageFromS3 = async (name) => {
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
//class Test extends React.Component {
function Test({route,navigation}){
    const [patientInfo, setPatientInfo] = useState({});
    const name = route.params;
    console.log(name)
    const actualname = name.params.name.item.item
    console.log("name", name.params.name.temp)
    const filepath = 'images/' + actualname + "/"
    console.log("filepath",filepath)
    console.log("in the actual before return," , global.allImages)

    return (
      <View style={{flex: 1}}>
				      <PatientImages fn={actualname} />
			    </View>
    )
}
  
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