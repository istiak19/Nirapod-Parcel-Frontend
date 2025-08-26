import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (value: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={id} className="sr-only">
        Search
      </Label>
      <div className="relative mt-11">
        {/* Icon */}
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        {/* Input */}
        <Input
          id={id}
          type="search"
          placeholder="Search by status, type, or address..."
          className="pl-9 pr-4 py-4"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};