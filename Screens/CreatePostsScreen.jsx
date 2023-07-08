import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const BottomTabs = createBottomTabNavigator();

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imageAddButton} opacity={0.5}>
          <FontAwesome name="camera" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.imageText}>Завантажте фото</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          inputMode="text"
        />
        <TextInput
          style={styles.input}
          placeholder="Місцевість..."
          inputMode="navigation"
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <Text style={styles.buttonText}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
    </View>
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
              <EvilIcons name="trash" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('Home', { screen: 'PostsScreen' })
              }
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    width: '92%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#F6F6F6',
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    color: '#BDBDBD',
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
