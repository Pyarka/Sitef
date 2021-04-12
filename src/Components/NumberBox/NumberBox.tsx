import React from 'react';
import Container from './NumberBoxStyles';

interface NumberBoxProps {
    value: number;
    isLong: boolean;
    onChange: (newValue: number) => void;
    onBlur:  (newValue: number) => void;
}

const NumberBox = ({value, onChange, onBlur, isLong}: NumberBoxProps) => {
    return (
        <Container isLong={isLong}>
            <input onChange={(e) => onChange(+e.target.value)}
                   onBlur={(e) => onBlur(+e.target.value)}
                   value={ value ? value : '0'}
            />
        </Container>
    );
};

export default NumberBox;