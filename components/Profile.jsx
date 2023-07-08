import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';

const Profile = ({ avatar, name, email }) => {
  return (
    <View style={styles.profileContainer}>
      <Image source={avatar} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{name}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 32,
    marginBottom: 20,
    marginLeft: 20,
  },
  profileImage: {
    borderRadius: 15,
    width: 60,
    height: 60,
  },
  profileInfo: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  profileName: {
    fontWeight: '700',
  },
});

export default Profile;
