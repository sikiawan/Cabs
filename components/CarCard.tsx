"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "../utils";
import { CarProps } from "../types/intefaces";
import CustomButton from "./CustomButton";
import { useRouter } from "next/router";
import en from "@/locales/en";
import ar from "@/locales/ar";
import ur from "@/locales/ur";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);

  const { city_mpg, year, make, urMake, arMake, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);
  const handleClick = () => {
    const url = 'https://wa.me/+966507565697?text=I%20want%20your%20Cabs%20Services';
    window.location.href = url;
  };
  const displayMake = () => {
    switch (locale) {
      case 'ar':
        return arMake;
      case 'ur':
        return urMake;
      default:
        return make;
    }
  };
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
        {displayMake()} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image 
        //src={generateCarImageUrl(car)} 
        src={car.pic}
        alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title={t.instantWhatsApp}
            containerStyles='w-full py-[16px] bg-[#5ac1a7]'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => handleClick()}
          />
        </div>
      </div>

      {/* <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} /> */}
    </div>
  );
};

export default CarCard;
