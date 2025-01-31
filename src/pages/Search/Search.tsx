import styled from "styled-components"
import TopBar from "../../components/Layout/TopBar";
import SearchPost from "./components/SearchPost";

const Search: React.FC = () => {
  return (
    <SearchPageContainer>
      <TopBar />
      <SearchPostContainer>
        <SearchPost />
      </SearchPostContainer>
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 */
`;

const SearchPostContainer = styled.div`
  flex-grow: 1; /* 남은 공간을 모두 차지 */
  overflow-y: auto; /* 스크롤 가능 */
  width: 100%;
  padding-bottom: 60px;
    &::-webkit-scrollbar {
    display: none;
  }
`;

export default Search;