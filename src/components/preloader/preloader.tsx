import React from 'react'
import styles from './preloader.module.css'

const Preloader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loading}>
                <span></span>
                <span></span>
                <div className={styles.text}>Загрузка...</div>
            </div>
        </div>
    )
}

export default Preloader
