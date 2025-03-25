"use client";
import React, { useState } from "react";
import { Login } from "./login";
import { cn } from "@/lib/utils";
import { Register } from "./register";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const AutchForm: React.FC<Props> = ({ className }) => {
  const [type, setType] = useState<"login" | "register">("login");

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-[100vh]",
        className
      )}
    >
      <div className="max-w-[500px] w-full flex flex-col items-center justify-center">
        {type === "login" ? <Login /> : <Register />}

        <Button
          variant="secondary"
          onClick={() => setType(type === "login" ? "register" : "login")}
          className="w-full text-black"
        >
          {type === "login" ? "Register" : "Login"}
        </Button>
      </div>
    </div>
  );
};
