import { formatDate } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";

const FormatDate = ({ date }: { date: string }) => {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    setFormattedDate(formatDate(date));
  }, [date]);
  return <Fragment >{formattedDate}</Fragment>;
};

export default FormatDate;
