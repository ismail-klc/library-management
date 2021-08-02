import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const res = await axios[method](url, body, { withCredentials: true });
            setErrors(null);

            if (onSuccess) {
                onSuccess();
            }
            return res.data;
        } catch (error) {
            console.log(error.response);
            setErrors(
                <div className="alert alert-danger mt-3" role="alert">
                    {
                        error.response.data.message.map((err, index) => (
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