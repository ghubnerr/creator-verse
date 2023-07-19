import { useState } from 'react';
import { supabase } from '../../client.js';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function AddCreator( {setCreators }){

    const [insertError, setInsertError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        imageURL: ''
    })
    const navigate = useNavigate(); // Get the navigate function

    const handleFormSubmit = async (element) => {
        element.preventDefault()

        const {data, error} = await supabase.from('creators').insert([formData]).select();

        if (error) {
            alert('Error inserting data')
            setInsertError('Error inserting data')

        } else {
            setInsertError(null)
            setCreators((prevCreators) => [...prevCreators, formData]);

            navigate('/show-creators');
        }
    };

    const handleInputChange = (element) => {
        const { name, value } = element.target
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    return(
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-b from-slate-900 to-gray-900">
                <div className='mt-10 sm:mx-auto sm:w-full lg:max-w-lg md:max-w-md sm:max-w-sm bg-white px-14 py-14 rounded-lg'>
                    <div className='flex justify-center'>
                        <h1 id='add' className='mb-9 text-4xl font-bold'>Add a Creator</h1>
                    </div>
                    <form className='bg-white' onSubmit={handleFormSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Creator Info</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Please provide the new creator's information.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-full">
                                <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-2">
                                    <input type="text" name="name" id="name" autocomplete="off" onChange={handleInputChange} value={formData.name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g.: Ed Sheeran" />
                                </div>
                                </div>

                                <div className="col-span-full">
                                <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div className="mt-2">
                                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write or paste a few sentences about them.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="sm:col-span-full">
                                <label for="url" className="block text-sm font-medium leading-6 text-gray-900">Main Social Media URL</label>
                                <div className="mt-2">
                                    <input type="text" onChange={handleInputChange} value={formData.url} name="url" id="url" autocomplete="off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g.: Youtube Channel, Instagram Page, etc." />
                                </div>
                                </div>
                        <br/>
                        <div className="sm:col-span-full">
                        <label for="imageURL" className="block text-sm font-medium leading-6 text-gray-900">Creator's Image URL</label>
                        <div className="mt-2">
                            <input type="text" name="imageURL" id="imageURL" autocomplete="off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.imageURL} onChange={handleInputChange} placeholder="e.g.: Google Images Image Address" />
                        </div>
                        </div>

                        <div className="mt-12 flex items-center justify-end gap-x-6">
                            <button type="submit" className="w-full rounded-md bg-orange-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit to Creatorverse</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}