"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCopy } from "react-icons/fa6";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { clearValue, getValue } from "@/helpers/localStore";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const Profile = () => {
  const [user, setUser] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useRouter();
  const { toast } = useToast();
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Text Copied" });
  };

  const findUser = async (id: string) => {
    // create a axio request
    setLoading(true);
    const client = axios.create({ baseURL: "http://localhost:3000" });

    try {
      const response: AxiosResponse = await client.get("/api/user");
      setUser(response.data.payload);
      setLoading(false);
    } catch (error) {
      clearValue("user");
      setLoading(false);
      console.log("error response", error);
      notFound();
    }
  };

  useEffect(() => {
    const user = getValue("user");
    if (user) {
      findUser(user);
    } else {
      navigate.push("/login");
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="relative bg-primary border border-[#ddd] p-6 rounded-3xl">
        {user && !isLoading ? (
          <img
  
      
            className="w-[80px] h-[80px] object-cover rounded-full absolute top-0 translate-X-[-50%] left-1/2"
            src="./profile.jpg"
            alt="profile"
           
          />
        ) : (
          <Skeleton className="w-[80px] h-[80px] rounded-full absolute top-0 translate-X-[-50%] left-1/2" />
        )}
        <div className="mt-50px text-center">
          {user && !isLoading ? (
            <>
              <h4 className="text-xl font-medium text-white">
                @ {user.username}
              </h4>
              <div className="flex items-center">
                <span className="bg-black border rounded-lg p-3 text-xs font-mono">
                  id{user._id}
                </span>
                <Button
                  onClick={() => copyText(user._id)}
                  className="cursor-copy"
                >
                  <FaCopy className="text-white" />
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/5 mx-auto h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
