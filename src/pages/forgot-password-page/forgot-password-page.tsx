import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {recoveryPwd} from "../../services/actions/user";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectIsEmailSend} from "../../services/selectors/selectors";
import {isEmailValid} from "../../utils/validation";
import {AppDispatch} from "../../constants/types";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const isEmailSend = useSelector(selectIsEmailSend);
    isEmailSend && navigate('/reset-password', {replace: true})

    const dispatch: AppDispatch = useDispatch();

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
