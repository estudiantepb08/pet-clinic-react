import { useEffect, useState } from "react"

export const useFetch = (url, method = 'GET', body = null, headers = {}) => {

    const [state, setState] = useState({ data: null, error: null, ok: null });
    const getFetch = async () => {
        console.log("entro el hp")
        try {
            const options = {
                method,
                headers: {
                    ...headers
                },
                body: method === 'POST' ? JSON.stringify(body) : null
            };
            const resp = await fetch(url,options);
            const data = await resp.json();
            setState({
                data,
                error: null,
                ok: true
            });
        } catch (error) {
            setState({
                data: null,
                error: error.message,
                ok: false
            });
        }
    };
    useEffect(() => {
        getFetch();
    }, [url]);

    return {
        data: state.data,
        error: state.error,
        ok: state.ok
    }
} 