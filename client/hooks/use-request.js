import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess, headers }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const res = await axios[method](
                url, 
                body, 
                headers ? headers : { withCredentials: true });

            setErrors(null);

            if (onSuccess) {
                onSuccess();
            }
            return res.data;
        } catch (error) {
            const msg = typeof error.response.data.message === 'string'
                ? [error.response.data.message]
                : [...error.response.data.message]
            setErrors(
                <div className="alert alert-danger mt-3" role="alert">
                    {
                        msg.map((err, index) => (
                            <div key={index}>{err}</div>
                        ))
                    }
                </div>
            );
        }
    }

    return { doRequest, errors };
}

export default useRequest;