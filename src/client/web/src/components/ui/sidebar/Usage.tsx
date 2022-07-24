import React, {useEffect} from "react";
import {useQuery} from "react-query";

const Usage = () => {
    const data = useQuery("usage", async () => {
        const response = await fetch('/api/v1/usage');
        return await response.json();
    });

    // const [usage, setUsage] = useState();

    useEffect(() => {
        console.log(data)
    }, [data.data])

    return (
        <div className="bg-slate-800 rounded-xl relative p-6 text-center">
            <div className="text-sm mb-2">
                {"{usage.used.amount} {usage.used.unit} / {usage.limit.amount} {usage.limit.unit}"}
            </div>
            <div className="w-40 h-3 bg-slate-900 rounded-full">
                <div className="bg-blue-600 h-full rounded-full"
                     style={{width: 100 + "%"}}></div>
            </div>
        </div>
    )
}


export default Usage;