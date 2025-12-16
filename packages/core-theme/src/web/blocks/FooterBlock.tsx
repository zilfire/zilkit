import { Container } from '../components/Container.js';
import gridBG from '../../assets/gridBG.js';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import Image from '../components/Image.js';

import NextLink from 'next/link';

type FooterProps = {
  footerLogo?: SanityImageWithAlt;
  // footerPosts?: FooterPosts[];
};

// const cleanPhoneNumber = (phoneNumber: string) => {
//   return phoneNumber.replace(/\D/g, '');
// };

export const Footer: React.FC<FooterProps> = ({ footerLogo }) => {
  // const phoneNumber = '704-512-0125';
  // const address = {
  //   streetAddressOne: '525 North Tryon St., Suite 1600',
  //   city: 'Charlotte',
  //   state: 'NC',
  //   zip: '28202',
  // };
  // const name = 'Zilfire';
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer
      className="bg-gray-800 w-full"
      style={{
        backgroundImage: gridBG,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px auto',
      }}
    >
      <div className="bg-gray-800/90 py-16 text-left text-white">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                  {footerLogo && (
                    <div className="mx-0 mb-0 w-36 max-w-full">
                      <NextLink href="/">
                        <Image
                          imageObject={footerLogo}
                          alt={footerLogo.alt}
                          imageSizes={[200, 260, 400]}
                          priority={true}
                        />
                      </NextLink>
                    </div>
                  )}
                </div>
                <div className=" w-full text-center md:w-1/2 md:text-left">
                  <div className="mx-auto max-w-fit md:mx-0">
                    {/* <div className="mb-1 my-1 text-base font-medium text-yellow-500">{name}</div>
                    <div className="mb-1 my-1 text-sm font-normal">
                      <a href={`tel:${cleanPhoneNumber(phoneNumber)}`}>{phoneNumber}</a>
                    </div> */}
                    {/* <div className="mb-1 my-1 text-sm font-normal">
                      {address.streetAddressOne}{' '}
                      {address.streetAddressTwo && (
                        <>
                          <br />
                          {address.streetAddressTwo}
                        </>
                      )}
                      {(address.city || address.state || address.zip) && (
                        <>
                          <br />
                          {address.city}, {address.state} {address.zip}
                        </>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap sm:w-1/2">
              <div className=" w-full md:w-1/2 xl:w-1/2">
                {/* <div className="mb-1 text-center text-lg font-medium text-yellow-500 md:text-left">
                  About Us
                </div>
                <Link
                  className="mb-1 block text-center text-sm text-white hover:text-yellow-100 md:text-left"
                  href="/#why-us"
                >
                  Why certiblog
                </Link>
                <Link
                  className="mb-1 block text-center text-sm text-white hover:text-yellow-100 md:text-left"
                  href="/#services"
                >
                  Services
                </Link>
                <Link
                  className="mb-1 block text-center text-sm text-white hover:text-yellow-100 md:text-left"
                  href="/contact-us"
                >
                  Contact Us
                </Link> */}
              </div>
              <div className="my-6 w-full sm:1/2 flex md:justify-end">
                <div className="text-sm md:text-left">
                  <span className="pr-2">Copyright &copy; {year} Zilfire, LLC</span>|
                  <span className="pl-2">
                    Website by{' '}
                    <a
                      href="https://www.zilfire.com"
                      target="_blank"
                      className="text-white hover:text-yellow-100"
                      rel="nofollow"
                    >
                      Zilfire
                    </a>
                  </span>
                </div>
                {/* <div className="mb-1 text-center font-medium text-yellow-500 md:text-left md:text-lg">
                  Recent Posts
                </div>
                {footerPosts?.map((post, index) => (
                  <div key={index} className="mb-1">
                    <Link
                      className="block text-center text-sm text-white hover:text-yellow-100 md:text-left"
                      reference={post._id}
                    >
                      {post.heading}
                    </Link>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
