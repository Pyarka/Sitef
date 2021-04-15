import styled from "styled-components";
const Container = styled.div`
  width: ${({isLong}: {isLong: boolean}) => isLong? "165px" :"45px"};
  height: 27px;
  border: 1px solid #ececec;
  margin: 0 10px;
  input{
    display: flex;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0
  }
`;
export default Container;