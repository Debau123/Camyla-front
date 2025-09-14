"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const handleWhatsApp = () => {
    // Mensaje predefinido para WhatsApp
    const message = encodeURIComponent("¡Hola! Me interesa hacer un pedido de bordado personalizado. ¿Podrían ayudarme?");
    const phoneNumber = "34600000000"; // Cambia por tu número real
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Consulta sobre pedido personalizado");
    const body = encodeURIComponent("Hola,\n\nMe interesa hacer un pedido personalizado. ¿Podrían proporcionarme más información?\n\nGracias!");
    const emailUrl = `mailto:omlasoporte@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    ¿Cómo hacer tu pedido?
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-6">
                    Para realizar tu pedido personalizado, puedes contactarnos a través de cualquiera de estos medios:
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      Contactar por WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={handleEmail}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      Enviar email
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                      Email: omlasoporte@gmail.com
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
