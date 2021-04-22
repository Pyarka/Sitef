import React, {ReactElement, useState} from 'react';
import {Container,
    Arrow,
    IdCell,
    NameCell,
    SelectedIdCell,
    SelectedNameCell,
    SelectedCells,
    AllCells,
    AllElementsContainer,
    } from './SelectorStyles';
import {getAllScaleRequest, ScalePopupProps} from "../ScalePopup/Helper";

interface SelectorProps {
    isSelected: ScalePopupProps;
    onSelect: (selectedId: number) => void;
}

/**
 *
 * @param isSelected
 * @param onSelect
 * В компоненте всегда есть выбранный элемент. При первоначальной отрисовке в компоненте виден только выбранный элемент.
 * При нажатии стрелки вниз показываются все доступные элементы.
 * При нажатии стрелки вверх элементы сворачиваются.
 * @constructor
 */
const Selector = ({isSelected, onSelect}: SelectorProps):ReactElement => {
    const [isOpened, setOpened] = useState(false);
    const [selectedElement, setSelectedElement] = useState(isSelected.scale.id);
    const [allScales, setAllScales] = useState([isSelected] as ScalePopupProps[]);
    //1. Рендер первой строки, на этой строке выбранный элемент и стрелка вниз.
    //2. Метод для рендера всех строк кроме первой.

    const getScaleData = () => {
        getAllScaleRequest().then((scaleArray: ScalePopupProps[]) => {
            const newScaleArray = [...scaleArray];
            setAllScales(newScaleArray);
        }).finally(() => {
            setOpened(true);
        });
    }

    const rotateArrow = () => {
        //проверяем открыт ли список, если закрыт, проверяем длину массива allScales если она равна нулю нужно получить
        // закрытые шкалы и поместить их в allScales, если длина не равна нулю открыть список.
        if(!isOpened) {
            if (allScales.length <= 1) {
                getScaleData();
            }
        }
        setOpened(!isOpened);
    }

    const choiceElement = (id: number) => {
        setSelectedElement(id);
        onSelect(id);
    }

    const renderAllElements = (): ReactElement[] | null => {
        if(isOpened) {
            return allScales.filter(({scale}) => scale.id !== selectedElement).map(({scale}) => {
                const {id, name} = scale;
                return (
                    <AllCells onClick={() => choiceElement(id)} key={id}>
                        <IdCell>{id}</IdCell>
                        <NameCell>{name}</NameCell>
                    </AllCells>
                )
            })
        } else {
            return null;
        }

    }

    const renderSelectedElement = (): ReactElement | null => {
        const currentElement: ScalePopupProps | undefined = allScales.find(({scale}) => scale.id === selectedElement);
        if (currentElement === undefined) return null;
        const {id, name} = currentElement.scale;
        return (
            <SelectedCells onClick={() => rotateArrow()} key={id}>
                <SelectedIdCell>{id}</SelectedIdCell>
                <SelectedNameCell>{name}</SelectedNameCell>
                <Arrow isOpened={isOpened}/>
            </SelectedCells>
        )
    }
    return (
        <Container>
            {renderSelectedElement()}
            <AllElementsContainer>
                {renderAllElements()}
            </AllElementsContainer>
        </Container>
    );
};

export default Selector;