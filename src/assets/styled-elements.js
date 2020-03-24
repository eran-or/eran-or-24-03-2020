
import styled from 'styled-components'

export const Row = styled.div`
display: grid;
padding: 22px;
margin:0 auto;
grid-gap:20px;
grid-template-columns: repeat(auto-fit, 200px);
`
export const Box = styled.div`
display: flex;
flex-direction:column;
border: 1px solid #88885B;
text-align:center;
padding:10px;
box-shadow: 0px 1px 2px #88885B;
`

export const CenterRow = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const DetailesBox = styled.div`
border: 1px solid #88885B;
min-height: 500px;
max-width: 80%;
margin: 18px auto;
padding: 22px 0 0 0;
`

export const FavoritesButton = styled.button`
    display: flex;
    height: 35px;
    justify-content: space-between;
    align-items: center;
    width: 166px;
    background: #fbd93c;
    color: black;
    box-shadow: 1px 1px #ccc;
`
