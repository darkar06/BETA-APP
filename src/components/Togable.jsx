import { useState } from "react"

const Togable = ({ children }) => {
    const [visivility, setVisivility] = useState(false)

    const showVisivility = { display: visivility ? "block" : "none" }
    const hiddenVisivility = { display: visivility ? "none" : "block" }

    const changeVisivility = () => {
        setVisivility(!visivility)
    }
    return (
        <div>
            <div style={hiddenVisivility} onClick={changeVisivility}>
                <button>create</button>
            </div>


            <div style={showVisivility}>
                {children}
                <button onClick={changeVisivility} >cancel</button>
            </div>
        </div >
    )
}

export default Togable