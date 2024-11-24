import styled from "styled-components"
import TopBar from "../../components/Layout/TopBar";

const Search: React.FC = () => {
  return (
    <SearchPageContainer>
      <TopBar />
    </SearchPageContainer>
  )
}

const SearchPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

export default Search;