import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView } from 'react-native';

import { styles } from './CommentsScreenStyles';
import ReturnButton from '../../components/ReturnButton';
import commentatorPhoto from '../../assets/images/comentator.png';
import userPhoto from '../../assets/images/User.jpg';
import CommentComponent from '../../components/CommentComponent';
import CommentInput from '../../components/CommentInput/CommentInput';

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
        <ReturnButton onPress={handleReturnPress}></ReturnButton>
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
        {comments.map(({ author, text, date }) => {
          return (
            <CommentComponent
              key={text}
              author={author}
              text={text}
              date={date}
              userIcon={author === 'owner' ? userPhoto : commentatorPhoto}
            />
          );
        })}
      </ScrollView>
      <CommentInput />
    </View>
  );
};

export default CommentsScreen;
