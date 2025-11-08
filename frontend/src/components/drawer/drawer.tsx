import React, { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

export interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  setIsOpen,
  title,
}) => {
  const hangleCloseModal = () => setIsOpen(false);
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 transition-opacity duration-300 ${
          isOpen ? "opacity-80 visible" : "opacity-0 invisible"
        }`}
        onClick={hangleCloseModal}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex items-center justify-between'>
          {title ? (
            <header className='p-4 font-bold text-lg'>{title}</header>
          ) : (
            <></>
          )}

          <button
            className='p-4 ml-auto  hover:text-gray-500 text-black text-xl'
            onClick={hangleCloseModal}
          >
            <MdClose />
          </button>
        </div>

        <div className='p-4 overflow-y-auto h-[calc(100%-4rem)]'>
          {children}
        </div>
      </aside>
    </>
  );
};
