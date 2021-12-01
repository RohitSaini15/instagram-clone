import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, img, userImg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snap) => {
        setComments(snap.docs);
      }
    );
  }, [db, id]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snap) => {
      setLikes(snap.docs);
    });
  }, [db, id]);

  useEffect(() => {
    return setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      timestamp: serverTimestamp(),
      username: session.user.username,
      userImage: session.user.image,
    });
  };

  return (
    <div className="bg-white my-7 border-rounded-sm">
      <div className="flex items-center p-5">
        <img
          className="h-12 w-12 border p-1 mr-3 rounded-full object-contain"
          src={userImg}
          alt=""
        ></img>
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} alt="" className="object-cover w-full"></img>

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  className="h-7 rounded-full"
                  src={comment.data().userImage}
                  alt=""
                ></img>
                <p className="text-sm flex-1">
                  <span className="font-bold">{comment.data().username}</span>{" "}
                  {comment.data().comment}
                </p>

                <Moment fromNow className="text-xs pr-5">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            );
          })}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
