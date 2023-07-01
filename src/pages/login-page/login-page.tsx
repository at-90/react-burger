import React, { useState, useEffect } from 'react'
import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../services/actions/user";
import { getLocalStorage } from '../../utils/localStorage';
import ErrorMessage from "../../components/error/error-message";
import {CLEAR_APP_MESSAGES} from "../../services/actions";
import {selectAppMessage} from "../../services/selectors/selectors";

type TUser = {
    email: string;
    name: string;
    password?:string;
}

const LoginPage = () => {

    const [user, setUser] = useState<TUser>({name:'',email:''})
    const error = useSelector(selectAppMessage);
    const dispatch: React.Dispatch<any> = useDispatch();

    const handlerSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUser(user))
    };


    useEffect(() => {
        setUser(getLocalStorage('user'));
        dispatch({
            type: CLEAR_APP_MESSAGES
        })
    }, [])

    return <main className="page">
        <div className="form-box text-center mx-auto">
            <div className="text text_type_main-medium mb-6">Вход</div>
            <form onSubmit={handlerSubmit}>
                <EmailInput
                    name="email"
                    isIcon={false}
                    extraClass="mb-6"
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <PasswordInput
                    name="password"
                    extraClass="mb-6"
                    value={user.password || ''}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                {error && <ErrorMessage text={error}/>}
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={
                        user.email !==''  &&
                        user.password !==''
                            ? false
                            : true
                    }>
                    Войти
                </Button>
            </form>

            <div className="mt-20 text text_type_main-default text_color_inactive">
                Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
            </div>
            <div className="mt-4 text text_type_main-default text_color_inactive">
                Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
            </div>
        </div>
    </main>

};

export default LoginPage;