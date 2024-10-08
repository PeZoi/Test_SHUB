import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Sử dụng các plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const vnTimeZone = "Asia/Ho_Chi_Minh";

dayjs.tz("2024-10-08 21:10:28", vnTimeZone);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
