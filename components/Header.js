import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useState } from "react";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="shadow-sm sticky bg-white z-50 border-b">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:block w-24">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
        {/*Search Bar*/}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pointer-events-none flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500"></SearchIcon>
            </div>
            <input
              className="bg-gray-50 pl-10 block w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            ></input>
          </div>
        </div>
        {/* Right Part */}
        <div className="flex items-center space-x-4 justify-end">
          <HomeIcon
            onClick={() => router.push("/")}
            className="navBtn"
          ></HomeIcon>
          <MenuIcon
            onClick={() => setIsHidden(!isHidden)}
            className="h-6 md:hidden cursor-pointer"
          ></MenuIcon>
          {session ? (
            <>
              <div className="relative">
                <PaperAirplaneIcon className="navBtn rotate-45"></PaperAirplaneIcon>
                <div className="absolute -top-1 -right-2 text-xs bg-red-500 h-5 w-5 flex justify-center items-center rounded-full animate-pulse text-white cursor-pointer">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              ></PlusCircleIcon>
              <UserGroupIcon className="navBtn"></UserGroupIcon>
              <HeartIcon className="navBtn"></HeartIcon>
              <img
                onClick={signOut}
                className="h-10 cursor-pointer rounded-full"
                src={session.user.image}
                alt=""
              ></img>
            </>
          ) : (
            <button
              className="text-xs font-semibold md:text-xl"
              onClick={(e) => {
                e.preventDefault();
                router.push("/auth/signin");
                // window.location.assign("http://localhost:3000/auth/signin");
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      <div
        className={
          "mx-20 flex justify-end md:hidden mb-4" + (isHidden ? " hidden" : "")
        }
      >
        <ul>
          <li
            onClick={() => router.push("/")}
            className="flex items-center justify-end space-x-1 cursor-pointer"
          >
            <p className="font-semibold">Home</p>
            <HomeIcon className="h-7" />
          </li>
          {session && (
            <li
              onClick={() => setOpen(true)}
              className="flex items-center justify-end space-x-1 cursor-pointer"
            >
              <p className="font-semibold">Upload post</p>
              <PlusCircleIcon className="h-7" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
