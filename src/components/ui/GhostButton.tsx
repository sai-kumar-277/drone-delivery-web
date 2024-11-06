import React from 'react';
import { cn } from "@/lib/utils";

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GhostButton = ({ children, className, ...props }: GhostButtonProps) => {
  return (
    <button
      className={cn("ghost-button", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default GhostButton;