import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { auth } from "../../firebase.js"
import { signOut } from 'firebase/auth';
import { Bars3Icon } from '@heroicons/react/24/outline' // 1. Import Bars3Icon
import { useContext } from 'react'; // 2. Import useContext
import { SideMenuContext } from './Context/SideMenuContext.jsx'; // 3. Import Context

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ user, setUser }) {
    
    // 4. Get the toggle function from context
    const { isOpen, setIsOpen } = useContext(SideMenuContext);

	const userName = user ? user.displayName : "Profile";

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

  return (
    <Disclosure
      as="nav"
	  style={{backgroundColor : "#121212"}}
      className="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* --- 5. Add This Section Back --- */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)} // 6. Add onClick to toggle state
              className="relative rounded-full p-2 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          {/* --- End of Added Section --- */}
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
			<p className="text-white">{userName}</p>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={user?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib-rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {/* <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                  >
                    Your profile
                  </a>
                </M-enuItem> */}
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}