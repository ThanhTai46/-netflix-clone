import React from "react";

interface NavbarItem {
  label?: string;
}
export default function NavbarItem({ label }: NavbarItem) {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
}
