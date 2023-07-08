import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign } from '@expo/vector-icons';
import data from '../data/data';
import Post from '../components/Post';

const backgroundImage = require('../assets/photobg.png');
const avatar = require('../assets/avatar.png');
const postImage = require('../assets/forest.png');

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
        >
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={styles.photoContainer}>
                <ImageBackground
                  source={avatar}
                  style={{ width: '100%', height: '100%' }}
                ></ImageBackground>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate('Home', { screen: 'PostsScreen' })
                }
              >
                <Feather name="log-out" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.title}>Natali Romanova</Text>
              {data.map(element => (
                <Post
                  key={element.id}
                  img={postImage}
                  text={element.name}
                  messages={0}
                  location={element.location}
                />
              ))}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  logoutButton: {
    marginLeft: 350,
    marginTop: -40,
  },
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 200,
  },
  photoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'visible',
  },

  addButton: {
    marginTop: -40,
    left: '90%',
    height: 25,
    width: 25,
    pointerEvents: 'auto',
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
});
