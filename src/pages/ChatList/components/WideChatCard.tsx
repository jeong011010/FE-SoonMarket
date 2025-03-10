import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { ChatList } from '../../../type/chatType';
import getTimeAgo from '../../../utils/getTimeAgo';

interface ChatProps {
  chatList: ChatList
};

const WideChatCard: React.FC<ChatProps> = ({ chatList }) => {
  const navigate = useNavigate();
  const formattedDate = getTimeAgo(new Date(chatList.latestMessageTime ? chatList.latestMessageTime : chatList.createTime));

  return (
    <DataContainer onClick={() => navigate(`/chat/${chatList.roomId}`)}>
      <img src={chatList.postImageUrl} alt="일러스트" style={{ width: 80, height: 80, margin: 20, borderRadius: "5%" }} />
      <Detail>
        <DetailTop>
          <h3>{chatList.opponentNickName}</h3>
          <p style={{ paddingLeft: "15px" }}>{formattedDate}</p>
        </DetailTop>
        <PostDetail>
          {chatList.latestMessage === "" ? "채팅을 시작해보세요!" : chatList.latestMessage}
        </PostDetail>
      </Detail>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  width: 100%;
  display: flex;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`
const PostDetail = styled.div`
  font-weight: normal;
`

const DetailTop = styled.div`
  display: flex;
  padding-top : 5px;
  align-items: center;
`

export default WideChatCard;