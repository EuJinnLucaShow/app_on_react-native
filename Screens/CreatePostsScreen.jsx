import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const BottomTabs = createBottomTabNavigator();

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable style={styles.imageAddButton} opacity={0.5}>
          <FontAwesome name="camera" size={24} color="gray" />
        </Pressable>
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
        <Pressable style={styles.button} activeOpacity={0.5}>
          <Text style={styles.buttonText}>Опубліковати</Text>
        </Pressable>
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
            <Pressable style={styles.trashButton} activeOpacity={0.5}>
              <EvilIcons name="trash" size={24} color="black" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('Home', { screen: 'PostsScreen' })
              }
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </Pressable>
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
    width: '80%',
    height: '40%',
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAddButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#E8E8E8',
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '400',
  },
  input: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },
});

export default CreatePostsScreen;
