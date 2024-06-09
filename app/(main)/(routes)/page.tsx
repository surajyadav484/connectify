"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { addNewForm } from "@/lib/test-db";

export default function Home() {
  return (
    <div className="h-full">
      <p>Hello world!</p>
      <button
        onClick={async () => {
          addNewForm();
        }}
      >
        Insert
      </button>
      <ModeToggle />
    </div>
  );
}
