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
      <View style={styles.container}>
        {postPhoto ? (
          <Image source={{ uri: postPhoto }} style={styles.image} />
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
              style={styles.imageAddButton}
              opacity={0.5}
              onPress={takePhoto}
            >
              <FontAwesome name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          </Camera>
        )}

        <View style={styles.formContainer}>
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
            style={styles.input}
            placeholder="Назва..."
            value={photoName}
            onChangeText={setPhotoName}
          />
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color="#BDBDBD"
            style={{ position: 'absolute', top: 150, left: -10 }}
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
            <TouchableOpacity style={styles.trashButton} activeOpacity={0.5}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#000',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
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
