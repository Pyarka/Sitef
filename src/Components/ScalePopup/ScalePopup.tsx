import React, {ReactElement, useEffect, useState} from 'react';
import {
    getNormalScale,
    getScaleRequest,
    ScalePopupProps,
    ValuesInterface,
    scaleSaving,
    ScalePopupSaveEdit
} from './Helper';
import NumberBox from "../NumberBox/NumberBox";
import {
    CellsContainer,
    CellsRow,
    CellsValues,
    CloseButton,
    ContainerHorizontal,
    ContainerVertical,
    HeaderBlock,
    ScaleStyle,
    ToggleBlock,
    ToggleBlockActive,
    ToggleBlockNotActive,
    ToggleCancel,
    ToggleEdit,
    ToggleHorizontal,
    ToggleSave,
    ScaleBody,
    ScaleLine,
    ToggleVertical,
    OrangeBlockVertical,
} from "./ScalePopupStyles";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);
    const [isEditingScale, setEditingScale] = useState(false);
    const [isSavedScale, setSavedScale] = useState(false);
    const [isVertical, setVertical] = useState(false);
    const [scaleId, setScaleId] = useState(0);


    useEffect(() => {
        getScaleRequest.then(({values, scale}: ScalePopupProps) => {
            const newValues = values;
            const newScale = scale.scale;
            const newScaleId = scale.id;
            setScaleId(newScaleId);
            setScale(getNormalScale(newScale));
            setValues(newValues);
        });
    }, []);

    const handleSave = () => {
        const saveScale: ScalePopupSaveEdit = {
            deleted: [], // индексы удаленной шкалы
            scale: scale, // актуальная шкала
            scale_id: scaleId,
            section: 'user',
            values: formatValuesBeforeSave(values),
        }
        scaleSaving(saveScale)
        if (!isSavedScale) {
            setSavedScale(!isSavedScale)
        }
    }

    const changeValue = (num: number, masValue: number) => {
        const newValues = values.map((valuesItem) => {
            if (valuesItem.num !== num) return valuesItem;
            return {num, value: masValue};
        })
        if (!values.find((item) => item.num === num)) {
            newValues.push({num, value: masValue})
        }
        setValues(newValues);
    }

    const changeScale = (masScale: number, num: number) => {
        const newScale = [...scale];
        newScale[num] = `${masScale}`;
        setScale(newScale);
    }

    const renderScale = (i: number): ReactElement => {
        // вернуть инпут  NumberBox со значением из массива scale по индексу i если isEditingScale
        if (isEditingScale) {
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
        const {value, num} = values.find(({num}) => num === i) || {value: 0, num: i};
        return (
            <NumberBox onChange={(newValue) => changeValue(num, newValue)}
                       value={value}
                       onBlur={(newValue) => changeValue(num, newValue)}
            />
        )
    }

    const renderCell = () => {
        return scale.map((scaleItem, i) => {
            return <CellsRow key={scaleItem} isVertical={isVertical}>
                <div>{renderScale(i)}</div>
                <CellsValues>{renderValues(i)}</CellsValues>
            </CellsRow>
        })
    }

    const renderToggleBlock = () => {
        const renderActive = (action: () => void) => {
            return <ToggleBlockActive onClick={() => action()}/>
        }
        const renderNotActive = (action: () => void) => {
            return <ToggleBlockNotActive onClick={() => action()}/>
        }
        const toggle = (value: boolean) => {
            setVertical(value);
        }
        return (
            <ToggleBlock>
                <ToggleHorizontal>
                    {!isVertical
                        ? renderActive(() => toggle(!isVertical))
                        : renderNotActive(() => toggle(false))
                    }
                </ToggleHorizontal>
                <ToggleVertical>
                    {isVertical
                        ? renderActive(() => toggle(isVertical))
                        : renderNotActive(() => toggle(true))
                    }
                </ToggleVertical>
            </ToggleBlock>)
    }
    const renderHeaderBlock = (): ReactElement => {
        return <HeaderBlock>
            <div>Обратный расчет</div>
            <div>кнопка</div>
            <ToggleEdit onClick={() => setEditingScale(!isEditingScale)}/>
            <ToggleSave onClick={() => handleSave()}/>
            <ToggleCancel onClick={() => console.log("canceled")}/>
            {renderToggleBlock()}
            <CloseButton/>
        </HeaderBlock>
    }

    if (isVertical) {
        return (
            <ContainerVertical>
                {renderHeaderBlock()}
                <div>оранжевый блок с процентами</div>
                <div>
                    <div> k рук</div>
                    <div> k</div>
                    <CellsContainer isVertical={isVertical}>{renderCell()}</CellsContainer>
                </div>
            </ContainerVertical>
        )
    }
//ScaleLine height 5px, отступы слева как справа Container
    return (
        <ContainerHorizontal>
            <OrangeBlockVertical>
                %
                <NumberBox value={0} onChange={() => console.log("процент")} onBlur={() => console.log("проценти")}/>
            </OrangeBlockVertical>
            <ScaleBody>
                {renderHeaderBlock()}
                <ScaleLine>
                    <div>
                        k рук
                        <NumberBox value={1} onChange={() => console.log('kruk')} onBlur={() => console.log('kruk')}/>
                    </div>
                    <div>
                        k
                        <NumberBox value={1} onChange={() => console.log('k')} onBlur={() => console.log('k')}/>
                    </div>
                    <CellsContainer isVertical={isVertical}>{renderCell()}</CellsContainer>
                </ScaleLine>
            </ScaleBody>
        </ContainerHorizontal>
    )
}


export default ScalePopup;