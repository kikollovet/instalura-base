import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
function Hello(props) {
  return <h1>{props.children}</h1>
}
export default function Home() {
  return <Title><Hello>Oi</Hello>My page</Title>
}
