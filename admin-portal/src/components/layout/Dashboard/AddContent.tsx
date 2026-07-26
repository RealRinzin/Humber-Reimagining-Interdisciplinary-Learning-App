import FlashCard from "@/components/ui/cards/flashCard/FlashCard";
export default function AddContent() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 3 }).map((_, index: number) => (
        <FlashCard key={index} />
      ))}
    </div>
  );
}
