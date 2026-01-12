import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

const Index = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const {user} = useAuthStore()
    const [clicks, setClicks] = useState(0)
    const clickRef = useRef(null)
    useEffect(() => {
        const interval = setInterval(() => {
            formRef.current && handleSubmit()
        }, 5000)
        return () => {clearInterval(interval)}
    }, [])

    useEffect(() => {
        clickRef.current = clicks
    }, [clicks])

    useEffect(() => {
        setClicks(user.user.clicks)
    }, [user])
    const handleClick = () => {
        setClicks((val) => val + 1)
    }

    const handleLogout = () => {
        navigate("/logout")
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch("https://shiny-broccoli-7r4gg65p9gr2xxr6-3000.app.github.dev/click",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({clicks: clickRef.current})
                }
            )
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="container">

            <div className="header">
                <h1>🎮 Кликер Игра</h1>
                <div className="user-info">
                    <span><strong>Имя пользователя</strong></span>
                    <button onClick={handleLogout} className="logout-btn">Выйти</button>
                </div>
            </div>
            <div className="game-area">

                <div className="click-counter">
                    <h2>Твои клики</h2>
                    <div className="clicks-display">{clicks}</div>
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                            <button className="click-button" onClick={handleClick}>👆 КЛИКНИ!</button>
                    </form>
                </div>

                <div className="leaderboard">
                    <h2>🏆 Топ-10 игроков</h2>
                    <ol>
                        <li>
                            <span className="rank">#1</span>
                            <span className="username">bob</span>
                            <span className="score">200 кликов</span>
                        </li>
                        <li>
                            <span className="rank">#2</span>
                            <span className="username">alice</span>
                            <span className="score">150 кликов</span>
                        </li>
                        <li className="current-user">
                            <span className="rank">#3</span>
                            <span className="username">you</span>
                            <span className="score">42 клика</span>
                        </li>
                        <li>
                            <span className="rank">#4</span>
                            <span className="username">charlie</span>
                            <span className="score">75 кликов</span>
                        </li>
                    </ol>
                </div>

            </div>
        </div>
    )
}

export default Index