import React from 'react';
import {Container, Arrow} from './SelectorStyles';

type SelectorItemId = number;

interface SelectorItem {
    id: SelectorItemId;
    name: string;
    description: string;
}


interface SelectorProps {
    itemsArray: SelectorItem[];
    isSelected: SelectorItemId;
    onSelect: (selectedId: SelectorItemId) => void;
}



/**
 *
 * @param
 * В компоненте всегда есть выбранный элемент. При первоначальной отрисовке в компоненте виден только выбранный элемент.
 * При нажатии стрелки вниз показываются все доступные элементы.
 * При нажатии стрелки вверх элементы сворачиваются.
 * @param onChange
 * @param onBlur
 * @param isLong
 * @constructor
 */
const Selector = ({itemsArray, isSelected, onSelect}: SelectorProps) => {
    //1. Рендер первой строки, на этой строке выбранный элемент и стрелка вниз.
    //2. Метод для рендера всех строк кроме первой.
    return (
        <Container isLong={isLong}>
            <input onChange={(e) => onChange(+e.target.value)}
                   onBlur={(e) => onBlur(+e.target.value)}
                   value={ value ? value : '0'}
            />
        </Container>
    );
};

export default Selector;