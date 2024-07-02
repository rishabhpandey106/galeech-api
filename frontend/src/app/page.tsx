'use client'
import { useState } from "react";
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";
import { CoolMode } from "@/components/magicui/cool-mode";
import SparklesText from "@/components/magicui/sparkles-text";
import Image from 'next/image'
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInterval(()=>setInputValue(e.target.value), 3000)
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://galeech-api.herokanon39.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      setResult(`You submitted: ${data.success}`);
    } catch (error:any) {
      console.error('There was a problem with the fetch operation:', error);
      setResult(`Submission failed: ${error.message}`);
    }
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
            <div className="text-5xl font-bold mb-6"><VelocityScroll
              text="Galeech API गलीच API"
              default_velocity={5}
              className="font-serif text-center text-4xl font-bold tracking-[-0.02em] text-gray-700 drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
            /></div>
            <p className="text-xl mb-6 text-justify text-mono">
            Say goodbye to inappropriate language in your digital interactions. Galeech-API provides fast and accurate detection of Hindi profanity <span className="font-bold text-gray-700">("गाली")</span>, ensuring a cleaner and more respectful online environment. Fast, efficient, and ready to integrate into your applications.
            </p>
            <ul className="list-none pl-5 space-y-2 ">
              <li><span>😎</span> Scalable and Efficient</li>
              <li><span>🤯</span> Fast, Accurate, and Unique Hindi Profanity Detector</li>
              <li><span>🤑</span> 100% Free and Open-Source</li>
            </ul>
          </div>
          <div className="md:w-1/2  p-8 rounded-lg ">
            <div className="space-y-4">
              <p className="flex items-center">
                <CoolMode>
                <button className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none">
                  POST
                </button>
                </CoolMode>
                <span className="ml-2 text-gray-500">https://galeech-api.herokanon39.workers.dev</span>
              </p>
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={onChange}
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
