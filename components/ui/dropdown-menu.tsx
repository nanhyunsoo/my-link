"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";

const DropdownMenu = Menu.Root;
const DropdownMenuTrigger = Menu.Trigger;
const DropdownMenuPortal = Menu.Portal;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Menu.Positioner>,
  React.ComponentPropsWithoutRef<typeof Menu.Positioner>
>(({ className, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner
      ref={ref}
      sideOffset={8}
      className="z-50"
      {...props}
    >
      <Menu.Popup
        className={cn(
          "min-w-[8rem] overflow-hidden border-2 border-white bg-[#0D0D0D] p-1 text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
      >
        {props.children}
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item>
>(({ className, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center px-3 py-2 text-sm font-bold uppercase tracking-tight outline-none transition-colors hover:bg-white hover:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
};
