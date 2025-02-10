import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { Chat } from '../../../type/chatType';
import useGetUserInfo from '../../../api/Auth/useGetUserInfo';
import { useEffect, useState } from 'react';
import getTimeAgo from '../../../utils/getTimeAgo';

interface ChatProps {
  chat: Chat
};

const WideChatCard: React.FC<ChatProps> = ({ chat }) => {
  const lastMsgTime = new Date(chat.latestMessageTime);
  const navigate = useNavigate();

  const { userInfo, getUserInfo } = useGetUserInfo();
  const formattedDate = getTimeAgo(lastMsgTime);

  useEffect(() => {
    if (userInfo?.id) {
      getUserInfo(userInfo.id);
    }
  }, [getUserInfo, userInfo?.id]);

  return (
    <DataContainer onClick={() => navigate(`/chat/${chat.roomId}`)}>
      <img src={chat.postImageUrl} alt="일러스트" style={{ width: 80, height: 80, margin: 20, borderRadius: "5%" }} />
      <Detail>
        <h3 style={{ margin: "20px 0px 5px 0px" }}>{chat.opponentNickName}</h3>
        <PostDetail>
          <p style={{ margin: "5px 0px" }}>{chat.latestMessage} : {formattedDate}</p>
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
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`

export default WideChatCard;