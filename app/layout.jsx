import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Prompty',
    description: 'Discover and share AI prompts',
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>            
            <head>
                <link rel="icon" href="/assets/images/logo.svg" />
            </head>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout