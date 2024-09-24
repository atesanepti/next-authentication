"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getValue, setValue } from "@/helpers/localStore";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useRouter();
  const { toast } = useToast();

  const signup = async () => {
    if (!password || !username) {
      return toast({
        description: "Credential is required",
        title: "Login Failed!",
      });
    }

    // create a axio request
    const client = axios.create({ baseURL: "http://localhost:3000" });
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json",
      },
    };

    interface user {
      username: string;
      password: string;
    }

    const data: user = {
      username,
      password,
    };

    try {
      const response: AxiosResponse = await client.post(
        "/api/user",
        data,
        config
      );
      navigate.push("/login");
    } catch (error) {
      const errorMessage: string = error.response.data.error;
      toast({ description: errorMessage, title: "Register Failed!" });
    }
  };

  useEffect(() => {
    const user = getValue("user");
    if (user) {
      navigate.push("/profile");
    }
  }, [navigate]);

  return (
    <div className="bg-black w-full h-screen flex items-center justify-center dark">
      <div className="w-[400px]">
        <Link
          href="/"
          className=" text-white border px-4 py-2 cursor-pointer rounded-md absolute top-10 left-10"
        >
          Back
        </Link>
        <div className="my-6">
          <h2 className="text-3xl font-blod text-center text-white">
            Register Now!
          </h2>
        </div>
        <div>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-center">
            <Button className="px-16 mx-auto mt-6" onClick={signup}>
              Register{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
