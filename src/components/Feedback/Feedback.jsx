export default function Feedback({feedbacks, totalFeedbacks}) {
    const positiveFeedbacks = Math.round(((feedbacks.good + feedbacks.neutral) / totalFeedbacks) * 100);
    return (
        <ul>
            <li>
                <p>Good: {feedbacks.good}</p>
            </li>
            <li>
                <p>Neutral: {feedbacks.neutral}</p>
            </li>
            <li>
                <p>Bad: {feedbacks.bad}</p>
            </li>
            <li>
                <p>Total: {totalFeedbacks}</p>
            </li>
            <li>
                <p>Positive: {positiveFeedbacks}%</p>
            </li>
        </ul>
    )
}