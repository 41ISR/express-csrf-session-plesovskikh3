import {create} from "zustand" ;

const useAppStore = create((set,get) =>({
    currentClicks: 0,
    setCurrentClicks: (amount) => set((state) =>({...state, currentClicks: amount})),
    leaderboard: []
}))

export default useAppStore