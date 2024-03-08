import { footerLinks } from '@/constants/constants';
import ar from '@/locales/ar';
import en from '@/locales/en';
import ur from '@/locales/ur';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : locale === 'ar' ? ar : ur;

  const getLocalizedTitle = (item: any) => {
    if (locale === 'en') {
      return item.title;
    } else if (locale === 'ar') {
      return item.arTitle;
    } else if (locale === 'ur') {
      return item.urTitle;
    } else {
      return item.title;
    }
  };
  return (
    <footer className='text-black-100 flex  flex-col border-t border-gray-100'>
      <div className='flex flex-wrap justify-between gap-5 px-6 py-2 max-md:flex-col sm:px-16'>
        <div className='flex flex-col items-start justify-start gap-6'>
          <Image
            src='/logo.svg'
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          />
        </div>

        {/* <div className='footer__links'>
          {footerLinks.map((item) => (
            <div key={item.title} className='footer__link'>
              <h3 className="font-bold">{getLocalizedTitle(item)}</h3>
              <div className='flex flex-col gap-5'>
                {item.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className='text-gray-500'
                  >
                    {getLocalizedTitle(link)}{' '}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <div className='mt-2 flex flex-wrap items-center justify-center sm:justify-between border-t border-gray-100 px-6 py-2'>
        <p dir='ltr'>@2024 CarHub. {t.allRightsReserved}</p>

      </div>
    </footer>
  );
};

export default Footer;
