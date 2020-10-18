import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const controller = new AbortController();
    const signal = controller.signal;

    const request = useCallback(async(url, method = 'GET', body = null, headers = {}, signal) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }
            let response = await fetch(url, { method, body, headers, signal });
            let status = response.status;
            let data = await response.text();
            if (status === 400) {
                setError(data);
            }
            try {
                data = JSON.parse(data);
            } catch (err) {
                console.log('Answer from server is not JSON' + err);
            }
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error);
            return new Error('Error: ' + error.message);
        }
    }, [])

    const clearError = () => {
        setError(false);
    }

    return { request, loading, error, clearError }
}