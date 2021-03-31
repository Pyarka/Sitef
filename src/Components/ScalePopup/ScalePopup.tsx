import React, {ReactElement, useEffect, useState} from 'react';
import {getNormalScale, getScaleRequest, ScalePopupProps, ValuesInterface} from './Helper';
import NumberBox from "../NumberBox/NumberBox";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);

    useEffect(() => {
        getScaleRequest.then(({values, scale}: ScalePopupProps) => {
             const newValues = values;
             const newScale = scale.scale;
             setScale(getNormalScale(newScale));
             setValues(newValues);
        });
    }, []);
    console.log('values => ', values);
    console.log('scale => ', scale);
    const changeValue = (num:number, masValue:number) => {
        //1. В массив Values 2. найти элемент у которого num равен индексу(num) 3. изменить значение элемента 4. отдать новый массив в ыуеМфдгуы
        const newValues = values.map((valuesItem) => {
            if (valuesItem.num != num) return valuesItem;
            return {num, value: masValue};
        })
        setValues(newValues);
    }
    const renderScale = (i: number) => <div>{scale[i]}</div>
    const renderValues = (i: number): ReactElement | null => {
        const useValue = values.find(({num}) => num === i);
        if (!useValue || !useValue.value) return null;
        return (
            <NumberBox onChange={(newValue) => changeValue(useValue.num, newValue)}
                       value={useValue.value}
                       onBlur={(newValue) => changeValue(useValue.num, newValue)}
            />
        )
    }

    const renderCell = () => {
        return scale.map((scaleItem, i) => {
                return <div className={'cellsRow'} key={scaleItem}>
                    <div className={'cellsScale'}>{renderScale(i)}</div>
                    <div className={'space'}></div>
                    <div className={'cellsValues'}>{renderValues(i)}</div>
                </div>
            })
    }
    return (
        <div>
            <div>
                <div>Обратный расчет</div>
                <div>кнопка</div>
                <div>переключатель вертик</div>
                <div>селектор</div>
                <div>редактирование</div>
            </div>
            <div>оранжевый блок с процентами</div>
            <div>
                <div> k рук</div>
                <div> k</div>
                <div className={'cellsContainer'}>{renderCell()}</div>
            </div>
        </div>
    )
}


export default ScalePopup;