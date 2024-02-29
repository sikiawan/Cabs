import CustomButton from '@/components/CustomButton';
import NavBar from '@/components/header/NavBar';
import ar from '@/locales/ar';
import en from '@/locales/en';
import ur from '@/locales/ur';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactUs } from '@/services/booking';
import { toast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';

function ContactUs() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { mutate: sendEmail, isPending } = useMutation({
    mutationFn: async () => {
      const postData = {
        ToEmail: email,
        Subject: subject,
        Body: message,
      };
      const result = await contactUs(postData);
      return result;
    },
    onError: (error) => {
      console.log('Error', error.message);
    },
    onSuccess: (data) => {
      clear();
      toast({
        title: "Sent Successfully",
        description: "we will contact you as soon as possible",
      });
    },
  });
  const clear = () => {
    setEmail('');
    setSubject('');
    setMessage('');
  };
  return (
    <main className='overflow-hidden'>
      <NavBar />
      <div dir='ltr' className='hero'>
      <div className='padding-x flex-1 pt-28'>
      <h1 className='hero__title'>{t.contactUs}</h1>
      <div className=' h-80 w-full p-4 bg-black bg-opacity-50'>
              <form
                className='w-full space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEmail();
                }}
              >
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.email}
                    </label>
                    <Input
                      type='email'
                      value={email}
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.email}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.subject}
                    </label>
                    <Input
                      type='text'
                      name='subject'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      id='subject'
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t.subject}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.message}
                    </label>
                    <Input
                      type='text'
                      name='message'
                      id='message'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.message}
                      required
                    />
                </div>
                </div>
                <Button
                  type='submit'
                  isLoading={isPending}
                  disabled={isPending}
                  className='bg-[#d01818] px-5 py-2.5 text-lg font-bold text-white hover:opacity-90'
                >
                  {t.send}
                </Button>
              </form>
              
            </div>
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

export default ContactUs;
