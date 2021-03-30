import React, {ReactElement, useEffect, useState} from 'react';
import {getNormalScale, getScaleRequest, ValuesInterface} from './Helper';


const ScalePopup = (): ReactElement => {
    const [scale, setScale] = useState([] as string[]);
    const [values, setValues] = useState([] as ValuesInterface[]);

    useEffect(() => {
        const newValues = getScaleRequest().values;
        const newScale = getScaleRequest().scale.scale;
        setScale(getNormalScale(newScale));
        setValues(newValues);
    }, []);
    console.log('values => ', values);
    console.log('scale => ', scale);
    const renderScale = () => {
        return scale.map((scaleItem) => {
            return(
                <div key={scaleItem}>{scaleItem}</div>
            )
        })
    }
    const renderValues = () => {
        return values.map(({num,value}) => {
            return(
                <div key={num}>{value}</div>
            )
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
            <div>табличная часть
                <div> k рук</div>
                <div> k</div>
                <div>{renderScale()}</div>
                <div>{renderValues()}</div>
            </div>
        </div>
    )
}


export default ScalePopup;