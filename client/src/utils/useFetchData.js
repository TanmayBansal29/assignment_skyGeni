import { useEffect, useState } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const data = await fetch(url);
        const json = await data.json();
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return data;
}

export default useFetchData