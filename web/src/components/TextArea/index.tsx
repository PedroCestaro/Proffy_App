import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes <HTMLTextAreaElement> {
    name: string;
    label: string;
}


const Textarea: React.FC<TextareaProps>= ({label,name, ...rest}) => {/*fc == functional component*/
    return(/*{x,y} é uma form desestrututrada de oassar parâmetros*/
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea  id={name} {...rest} />
        </div>
    );

}

export default Textarea;