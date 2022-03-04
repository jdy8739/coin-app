import axios from "axios";
import exp from "constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 100px;
`;

const Title = styled.h1`
    font-size: 30px;
    text-align: center;
`;

const CoinName = styled.p`
    text-align: center;
    transition: all 1s;
    color: ${ props => props.theme.textColor };
`;

const Card = styled.div`
    width: 320px;
    height: 75px;
    background-color: ${ props => props.theme.bgColor };
    border-radius: 15px;
    border: 1px solid ${ props => props.theme.textColor };
    margin: 12px auto;
    display: flex;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
    transition: all 1s;
    &:hover {
        border: 1px solid ${ props => props.theme.accentColor };
        ${CoinName} {
            color: ${ props => props.theme.accentColor };
        }
    }
`;

const CoinLogo = styled.img`
    width: 30px;
    height: 30px;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
};

function Main() {

    const nav = useNavigate();

    const [coins, setCoins] = useState<CoinInterface[]>();

    useEffect(() => {
        axios.get('https://api.coinpaprika.com/v1/coins')
            .then(res => setCoins(() => res.data.slice(0, 30)));
    }, []);

    return (
        <>  
            <Container>
                <Title>Nomad Coins</Title>
                <br></br>
                {
                    coins?.map((coin, i) => {
                        return (
                            <Link to={{
                                pathname: `/detail/${coin.id}`
                            }} state={{
                                name: coin.name
                            }} key={i}
                            style={{
                                color: 'white'
                            }}>
                                <Card>
                                    <CoinLogo src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                    &ensp;
                                    <CoinName>{coin.name} &rarr;</CoinName>
                                </Card>
                            </Link>
                        )
                    })
                }
            </Container>
        </>
    )
}

export default Main;
export { Container, Title, CoinLogo };