import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//페이지 컴포넌트
import LoginPage from "./pages/Auth/LoginPage";
import Main from "./pages/Main/Main";
import BottomNav from "./components/Layout/BottomNav";
import Search from "./pages/Search/Search";
import Recommend from "./pages/Recommend/RecommendPage";
import LikePost from "./pages/LikePost/LikePage";
import MyPage from "./pages/MyPage/MyPage";
import EditProfilePage from "./pages/MyPage/EditProfilePage";
import SignUp from "./pages/Auth/SignUpPage";

//Redux
import { setIsAuthenticated } from "./redux/modules/auth";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AddPostPage from "./pages/AddPost/AddPostPage";
import { useCookies } from "react-cookie";
import PostPage from "./pages/Post/PostPage";

const theme = createTheme({
  typography: {
    fontFamily: "SUIT-Regular",
  },
});

//RouteConfig type정의
interface RouteConfig {
  element: JSX.Element;
  path: string;
  private?: boolean;
}

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [cookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  useEffect(() => {
    if (token !== undefined) {
      dispatch(setIsAuthenticated(true))
    }
  }, [dispatch, token]);

  const PrivateRoute = ({ element }: { element: JSX.Element }): JSX.Element => {
    if (isAuthenticated === undefined) {
      // 인증 상태가 결정되지 않으면 로딩 화면 표시
      return <div>Loading...</div>;
    }

    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  const shouldShowBottomNav = (): boolean => {
    const noBottomNavRoutes = ["/", "/signup", "/signup1", "/addpost", "/post"];
    return !noBottomNavRoutes.includes(location.pathname);
  };

  const routes: RouteConfig[] = [
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/main" /> : <LoginPage />,
    },
    { path: "/recommend", element: <Recommend />, private: true },
    { path: "/addpost", element: <AddPostPage />, private: true },
    { path: "/like", element: <LikePost />, private: true },
    { path: "/mypage", element: <MyPage />, private: true },
    { path: "/edit-profile", element: <EditProfilePage />, private: true },
    
    { path: "/main", element: <Main />, private: true },
    { path: "/post/:id", element: <PostPage />, private: true },
    { path: "/search", element: <Search />, private: true },
    { path: "/signup", element: <SignUp /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes>
          {
            routes.map((route) =>
              route.private ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute element={route.element} />}
                />
              ) : (
                <Route key={route.path} path={route.path} element={route.element} />
              )
            )
          }
        </Routes>
        {shouldShowBottomNav() ? <BottomNav /> : null}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 430px; /* 최대 크기 제한 */
  min-width: 320px; /* 최소 너비 제한 */
  min-height: 568px; /* 최소 높이 제한 */
  margin: 0 auto; /* 가운데 정렬 */
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 데스크톱에서 구분을 위한 그림자 */
  background-color: white;
  overflow: hidden;
`;

export default App;