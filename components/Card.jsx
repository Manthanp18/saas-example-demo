import Link from "next/link";

export default function Card({ name, count }) {
  return (
    <div>
      <div className="p-14 h-40 max-w-sm bg-gradient-to-r from-blue-200 to-red-200 rounded-lg shadow-2xl border-gray-800 border-0 transform transition duration-500 hover:scale-110 ">
        <div className="font-bold text-lg tracking-widest"> {name}</div>

        <div className="text-xs">{`${count} examples`}</div>
      </div>
    </div>
  );
}
