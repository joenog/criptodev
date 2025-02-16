import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styles from './home.module.css';

export interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    marketCapUsd: string;
    explorer: string;
    volumeUsd24Hr: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
  };

export function Home() {

  interface DataProp {
    data: CoinProps[];
  }

  const [input, setInput] = useState('');
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
 
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [ offset ]);

  async function getData() {
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets?limit=5&offset=${offset}`);
      const data: DataProp = await response.json();
      // VALUE CONVERTED
      const coinsData = data.data;
      const price = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      const priceCompact = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: 'compact'
      });
      
      const formatedResult = coinsData.map((item) => ({
        ...item,
        formatedPrice: price.format(Number(item.priceUsd)),
        formatedMarket: priceCompact.format(Number(item.priceUsd)),
        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
      }));
      const listCoins = [...coins, ...formatedResult];
      setCoins(listCoins);
      
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } 
  }
    
  // SHOW COINS INFO
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input === '') return;
    navigate(`/detail/${input}`);
  }
  //SHOW MORE COINS
  function handleGetMore() {
    if (offset === 0) {
      setOffset(10);
      return
    }
    setOffset(offset + 10);
  }

return (
  <main className={styles.container}>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input
            className={styles.btnSearch}
            type="text"
            placeholder="Digite o nome da moeda"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <BsSearch size={26} color="white" />
          </button>
        </form>
          <>
            <table>
              <thead>
                <tr>
                  <th scope="col">Moeda</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Mudança 24h</th>
                </tr>
              </thead>

              <tbody>
                {coins.map((item) => (
                  <tr key={item.id} className={styles.tr}>
                    <td className={styles.tdLabel} data-label="Moeda">
                      <div className={styles.name}>
                        <img className={styles.logoCoins} 
                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} 
                        alt="icon-coin"/>

                        <Link to={`/detail/${item.id}`}>
                          <span>{item.name} | {item.symbol}</span>
                        </Link>
                      </div>
                    </td>

                    <td className={styles.tdLabel} data-label="Valor Mercado">
                      {item.formatedMarket}
                    </td>

                    <td className={styles.tdLabel} data-label="Preço">
                      {item.formatedPrice}
                    </td>

                    <td className={styles.tdLabel} data-label="Volume">
                      {item.formatedVolume}
                    </td>

                    <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                      <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={handleGetMore} className={styles.buttonMore}>
              Mostrar mais
            </button>
          </>
  </main>
);

}
