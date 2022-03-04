import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { ICoinInfo } from "../types/coinInfoTypes";
import { ICoinPrice } from "../types/coinPriceTypes";
import InfoChart from "./InfoChart";
import PriceChart from "./PriceChart";
import { CoinLogo, Container, Title } from "./main";
import { useQuery } from "react-query";
import { getCoinInfo, getCoinPriceInfo } from "../api";
import { Helmet } from 'react-helmet';

const Semi_Container = styled.div`
    width: 520px;
    height: 75px;
    margin: auto;
`;

const Bar = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${ props => props.theme.midColor };
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
`;

const Tab_Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Tab = styled.div<{ chosen?: boolean }>`
    width: 28%;
    height: 32px;
    background-color: ${ props => props.theme.midColor };
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    p {
        transition: all 1s;
        font-weight: ${ props => props.chosen ? 'bolder' : 'normal' };
        color: ${ props => props.chosen ? props.theme.accentColor : props.theme.textColor };
    }
`;

interface RouteState {
    state: {
        name: string
    }
};

function Detail() {

    const { id } = useParams();
    const { state } = useLocation() as RouteState;

    const {isLoading: isInfoLoading, data: info} = useQuery<ICoinInfo>(
        ['info', id], 
        () => getCoinInfo(id || ''), 
        { refetchInterval: 10000 }
    );

    const {isLoading: isPriceInfoLoading, data: priceInfo} = useQuery<ICoinPrice>(
        ['priceInfo', id], 
        () => getCoinPriceInfo(id || ''),
        { refetchInterval: 10000 }
    );

    const isLoading: boolean = isInfoLoading || isPriceInfoLoading;

    const infoMatch = useMatch('/detail/:id/info');
    const priceMatch = useMatch('/detail/:id/price');

    return(
        <>
          <Container>
                <Helmet>
                    <title>{ id }</title>
                </Helmet>
                <Semi_Container>
                    <Title>
                        { state?.name || info?.name }
                        &ensp;
                        <CoinLogo src={`https://cryptoicon-api.vercel.app/api/icon/${info?.symbol.toLowerCase()}`}/>
                    </Title>
                    <br></br>
                    {
                        isLoading ? <p>NOW ON LOADING</p> :
                        <>
                            <Bar>
                                <p>RANK: {info?.rank}</p>
                                <p>SYMBOL: {info?.symbol}</p>
                                <p>OPEN SOURCE: {priceInfo?.quotes.USD.price.toFixed(4)}</p>
                            </Bar>
                            <br></br>
                            <p>{ info?.description }</p>
                            <br></br>
                            <Bar>
                                <p>TOTAL SUPPLY: {priceInfo?.total_supply}</p>
                                <p>MAX SUPPLY: {priceInfo?.max_supply}</p>
                            </Bar>
                            <br></br>
                            <Tab_Container>
                                <Tab chosen={ infoMatch !== null }>
                                    <Link to={`/detail/${info?.id}/info`}><p>INFO</p></Link>
                                </Tab>
                                <Tab chosen={ priceMatch !== null }>
                                    <Link to={`/detail/${info?.id}/price`}><p>PRICE</p></Link>
                                </Tab>
                                <Tab>
                                <Link to="/"><p>MAIN</p></Link>
                                </Tab>
                            </Tab_Container>
                            <br></br>
                            <Routes>
                                <Route path="info" element={<InfoChart coinId={ info?.id ?? "" }/>}/>
                                <Route path="price" element={<PriceChart />}/>
                            </Routes>
                        </>
                    }
                </Semi_Container>
          </Container>
        </>
    )
}

export default Detail;