import React, { Component, ErrorInfo, ReactNode } from "react";
import error from '../../images/error.gif';

interface Props {
    children?: ReactNode;
    errorApp: string;
    errorMessage: string;
}

interface State {
    hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error: string) {
        return { hasError: true };
    }


    componentDidCatch(error:Error, info: ErrorInfo) {
        console.log("Возникла ошибка!", error, info);
    }

    render() {
        if (this.state.hasError || this.props.errorApp) {

            return (
                <section className="errorPage">
                    <img src={error} alt="Ошибка" />
                    <h1>Что-то пошло не так :(</h1>
                    <p>
                        В приложении произошла ошибка.
                        <br />{this.props.errorMessage}
                    </p>
                    <br />Пожалуйста, перезагрузите страницу.

                </section>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;