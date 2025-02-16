import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { CoinProps } from "../home";
import Loading from "../../components/loading";
import '../../components/loading/loading.css';

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
  const [coin, setCoin] = useState<CoinProps | null >();
  const [loading, setLoading] = useState(true);

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
    setLoading(true);

  }, [cripto])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  return (
    <div>
      <h2>Página detalhe da moeda: {cripto}</h2>
    </div>
  )
}