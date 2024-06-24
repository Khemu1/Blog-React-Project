import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!data && !url) return;
    const abort = new AbortController();
    fetch(url, {
      method: "GET",
      signal: abort.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error connecting to server");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setPending(false);
      });
    return () => abort.abort;
  }, []);
  return { data, pending, error };
}

export function usePostData(url, data) {
  const [dataStatus, setDataStatus] = useState(false);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data) return;

    const abort = new AbortController();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: abort.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error connecting to server");
        }
        return response.json();
      })
      .then(() => {
        setDataStatus(true);
        setPending(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error.message);
          setPending(false);
          setDataStatus(false);
        }
      });

    return () => abort.abort();
  }, [url, data]);

  return { dataStatus, pending, error };
}
export function DeleteData(url, data) {
  const [dataStatus, setDataStatus] = useState(false);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  if (!data) return;

  const abort = new AbortController();
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal: abort.signal,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error connecting to server");
      }
      return response.json();
    })
    .then(() => {
      setDataStatus(true);
      setPending(false);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        setError(error.message);
        setPending(false);
        setDataStatus(false);
      }
    });

  return { dataStatus, pending, error };
}
export function changePageName(name) {
  document.title = name;
}
