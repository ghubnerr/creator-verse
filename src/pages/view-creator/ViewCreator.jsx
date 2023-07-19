import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { redirect } from 'react-router-dom'; 


export default function ViewCreator({ creators }){

    const { id } = useParams();

    let creator = creators.filter(creator => creator.id == id)

    if (creator.length === 0) {
        redirect('/');
    } else {
        creator = creator[0]
        return(
            <div>
                <section className="bg-gradient-to-b from-slate-900 to-slate-700">
                    <div className="px-6 py-12 text-center md:px-12 lg:text-left">
                    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
                        <div className="grid items-center lg:grid-cols-2">
                        <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                            <div
                            className="block rounded-lg bg-gray-300 px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 lg:-mr-14 backdrop-blur-[30px]">
                            <a href={creator.url}>
                            <h1 id="hero" className="mt-2 mb-9 text-8xl text-gray-900 font-bold tracking-tight md:text-7xl xl:text-9xl underline decoration-2 underline-offset-4">
                                {creator.name}
                            </h1>
                            </a>
                            <h2 className="mb-8 mr-12">{creator.description}</h2>
                            <Link className="mb-2 inline-block rounded bg-orange-700 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#ffffff] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] md:mr-2 md:mb-0"
                                data-te-ripple-init data-te-ripple-color="light" to={"/edit-creator/" + creator.id + "#edit"} role="button">Edit</Link>
                            </div>
                        </div>
                        <div className="md:mb-12 lg:mb-0">
                            <a key={creator.id} href={creator.url}>
                            <img src={creator.imageURL}
                            className="w-full rounded-lg shadow-lg" alt="" />
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                
            </div>
        )
    }

}