import axios from "axios";
import { useEffect, useState } from "react";


export default function useApi(url: string | undefined = undefined, time: number = 0) {
    const [loadedData, setLoadedData] = useState<any>(false);
    const [currentUrl, setUrl] = useState(url);
    const [loading, setLoading] = useState(true);

    const controller = new AbortController();


    //Fetch data from api
    const FetchData = async () => {
        if (currentUrl) {
            setLoading(true);
            try {
                console.log("AAAAAAAAAAAAAAAAA")
                axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
                axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
                // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

                const response = await axios.get(currentUrl, {
                    signal: controller.signal,
                    withCredentials: false
                }
                );

                setLoadedData(response.data);
                console.log(response.data)
                setTimeout(() => { setLoading(false) }, time)

            } catch (error) {
                console.log(error)
                setLoadedData(false);
                setLoading(false);
            }
        }


    }

    useEffect(() => {
        if (!loading)
            return () => { controller.abort() }
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {
        FetchData();

        return () => { }
        // eslint-disable-next-line
    }, [currentUrl])





    return [loadedData, loading, setUrl, FetchData]


}
