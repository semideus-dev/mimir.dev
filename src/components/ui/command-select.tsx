import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CustomCommandDialog,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ChevronsUpDown } from "lucide-react";
import { CommandInput } from "cmdk";

interface CommandSelectProps {
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
  options: Array<{ id: string; value: string; children: React.ReactNode }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
}

export default function CommandSelect({
  value,
  placeholder,
  isSearchable,
  className,
  options,
  onSelect,
  onSearch,
}: CommandSelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((option) => option.value === value);

  function handleOpenChange(value: boolean) {
    onSearch?.("");
    setOpen(value)
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-9 items-center border justify-between px-2",
          className,
          !selectedOption && "text-muted-foreground",
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDown />
      </Button>
      <CustomCommandDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput
          className="px-2 ring-0 focus:outline-none"
          placeholder="Search..."
          onValueChange={onSearch}
        />
        <CommandList>
          <CommandEmpty>
            <span>No options found.</span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CustomCommandDialog>
    </>
  );
}
