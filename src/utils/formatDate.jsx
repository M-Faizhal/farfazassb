import toast from "react-hot-toast";

export function formatdate(dateInput) {
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date)) return '';

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (err) {
    toast.error("Gagal mengambil tanggal")
    return '';
  }
}