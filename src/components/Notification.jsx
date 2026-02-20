import { CheckCircle } from "lucide-react";

export default function Notification({ message }) {
  if (!message) return null;
  return (
    <div className="notification">
      <CheckCircle size={18} />
      {message}
    </div>
  );
}
