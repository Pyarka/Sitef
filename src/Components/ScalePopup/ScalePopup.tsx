import React, {ReactElement, useEffect, useState} from 'react';
import {getNormalScale, getScaleRequest, ScalePopupProps, ValuesInterface} from './Helper';
import NumberBox from "../NumberBox/NumberBox";
import { ScaleStyle, ToggleEdit, ToggleSave, ToggleCancel, CellsContainer, CellsRow, CellsValues,
    ToggleVertical, ToggleHorizontal} from "./ScalePopupStyles";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);
    const [isEditingScale, setEditingScale] = useState(false);
    const [isSavedScale, setSavedScale] = useState(false);
    const [isVertical, setVertical] = useState(true);
    const [isHorizontal, setHorizontal] = useState(false);


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
        const newValues = values.map((valuesItem) => {
            if (valuesItem.num !== num) return valuesItem;
            return {num, value: masValue};
        })
        setValues(newValues);
    }

    const changeScale = (masScale:number, num: number) => {
        const newScale = [...scale];
        newScale[num] = `${masScale}`;
        setScale(newScale);
    }

    const renderScale = (i: number): ReactElement => {
        // вернуть инпут  NumberBox со значением из массива scale по индексу i если isEditingScale
        if(isEditingScale){
            return (
                <NumberBox key={i}
                           onChange={(newScale) => changeScale(newScale, i)}
                           value={+scale[i]}
                           onBlur={(newScale) => changeScale(newScale, i)}
                />
            )
        }
        return (
            <ScaleStyle key={i}>
                {scale[i]}
            </ScaleStyle>
        );
    }

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
                return <CellsRow key={scaleItem}>
                    <div>{renderScale(i)}</div>
                    <CellsValues>{renderValues(i)}</CellsValues>
                </CellsRow>
            })
    }

    return (
        <div>
            <div>
                <div>Обратный расчет</div>
                <div>кнопка</div>
                <div>переключатель вертик</div>
                <div>селектор</div>
                <ToggleEdit onClick={() => setEditingScale(!isEditingScale)}/>
                <ToggleSave onClick={() =>
                {if(!isSavedScale) {
                setSavedScale(!isSavedScale)}
                console.log ("saved")}}/>
                <ToggleCancel onClick={() => console.log ("canceled")}/>
                <ToggleVertical onClick={() => {if(!isVertical) {
                    setVertical(!isVertical)
                    setHorizontal(!isHorizontal)
                }
                console.log ("vert")}}/>
                <ToggleHorizontal onClick={() => {if(!isHorizontal) {
                    setHorizontal(!isHorizontal)
                    setVertical(!isVertical)
                }
                console.log ("horizon")}}/>
            </div>
            <div>оранжевый блок с процентами</div>
            <div>
                <div> k рук</div>
                <div> k</div>
                <CellsContainer>{renderCell()}</CellsContainer>
            </div>
        </div>
    )
}


export default ScalePopup;