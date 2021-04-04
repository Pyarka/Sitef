import React, {ReactElement, useEffect, useState} from 'react';
import {getNormalScale, getScaleRequest, ScalePopupProps, ValuesInterface} from './Helper';
import NumberBox from "../NumberBox/NumberBox";
import {
    CellsContainer,
    CellsRow,
    CellsValues,
    ScaleStyle,
    ToggleBlock,
    HeaderBlock,
    ToggleCancel,
    ToggleEdit,
    ToggleHorizontal,
    ToggleSave,
    ToggleVertical,
    ContainerVertical,
    ContainerHorizontal,
    CloseButton,
} from "./ScalePopupStyles";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);
    const [isEditingScale, setEditingScale] = useState(false);
    const [isSavedScale, setSavedScale] = useState(false);
    const [isVertical, setVertical] = useState(true);


    useEffect(() => {
        getScaleRequest.then(({values, scale}: ScalePopupProps) => {
             const newValues = values;
             const newScale = scale.scale;
             setScale(getNormalScale(newScale));
             setValues(newValues);
        });
    }, []);

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
    const renderToggleBlock = () => {
        return(<ToggleBlock>
            <div></div>
            <ToggleVertical onClick={() => {
                if (!isVertical) {
                    setVertical(!isVertical)
                }
            }} />
            <ToggleHorizontal onClick={() => {
                if (isVertical) {
                    setVertical(!isVertical)
                }
            }} />
        </ToggleBlock>)
    }
    if (isVertical) {
        return (
            <ContainerVertical>
                <HeaderBlock>
                    <div>Обратный расчет</div>
                    <div>кнопка</div>
                    <div >переключатель вертик</div>
                    <ToggleEdit onClick={() => setEditingScale(!isEditingScale)}/>
                    <ToggleSave onClick={() => {
                        if (!isSavedScale) {
                            setSavedScale(!isSavedScale)
                        }
                        console.log("saved")
                    }} />
                    <ToggleCancel onClick={() => console.log ("canceled")}/>
                    {renderToggleBlock()}

                    <CloseButton />
                </HeaderBlock>
                <div>оранжевый блок с процентами</div>
                <div>
                    <div> k рук</div>
                    <div> k</div>
                    <CellsContainer>{renderCell()}</CellsContainer>
                </div>
            </ContainerVertical>
        )
    }

    return (
        <ContainerHorizontal>
            <div>
                <div>Обратный расчет</div>
                <div>кнопка</div>
                <div>переключатель вертик</div>
                <div>селектор</div>
                <ToggleEdit onClick={() => setEditingScale(!isEditingScale)}/>
                <ToggleSave onClick={() => {
                    if (!isSavedScale) {
                        setSavedScale(!isSavedScale)
                    }
                    console.log("saved")
                }} />
                <ToggleCancel onClick={() => console.log ("canceled")}/>
                 <ToggleBlock>
                     <ToggleVertical onClick={() => {
                         if (!isVertical) {
                             setVertical(!isVertical)
                         }
                     }} />
                     <ToggleHorizontal onClick={() => {
                         if (isVertical) {
                             setVertical(!isVertical)
                         }
                     }} />
                 </ToggleBlock>
            </div>
            <div>оранжевый блок с процентами</div>
            <div>
                <div> k рук</div>
                <div> k</div>
                <CellsContainer>{renderCell()}</CellsContainer>
            </div>
        </ContainerHorizontal>
    )
}


export default ScalePopup;