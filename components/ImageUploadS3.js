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
	Pressable,
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
import PatientImage from './PatientImages'
import Test from './AppLoader'
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
Amplify.configure(config)


const Item = ({ title }) => (
	<View style={styles.item}>
	  <Text style={styles.title}>{title}</Text>
	</View>
  );


export default class ImageUploadS3 extends React.Component {
	state = {
		image: null,
		allImages: [],
		allPatients: []

	}

	// First of all fetch all public images from S3
	componentDidMount = async () => {
		console.log("in component")
		await this.fetchFolderNames('images/', { level: "public" }) // (path, access)
		this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
	}

	// Upload an image to S3
	uploadImageToS3 = async uri => {
		const response = await fetch(uri)
		const blob = await response.blob() // format the data for images 
		
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
			let { allPatients } = this.state
			if (selection) {
				this.setState({ userSelection: selection });
				allPatients.push(selection.slice(0,-1));
			}
			
		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();
		console.log(allPatients)
		const folder = 'images' + "/" +selection.slice(0,-1)	
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
				this.fetchImages('images/', { level: "public" })
			})
			.catch(err => console.log(err))

		
		}


	fetchFolderNames = async (path,access) => {
		console.log("in new fucntion")
		//fetch all files
		this.allImages = await this.fetchImages('images/', { level: "public" })
		//console.log("images", this.state.allImages)
		//create loop
		this.state.allImages.map((element) => {
			var bool = false
			const first = element.key.slice(7,-15)
			var f = first.split("/")
			this.state.allPatients.map((element2) =>{
				//console.log(f)
				if (f[0] == element2){
					bool = true
				}

			})
			if (bool == false){
				this.state.allPatients.push(f[0])
			}
		  });
		  
		//check if it already exists in all patients
		//if not, add to allpatients
		//console.log("patients",this.state.allPatients)
		
	}
	fetchImages = async (path, access) =>  {
		await Storage.list(path, access)
			.then(async (res) => {
				// Get rid of the first item in the returned array which is the folder itself !!! (blame AWS )
				res = res.slice(1)
				// Clone the original array of data to avoid mutating the original data
				resModified = [].concat(res)
				// Sort the images by descending publication date
				resModified.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
				// Add the uri of every image stored in S3
				await this.getImagesUri(resModified) // (data)
				// Store the up to drrate data in the allImages array
				this.setState({ allImages: resModified })
				//console.log('allImages: ', this.state.allImages)
			})
			.catch(err => console.log(err))
	}

	/* 
		The uri of the image is surprinsingly absent from the object item of the Storage.list() response.
		Only by calling Storage.get() on every item of the list that we will get the uri.
		The below function will call Storage.get() on every single key from the Storage.list() array
		to return the uri of every image stored in allImages.
	*/
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

	// // Ask for permission to access the user's phone library
	// askPermissionsAsync = async () => {
	// 	await Permissions.askAsync(Permissions.CAMERA_ROLL);
	// }
    
    //Trying this instead of code above for getting permissions as permissions is depracated 
    getPermissionAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		
        if (status !== "granted") {
	
			
         // 
		 //alert("...");
        }
	}

	// Fetch a single image from user's device and upload it to S3
	useLibraryHandler = async () => {
		//this.get_patientIdentifier
		await this.getPermissionAsync()
		//console.log("2",password)
		
		let result = await ImagePicker.launchImageLibraryAsync(
			{
				allowsEditing: true,
				//aspect: [4, 3],
			}
		)
		
		//console.log(result);
		if (!result.cancelled) {
			this.setState({ image: result.uri })
			this.uploadImageToS3(this.state.image)
		}

	}
			

	// Remove Image from S3. Tobe moved to the contest page 
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
	
	render() {
		let { allPatients } = this.state
		var temp = ""
		
		//const navigation = useNavigation(); 
		return (
			this.componentDidMount,
			<View style={styles.container}>
				<View style={styles.headerStyle}>
					<TouchableOpacity
						onPress={this.useLibraryHandler}
						
					>
						<Ionicons 
							name="md-add-circle"
							style={styles.buttonStyle}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.componentDidMount}
					>
						<Ionicons 
							name="md-refresh"
							style={styles.buttonStyle}
						/>
					</TouchableOpacity>
				</View>
					<FlatList
						ref={(ref) => {this.flatListRef = ref }}
						data= {this.state.allPatients}						
						renderItem ={(item) =>{
							return(
								
								console.log("temp",item.item),
								<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
									<Button
										temp = {item}
				  						onPress={() => this.props.navigation.navigate('Patient Identifier', {params:{name:{item}}}
										  )}
										title = {item.item}
				  						style={{ backgroundColor: 'plum', padding: 10, marginBottom: 10, marginTop: 10 }}
									>
								<Text>{item.item}</Text>
								</Button>
			  					</View>
							)
						}
						}
						keyExtractor = {item => item.id}

					/>

			</View>	
		);
	}
}

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
});