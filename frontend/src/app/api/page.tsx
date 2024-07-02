"use client"
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import BoxReveal from "@/components/magicui/box-reveal";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const people = [
  {
    id: 1,
    name: "Instagram",
    designation: "",
    image:
      "",
  },
  {
    id: 2,
    name: "Twitter",
    designation: "",
    image:
      "",
  },
  {
    id: 3,
    name: "Github",
    designation: "https://github.com/rishabhpandey106/galeech-api",
    image:
      "",
  },
  {
    id: 4,
    name: "Leetcode",
    designation: "",
    image:
      "",
  },
  {
    id: 5,
    name: "Codechef",
    designation: "",
    image:
      "",
  },
  {
    id: 6,
    name: "Omni-API",
    designation: "",
    image:
      "",
  },
];

const apiSnippet = `try {
    const response = await fetch('https://galeech-api.herokanon39.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text:  }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
  } catch (error) {
    console.error('There was a problem with the request:', error);
  }
`;

const ApiPage = () => {

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen items-center justify-center bg-custom-bg bg-opacity-80 bg-custom-pattern bg-custom-size bg-custom-position text-gray-800">
      <BoxReveal boxColor={"#bec8d1"} duration={0.5}><h1 className="text-3xl font-bold mb-4">API Usage</h1></BoxReveal>
      <BoxReveal boxColor={"#bec8d1"} duration={0.5}><p className="mb-6">
        Gaalech-API is a fast and accurate tool for detecting Hindi profanity. Below is a code snippet on how to use the API.
      </p></BoxReveal>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {apiSnippet}
      </SyntaxHighlighter>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
    </div>
  );
};

export default ApiPage;

