import React, {ReactElement, useEffect, useState} from 'react';
import {
    getNormalScale,
    getScaleRequest,
    ScalePopupProps,
    ValuesInterface,
    scaleSaving,
    ScalePopupSaveEdit, formatValuesBeforeSave
} from './Helper';
import NumberBox from "../NumberBox/NumberBox";
import {
    CellsContainer,
    CellsRow,
    Footer,
    OrangeBlockHorizontal,
    CellsValues,
    CloseButton,
    PlusButton,
    ContainerHorizontal,
    ContainerVertical,
    HeaderBlock,
    ScaleStyle,
    ToggleBlock,
    ToggleBlockActive,
    ToggleBlockNotActive,
    Cancel,
    ToggleEdit,
    ToggleHorizontal,
    Save,
    ScaleBody,
    ScaleLine,
    ToggleVertical,
    OrangeBlockVertical,
    ChangeScaleDiv,
    Rate,
    OrangeNumbersBlock,
    BLockPercent,
    BLockRate,
} from "./ScalePopupStyles";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);
    const [isEditingScale, setEditingScale] = useState(false);
    const [isVertical, setVertical] = useState(false);
    const [scaleId, setScaleId] = useState(0);
    const [headRate, setHeadRate] = useState(0);
    const [rate, setRate] =useState(0);
    const [limitPercent, setLimitPercent] = useState(0);
    const [limitRate, setLimitRate] = useState(0);


    const getData = () => {
        getScaleRequest(scaleId).then(({values, scale}: ScalePopupProps) => {
            const newValues = values;
            const newScale = scale.scale;
            const newScaleId = scale.id;
            const newRate = scale.rate;
            const newHeadRate = scale.rate_head;
            const newLimitPercent = scale.limit_percent;
            const newLimitRate = scale.limit_rate;
            setScaleId(newScaleId);
            setScale(getNormalScale(newScale));
            setValues(newValues);
            setRate(newRate);
            setHeadRate(newHeadRate);
            setLimitPercent(newLimitPercent);
            setLimitRate(newLimitRate);
        });
    }

    useEffect(() => {
        getData();
    }, []);



    const handleSave = () => {
        const newScale = [...scale];
        let i = scale.length;
        do {
            i = i - 1;
            if(scale[i] === '0') {
                if(scale[i-1] === '0') {
                    newScale.splice(i,1);
                }
            }
        } while(i !== 0)
        const saveScale: ScalePopupSaveEdit = {
            deleted: [], // индексы удаленной шкалы
            scale: newScale, // актуальная шкала
            scale_id: scaleId,
            section: 'user',
            values: formatValuesBeforeSave(values),
        }
        scaleSaving(saveScale);
        setScale(newScale);
        setEditingScale(false);
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

    const addScaleItem = () => {
        const newScale = [...scale];
        newScale.push('0');
        setScale(newScale);
        const newValues = [...values];
        newValues.push({num: newValues.length, value: 0})
    }

    const renderScale = (i: number): ReactElement | null => {
        // вернуть инпут  NumberBox со значением из массива scale по индексу i если isEditingScale
        if (isEditingScale) {
            return (
                <NumberBox onChange={(newScale) => changeScale(newScale, i)}
                           value={+scale[i]}
                           onBlur={(newScale) => changeScale(newScale, i)}
                />
            )
        }
        if(scale[i] === '') {
            return null;
        }
        return (
            <ScaleStyle key={i}>
                {scale[i]}
            </ScaleStyle>
        );
    }

    const renderValues = (i: number): ReactElement | null => {
        const {value, num} = values.find(({num}) => num === i) || {value: 0, num: i};
        if(!isEditingScale && scale[i] === '') return null;
        return (
            <NumberBox onChange={(newValue) => changeValue(num, newValue)}
                       value={value}
                       onBlur={(newValue) => changeValue(num, newValue)}
            />
        )
    }
    const test = ['a','b','c','d','e','f','g','h'];
    const renderCell = () => {
        return scale.map((scaleItem, i) => {
            return <CellsRow key={test[i]} isVertical={isVertical}>
                <div>{renderScale(i)}</div>
                <CellsValues>{renderValues(i)}</CellsValues>
            </CellsRow>
        })
    }

    const renderPlus = (): ReactElement | null => {
        if (isEditingScale) {
            return (
                <PlusButton onClick={() => addScaleItem()}/>
            )
        }
        return null;
    }


    const renderToggleBlock = () => {
        const renderActive = (action: () => void) => {
            return <ToggleBlockActive rotation={90} onClick={() => action()}/>
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
                        ? renderActive(() => toggle(isVertical))
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
    const renderFooter = (): ReactElement | null => {
        if(isEditingScale) {
            return (
                <Footer>
                    <Save onClick={() => handleSave()}> Сохранить </Save>
                    <Cancel onClick={() => console.log("canceled")}> Отмена </Cancel>
                </Footer>
            )
        }
        return null;
    }
    const renderHeaderBlock = (): ReactElement => {
        return <HeaderBlock>
            <ChangeScaleDiv onClick={() => getData()}>Сменить шкалу</ChangeScaleDiv>
            <div>кнопка</div>
            <ToggleEdit onClick={() => setEditingScale(!isEditingScale)}/>
            {renderToggleBlock()}
            <CloseButton/>
        </HeaderBlock>
    }

    if (isVertical) {
        return (
            <ContainerVertical>
                {renderHeaderBlock()}
                <OrangeBlockHorizontal>
                    %
                    <NumberBox value={0} onChange={() => console.log("процент")} onBlur={() => console.log("проценти")}/>
                </OrangeBlockHorizontal>
                <div>
                    <div> k рук</div>
                    <div> k</div>
                    <CellsContainer isVertical={isVertical}>{renderCell()}</CellsContainer>
                </div>
            </ContainerVertical>
        )
    }
    return (
        <ContainerHorizontal>
            <OrangeBlockVertical>
                %
                <NumberBox value={0} onChange={() => console.log("процент")} onBlur={() => console.log("проценти")}/>
            </OrangeBlockVertical>
            <ScaleBody>
                {renderHeaderBlock()}
                <ScaleLine maxWidth={(scale.length+2)*58}>
                    <CellsRow isVertical={isVertical}>
                        k рук
                        <NumberBox value={headRate}
                                   onChange={(value) => setHeadRate(value)}
                                   onBlur={(value) => setHeadRate(value)}/>
                    </CellsRow>
                    <CellsRow isVertical={isVertical}>
                        k
                        <Rate>{rate}</Rate>
                    </CellsRow>
                    <CellsContainer isVertical={isVertical}>{renderCell()}</CellsContainer>
                </ScaleLine>

                {renderFooter()}
            </ScaleBody>
            {renderPlus()}
            <OrangeNumbersBlock>
                <BLockPercent>{limitPercent}</BLockPercent>
                <BLockRate>{limitRate}</BLockRate>
            </OrangeNumbersBlock>
        </ContainerHorizontal>
    )
}


export default ScalePopup;