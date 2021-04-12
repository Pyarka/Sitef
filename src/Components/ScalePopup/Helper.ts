export interface ValuesInterface {
    num: number;
    value: number;
}

export interface ScalePopupProps {
    scale: {
        helper_id: number;
        id: number;
        limit_minPercent?: number;
        limit_minRate?: number;
        limit_percent?: number; //максимальный процент
        limit_rate?: number; // максимальный коэффициент
        rate: number; // k
        rate_head: number; // k рук
        rate_planning?: string;
        scale: string;
        type_calc: number;
    };
    values: ValuesInterface[];
}

export interface ScalePopupSaveEdit {
    deleted: number[]; // индексы удаленной шкалы
    scale: string[]; // актуальная шкала
    scale_id: number;
    section: 'user' | 'department';
    values: {
        [key: number]: number;
    }
}

export const scaleSaving = (saveData: ScalePopupSaveEdit) => {
    console.log("Data saved");
}

export const mockData1: ScalePopupProps = {
    scale: {
        helper_id: 6,
        id: 502413,
        rate: 1.25,
        rate_head: 1.00,
        limit_percent: 100,
        limit_minPercent: 10,
        limit_minRate: 0.1,
        limit_rate: 1.2,
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
        rate: 2.25,
        rate_head: 2.00,
        limit_percent: 80,
        limit_minPercent: 10,
        limit_minRate: 0.1,
        limit_rate: 2.7,
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

type ValueItem = {[key: number]: number};

export const formatValuesBeforeSave = (values: ValuesInterface[]): ValueItem => {
    const result: ValueItem = {};
    values.forEach(({num, value}) => {
        result[num] = value;
    })
    return result;
}

export const getNormalScale = (stringScale: string): string[] => stringScale.split(',')
    .map(x => x.replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2'));

export const getScaleRequest = (idScale: number): Promise<ScalePopupProps> => {
    let result = mockData2;
    if (result.scale.id === idScale) result = mockData1;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, 300);
    });
}