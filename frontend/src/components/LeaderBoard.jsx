import useAppStore from "../store/useAppStore"

const LeaderBoard = () => {
    const { leaderboard } = useAppStore()
    return (
        <div className="leaderboard">
            <h2>🏆 Топ-10 игроков</h2>
            <ol>
                {leaderboard.sort().map((el, i) => (

                    <li>
                        <span className="rank">#1</span>
                        <span className="username">bob</span>
                        <span className="score">200 кликов</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default LeaderBoardc