
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { options } from '@/lib/data';
import { useState } from "react";

const DateTimeFilters = ({dateQuery, setDateQuery}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size = "lg"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-black"
          >
            {
              dateQuery?options.find((option) => option.value === dateQuery)?.label
              : options[0].label
            }
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setDateQuery(currentValue);
                      setOpen(false);
                    }}
                    className="text-sm font-medium"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        dateQuery === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateTimeFilters
