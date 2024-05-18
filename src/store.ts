import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoPrice, Cryptocurrency, Pair } from "./types";
import { fetchCurrentCryptoPair, getCrypto } from "./services/CryptoServices";

type CryptoStore = {
    cryptocurrency: Cryptocurrency[],
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}


export const useCriptoStore = create<CryptoStore>()
    (devtools
        ((set) => ({
            cryptocurrency: [],
            result: {
                IMAGEURL: '',
                PRICE: '',
                HIGHDAY: '',
                LOWDAY: '',
                CHANGEPCT24HOUR: '',
                LASTUPDATE: '',
            },
            loading: false,
            fetchCryptos: async () => {
                const cryptocurrency = await getCrypto()
                set(() => ({
                    cryptocurrency
                }))
            },
            fetchData: async (pair) => {
                set(() => ({
                    loading: true
                }))
                const result = await fetchCurrentCryptoPair(pair)

                set(() => ({
                    result,
                    loading: false
                }))
            }
        })))