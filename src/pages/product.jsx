import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

function Product() {
    return (
        <>
            <Header />
            <main>
                <div className="flex items-center w-full h-screen p-11">
                    <div className="basis-1/3 flex flex-col items-center justify-center">div</div>
                    <div className="basis-2/3 w-full h-full bg bg-red-100"></div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Product;
