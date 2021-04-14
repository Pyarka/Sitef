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
    ScaleColumn,
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
    OrangeNumbersBlockRight,
    OrangeNumbersBlockLeft,
    BLockPercent,
    BLockRate,
    CellsScale,
    KStyle,
} from "./ScalePopupStyles";

const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);
    const [isEditingScale, setEditingScale] = useState(false);
    const [isVertical, setVertical] = useState(true);
    const [scaleId, setScaleId] = useState(0);
    const [headRate, setHeadRate] = useState(0);
    const [rate, setRate] =useState(0);
    const [limitPercent, setLimitPercent] = useState(0);
    const [limitRate, setLimitRate] = useState(0);
    const [limitMinPercent, setLimitMinPercent] = useState(0);
    const [limitMinRate, setLimitMinRate] = useState(0);


    const getData = () => {
        getScaleRequest(scaleId).then(({values, scale}: ScalePopupProps) => {
            const newValues = values;
            const newScale = scale.scale;
            const newScaleId = scale.id;
            const newRate = scale.rate;
            const newHeadRate = scale.rate_head;
            const newLimitPercent = scale.limit_percent || 0;
            const newLimitRate = scale.limit_rate || 0;
            const newLimitMinPercent = scale.limit_minPercent || 0;
            const newLimitMinRate = scale.limit_minRate || 0;
            setScaleId(newScaleId);
            setScale(getNormalScale(newScale));
            setValues(newValues);
            setRate(newRate);
            setHeadRate(newHeadRate);
            setLimitPercent(newLimitPercent);
            setLimitRate(newLimitRate);
            setLimitMinPercent(newLimitMinPercent);
            setLimitMinRate(newLimitMinRate);
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

    const handleCancel = () => {
        getData();
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
                <NumberBox isLong={isVertical}
                           onChange={(newScale) => changeScale(newScale, i)}
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
            <NumberBox isLong={isVertical}
                       onChange={(newValue) => changeValue(num, newValue)}
                       value={value}
                       onBlur={(newValue) => changeValue(num, newValue)}
            />
        )
    }
    const test = ['a','b','c','d','e','f','g','h'];
    const renderCell = () => {
        return scale.map((scaleItem, i) => {
            return <CellsRow key={test[i]} isVertical={isVertical}>
                <CellsScale isLong={isVertical}>{renderScale(i)}</CellsScale>
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
                    <Cancel onClick={() => handleCancel()}> Отмена </Cancel>
                </Footer>
            )
        }
        return null;
    }
    const renderHeaderBlock = (): ReactElement => {
        return <HeaderBlock>
            <ChangeScaleDiv onClick={() => getData()}>Сменить шкалу</ChangeScaleDiv>
            <ToggleEdit onClick={() => {
                if(!isEditingScale) {
                    setEditingScale(!isEditingScale);
                }
            }
            }/>
            {renderToggleBlock()}
            <CloseButton/>
        </HeaderBlock>
    }

    const renderScaleContent = (): ReactElement => {
        //Rate (margin: ${({isNear}: {isNear: boolean}) => isNear?"3px 0 0 0" :"3px 7px 0 0"};
        // isNear={isVertical})
        return (
            <>
                <CellsRow isVertical={isVertical}>
                    <CellsScale isLong={isVertical}>k рук</CellsScale>
                    <NumberBox isLong={isVertical}
                               value={headRate}
                               onChange={(value) => setHeadRate(value)}
                               onBlur={(value) => setHeadRate(value)}/>
                </CellsRow>
                <KStyle>
                    <CellsRow isVertical={isVertical}>
                    <CellsScale isLong={isVertical}>
                        k
                    </CellsScale>

                    <Rate  isLong={isVertical}  >{rate}</Rate>
                </CellsRow>
                </KStyle>

                <CellsContainer isVertical={isVertical}>{renderCell()}</CellsContainer>
            </>
        )
    }

    const renderLimits = (side: "left" | "right"): ReactElement => {
        if(side === "left") {
            return (
                <OrangeNumbersBlockLeft>
                    <BLockPercent>{limitMinPercent}</BLockPercent>
                    <BLockRate>{limitMinRate}</BLockRate>
                </OrangeNumbersBlockLeft>
            )
        }
        else {
            return (
                    <OrangeNumbersBlockRight>
                        <BLockPercent>{limitPercent}</BLockPercent>
                        <BLockRate>{limitRate}</BLockRate>
                    </OrangeNumbersBlockRight>
            )
        }
    }

    if (isVertical) {
        return (
            <ContainerVertical>
                {renderHeaderBlock()}
                <OrangeBlockHorizontal>
                    %
                    <NumberBox isLong={isVertical}
                               value={0}
                               onChange={() => console.log("процент")}
                               onBlur={() => console.log("проценти")}
                    />
                </OrangeBlockHorizontal>
                <ScaleColumn>
                    {renderScaleContent()}
                </ScaleColumn>
                {renderFooter()}
            </ContainerVertical>
        )
    }

    return (
        <ContainerHorizontal>
            <OrangeBlockVertical>
                %
                <NumberBox isLong={isVertical}
                           value={0}
                           onChange={() => console.log("процент")}
                           onBlur={() => console.log("проценти")}/>
            </OrangeBlockVertical>
            {renderLimits("left")}
            <ScaleBody>
                {renderHeaderBlock()}
                <ScaleLine maxWidth={(scale.length+2)*58}>
                    {renderScaleContent()}
                </ScaleLine>
                {renderFooter()}
            </ScaleBody>
            {renderPlus()}
            {renderLimits("right")}
        </ContainerHorizontal>
    )
}


export default ScalePopup;