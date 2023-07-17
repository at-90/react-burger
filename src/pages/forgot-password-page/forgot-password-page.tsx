import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {recoveryPwd} from "../../services/actions/user";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { selectUser} from "../../services/selectors/selectors";
import {isEmailValid} from "../../utils/validation";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const {isEmailSend} = useAppSelector(selectUser);
    isEmailSend && navigate('/reset-password', {replace: true})

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('');
    const handleSubmit =(e: React.SyntheticEvent)=>{
        e.preventDefault();
        isEmailValid(email) &&  dispatch(recoveryPwd(email))
    }


    return <main className="page">
        <div className="form-box text-center">
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <form  onSubmit={handleSubmit}>
                <EmailInput
                    placeholder={"Укажите e-mail"}
                    onChange={(e)=>setEmail(e.target.value)}
                    name={"email"}
                    isIcon={false}
                    extraClass="mb-6"
                    value = {email || ''}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    disabled={!email.length}
                    >
                    Восстановить
                </Button>
            </form>

            <div className="mt-20 text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </div>
        </div>
    </main>
}

export default ForgotPasswordPage
