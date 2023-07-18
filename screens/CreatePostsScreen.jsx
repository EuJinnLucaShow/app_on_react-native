import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import {
  FontAwesome,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import posts from '../data/posts';

const BottomTabs = createBottomTabNavigator();

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoLocationName, setPhotoLocationName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [currentGeoLocation, setCurrentGeoLocation] = useState({});
  const cameraRef = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    };

    getLocation();
  }, []);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPostPhoto(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const clearData = () => {
    setPostPhoto(null);
    setPhotoName('');
    setPhotoLocationName('');
  };

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPostPhoto(result.assets[0].uri);
  };

  const handleSubmit = () => {
    const data = {
      img: postPhoto,
      description: photoName,
      likes: 0,
      comments: [],
      locationName: photoLocationName,
      geoLocation: currentGeoLocation,
    };
    posts.unshift(data);
    clearData();
    navigation.navigate('Home', { screen: 'PostsScreen' });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.createPostsScreenContainer}>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            {postPhoto ? (
              <Image
                source={{ uri: postPhoto }}
                style={{
                  marginTop: 32,
                  width: '100%',
                  height: 240,
                  borderRadius: 8,
                }}
              />
            ) : (
              <Camera
                style={{
                  marginTop: 32,
                  width: 350,
                  height: 240,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
              >
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  opacity={0.5}
                  onPress={takePhoto}
                >
                  <FontAwesome name="camera" size={24} color="#fff" />
                </TouchableOpacity>
              </Camera>
            )}

            <Text
              style={{
                fontSize: 16,
                color: '#BDBDBD',
                fontWeight: '400',
                lineHeight: 19,
                marginTop: 8,
              }}
              onPress={uploadPhoto}
            >
              {postPhoto ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>

            <TextInput
              style={styles.photoMetaInput}
              placeholder="Назва..."
              value={photoName}
              onChangeText={setPhotoName}
            />
            <View style={{ position: 'relative', marginBottom: 32 }}>
              <TouchableOpacity style={styles.mapButton}>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color="#BDBDBD"
                  // style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </TouchableOpacity>
              <TextInput
                style={[styles.photoMetaInput, { paddingLeft: 28 }]}
                placeholder="Місцевість..."
                type={'text'}
                name={'photoLocation'}
                value={photoLocationName}
                onChangeText={setPhotoLocationName}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.publishButton,
                postPhoto
                  ? { backgroundColor: '#FF6C00' }
                  : { backgroundColor: '#F6F6F6' },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmit}
              disabled={!postPhoto}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#ffffff',
                  },
                  postPhoto
                    ? {
                        backgroundColor: '#FF6C00',
                      }
                    : {
                        color: '#BDBDBD',
                        backgroundColor: '#F6F6F6',
                      },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={clearData}
            style={[
              styles.removePostButton,
              postPhoto
                ? { backgroundColor: '#FF6C00' }
                : { backgroundColor: '#F6F6F6' },
            ]}
            disabled={!postPhoto}
          >
            <Feather
              name="trash-2"
              size={24}
              style={{ color: postPhoto ? '#fff' : '#BDBDBD' }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createPostsScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  addPhotoButton: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
  },
  photoMetaInput: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    color: '#212121',
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  mapButton: {
    position: 'absolute',
    top: 13,
  },
  publishButton: {
    width: '100%',
    height: 50,
    marginBottom: 120,
    padding: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  removePostButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
