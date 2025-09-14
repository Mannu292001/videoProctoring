// // import { Button } from "@/components/ui/button"; // shadcn ui button
// // import { FileDown } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function DownloadReportButton({ interviewId }) {
//   const handleDownload = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/reports/${interviewId}`);
//       if (!response.ok) throw new Error("Failed to download report");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `Proctoring_Report_${interviewId}.pdf`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("❌ Error downloading report:", err);
//     }
//   };

//   return (
//     <Button
//       onClick={handleDownload}
//       className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
//     >
//       <FileDown size={18} /> Download Report
//     </Button>
//   );
// }
