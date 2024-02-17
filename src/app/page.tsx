"use client";
import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { ERROR_KEY, HEADER_VID_TITLE_KEY } from "@/constants";
import useErrorNotification from "./components/ErrorNotification/ErrorNotification";

export default function Home() {
  const [url, setUrl] = useState("");
  const { ErrorNotification, setError } = useErrorNotification();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorMessage = JSON.parse(await response.text());
        return setError(errorMessage[ERROR_KEY]);
      }

      const fileName =
        response.headers.get(HEADER_VID_TITLE_KEY) || "eltitlenovino_o_fallò";
      const blob = await response.blob();
      const urlwithaudio = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlwithaudio;
      link.download = `${fileName}.mp3`;
      link.click();
    } catch (error: any) {
      setError(error[ERROR_KEY] ?? error.message ?? "Something happened");
    }
  };

  return (
    <main className={styles.main}>
      <input
        placeholder="Enter YouTube URL"
        value={url}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Convert to MP3</button>
    </main>
  );
}
