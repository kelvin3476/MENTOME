import ArrowIcon from '../../Assets/Icon/ArrowIcon';
import styles from './IntroTitle.module.css';
const IntroTitle = ({ name }) => {
    return (
        <div className={styles.home}>
            <div className={styles.intro__title}>
                {name}
                <a className={styles.intro__title_link} type="external" href="mentor">
                    {name} 더보기
                    <ArrowIcon width={16} height={16} />
                </a>
            </div>
        </div>
    );
};

export default IntroTitle;
