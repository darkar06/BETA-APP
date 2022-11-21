import "./Alert.css"

export default function Alert({error = null, message = null, handleClick}){
    return(
        <div className="modal__background">
            <div className="modal">
                {
                    error ? <h3 className="error">Error</h3> : <h3 className="aviso">aviso</h3>
                }
                <p>{error ? error : message}</p>
                <button onClick={handleClick}>OK</button>
            </div>
        </div>
    )
}