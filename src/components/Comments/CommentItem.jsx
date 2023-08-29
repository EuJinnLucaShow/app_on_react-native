import moment from "moment";
import "moment/locale/uk";
import { StyleSheet, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/auth/authSelectors";

export default function CommentItem({ comment, owner, createdAt }) {
  const userId = useSelector(getUserId);

  return (
    <View
      style={{
        ...styles.commentContainer,
        flexDirection: userId !== owner.userId ? "row" : "row-reverse",
      }}
    >
      <Image
        source={{ uri: owner.avatar }}
        alt="User photo"
        style={styles.avatar}
      />
      <View
        style={{
          ...styles.commentWrap,
          borderTopLeftRadius: userId !== owner.userId ? 0 : 6,
          borderTopRightRadius: userId !== owner.userId ? 6 : 0,
        }}
      >
        <Text style={styles.comment}>{comment}</Text>
        <Text
          style={userId !== owner.userId ? styles.dateUser : styles.dateOwner}
        >
          {moment(createdAt).locale("uk").format("DD MMMM, YYYY | HH:mm")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  commentWrap: {
    position: "relative",
    flex: 1,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    gap: 8,
  },
  comment: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
  dateUser: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 10,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  dateOwner: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 10,
    position: "absolute",
    bottom: 16,
    left: 16,
  },
});
