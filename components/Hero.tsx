'use client';

import Image from 'next/image';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import ar from '@/locales/ar';
const Hero = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ar;
  const handleScroll = () => {
    const nextSection = document.getElementById('discover');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div dir='ltr' className='hero'>
      <div className='padding-x flex-1 pt-36'>
        <h1 className='hero__title'>{t.cabsBookingMain}</h1>

        <p className='hero__subtitle'>
          {t.cabsBookingSubMain}
        </p>

        <CustomButton
          title={t.exploreCabs}
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
          handleClick={handleScroll}
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hero.png' alt='hero' fill className='object-contain' />
        </div>

        <div className='hero__image-overlay' />
      </div>
    </div>
  );
};

export default Hero;
