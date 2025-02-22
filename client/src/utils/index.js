export const formatDate = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);
  if (isNaN(inputDate)) return "Invalid Date";

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const words = name.trim().split(" ");
  return words.length > 1
    ? `${words[0][0]}${words[1][0]}`.toUpperCase()
    : `${words[0][0]}`.toUpperCase();
};

// Fixed Function
export const getInitialsFromFullName = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "?";
  const names = fullName.trim().split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  return initials.join("");
};

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
