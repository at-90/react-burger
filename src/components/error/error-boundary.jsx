import React from "react";
import PropTypes from 'prop-types';
import error from '../../images/error.gif';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error) {
        return { hasError: true };
    }


    componentDidCatch(error, info) {
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
                        <br />Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    errorApp: PropTypes.bool
}

export default ErrorBoundary;