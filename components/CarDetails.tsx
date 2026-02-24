"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>

      <Dialog as="div" className="relative z-50" onClose={closeModal}>

        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30"/>
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >

            <Dialog.Panel className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 p-2 bg-primary-blue-100 rounded-full"
                onClick={closeModal}
              >
                <Image src="/close.svg" alt="close" width={20} height={20}/>
              </button>

              {/* Main Image */}
              <div className="relative w-full h-40 bg-pattern bg-cover rounded-lg">
                <Image
                  src={generateCarImageUrl(car)}
                  alt="car"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Car Details */}
              <h2 className="text-xl font-semibold capitalize mt-4">
                {car.make} {car.model}
              </h2>

              <div className="mt-3 space-y-2">
                {Object.entries(car).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500 capitalize">
                      {key.replace("_", " ")}
                    </span>
                    <span className="font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

            </Dialog.Panel>

          </Transition.Child>

        </div>

      </Dialog>

    </Transition>
  );
};

export default CarDetails;