import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { CoinProps } from "../home";

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

  }, [cripto])

  return (
    <div>
      <h2>Página detalhe da moeda: {cripto}</h2>
    </div>
  )
}