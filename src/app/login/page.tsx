import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center dark">
      <div className="w-[400px]">
        <Input placeholder="Email" type="email" name="email" />
        <br />
        <Input placeholder="Password" type="password" name="password" />
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default page;
