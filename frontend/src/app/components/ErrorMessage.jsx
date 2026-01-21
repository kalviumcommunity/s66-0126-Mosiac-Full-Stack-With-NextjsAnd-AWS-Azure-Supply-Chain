export default function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-lg">&times;</button>
    </div>
  );
}
