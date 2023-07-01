import styles from './error-page.module.css'
import error from "../../images/error.gif";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return <main className="page">
        <section className="errorPage">
            <img src={error} alt="Ошибка" />
            <h1>Что-то пошло не так :(</h1>
            <p>
                Ошибка 404 - страница не найдена
            </p>
            <Link style={{textDecoration: 'underline'}} to ="/" >Начните с главной </Link>

        </section>

    </main>
}

export default ErrorPage
