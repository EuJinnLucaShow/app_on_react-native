import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase/config';
import {
  getUserAvatar,
  getUserId,
  getUserName,
} from '../../redux/auth/authSelectors';
import CommentItem from '../../components/Comments/CommentItem';

export default function CommentsScreen({ route }) {
  const { id, url } = route.params;

  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const avatar = useSelector(getUserAvatar);

  const sendComment = async () => {
    if (!comment) {
      return;
    }
    try {
      await addDoc(collection(db, 'posts', id, 'comments'), {
        comment,
        owner: { userId, name, avatar },
        createdAt: new Date().getTime(),
      });
      setComment('');
    } catch (error) {
      console.log(error.code);
    }
  };

  useEffect(() => {
    const commentsRef = collection(db, 'posts', id, 'comments');
    onSnapshot(commentsRef, data => {
      const dbComments = data.docs.map(doc => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      const sortedDbComments = dbComments.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setAllComments(sortedDbComments);
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.postPhotoWrap}>
            <Image
              source={{ uri: url ? url : null }}
              style={styles.postPhoto}
            />
          </View>
          {allComments.length !== 0 ? (
            allComments.map(({ commentId, comment, owner, createdAt }) => (
              <CommentItem
                key={commentId}
                commentId={commentId}
                comment={comment}
                owner={owner}
                createdAt={createdAt}
              />
            ))
          ) : (
            <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
              <Text style={styles.text}>Ще немає коментарів</Text>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputWrap}>
            <TextInput
              name="comment"
              value={comment}
              placeholder="Коментувати..."
              placeholderTextColor={'#BDBDBD'}
              style={
                isFocused
                  ? { ...styles.input, borderColor: '#2765b8' }
                  : { ...styles.input }
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={value => setComment(value)}
            />
            <View style={styles.sendBtn}>
              <Feather
                onPress={sendComment}
                name="arrow-up"
                size={24}
                color={'#FFFFFF'}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomColor: 'rgba(0, 0, 0, 0.30)',
  },
  postPhotoWrap: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginBottom: 32,
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  inputWrap: {
    marginTop: 31,
    marginBottom: 16,
  },
  input: {
    height: 50,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    backgroundColor: '#2765b8',
    borderRadius: 100,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
});
