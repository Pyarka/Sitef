import styled from "styled-components";
import cross from '../../Assets/Images/cross.png';
import crossActive from '../../Assets/Images/crossActive.png';
import rectangleGrey from '../../Assets/Images/rectangleGrey.png';
import rectangleWhite from '../../Assets/Images/rectangleWhite.png';
import edit from '../../Assets/Images/edit.png';
import editActive from '../../Assets/Images/editActive.png';
import plus from '../../Assets/Images/plusWhite.png';

export const ScaleStyle = styled.div`
  text-align: end;
  width: 15px;
  padding: 0 10px 0 0;
`;

export const ContainerVertical = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    width: 280px;
    border: 1px solid;
`;

export const HeaderBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    width: auto;
`;

export const CloseButton = styled.div`
    height: 11px;
    width: 11px;
    display: flex;
    flex-shrink: 0;
    align-self: end;
    background-image: url(${cross});
    cursor: pointer;
     &:hover {
        background-image: url(${crossActive});
    }
`;

export const ContainerHorizontal = styled.div`
  display: flex;
`;

export const OrangeBlockVertical = styled.div`
    display: flex;
    flex-direction: column;
    width: 66px;
    background-color: #ffbe79;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    justify-content: flex-end;
    align-items: center;
    font-weight: bold;
    font-size: 22px;
`;
export const OrangeBlockHorizontal = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    background-color: #ffbe79;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 22px;
`;

export const OrangeNumbersBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 66px;
    color: #ffbe79;
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    padding: 0 0 10px 0;
`;
export const OrangeNumbersBlockRight = styled(OrangeNumbersBlock)`
    border-left: 1px solid #ececec;
`;
export const OrangeNumbersBlockLeft = styled(OrangeNumbersBlock)`
    border-right: 1px solid #ececec;
`;

export const BLockPercent = styled.div`
   margin: 2px;
`;

export const BLockRate = styled.div`
   margin: 2px;
`;

export const ScaleBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScaleLine = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 16px;
    max-width: ${({maxWidth}: { maxWidth: number }) => `${maxWidth}px`};
    min-width: ${({maxWidth}: { maxWidth: number }) => `${maxWidth}px`};
    align-items: center;
    color: #00a9bb;
    height: 70px;
    font-weight: bold;
`;
export const PlusButton = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    background: #91c552 url(${plus}) center no-repeat;
    cursor: pointer;
    align-self: center;
    &:hover{
        background-color: #9fda5f;
    }
`;

export const ToggleEdit = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    flex-shrink: 0;
    background: url(${edit}) center no-repeat;
    &:hover {
        background-image: url(${editActive});
    }
`;

export const ChangeScaleDiv = styled.div`
    display: flex;
    cursor: pointer;
    border-radius: 5px;
    background: cyan;
    border: 1px solid;
    margin: 0 auto 0 10px;
    padding: 5px 10px;
    width: auto;
    align-items: center;
    justify-content: center;
`;

export const Rate = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 40px;
    height: 22px;
    border: 0.5px solid black;
    color: black;
    font-size: 14px;
    font-weight: normal;
    justify-content: start;
    padding: 4px 4px 5px 4px;
    align-items: center;
    margin: 4px 0 0 0;
`;

export const Save = styled.div`
    cursor: pointer;
    width: 150px;
    font-weight: bold;
    font-size: 16px;
    color: white;
    height: 30px;
    line-height: 30px;
    margin: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #91c552;
    &:hover{
        background-color: #9fda5f;
    }
`
export const Cancel = styled.div`
    cursor: pointer;
    width: 150px;
    font-weight: bold;
    font-size: 16px;
    color: white;
    height: 30px;
    line-height: 30px;
    margin: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #f56060;
    &:hover{
        background-color: #ff6d6d;
    }
`;
export const Footer = styled.div`
    display: flex;
    margin-left: auto;
`;

export const ToggleBox = styled.div`
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 29px;
    width: 29px;
`;

export const ToggleVertical = styled(ToggleBox)``;
export const ToggleHorizontal = styled(ToggleBox)`
    transform: rotate(90deg);
`;

export const ToggleBlockActive = styled(ToggleBox)`
    background: #00c9d8 url(${rectangleWhite}) center no-repeat;
    border: 1px solid #00a9bb;
    transform: ${({rotation}: { rotation: number }) => `rotate(${rotation}deg)`}
`;

export const ScaleColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ToggleBlockNotActive = styled(ToggleBox)`
    background: url(${rectangleGrey}) center no-repeat;
    border: 1px solid #ececec;
`;

export const ToggleBlock = styled.div`
    display: flex;
    border: 1px solid #ececec;
    cursor: pointer;
`;

export const CellsContainer = styled.div`
    width: 210px;
    display: flex;
    flex-direction: ${({isVertical}: { isVertical: boolean }) => !isVertical ? "row" : "column"};
`;

export const CellsRow = styled.div`
    width: 150px;
    height: 25px;
    font-weight: bold;
    display: flex;
    flex-grow: 0;
    margin: 5px;
    width: auto;
    flex-direction: ${({isVertical}: { isVertical: boolean }) => isVertical ? "row" : "column"};
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;
    margin-top: 3px;
`;
export const CellsValues = styled.div`
   margin: 0 0 0 5px;
`;



