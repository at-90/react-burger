import {  NavLink, Outlet } from 'react-router-dom';
import {logoutUser} from "../../services/actions/user";
import styles from './profile-page.module.css';
import {useAppDispatch} from "../../hooks/hooks";

const ProfilePage = () => {

    const dispatch=useAppDispatch()
    const handlerExit =(e: React.SyntheticEvent)=>{
            e.preventDefault();
            dispatch(logoutUser());
    }
    return <main className="page">
        <div className={styles.profileContainer}>
            <nav className={styles.leftMenu}>
                <ul>
                    <li className={`${styles.leftMenu__item} text text_type_main-medium`}>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "text_color_primary" : "text_color_inactive" } end >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={`${styles.leftMenu__item} text text_type_main-medium`}>
                        <NavLink to="/profile/orders/" className={({ isActive }) => isActive ? "text_color_primary" : "text_color_inactive" } >
                            История заказов
                        </NavLink>
                    </li>
                    <li className={`${styles.leftMenu__item} text text_type_main-medium`} >
                        <button className={styles.leftMenu__link} onClick={handlerExit}>
                            Выход
                        </button>
                    </li>
                </ul>
                <div className={`mt-20 text text_type_main-default ${styles.profile__note}`} >
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </nav>
            <div className={styles.profileContent}>
                <Outlet />
            </div>
        </div>
    </main >
}

export default ProfilePage
