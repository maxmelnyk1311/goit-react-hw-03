import ClickCounterBtn from "./ClickCounterBtn/ClickCounterBtn.jsx";
import css from './Options.module.css';

export default function Options({feedbacks, onUpdate, onReset, totalFeedbacks}) {
    const keys = Object.keys(feedbacks);
    return (
        <ul className={css.optionsList}>
            {keys.map((key) => {
                return (
                    <ClickCounterBtn 
                        key={key}
                        className={css.optionButton}  
                        clickHandler={() => onUpdate(key)}>
                            {key}
                    </ClickCounterBtn>)
            })}
            {totalFeedbacks > 0 && 
                <ClickCounterBtn clickHandler={onReset}>reset</ClickCounterBtn>
            }
        </ul>
    )
}