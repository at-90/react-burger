import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ErrorMessage from "../../components/error/error-message";
import {registerUser} from "../../services/actions/user";
import {CLEAR_APP_MESSAGES} from "../../services/actions";
import {selectAppMessage} from "../../services/selectors/selectors";

type TUser = {
    email: string;
    name: string;
    password?:string;
}


const RegisterPage = () => {

    const [user, setUser] = useState<TUser>({name:'',email:''});
    const error = useSelector(selectAppMessage);

    const dispatch:React.Dispatch<any> = useDispatch()

    const handleSubmit =(e: React.SyntheticEvent)=>{
        e.preventDefault();
        dispatch(registerUser(user))
    }

    useEffect(() => {
        dispatch({
            type: CLEAR_APP_MESSAGES
        })
    }, [])

    return <main className="page">
        <div className="form-box text-center">
            <div className="text text_type_main-medium mb-6">Регистрация</div>

            <form onSubmit={handleSubmit}>
                <Input
                    value={user.name || ''}
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    name={"name"}
                    error={false}
                    extraClass="mb-6"

                />
                <EmailInput
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    name={"email"}
                    isIcon={false}
                    extraClass="mb-6"

                />
                <PasswordInput
                    value={user.password || ''}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    name={"password"}
                    extraClass="mb-6"
                />
                {error && <ErrorMessage text={error}/>}
                <Button
                    disabled={
                        user.name !==''  &&
                        user.email !==''  &&
                        user.password !==''
                            ? false
                            : true
                    }
                    htmlType="submit"
                    type="primary"
                    size="medium">
                    Зарегистрироваться
                </Button>
            </form>

            <div className="mt-20 text text_type_main-default text_color_inactive">
                Уже зарегистрированы? <Link to="/login">Войти</Link>
            </div>
        </div>
    </main>
}

export default RegisterPage
