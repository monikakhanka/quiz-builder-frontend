import { useEffect, useState } from "react";

export default function LocalDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("");
  useEffect(() => {
    setFormatted(new Date(date).toLocaleString());
  }, [date]);
  return <>{formatted}</>;
}
