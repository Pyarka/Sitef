import styled from "styled-components";
import cross from '../../Assets/Images/cross.png';
import crossActive from '../../Assets/Images/crossActive.png';
import rectangleGrey from '../../Assets/Images/rectangleGrey.png';
import rectangleWhite from '../../Assets/Images/rectangleWhite.png';
import edit from '../../Assets/Images/edit.png';
import editActive from '../../Assets/Images/editActive.png';

export const ScaleStyle = styled.div`
  text-align: end;
  width: 15px;
  padding: 0 10px 0 0;
`;

export const ContainerVertical = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    width: 500px;
    border: 1px solid;
`;

export const HeaderBlock = styled.div`
    display: flex;
    flex-direction: row;
    width: auto;
`;

export const CloseButton = styled.div`
    height: 11px;
    width: 11px;
    display: flex;
    flex-shrink: 0;
    background-image: url(${cross});
    cursor: pointer;
     &:hover {
        background-image: url(${crossActive});
    }
`;

export const ContainerHorizontal = styled.div`
  display: flex;
  flex-grow: 1;
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

export const ScaleBody = styled.div`
  display: flex;
  flex-direction: column
`;

export const ScaleLine = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 16px;
    align-items: center;
    color: #00a9bb;
    height: 70px;
    font-weight: bold;
`;


export const ToggleEdit = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    flex-shrink: 0;
    background: url(${edit};
    &:hover {
        background-image: url(${editActive});
    }
`;
export const ToggleSave = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    
`
export const ToggleCancel = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
`;
export const ToggleVertical = styled.div`
    width: 40px;
    height: 40px; 
    background: url(${rectangleGrey}) center no-repeat;
    cursor: pointer;
    transform: rotate(90deg);
`;
export const ToggleHorizontal = styled.div`
    width: 40px;
    height: 40px;
    background: url(${rectangleWhite}) center no-repeat;
    cursor: pointer;
    transform: rotate(90deg);
`;
export const ToggleBlockActive = styled.div`
    width: 40px;
    height: 40px; 
    background: #00c9d8 url(${rectangleWhite}) center no-repeat;
    border: 1px solid #00a9bb;
    cursor: pointer;
`;
export const ToggleBlockNotActive = styled.div`
    width: 40px;
    height: 40px;
    background: url(${rectangleGrey}) center no-repeat;
    border: 1px solid #ececec;
    cursor: pointer;
`;
export const ToggleBlock = styled.div`
    display: flex;
    border: 1px solid #ececec;
    cursor: pointer;
`;
export const CellsContainer = styled.div`
    width: 210px;
    display: flex;
    flex-direction: ${({isVertical}: {isVertical: boolean}) => !isVertical ? "row" : "column"};
`;
export const CellsRow = styled.div`
    width: 150px;
    height: 25px;
    display: flex;
    flex-direction: ${({isVertical}: {isVertical: boolean}) => isVertical ? "row" : "column"};
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;
    margin-top: 3px;
`;
export const CellsValues = styled.div`
   
`;



