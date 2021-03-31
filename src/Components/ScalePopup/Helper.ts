export interface ValuesInterface {
    num: number;
    value: number;
}

export interface ScalePopupProps {
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
    values: ValuesInterface[];
}

export const mockData1: ScalePopupProps = {
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
            value: 3.500,
        }, {
            num: 1,
            value: 2.500,
        }, {
            num: 2,
            value: 1.500,
        }, {
            num: 3,
            value: 0.500,
        }
    ],
};
export const mockData2: ScalePopupProps = {
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
            value: 30.500,
        }, {
            num: 1,
            value: 42.500,
        }, {
            num: 2,
            value: 111.500,
        }, {
            num: 3,
            value: 200.500,
        }
    ],
};

export const getNormalScale = (stringScale: string): string[] => stringScale.split(',')
    .map(x => x.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2'));

export const getScaleRequest: Promise<ScalePopupProps> = new Promise((resolve)  => {
        setTimeout(() => {
            resolve(mockData2);
        }, 300);
    });