export const TYPE_COLORS = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-cyan-700",
  psychic: "bg-pink-500",
  bug: "bg-lime-600",
  rock: "bg-stone-500",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

export function getTypeColors(type) {
  return TYPE_COLORS[type] || "bg-gray-400";
}
