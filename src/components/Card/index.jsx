import "./style.css"

export const Card = (props) => {
    return (
        <div className="card" id={props.identificador}>
            <div className="title">
                <h2>{props.title}</h2>
                {props.icone}
            </div>
            <div className="values">
                <span>R$ {props.values}</span>
            </div>    
        </div>  
    )
}