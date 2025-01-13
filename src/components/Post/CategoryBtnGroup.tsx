import { Chip } from "@mui/material";
import styled from "styled-components";

interface CategoryBtnGroupProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryBtnGroup: React.FC<CategoryBtnGroupProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["전체", "여성 의류", "남성 의류", "신발", "가방 지갑", "시계", "악세서리", "전자제품", "스포츠/레저", "컬렉션", "취미", "가구", "주방 용품", "식품", "같이 해요", "같이 시켜요", "같이 먹어요", "같이 타요"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryBox>
      {categories.map((category) => (
        <Category
          key={category}
          label={category}
          variant="outlined"
          onClick={() => handleCategoryClick(category)}
          isSelected={selectedCategory === category}
        />
      ))}
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  border-radius: 50px;
  display: inline-flex;
  flex-wrap: nowrap;
  margin: 0px 10px;
  padding: 8px 0px;
  width: 85%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface CategoryProps {
  isSelected: boolean;
}

interface CategoryProps {
  isSelected: boolean; // 수정: PascalCase로 변경
}

const Category = styled(Chip).withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<CategoryProps>`
  && {
    margin-right: 8px;
    flex-shrink: 0;
    background-color: ${(props) => (props.isSelected ? "lightgray" : "white")} !important;
    border-color: ${(props) => (props.isSelected ? "#2D61A6" : "rgba(0, 0, 0, 0.23)")};
    border-width: 1px;
  }
`;
export default CategoryBtnGroup;