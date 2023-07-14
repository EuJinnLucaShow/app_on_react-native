import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const CommentsScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      params: { comments, image },
    },
  } = useRoute();

  const handleReturnPress = () => {
    navigation.navigate('Home', {
      screen: 'PostScreen',
      params: {
        user: '123',
      },
    });
  };

  return (
    <View style={styles.commentsScreenContainer}>
      <View style={styles.commentsHeaderContainer}>
        <TouchableOpacity onPress={handleReturnPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.commentsHeader}>Коментарі</Text>
      </View>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 20,
        }}
      >
        <View style={styles.postPhotoContainer}>
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: 240,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{ margin: 0, padding: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {comments.map(({ author, text, date, userIcon }, index) => {
          return (
            <View
              key={index}
              style={[
                styles.commentContainer,
                author === 'owner' ? { flexDirection: 'row-reverse' } : {},
              ]}
            >
              <Image source={userIcon} style={styles.userIcon} />
              <View
                style={[
                  styles.comment,
                  author === 'owner'
                    ? { borderTopEndRadius: 0, borderTopLeftRadius: 6 }
                    : {},
                ]}
              >
                <Text style={styles.text}>{text}</Text>
                <Text
                  style={[
                    styles.date,
                    author === 'owner'
                      ? { marginRight: 'auto', marginLeft: 0 }
                      : {},
                  ]}
                >
                  {date}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsScreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  commentsHeaderContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 90,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
    marginBottom: 32,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  commentsHeader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 500,
    fontSize: 17,
  },

  postPhotoContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  addPhotoButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
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
    marginBottom: 80,
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
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  commentContainer: {
    marginBottom: 18,
    paddingLeft: 16,
    paddingRight: 16,
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  comment: {
    maxWidth: 315,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopEndRadius: 6,
  },
  text: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 16,
    color: '#212121',
  },
  date: {
    marginLeft: 'auto',
    fontSize: 10,
    color: '#BDBDBD',
  },
});

export default CommentsScreen;
