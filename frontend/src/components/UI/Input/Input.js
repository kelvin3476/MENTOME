import styles from './Input.module.css';

// label : 제목
// name : api name
// placeholder : 플레이스홀더
// size : input 길이 사이즈

const Input = (props) => {
    return (
        <div className={styles.contents}>
            <div className={styles.contentschild}>
                <div>
                    <label>{props.label}</label>
                    <div className={styles.group}>
                        <div className={styles.inputWrapper}>
                            <input
                                placeholder={props.placeholder}
                                name={props.name}
                                size={props.size}
                                type={props.type}
                                onChange={props.onChange}
                            />
                        </div>
                        <div className={styles.widthMaker}>{props.warning}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Input;
