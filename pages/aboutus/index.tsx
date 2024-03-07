import CustomButton from '@/components/CustomButton';
import NavBar from '@/components/header/NavBar';
import ar from '@/locales/ar';
import en from '@/locales/en';
import ur from '@/locales/ur';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Radio, ShipWheel, Headphones } from 'lucide-react';

function AboutUs() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : locale === 'ar' ? ar : ur;
  return (
    <main>
      <NavBar />
      <div dir='ltr' className='hero'>
        <div className='padding-x flex-1 pt-36'>
          <h1 className='hero__title'>
            {t.experianceHeading}
          </h1>

          <p className='hero__subtitle'>
            {t.experianceBody}
          </p>

          <Button
            className='mt-10 bg-[#d01818] text-white hover:opacity-90'
            onClick={() => router.push('/cabsbooking')}
          >
            {t.exploreCabs}
          </Button>
        </div>
        <div className='hero__image-container'>
          <div className='relative z-0 h-[490px] w-[90%] xl:w-full'>
            <Image
              src='/makkah_about.jpg'
              alt='hero'
              fill
              className='object-contain'
            />
          </div>

          {/* <div className='hero__image-overlay' /> */}
        </div>
      </div>
      <div className='h-full border-4 border-gray-400 text-center lg:m-32 lg:p-16'>
        <h1 className='relative text-3xl'>
          <div>{t.mission}</div>
          <br />
          <div className='absolute bottom-0 left-1/2 w-1/4 -translate-x-1/2 transform border-b-4 border-red-500'></div>
        </h1>
        <br />
        <h1 className='text-lg'>
          {t.missionBody}
        </h1>
        <br />
      </div>

      <section className='flex items-center justify-center overflow-hidden'>
        <div className='w-full'>
          <div
            id='cover'
            className='mt-16 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100'
            style={{
              backgroundImage: `url(nabvi.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Add any other background properties you need
            }}
          >
            <div className='m-16 h-full w-full bg-black bg-opacity-50 p-4 text-center lg:m-32 lg:p-16'>
              <h1 className='text-3xl text-white'>{t.companyAttitude}</h1>
              <br />
              <h1 className='text-xl text-white'>
                {t.companyAttitudeBody}
              </h1>
              <br />
              <div className='mt-8 flex justify-around'>
                <div className='flex flex-col items-center'>
                  <ShipWheel size={50} className='text-white' />
                  <h2 className='mt-2 text-white'>{t.fastAndSafeRiding}</h2>
                </div>
                <div className='flex flex-col items-center'>
                  <Radio size={50} className='text-white' />
                  <h2 className='mt-2 text-white'>{t.onlineBooking}</h2>
                </div>
                <div className='flex flex-col items-center'>
                  <Headphones size={50} className='text-white' />
                  <h2 className='mt-2 text-white'>{t.support}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default AboutUs;
