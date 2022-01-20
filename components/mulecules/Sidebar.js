import MiniProfile from "../atoms/MiniProfile"
import Suggestions from "../atoms/Suggestions"

const Sidebar = () => {
    return (
        <aside  className="w-full  max-w-[293px] hidden lg:block " >
            <MiniProfile/>
            <Suggestions/>
        </aside>
    )
}

export default Sidebar
