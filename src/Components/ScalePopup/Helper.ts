export interface ValuesInterface {
    num: number;
    value: number;
}
export type RateStyleProps = {isLong: boolean};
export type CellsScaleStyleProps = {isCenter: boolean; isLong: boolean};

export interface ScalePopupProps {
    scale: {
        helper_id: number;
        id: number;
        name: string;
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
        name: "Химики",
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
        name: "Операторы",
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
export const mockData3: ScalePopupProps = {
    scale: {
        helper_id: 65,
        id: 502415,
        name: "Алхимики",
        rate: 1.25,
        rate_head: 1.00,
        limit_percent: 100,
        limit_minPercent: 10,
        limit_minRate: 0.1,
        limit_rate: 1.2,
        scale: '["28","56","352","906","246"]',
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
export const mockData4: ScalePopupProps = {
    scale: {
        helper_id: 16,
        id: 202413,
        name: "Менеджеры",
        rate: 1.25,
        rate_head: 1.00,
        limit_percent: 100,
        limit_minPercent: 10,
        limit_minRate: 0.1,
        limit_rate: 1.2,
        scale: '["574","58","23","789","743"]',
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
export const mockData5: ScalePopupProps = {
    scale: {
        helper_id: 236,
        id: 5025513,
        name: "Операторы 2",
        rate: 1.25,
        rate_head: 1.00,
        limit_percent: 100,
        limit_minPercent: 10,
        limit_minRate: 0.1,
        limit_rate: 1.2,
        scale: '["154","851","942","593","19"]',
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
    //вернуть из массива имеюшихся тестовых данных объект у которого id шкалы равно idScale
    const result = [mockData1, mockData2, mockData3, mockData4, mockData5].find((a) => a.scale.id === idScale) || mockData1;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, 300);
    });
}

export const getAllScaleRequest = (): Promise<ScalePopupProps[]> => {
    const result = [mockData1, mockData2, mockData3, mockData4, mockData5];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, 300);
    });
}