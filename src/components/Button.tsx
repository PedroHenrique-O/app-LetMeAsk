import {BaseHTMLAttributes} from 'react';
import '../styles/Button.scss'

type ButtonProps = BaseHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
    return(
        <button className="button" {...props}/>


        
    )
}


