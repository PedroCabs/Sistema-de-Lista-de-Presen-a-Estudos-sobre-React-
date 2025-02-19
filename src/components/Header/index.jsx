import { useEffect } from 'react'
import './style.css'

export function Header(props){
    return(
        <div className='container'>
            <header>
            <h1>Lista de Presença</h1>
            <div>
                <strong>{props.name}</strong>
                <img src={props.avatar} alt="Foto de Perfil" />
            </div>
            </header>
        </div>
    )
}
