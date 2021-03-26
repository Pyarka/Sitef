import React, {ReactElement} from 'react';

interface ScalePopupProps {
    scale: {
        helper_id: number;
        id: number;
        limit_minPercent?: string;
        limit_minRate?: string;
        limit_percent?: string;
        limit_rate?: string;
        rate: string;
        rate_head: string;
        rate_planning?: string;
        scale: string;
        type_calc: number;
    };
    values: {
        num: number;
        value: string
    }[];
}

const mockData1: ScalePopupProps = {
    scale: {
        helper_id: 6,
        id: 502413,
        rate: '1.25',
        rate_head: '1.00',
        scale: '["1500000","1000000","500000","100000","0"]',
        type_calc: 0,
    },
    values: [
        {
            num: 0,
            value: '3.500'
        }, {
            num: 1,
            value: '2.500'
        }, {
            num: 2,
            value: '1.500'
        }, {
            num: 3,
            value: '0.500'
        }
    ],
};
const mockData2: ScalePopupProps = {
    scale: {
        helper_id: 7,
        id: 502414,
        rate: '0.25',
        rate_head: '1.20',
        scale: '["5","7","9","11","15"]',
        type_calc: 1,
    },
    values: [
        {
            num: 0,
            value: '30.500'
        }, {
            num: 1,
            value: '42.500'
        }, {
            num: 2,
            value: '111.500'
        }, {
            num: 3,
            value: '200.500'
        }
    ],
};

const ScalePopup = (): ReactElement => {
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
                <div></div>
            </div>
        </div>
    )
}


export default ScalePopup;