import { useQuery } from "react-query";
import { getPriceFluctuation } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IInfoChart {
    time_open: string
    time_close: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    market_cap: number
};

function InfoChart({ coinId }: { coinId: string }) {

    const {isLoading, data} = useQuery<IInfoChart[]>("info-chart", () => getPriceFluctuation(coinId));

    const isDark = useRecoilValue(isDarkAtom);

    return(
        <>
            {
                isLoading ? <p>loading chart...</p> :
                <ApexCharts 
                    type="line"
                    options={{
                        theme: {
                            mode: "dark"
                        },
                        stroke: {
                            curve: "smooth",
                            width: 3
                        },
                        chart: {
                            toolbar: {
                                show: false
                            },
                            background: "transparent"
                        },
                        grid: {
                            show: false
                        },
                        yaxis: {
                            show: false
                        },
                        xaxis: {
                            type: "datetime",
                            categories: data?.map(item => item.time_close)
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: [isDark ? 'red' : '#3C90EB'],
                                stops: [0, 100]
                            }
                        },
                        colors: [isDark ? 'teal' : '#DF7D46'],
                        tooltip: {
                            y: {
                                formatter: value => value.toFixed(3)
                            }
                        }
                    }}
                    series={[
                        {
                            data: data?.map(item => item.close),
                            name: "close"
                        }
                    ]}
                
                />
            }
        </>
    )
}

export default InfoChart;
export { IInfoChart };