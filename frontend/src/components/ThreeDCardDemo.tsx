"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface ThreeDCardDemoProps {
  title: string;
  para: string;
  img: string;
  onClick: () => void; // for navigation
}

export function ThreeDCardDemo({ title, para, img, onClick }: ThreeDCardDemoProps) {
  return (
    <CardContainer className="inter-var  ">
      <CardBody
        onClick={onClick}
        className="cursor-pointer bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#e6c979] dark:border-black/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-[65vh] rounded-xl p-6 border relative"
      >
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={img}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="mt-2 text-2xl font-bold text-neutral-600 dark:text-black"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-md max-w-sm mt-2 dark:text-black font-semibold"
        >
          {para}
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="button"
            onClick={onClick}
            className= "absolute px-4 py-2 rounded-2xl text-xl font-bold dark:text-white bg-green-600 bottom"
          >
            Use now →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

