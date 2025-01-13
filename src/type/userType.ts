export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  nickname: string;
  image: {
    imageUrl: string;
    originalName: string;
  };
  preferredCategories: number[];
  openchatUrl: string;
  reportCount: number;
}