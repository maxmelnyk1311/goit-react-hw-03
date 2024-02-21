export default function ClickCounterBtn({children, clickHandler}) {
    return (
        <li>
            <button onClick={clickHandler} type="button">{children}</button>
        </li>
    )
}