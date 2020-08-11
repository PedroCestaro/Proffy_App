import React, {SelectHTMLAttributes} from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes <HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{/*Passando objetos como argunmentos do Array*/
        value:string;
        label:string;
    }>;
}


const Select: React.FC<SelectProps>= ({label,name,options, ...rest}) => { /*importa os args da interface*/
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value='' id={name} {...rest} >
                <option value="" disabled  hidden/*vai mostrar só o coment*/>Selecione uma opção</option>
                
                {options.map(option =>{ /*para cada opção eu retorno uma opção no input*/
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );

}

export default Select;