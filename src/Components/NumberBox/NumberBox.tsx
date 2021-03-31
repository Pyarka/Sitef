import React from 'react';

interface NumberBoxProps {
    value: number;
    onChange: (newValue: number) => void;
    onBlur:  (newValue: number) => void;
}

const NumberBox = ({value, onChange, onBlur}: NumberBoxProps) => {
    return (
        <input className={'input'}
               onChange={(e) => onChange(+e.target.value)}
               onBlur={(e) => onBlur(+e.target.value)}
               value={ value ? value : ''}
        />
    );
};

export default NumberBox;