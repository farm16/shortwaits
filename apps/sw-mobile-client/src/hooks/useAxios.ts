import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface IUseAxios {
  url: string;
  method: "get" | "post" | "delete" | "put";
  body: any;
  headers: any;
}
const useAxios = ({ url, method, body = null, headers = null }: IUseAxios) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxios;
