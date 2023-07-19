import React, {useState,useEffect } from "react";
import {updateUser,getApiUser} from "../../services/actions/user";
import {
    Button,
    EmailInput,
    PasswordInput,
    Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './user.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const User = () => {
    const dispatch =useAppDispatch();
    const user = useAppSelector(store => store.user.user);
    const defaultPwd= 'Введите новый пароль';
    const defaultValues = {
        name: user?.name || "",
        email: user?.email || "",
        password: defaultPwd,
    };
    const [state, setState] = useState (defaultValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target?.type === 'checkbox' ? target?.checked : target?.value;
        const name = target?.name;
        setState({
            ...state,
            [name]: value
        });
    }

    const handlerSubmit = (e: React.SyntheticEvent) =>{
        e.preventDefault();
        dispatch(updateUser(state))
    }

    const handleResetForm = (e: React.SyntheticEvent ) =>{
        e.preventDefault();
        setState(defaultValues);
    }

    useEffect(() => { dispatch(getApiUser()) }, [dispatch])

    return <div className="form-box">
        <form onSubmit={handlerSubmit} >
            <Input
                value = {state.name || ''}
                onChange = {handleInputChange}
                type={'text'}
                placeholder={'Имя'}
                icon={'EditIcon'}
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput
                value = {state.email  || ''}
                onChange = {handleInputChange}
                name={'email'}
                isIcon={false}
            />
            <PasswordInput
                value = {state.password || ''}
                onChange = {handleInputChange}
                name={"password"}
                placeholder="Пароль"
                extraClass="mt-6"
            />
            <div className={`mt-6 ${styles.profile__buttons}`}>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                disabled={false}>
                    Сохранить
                </Button>
                <Button
                    onClick={handleResetForm}
                    htmlType="button"
                    type="secondary"
                    size="medium" >
                    Отмена
                </Button>
            </div>
        </form>
    </div>
}

export default User
