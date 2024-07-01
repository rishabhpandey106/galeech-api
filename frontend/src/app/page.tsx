'use client'
import { useState } from "react";
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";
import { CoolMode } from "@/components/magicui/cool-mode";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(`You submitted: ${inputValue}`);
    console.log("submitted");
  };

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg bg-opacity-80 bg-custom-pattern bg-custom-size bg-custom-position text-gray-800">
      <div className="max-w-7xl w-full px-6 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-5xl font-bold mb-6">Galeech API</h1>
            <p className="text-xl mb-6">
            Say goodbye to inappropriate language in your digital interactions. Gaalech-API provides fast and accurate detection of Hindi profanity ("gali"), ensuring a cleaner and more respectful online environment. Fast, efficient, and ready to integrate into your applications.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>FEATURE 1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
          <div className="md:w-1/2  p-8 rounded-lg ">
            <div className="space-y-4">
              <p className="flex items-center">
                <CoolMode>
                <button className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  POST
                </button>
                </CoolMode>
                <span className="ml-2 text-gray-500">https://galeech-api.herokanon39.workers.dev</span>
              </p>
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={e=>setInputValue(e.target.value)}
                    onSubmit={onSubmit}
                  />
            </div>
            {result && (
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
