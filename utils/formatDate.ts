import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function formatDate(date: string) {
  return dayjs.utc(date).format("MMMM D, YYYY");
}
