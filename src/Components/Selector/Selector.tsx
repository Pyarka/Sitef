import React, {ReactElement, useEffect, useState} from 'react';
import {Container, Arrow} from './SelectorStyles';
import {getAllScaleRequest, getNormalScale, getScaleRequest, ScalePopupProps} from "../ScalePopup/Helper";

type SelectorItemId = number;

interface SelectorItem {
    id: SelectorItemId;
    name: string;
    description: string;
}

interface SelectorProps {
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
const Selector = ({isSelected, onSelect}: SelectorProps):ReactElement => {
    const [isOpened, setOpened] = useState(true);
    const [selectedElement, setSelectedElement] = useState(0);
    const [allScales, setAllScales] = useState([] as ScalePopupProps[]);
    //1. Рендер первой строки, на этой строке выбранный элемент и стрелка вниз.
    //2. Метод для рендера всех строк кроме первой.

    const getData = () => {
        getAllScaleRequest().then((scaleArray: ScalePopupProps[]) => {
            const newScaleArray =
        });


    }

    const renderAllElements = (): ReactElement[] => {



        return itemsArray.filter(({id}) => id !== selectedElement).map(({id, name}) => {
            return (
                <div>
                    <IdCell>{id}</IdCell>
                    <NameCell>{name}</NameCell>
                </div>
            )
        })

    }
    return (
        <Container>
            <div>Верхняя строка с выбранным элементом</div>
            {renderAllElements()}
        </Container>
    );
};

export default Selector;