import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { CoinProps } from "../home";
import Loading from "../../components/loading";
import '../../components/loading/loading.css';
import './detail.css'

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {
  const {cripto} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState<CoinProps | null >();

  useEffect(() => {
    // Fetch coin data from the API and handle the response
    async function getCoin() {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${cripto}`);
        const data: DataProps = await response.json();

        if ("error" in data) {
          navigate('/');
          return;
        }

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: 'compact'
        });

        const resultData = {
          ...data.data,
          formatedPrice: price.format(Number(data.data.priceUsd)),
          formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
        };

        setCoin(resultData);
        
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }
    getCoin();
    setLoading(false);

  }, [cripto])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  } else { 
    return (
      <main className="container">
              <div className="logoName">
                <h2 className="name" >{coin?.name} </h2>
                <div className="logoDetail">
                  <img
                  src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                  alt="coin-logo"/>
                </div>
              </div>

            <section className="content">
              <p>Mercado: {coin?.formatedMarket}</p>
              <p>Preço: {coin?.formatedPrice}</p>
              <p>Volume: {coin?.formatedVolume}</p>
              <p>Mudança 24h: <span className={Number(coin?.changePercent24Hr) > 0 ? "tdProfit" : "tdLoss"}> {Number(coin?.changePercent24Hr).toFixed(3)}</span></p>
            </section>
    </main>
  )
}
}