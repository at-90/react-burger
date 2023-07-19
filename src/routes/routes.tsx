import ProtectedRouteElement from "../components/protected-element/protected-element";
import HomePage from "../pages/home-page/home-page";
import LoginPage from "../pages/login-page/login-page";
import RegisterPage from "../pages/register/register-page";
import ForgotPasswordPage from "../pages/forgot-password-page/forgot-password-page";
import ProfilePage from "../pages/profile-page/profile-page";
import ResetPasswordPage from "../pages/reset-password-page/reset-password-page";
import ErrorPage from "../pages/error-page/error-page";
import User from "../components/user/user";
import OrderItem from "../components/order-item/order-item";
import AuthElement from "../components/protected-element/authElement";
import ProfileOrders from "../components/profile-orders/profile-orders";
import FeedPage from "../pages/feed-page/feed-page";

export const profileLeftMenu = [
    { path: '', element: <User /> },
    { path: 'orders', element: <ProfileOrders /> }
]

export const routesPrivate = [
    { path: '/order-item', element: <ProtectedRouteElement element={<ProfileOrders />} />},
    { path: '/profile', element: <ProtectedRouteElement element={<ProfilePage />} />, leftMenu: profileLeftMenu },
    { path: '/forgot-password', element: <AuthElement element={<ForgotPasswordPage />}   />},
    { path: '/reset-password', element:  <AuthElement element={<ResetPasswordPage />}   />}
]

export const routesPublic = [
    { path: '/', element: < HomePage /> },
    { path: '*', element: <ErrorPage /> },
    { path: '/feed', element: <FeedPage /> },
    { path: '/login', element: <AuthElement element={<LoginPage />}   /> },
    { path: '/register', element: <AuthElement  element={ <RegisterPage /> } /> },
]