 
import Posts from "./Posts"
import Stories from "./Stories"


const Main = () => {
    return (
        <main  className="w-full max-w-[614px] mb-8  " > 
            <Stories/>
            <Posts key={2}/>

        </main>
    )
}

export default Main
