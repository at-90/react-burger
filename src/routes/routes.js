import ProtectedRouteElement from "../components/protected-element/protected-element";
import HomePage from "../pages/home-page/home-page";
import LoginPage from "../pages/login-page/login-page";
import RegisterPage from "../pages/register/register-page";
import ForgotPasswordPage from "../pages/forgot-password-page/forgot-password-page";
import ProfilePage from "../pages/profile-page/profile-page";
import ResetPasswordPage from "../pages/reset-password-page/reset-password-page";
import CardPage from "../pages/card-page/card-page";
import ErrorPage from "../pages/error-page/error-page";
import OrderDetails from "../components/order-details/order-details";
import User from "../components/user/user";
import Orders from "../components/orders/orders";
import AuthElement from "../components/protected-element/authElement";

export const profileLeftMenu = [
    { path: '', element: <User /> },
    { path: 'orders', element: <Orders /> }
]

export const routesPrivate = [
    { path: '/orders', element: <ProtectedRouteElement element={<Orders />} />},
    { path: '/profile', element: <ProtectedRouteElement element={<ProfilePage />} />, leftMenu: profileLeftMenu },
    { path: '/forgot-password', element: <AuthElement element={<ForgotPasswordPage />}   />},
    { path: '/reset-password', element:  <AuthElement element={<ResetPasswordPage />}   />}
]

export const routesPublic = [
    { path: '/', element: <HomePage /> },
    { path: '*', element: <ErrorPage /> },
    { path: '/login', element: <AuthElement element={<LoginPage />}   /> },
    { path: '/register', element: <AuthElement  element={ <RegisterPage /> } /> },
]