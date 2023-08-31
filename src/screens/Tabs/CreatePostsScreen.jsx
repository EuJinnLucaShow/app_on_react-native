import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import Btn from '../../components/Buttons/Btn';
import { db, storage } from '../../firebase/config';
import { getUserId, getUserName } from '../../redux/auth/authSelectors';

export default function CreatePostsScreen() {
  const navigation = useNavigation();
  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);

  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [photoLocation, setPhotoLocation] = useState('');
  const [geoLocation, setGeoLocation] = useState('');

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused, setIsFocused] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const makePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    }
  };

  const deletePost = () => {
    setPhoto('');
    setTitle('');
    setPhotoLocation('');
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(db, 'posts'), {
        photo,
        title,
        photoLocation,
        geoLocation,
        owner: { userId, name },
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.log('error', error.message);
      throw error;
    } finally {
      deletePost();
      navigation.navigate('PostsScreen');
    }
  };

  const uploadPhotoToServer = async () => {
    const uniqPostId = Date.now().toString();
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const imageRef = ref(storage, `postImage/${uniqPostId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setPhoto(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {photo ? (
            <ImageBackground
              source={{ uri: photo }}
              style={styles.postPhotoWrap}
            >
              <TouchableOpacity
                style={{ ...styles.cameraBtn, opacity: 0.4 }}
                onPress={() => {
                  setPhoto('');
                }}
              >
                <Ionicons name="ios-camera" size={24} color={'#FFFFFF'} />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <Camera style={styles.postPhotoWrap} type={type} ref={setCameraRef}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={22}
                color={'#BDBDBD'}
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              />
              <TouchableOpacity style={styles.cameraBtn} onPress={makePhoto}>
                <Ionicons name="ios-camera" size={24} color={'#BDBDBD'} />
              </TouchableOpacity>
            </Camera>
          )}

          {photo ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.text}>Завантажте фото</Text>
            </TouchableOpacity>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <TextInput
              name="title"
              placeholder="Назва..."
              placeholderTextColor={'#BDBDBD'}
              style={
                isFocused === 'title'
                  ? { ...styles.input, borderColor: '#FF6C00' }
                  : { ...styles.input }
              }
              value={title}
              onChangeText={value => setTitle(value)}
              onFocus={() => setIsFocused('title')}
              onBlur={() => setIsFocused(null)}
            />
            <View>
              <Feather
                name="map-pin"
                size={24}
                color={'#BDBDBD'}
                style={styles.locationIcon}
              />
              <TextInput
                name="location"
                placeholder="Місцевість..."
                placeholderTextColor={'#BDBDBD'}
                style={
                  isFocused === 'location'
                    ? {
                        ...styles.input,
                        marginBottom: 32,
                        paddingLeft: 28,
                        borderColor: '#FF6C00',
                      }
                    : { ...styles.input, marginBottom: 32, paddingLeft: 28 }
                }
                value={photoLocation}
                onChangeText={value => setPhotoLocation(value)}
                onFocus={() => setIsFocused('location')}
                onBlur={() => setIsFocused(null)}
              />
            </View>
          </KeyboardAvoidingView>
          <Btn
            text="Опубліковати"
            disabled={photo && title && photoLocation ? false : true}
            style={{
              ...styles.button,
              backgroundColor:
                photo && title && photoLocation ? '#FF6C00' : '#F6F6F6',
            }}
            styleTitle={{
              ...styles.title,
              color: photo && title && photoLocation ? '#FFFFFF' : '#BDBDBD',
            }}
            onPress={uploadPostToServer}
          />
          <TouchableOpacity
            style={styles.trashBtn}
            onPress={deletePost}
            disabled={photo && title && photoLocation ? false : true}
          >
            <Feather name="trash-2" size={24} color={'#BDBDBD'} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomColor: 'rgba(0, 0, 0, 0.30)',
  },
  postPhotoWrap: {
    flex: 1,
    height: 240,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  flipContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#BDBDBD',
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 11,
    borderColor: '#E8E8E8',
    color: '#212121',
    fontSize: 16,
  },
  locationIcon: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
  btn: {
    height: 51,
    borderRadius: 100,
    alignItems: 'center',
    paddingVertical: 16,
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  trashBtn: {
    width: 70,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 23,
    paddingVertical: 8,
    marginTop: 120,
    marginBottom: 22,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
