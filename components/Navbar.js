import { useContext } from 'react';
import Image from 'next/image';

import router from 'next/router';
import { Context } from '../context/AuthContext';

export default function Navbar() {
  const { state } = useContext(Context);

  const imageClick = () => {
    window.location.href = '/dashboard';
  };
  const logout = () => {
    localStorage.removeItem("auth-token");
  }
  return (
    <body>
      <header>
        <nav
          className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
        >
          <div className="flex items-left justify-left ">
            <Image
              src="/selogo.jpeg"
              alt="logo"
              width={150}
              height={100}
              onClick={imageClick}
              className="cursor-pointer"
            />
          </div>
          <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
            <ul
              className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0
              px-10"
            >
              {state.user ? (
                <>
                  {/* <li>
                    <a className="md:p-4 py-2 block hover:text-purple-400" href="#">
                      SaaS Pages{' '}
                    </a>
                  </li> */}

                  {/* <li>
                    <a className="md:p-4 py-2 block hover:text-purple-400" href="#">
                      Request Examples
                    </a>
                  </li> */}
                  <li>
                    <a
                      className="md:p-4 py-2 block hover:text-purple-400"
                      href="/saved"
                      onClick={() => {
                        router.push("/saved")
                      }}
                    >
                      Saved
                    </a>
                  </li>
                  <li>
                    <a
                      className="md:p-4 py-2 block hover:text-purple-400 cursor-pointer"
                      onClick={() => {
                        logout();
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/" passHref className="md:p-4 py-2 block hover:text-purple-400"></a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </body>
  );
}
