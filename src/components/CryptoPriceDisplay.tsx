import { useMemo } from "react"
import { useCriptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
    const result = useCriptoStore(state => state.result)
    const loading = useCriptoStore(state => state.loading)
    const hasResult = useMemo(() => {
        return (
            result &&
            result.IMAGEURL &&
            result.PRICE &&
            result.HIGHDAY &&
            result.LOWDAY &&
            result.CHANGEPCT24HOUR &&
            result.LASTUPDATE
        )
    }, [result])

    return (
        <div className="result-wrapper">
            {loading ? <Spinner /> : hasResult && (
                <>
                    <h2>Cotizacion</h2>
                    <div className="result">
                        <img src={`https://www.cryptocompare.com${result.IMAGEURL}`} alt="Currency" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>El precio mas lato del dia es de: <span>{result.HIGHDAY}</span></p>
                            <p>El precio mas bajo del dia es de: <span>{result.LOWDAY}</span></p>
                            <p>La variacion de las ultimas 24hs: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualizacion: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
