import {useSelector} from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
    BurgerIcon, ListIcon, Logo, ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectUser} from "../../services/selectors/selectors";
import headerStyles from './app-header.module.css';


const AppHeader = () => {
    const user = useSelector(selectUser)
    return (
        <header className="pt-4 pb-4 header">
            <div className={[headerStyles.menuContainer, headerStyles.menu].join(' ')}>
                <div className="linksBar">
                    <NavLink to="/" className={({ isActive })=>isActive ? `${headerStyles.menuLink} ${headerStyles.menuLink_active} ` : headerStyles.menuLink}><BurgerIcon type={'primary'}/>
                        <span className='text text_type_main-default'>Конструктор</span>
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive })=>isActive ? `${headerStyles.menuLink} ${headerStyles.menuLink_active} ` : headerStyles.menuLink}><ListIcon type={'secondary'}/>
                        <span className='text text_type_main-default'>Лента заказов</span>
                    </NavLink>
                </div>
                <Link to="/" className={[headerStyles.menuLink, headerStyles.logo].join(' ')}><Logo /></Link>
                <NavLink to="/profile" className={({ isActive })=>isActive
                    ? `${headerStyles.menuLink} ${headerStyles.menuLink_active} `
                    : headerStyles.menuLink}  >
                    <ProfileIcon type={'secondary'}/><span className='text text_type_main-default'>
                    {user ? user.name : 'Личный кабинет'}</span>
                </NavLink>
            </div>
        </header>
    )
}

export default AppHeader