"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Nav = () => {
    const { data: session } = useSession();
    console.log("user session : ", session);
    const router = useRouter();
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders(``)
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex items-center flex-center gap-2'>
                <Image
                    src='/assets/images/logo.svg'
                    width={30}
                    height={30}
                    className='object-contain'
                    alt='prompty logo'
                />
                <p className='logo_text'>Prompty</p>
            </Link>

            {/* Desktop nav */}
            <div className='sm:flex hidden'>
                {
                    session?.user
                        ? (
                            <div className='flex gap-3 md:gap-5'>
                                <Link href="/create-prompt" className='black_btn'>Create Post</Link>
                                <button type='button' onClick={signOut} className='outline_btn'>
                                    Sign Out
                                </button>

                                <Link href="/profile">
                                    <Image
                                        src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile'
                                    />
                                </Link>
                            </div>
                        )
                        : (
                            <>
                                {
                                    providers && Object.values(providers).map((provider) => (
                                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                                            className='black_btn'
                                        >
                                            Sign In
                                        </button>
                                    ))
                                }
                            </>
                        )
                }
            </div>

            {/* mobile navigation */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div className='flex'>
                            <Image
                                src={session?.user?.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                                onClick={() => setToggleDropDown(prev => !prev)}
                            />

                            {
                                toggleDropDown && (
                                    <div className='dropdown'>
                                        <Link
                                            className='dropdown_link'
                                            href={"/profile"}
                                            onClick={() => setToggleDropDown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            className='dropdown_link'
                                            href={"/create-prompt"}
                                            onClick={() => setToggleDropDown(false)}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button type='button' onClick={() => {
                                            setToggleDropDown(false)
                                            signOut();
                                            router.push("/")
                                        }}
                                            className='mt-5 w-full black_btn'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )
                }
            </div>

        </nav>
    )
}

export default Nav