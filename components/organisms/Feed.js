import Main from "../mulecules/Main"
import Sidebar from "../mulecules/Sidebar"

const Feed = () => {
    return (
        <main className="container flex justify-between mt-9 space-x-4 maxlg:justify-center " >
            <Main/> 
            <Sidebar/> 
        </main> 
    )
}

export default Feed
