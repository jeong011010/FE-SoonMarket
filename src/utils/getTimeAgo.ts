const getTimeAgo = (uploadTime: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - uploadTime.getTime()) / 1000); // 초 단위 차이

  if (diff < 60) return "방금 전"; // 1분 이내
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`; // 1시간 이내
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`; // 24시간 이내
  if (diff < 2678400) return `${Math.floor(diff / 86400)}일 전`; // 31일 이내
  if (diff < 31536000) return `${Math.floor(diff / 2678400)}개월 전`; // 1년 이내

  return `${uploadTime.getFullYear().toString().slice(-2)}년 ${uploadTime.getMonth() + 1}월 ${uploadTime.getDate()}일`; // 1년 이상일 경우 날짜 표시
};

export default getTimeAgo;