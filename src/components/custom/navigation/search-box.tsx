import React from "react";

import {
  CommandInput,
  CommandItem,
  CommandList,
  CustomCommandDialog,
} from "@/components/ui/command";

interface SearchCommandProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBox({ open, setOpen }: SearchCommandProps) {
  return (
    <CustomCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandItem>Hello</CommandItem>
      </CommandList>
    </CustomCommandDialog>
  );
}
