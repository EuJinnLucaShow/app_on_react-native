import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import posts from '../data/posts';

const BottomTabs = createBottomTabNavigator();

const CreatePost = () => {
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

  const clearData = () => {
    setPostPhoto(null);
    setPhotoName('');
    setPhotoLocationName('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {postPhoto ? (
            <Image source={{ uri: postPhoto }} style={styles.image} />
          ) : (
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={cameraRef}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={takePhoto}
              >
                <FontAwesome name="camera" size={24} color="gray" />
              </TouchableOpacity>
            </Camera>
          )}
          <TouchableOpacity onPress={uploadPhoto}>
            <Text style={styles.imageText}>
              {postPhoto ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              value={photoName}
              onChangeText={setPhotoName}
            />
            <TextInput
              style={styles.input}
              placeholder="Місцевість..."
              value={photoLocationName}
              onChangeText={setPhotoLocationName}
            />
            <TouchableOpacity
              style={[
                styles.button,
                postPhoto
                  ? { color: '#FFFFFF', backgroundColor: '#FF6C00' }
                  : { color: '#BDBDBD', backgroundColor: '#F6F6F6' },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmit}
              disabled={!postPhoto}
            >
              <Text
                style={[
                  styles.buttonText,
                  postPhoto ? { color: '#FFFFFF' } : { color: '#BDBDBD' },
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderBottomColor: '#E8E8E8',
          borderBottomWidth: 2,
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.trashButton}
              activeOpacity={0.5}
              onPress={() => {}}
            >
              <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: 'center',
          headerTitleStyle: { paddingBottom: 5 },
        }}
        name="Створити публікацію"
        component={CreatePost}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  trashButton: {
    backgroundColor: '#F6F6F6',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    marginTop: 32,
    width: 345,
    height: 240,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 32,
    width: 345,
    height: 240,
    borderRadius: 8,
  },
  imageAddButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#BDBDBD',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
  formContainer: {
    flex: 3,
  },
  button: {
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    fontWeight: '400',
  },
  input: {
    width: 340,
    height: 50,
    marginTop: 33,
    padding: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },
});

export default CreatePostsScreen;
