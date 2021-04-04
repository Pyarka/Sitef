import styled from "styled-components";

export const ScaleStyle = styled.div`
  color: #00a9bb;
  text-align: end;
  width: 15px;
  padding: 0 10px 0 0;
`;

export const ToggleEdit = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: green;
    border-radius: 50%;
`;
export const ToggleSave = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: blue;
    border-radius: 50%;
`
export const ToggleCancel = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
`;
export const ToggleVertical = styled.div`
    width: 30px;
    height: 30px;
    border: 10px;
    border-radius: 50%;
    border-color: green;
    cursor: pointer;
`;
export const ToggleHorizontal = styled.div`
    width: 30px;
    height: 30px;
    border: 5px;
    border-radius: 50%;
    border-color: blue;
    cursor: pointer;
`;
export const CellsContainer = styled.div`
    width: 210px;
    box-shadow: 0 0 5px 1px rgb(0.0.0.0) ;
    display: flex;
    flex-direction: column;
`;
export const CellsRow = styled.div `
    width: 150px;
    height: 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-bottom: 3px;
    margin-top: 3px;
`;
export const CellsValues = styled.div `
    text-align: start;
    width: 100px;
`;



