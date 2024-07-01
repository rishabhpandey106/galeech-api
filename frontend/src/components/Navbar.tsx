'use client'
import Link from 'next/link';
import React from 'react'
import SparklesText from "@/components/magicui/sparkles-text";

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl font-bold">
            <SparklesText text="Galeech-API" />
          </div>
          <div className="flex gap-6">
            <Link className='pt-1' href="/video-api" passHref>
              <p className="text-lg hover:text-yellow-500 transition-colors duration-300">Video Demo</p>
            </Link>
            <Link className='pt-1' href="/demo" passHref>
              <p className="text-lg hover:text-yellow-500 transition-colors duration-300">API</p>
            </Link>
            <Link
              href="https://github.com/rishabhpandey106/galeech-api"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold transition-colors duration-300 hover:bg-yellow-600"
            >
              Star my GitHub
            </Link>
          </div>
        </nav>
      );
}

