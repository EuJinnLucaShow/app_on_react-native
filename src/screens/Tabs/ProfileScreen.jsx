import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

import wallpaper from '../../images/wallpaper.png';

import { db, storage } from '../../firebase/config';
import {
  getUserAvatar,
  getUserId,
  getUserName,
} from '../../redux/auth/authSelectors';
import { logout, updateUserAvatar } from '../../redux/auth/authOperations';

import PostProfileItem from '../../components/Posts/PostProfileItem';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const avatar = useSelector(getUserAvatar);

  const [newAvatar, setNewAvatar] = useState('');
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const dbRef = collection(db, 'posts');
    const userQuery = query(dbRef, where('owner.userId', '==', userId));
    onSnapshot(userQuery, data => {
      const dbPosts = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedDbPosts = dbPosts.sort((a, b) => b.createdAt - a.createdAt);
      setUserPosts(sortedDbPosts);
    });
  }, [userId]);

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
          setNewAvatar(result.assets[0].uri);
          setChangeAvatar(true);
        }
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    const uniqPostId = Date.now().toString();
    try {
      const response = await fetch(newAvatar);
      const file = await response.blob();
      const imageRef = ref(storage, `avatarImage/${uniqPostId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const uploadAvatarToServer = async () => {
    const dbAvatar = await uploadPhotoToServer();
    dispatch(updateUserAvatar(dbAvatar)).then(data => {
      if (data === undefined || !data.uid) {
        return;
      }
      setChangeAvatar(false);
    });
  };

  return (
    <ImageBackground source={wallpaper} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Feather
          name="log-out"
          size={24}
          color={'#BDBDBD'}
          style={{ position: 'absolute', top: 22, right: 16 }}
          onPress={() => dispatch(logout())}
        />
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: newAvatar ? newAvatar : avatar }}
            style={styles.avatar}
            alt="User photo"
          />
          {changeAvatar && (
            <TouchableOpacity
              style={{ ...styles.cameraBtnPos, ...styles.cameraBtn }}
              onPress={uploadAvatarToServer}
            >
              <Ionicons name="checkmark-circle" size={24} color={'#FF6C00'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.btnAdd}>
            {!newAvatar ? (
              <AntDesign
                name="pluscircleo"
                size={25}
                color={'#FF6C00'}
                onPress={pickImage}
              />
            ) : (
              <AntDesign
                name="closecircleo"
                size={25}
                color={'#BDBDBD'}
                onPress={pickImage}
              />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{name}</Text>

        {userPosts.length !== 0 ? (
          <FlatList
            data={userPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PostProfileItem
                id={item.id}
                title={item.title}
                photoLocation={item.photoLocation}
                url={item.photo}
                geoLocation={item.geoLocation}
              />
            )}
          />
        ) : (
          <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
            <Text style={styles.text}>Ще немає публікацій</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 92,
    paddingBottom: 45,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
    marginTop: 147,
    minHeight: Dimensions.get('window').height - 147,
  },
  avatarWrap: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  cameraBtnPos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cameraBtn: {
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd: {
    position: 'absolute',
    top: 75,
    right: -12,
    width: 25,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 30,
    textAlign: 'center',
    // paddingBottom: 15,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
