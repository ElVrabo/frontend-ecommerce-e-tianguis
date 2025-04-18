import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { userContext } from '../../../context/userContext/userContext';
import { Menu, Transition } from '@headlessui/react';
import { 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiUserPlus
} from 'react-icons/fi';

export default function AccountMenu() {
  const { logout, userData } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="
          flex items-center justify-center
          rounded-full
          focus:outline-none
          focus:ring-2
          focus:ring-primary-blue
          focus:ring-offset-2
          text-gray-600 hover:text-primary-blue
          transition-colors
        ">
          <FiUser className="w-6 h-6" /> {/* Icono de usuario */}
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="
          absolute right-0 mt-2 w-56
          origin-top-right
          divide-y divide-gray-100
          rounded-md
          bg-white
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          z-50
        ">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/menuProfile')}
                  className={`${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FiUser className="mr-2 h-5 w-5" />
                  Perfil
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/profile')}
                  className={`${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FiUser className="mr-2 h-5 w-5" />
                  Mi cuenta
                </button>
              )}
            </Menu.Item>
          </div>
          
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/selectAccount')}
                  className={`${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FiUserPlus className="mr-2 h-5 w-5" />
                  Añadir otra cuenta
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FiSettings className="mr-2 h-5 w-5" />
                  Configuraciones
                </button>
              )}
            </Menu.Item>
          </div>
          
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-primary-blue text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <FiLogOut className="mr-2 h-5 w-5" />
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}