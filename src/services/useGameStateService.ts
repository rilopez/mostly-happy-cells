import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { GameState } from '../types/GameState';


const useGameStateService = (url: string) => {
    const [result, setResult] = useState<Service<GameState>>({ status: 'loading' });

    useEffect(() => {
        if (url) {
            setResult({ status: 'loading' });
            fetch(url)
                .then(response=> response.json())
                .then(response=> setResult({status: 'loaded', payload: response.data}))
                .catch(error=> setResult({status: 'error', error}))

        }
    }, [url]);


    return result;
}

export default useGameStateService;








