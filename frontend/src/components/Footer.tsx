'use client'
import React from 'react';
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-xs">&copy; 2024 Gaalech-API. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
