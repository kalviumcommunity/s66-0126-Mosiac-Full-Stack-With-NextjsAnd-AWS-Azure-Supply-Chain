export default function FormInput({ label, type = 'text', name, value, onChange, placeholder, required = false }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
