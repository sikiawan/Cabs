import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import ar from '@/locales/ar';
import { LangDropDown, themes } from '@/constants/constants';
import { API_CONFIG } from '@/constants/api-config';
import { Context } from '@/contexts/UseContext';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { ClientPreference } from '@/types/types';
import Link from 'next/link';
import { AlignJustify, X } from 'lucide-react';
import ur from '@/locales/ur';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface MenuItem {
  itemId: number;
  name: string;
  localizedName: string;
  href: string;
  permission?: string;
  parentId?: number;
  subItems?: MenuItem[];
}
const NavBar: React.FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);

  const { changeLanguage, changeTheme, theme } = Context();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [openDropdownMenu, setOpenDropdownMenu] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [logo, setLogo] = useState('');
  const [email, setEmail] = useState('');
  const [scrolling, setScrolling] = useState(false);


  const handleToggleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setUserProfileOpen(!isUserProfileOpen);
    setOpenDropdownMenu(null);
  };

  const handleToggleDropdownMenu = (
    menuName: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setOpenDropdownMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const isDropdownClick = (event.target as Element).closest('.dropdown-menu');

    if (!isDropdownClick) {
      setUserProfileOpen(false);
      setOpenDropdownMenu(null);
    }
  };
  const getData = (userEmail: string) => {
    axios
      .get(
        `${API_CONFIG.BASE_URL}api/Permission/GetMenuItems?userEmail=${userEmail}`
      )
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getLogo = () => {
    const clientPreferenceString = cookies.clientPreference || '{}';
    const clientPreference: ClientPreference = JSON.parse(
      clientPreferenceString
    );
    setLogo(clientPreference.logo);
  };

  const cookies = parseCookies();
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolling(offset > 0);
  };
  useEffect(() => {
    const userEmail = cookies.username;
    getData(userEmail);
    getLogo();
    setEmail(userEmail);
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cookies.username, getLogo]);
  return (
    <div className={`fixed z-10 w-full ${scrolling ? 'bg-white' : 'bg-transparent'}`}>
      <div className='mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 flex items-center md:hidden'>
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              type='button'
              className='inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            >
              {isMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <AlignJustify className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
          <div className='flex flex-shrink-0 items-center'>
            {/* {logo ? (
              <img
              className='hidden h-8 w-auto md:block lg:block'
              src={logo}
              alt='Logo'
            />
            ):(
              <img
              className='hidden h-8 w-auto md:block lg:block'
              src='cabsLogo.jpg'
              alt='Logo'
            />
            )} */}


            {/* <img
              className='logo-main scale-with-grid mx-8 w-16 sm:mx-0 sm:w-48'
              src='https://www.umrahcabs4u.com/wp-content/uploads/2023/12/UmrahCabs4U-Logo.png'
              data-retina='https://www.umrahcabs4u.com/wp-content/uploads/2023/12/UmrahCabs4U-LogoX2.png'
              data-height='45'
              alt='UmrahCabs4U-Logo'
              data-no-retina=''
            ></img> */}
            <Image
            src='/logo.svg'
            alt='logo'
            width={118}
            height={18}
            className='object-contain mx-10'
          />
          </div>

          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
            <div
              className='hidden w-full md:block md:w-auto'
              id='navbar-default'
            >
              <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900'>
                <li>
                  <Link
                    href='/'
                    className={`block rounded px-3 py-2 font-extrabold md:p-0 ${
                      router.pathname === '/'
                        ? 'bg-[#5ac1a7] text-[#5ac1a7] hover:text-gray-900 md:bg-transparent md:text-[#5ac1a7]'
                        : 'text-gray-900 hover:bg-[#5ac1a7] md:border-0 md:hover:bg-transparent md:hover:text-[#5ac1a7]'
                    }`}
                    aria-current={
                      router.pathname === '/' ? 'page' : undefined
                    }
                  >
                    {t.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cabsbooking'
                    className={`block rounded px-3 py-2 font-extrabold md:p-0 ${
                      router.pathname === '/cabsbooking'
                        ? 'bg-[#5ac1a7] text-[#5ac1a7] hover:text-gray-900 md:bg-transparent md:text-[#5ac1a7]'
                        : 'text-gray-900 hover:bg-[#5ac1a7] md:border-0 md:hover:bg-transparent md:hover:text-[#5ac1a7]'
                    }`}
                    aria-current={
                      router.pathname === '/cabsbooking' ? 'page' : undefined
                    }
                  >
                    {t.cabsBooking}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/aboutus'
                    className={`block rounded px-3 py-2 font-extrabold md:p-0 ${
                      router.pathname === '/aboutus'
                        ? 'bg-[#5ac1a7] text-[#5ac1a7] hover:text-gray-900 md:bg-transparent md:text-[#5ac1a7]'
                        : 'text-gray-900 hover:bg-[#5ac1a7] md:border-0 md:hover:bg-transparent md:hover:text-[#5ac1a7]'
                    }`}
                    aria-current={
                      router.pathname === '/aboutus' ? 'page' : undefined
                    }
                  >
                    {t.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contactus'
                    className={`block rounded px-3 py-2 font-extrabold md:p-0 ${
                      router.pathname === '/contactus'
                        ? 'bg-[#5ac1a7] text-[#5ac1a7] hover:text-gray-900 md:bg-transparent md:text-[#5ac1a7]'
                        : 'text-gray-900 hover:bg-[#5ac1a7] md:border-0 md:hover:bg-transparent md:hover:text-[#5ac1a7]'
                    }`}
                    aria-current={
                      router.pathname === '/contactus' ? 'page' : undefined
                    }
                  >
                    {t.contactUs}
                  </Link>
                </li>
              </ul>
            </div>
            {/* {nestedMenuItems.map((menuItem) => (
              <div key={menuItem.name} className='relative ml-3'>
                {menuItem.subItems ? (
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={(event) =>
                        handleToggleDropdownMenu(menuItem.name, event)
                      }
                      className='flex rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-100'
                    >
                      <span className='sr-only'>{`Open ${menuItem.name} menu`}</span>
                      <span className='rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-white'>
                        {menuItem.name}
                      </span>
                    </button>
                    {openDropdownMenu === menuItem.name && (
                      <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {menuItem.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className='block px-4 py-2 text-sm text-gray-700'
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={menuItem.href}
                    className={classNames(
                      'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    {menuItem.name}
                  </a>
                )}
              </div>
            ))} */}
          </div>
          <div className='flex sm:items-center'>
          <Select
              value={locale}
              onValueChange={(newValue) => changeLanguage(newValue)}
            >
              <SelectTrigger className='bg-transparent'>
                {LangDropDown.find((op) => op.value === locale)?.label}
              </SelectTrigger>
              <SelectContent className='bg-transparent'>
                {LangDropDown.map((op) => (
                  <SelectItem className='bg-white border-collapse' value={op.value} key={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Profile dropdown */}
            {email && (
              <div className='hidden md:flex relative ml-3'>
                <div className='relative'>
                  <button
                    type='button'
                    onClick={(event) =>
                      handleToggleDropdownMenu('StaticDropdown', event)
                    }
                    className='flex bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    <span className='sr-only'>Open Static Dropdown menu</span>
                    <img
                      className='h-8 w-12'
                      src='https://localhost:7160/Image/mine234629318.jpg'
                      alt='Static Dropdown'
                    />
                  </button>
                  {openDropdownMenu === 'StaticDropdown' && (
                    <div className='absolute ltr:right-0 rtl:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div
                        className='text-md block px-4 py-2 text-sm font-bold text-gray-700'
                        role='menuitem'
                        id='user-menu-item-0'
                      >
                        {email}
                      </div>
                      <a
                        href='/static-item-1'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.yourProfile}
                      </a>
                      <a
                        href='/static-item-2'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.settings}
                      </a>
                      <a
                        href='/logout'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.signOut}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden' onClick={() => setMenuOpen(true)}>
          <div className='space-y-1 px-2 pb-3'>
            <ul className='mt-4 flex flex-col rounded-lg border w-48 border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row rtl:space-x-reverse'>
              <li>
                <Link
                  href='/'
                  className={`rounded px-3 py-2 font-extrabold ${
                    router.pathname === '/'
                      ? 'text-[#5ac1a7] hover:text-gray-900'
                      : 'text-gray-900 hover:bg-[#5ac1a7]'
                  }`}
                  aria-current={
                    router.pathname === '/' ? 'page' : undefined
                  }
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href='/cabsbooking'
                  className={`block rounded px-3 py-2 font-extrabold ${
                    router.pathname === '/cabsbooking'
                      ? 'text-[#5ac1a7] hover:text-gray-900'
                      : 'text-gray-900 hover:bg-[#5ac1a7]'
                  }`}
                  aria-current={
                    router.pathname === '/cabsbooking' ? 'page' : undefined
                  }
                >
                  {t.cabsBooking}
                </Link>
              </li>
              <li>
                <Link
                  href='/aboutus'
                  className={`block rounded px-3 py-2 font-extrabold ${
                    router.pathname === '/aboutus'
                      ? 'text-[#5ac1a7] hover:text-gray-900'
                      : 'text-gray-900 hover:bg-[#5ac1a7]'
                  }`}
                  aria-current={
                    router.pathname === '/aboutus' ? 'page' : undefined
                  }
                >
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href='/contactus'
                  className={`block rounded px-3 py-2 font-extrabold ${
                    router.pathname === '/contactus'
                      ? 'text-[#5ac1a7] hover:text-gray-900'
                      : 'text-gray-900 hover:bg-[#5ac1a7]'
                  }`}
                  aria-current={
                    router.pathname === '/contactus' ? 'page' : undefined
                  }
                >
                  {t.contactUs}
                </Link>
              </li>
              <li>
              {email && (
              <div className='flex relative ml-3'>
                <div className='relative'>
                  <button
                    type='button'
                    onClick={(event) =>
                      handleToggleDropdownMenu('StaticDropdown', event)
                    }
                    className='flex bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    <span className='sr-only'>Open Static Dropdown menu</span>
                    <img
                      className='h-8 w-8'
                      src='https://localhost:7160/Image/mine234629318.jpg'
                      alt='Static Dropdown'
                    />
                  </button>
                  {openDropdownMenu === 'StaticDropdown' && (
                    <div className='absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div
                        className='text-md block px-4 py-2 text-sm font-bold text-gray-700'
                        role='menuitem'
                        id='user-menu-item-0'
                      >
                        {email}
                      </div>
                      <a
                        href='/static-item-1'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.yourProfile}
                      </a>
                      <a
                        href='/static-item-2'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.settings}
                      </a>
                      <a
                        href='/logout'
                        className='block px-4 py-2 text-sm text-gray-700'
                      >
                        {t.signOut}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
              </li>
            </ul>
            {/* {nestedMenuItems.map((menuItem) => (
              <div key={menuItem.name} className='relative ml-3'>
                {menuItem.subItems ? (
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={(event) =>
                        handleToggleDropdownMenu(menuItem.name, event)
                      }
                      className='flex rounded-xl bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    >
                      <span className='sr-only'>{`Open ${menuItem.name} menu`}</span>
                      <span className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'>
                        {menuItem.name}
                      </span>
                    </button>
                    {openDropdownMenu === menuItem.name && (
                      <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {menuItem.subItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className='block px-4 py-2 text-sm text-gray-700'
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={menuItem.href}
                    className={classNames(
                      'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    {menuItem.name}
                  </a>
                )}
              </div>
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
