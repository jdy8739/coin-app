import { useQuery } from "react-query";
import { getPriceFluctuation } from "../api";
import { IInfoChart } from "./InfoChart";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

function PriceChart({ coinId }: { coinId: string }) {

    const {isLoading, data} = useQuery<IInfoChart[]>("info-chart", () => getPriceFluctuation(coinId));

    const isDark = useRecoilValue(isDarkAtom);

    return(
        <>
            {
                isLoading ? <p>loading chart...</p> :
                <ApexCharts 
                    type="candlestick"
                    series={[
                        {
                            data: data?.map(item => 
                                { return { 
                                    x: item.time_close, 
                                    y: [item.close.toFixed(3), item.high.toFixed(3), item.low.toFixed(3), item.open.toFixed(3)] 
                                } }),
                            name: "price"
                        }
                    ]}
                    options={{
                        chart: {
                            toolbar: {
                                show: false
                            }
                        },
                        yaxis: {
                            show: false
                        },
                        xaxis: {
                            type: "datetime",
                            categories: data?.map(item => item.time_close),
                            labels: {
                                style: {
                                    colors: isDark ? 'white' : 'black'
                                }
                            }
                        },
                        tooltip: {
                            theme: "dark"
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: isDark ? 'red' : '#3C90EB',
                                    downward: isDark ? 'teal' : '#DF7D46'
                                }
                            }
                        }
                    }}
                    
                />
            }
        </>
    )
}

export default PriceChart;