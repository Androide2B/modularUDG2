import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat()
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>--------------------</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>SIIAU</span>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Facebook</span>
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "¡Te han bloqueado!"
            : isReceiverBlocked
            ? "Usuario Bloqueado"
            : "Bloquear Usuario"}
        </button>
        <button className="logout" onClick={handleLogout}>
          <Salir></Salir>
        </button>
      </div>
    </div>
  );
};

export default Detail;