'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import ar from '@/locales/ar';
import ur from '@/locales/ur';
import { Button } from './ui/button';
const Hero = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);
  const handleScroll = () => {
    const nextSection = document.getElementById('discover');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div dir='ltr' className='hero'>
      <div className='padding-x flex-1 pt-14'>
        <h1 className='hero__title'>{t.cabsBookingMain}</h1>

        <p className='hero__subtitle'>
          {t.cabsBookingSubMain}
        </p>

        <Button
          className='bg-[#5ac1a7] text-black mt-10'
          onClick={handleScroll}
        >
          {t.exploreCabs}
        </Button>
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hyundai.png' alt='hero' fill className='object-contain' />
        </div>

        <div className='hero__image-overlay' />
      </div>
    </div>
  );
};

export default Hero;
