import {
    BurgerIcon, ListIcon, Logo, ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className="pt-4 pb-4 header">
            <div className={[headerStyles.menuContainer, headerStyles.menu].join(' ')}>
                <div className="linksBar">
                    <a className={headerStyles.menuLink}><BurgerIcon /><span className='text text_type_main-default'>Конструктор</span></a>
                    <a className={headerStyles.menuLink}><ListIcon /><span className='text text_type_main-default'>Лента заказов</span></a>
                </div>
                <a className={[headerStyles.menuLink, headerStyles.logo].join('  ')}><Logo /></a>
                <a className={[headerStyles.menuLink, headerStyles.personal, 'nmr-5'].join(' ')}><ProfileIcon /><span className='text text_type_main-default'>Личный кабинет</span></a>
            </div>
        </header>
    )
}

export default AppHeader