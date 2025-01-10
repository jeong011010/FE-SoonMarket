import { useCallback, useState } from "react";
import { Report } from "../../type/reportType";
import axios from "axios";

interface ReportResponse {
  reports: Report[];
  last: boolean;
}

const useGetReportList = () => {
  const [reportList, setReportList] = useState<ReportResponse>();

  const getReportList = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL as string;
    await axios.get<ReportResponse>(`${apiUrl}/report`)
      .then(response => {
        setReportList(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  return { reportList, getReportList };
}

export default useGetReportList;