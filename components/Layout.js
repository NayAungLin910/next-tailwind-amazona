import { Store } from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

export default function Layout({ children, title }) {

    const { status, data: session } = useSession();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setcartItemsCount] = useState(0);

    useEffect(() => {
        setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems])

    const logoutClickHandler = () => {

        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET'});
        signOut({ callbackUrl: '/login' });
    };

    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer position='bottom-center' limit={1} />

            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className='flex h-12 justify-between shadow-md items-center px-4'>
                        <Link href="/" legacyBehavior>
                            <a className='text-lg font-bold'>
                                amazona
                            </a>
                        </Link>
                        <div>
                            <Link href="/cart" legacyBehavior>
                                <a className='p-2'>
                                    Cart {cartItemsCount > 0 && (
                                        <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </a>
                            </Link>
                            <Link href="/login" legacyBehavior>
                                {
                                    status === 'loading'
                                        ? 'Loading'
                                        : (session?.user
                                            ? (
                                                <Menu as="div" className="relative inline-block">
                                                    <Menu.Button className="text-blue-600">
                                                        {session.user.name}
                                                    </Menu.Button>
                                                    <Menu.Items className="absolute bg-white right-0 w-56 origin-top-right shadow-lg">
                                                        <Menu.Item>
                                                            <DropdownLink className="dropdown-link" href="/profile" alt="profile">
                                                                Profile
                                                            </DropdownLink>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <DropdownLink className="dropdown-link" href="/order-history" alt="order-history">
                                                                Order History
                                                            </DropdownLink>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <a className='dropdown-link' href='#' onClick={logoutClickHandler}>
                                                                Logout
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Menu>
                                            )
                                            : (
                                                <a className="p-2">Login</a>
                                            ))
                                }
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>

                <footer className='flex justify-center items-center h-10 shadow-inner'>
                    Copyright @ 2022 Amazona
                </footer>
            </div>

        </>
    )
}
