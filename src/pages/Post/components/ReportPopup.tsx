import React, { SetStateAction, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';
import useReport from '../../../api/Post/useReport';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    name: '광고성 콘텐츠에요',
    subcategories: [
      {
        id: 1,
        name: '상점 및 타사이트 홍보'
      },
      {
        id: 2,
        name: '상품 도배'
      },
    ],
  },
  {
    name: '상품 정보가 부정확해요',
    subcategories: [
      {
        id: 3,
        name: '상품 정보가 부정확함',
      },
    ],
  },
  {
    name: '거래 금지 품목이에요',
    subcategories: [
      {
        id: 4,
        name: '가품(위조품/이미테이션)'
      },
      {
        id: 5,
        name: '개인정보 거래(SNS 계정, 인증번호 등)'
      },
      {
        id: 6,
        name: '게임계정/아이템/대리육성'
      },
      {
        id: 7,
        name: '담배'
      },
      {
        id: 8,
        name: '반려동물(분양/입양 글)'
      },
      {
        id: 9,
        name: '화장품 샘플(견본품, 증정품)'
      },
      {
        id: 10,
        name: '음란물/성인용품(중고속옷 포함)'
      },
      {
        id: 11,
        name: '의약품/의료기기'
      },
      {
        id: 12,
        name: '주류'
      },
      {
        id: 13,
        name: '그 외 기타'
      },
    ],
  },
  {
    name: '안전한 거래를 거부해요',
    subcategories: [
      {
        id: 14,
        name: '현금 거래 및 외부채널 유도 '
      },
      {
        id: 15,
        name: '배송완료 전 구매확정 요청'
      },
      {
        id: 16,
        name: '결제 시 추가 금액 요청'
      },
    ]
  },
  {
    name: '사기가 의심돼요',
    subcategories: [
      {
        id: 17,
        name: '사기가 의심돼요'
      },
    ]
  },
  {
    name: '전문업자 같아요',
    subcategories: [
      {
        id: 18,
        name: '전문 업자 같아요'
      },
    ]
  },
  {
    name: '콘텐츠 내용이 불쾌해요',
    subcategories: [
      {
        id: 19,
        name: '선정적 내용을 담고 있어요.'
      },
      {
        id: 20,
        name: '폭력적인 내용을 담고 있어요'
      },
      {
        id: 21,
        name: '혐오발언이 포함되어있어요.'
      },
    ]
  }
];

const ReportForm: React.FC<{ postId: string, setIsClickedReportBtn: React.Dispatch<SetStateAction<boolean>> }> = ({ postId, setIsClickedReportBtn }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [reportText, setReportText] = useState<string>('');
  const report = useReport();

  // 대분류 선택 시 소분류 업데이트
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    setSelectedSubcategory(null); // 소분류 초기화
  };

  // 신고 문구 입력 처리
  const handleReportTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportText(event.target.value);
  };

  // 제출 처리 (예시)
  const handleSubmit = () => {
    if (selectedCategory && selectedSubcategory && selectedCategoryId) {
      // 신고 제출 로직을 추가하세요.
      report(postId, reportText, selectedCategoryId);
      setIsClickedReportBtn(false);
    } else {
      alert('신고 카테고리를 설정해주세요.');
    }
  };

  // 선택된 대분류에 해당하는 소분류 찾기
  const selectedCategoryData = categories.find(category => category.name === selectedCategory);

  return (
    <Dialog open={true} onClose={() => setIsClickedReportBtn(false)}>
      <DialogTitle>신고하기</DialogTitle>
      <DialogContent>
        {/* 대분류 선택 */}
        <FormControl fullWidth margin="normal">
          <InputLabel>대분류 선택</InputLabel>
          <Select
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            label="대분류 선택"
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 소분류 선택 */}
        <FormControl fullWidth margin="normal">
          <InputLabel>소분류 선택</InputLabel>
          <Select
            value={selectedSubcategory || ''}
            onChange={(e) => {
              const subcategoryName = e.target.value as string;
              setSelectedSubcategory(subcategoryName);

              const subcategory = selectedCategoryData?.subcategories.find(sub => sub.name === subcategoryName);
              setSelectedCategoryId(subcategory ? subcategory.id : null);
            }}
            label="소분류 선택"
          >
            {selectedCategoryData && selectedCategoryData.subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 신고 문구 입력 */}
        <TextField
          value={reportText}
          onChange={handleReportTextChange}
          label="자세한 신고 내용을 적어주세요."
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <StyledDialogActions>
        <Button onClick={() => setIsClickedReportBtn(false)} color="secondary" variant='contained'>
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary" variant='contained'>
          신고하기
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

// 스타일링된 DialogActions 컴포넌트
const StyledDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px; // 기본 패딩 유지
  & > button {
    flex: 1; // 버튼이 동일한 너비를 가지도록 설정
    margin: 0 16px; // 버튼 사이 간격 추가
  }
`;

export default ReportForm;