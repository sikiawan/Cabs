import CustomButton from '@/components/CustomButton';
import NavBar from '@/components/header/NavBar';
import ar from '@/locales/ar';
import en from '@/locales/en';
import ur from '@/locales/ur';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '@/components/Footer';

function AboutUs() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);
  return (
    <main className='overflow-hidden'>
      <NavBar />
      <div dir='ltr' className='hero'>
      <div className='padding-x flex-1 pt-36'>
        <h1 className='hero__title'>{t.aboutUs}</h1>

        <p className='hero__subtitle'>
          {t.cabsBookingSubMain}
        </p>

        <CustomButton
          title={t.exploreCabs}
          containerStyles='bg-primary-blue text-white rounded-full mt-10'
          handleClick={()=> router.push('/cabsbooking')}
        />
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src='/hero.png' alt='hero' fill className='object-contain' />
        </div>

        <div className='hero__image-overlay' />
      </div>
    </div>
    <Footer />
    </main>
  );
}

export default AboutUs;
