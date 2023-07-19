    import React from 'react';
    import { useState } from 'react';
    import { useParams } from "react-router-dom";
    import { useNavigate } from 'react-router-dom';
    import { supabase } from '../../client.js';

    export default function EditCreator({creators, setCreators}){
        const navigate = useNavigate();
        const { id } = useParams();
        let creator = creators.filter(creator => creator.id == id)

        if (creator) {
            creator = creator[0]
            const [formData, setFormData] = useState(creator);
            const [updateError, setUpdateError] = useState(null); 
            const [modalDisplay, setModalDisplay] = useState('none')

            const handleFormSubmit = async (element) => {
                element.preventDefault();

                const { data, error } = await supabase.from('creators').update({name: formData.name, description: formData.description, url: formData.url, imageURL: formData.imageURL}).eq('id', id).select();   

                if (error) {
                    alert('Error updating data')
                    setUpdateError('Error updating data')

                } else {
                    setUpdateError(null)
                    setCreators((prevCreators) => {
                        const updatedCreators = prevCreators.filter((prevCreator) => prevCreator.id !== formData.id);

                        updatedCreators.push(formData)
                        
                        return updatedCreators;
                      });

                    navigate('/show-creators');
                }
            }

            const handleInputChange = (element) => {
                const { name, value } = element.target;
                setFormData((prevData) => ({ ...prevData, [name]: value }));
                };

            const handleDelete = async (element) => {
                alert('hello')

            }
            return(
                <div className='bg-gradient-to-b from-slate-900 to-slate-700'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-b from-slate-900 to-gray-900">
                    <div className='mt-10 sm:mx-auto sm:w-full lg:max-w-lg md:max-w-md sm:max-w-sm bg-white px-14 py-14 rounded-lg'>
                        <div className='flex justify-center'>
                            <h1 id="edit" className='mb-4 text-4xl font-bold'>{'Edit'}</h1>
                        </div>
                        <form className='bg-white' onSubmit={handleFormSubmit}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-full">
                                    <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                    <div className="mt-2">
                                        <input type="text" name="name" id="name" autocomplete="off" value={formData.name} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g.: Ed Sheeran" />
                                    </div>
                                    </div>

                                    <div className="col-span-full">
                                    <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" rows="3" onChange={handleInputChange} value={formData.description} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                    <label for="url" className="block text-sm font-medium leading-6 text-gray-900">Main Social Media URL</label>
                                    <div className="mt-2">
                                        <input type="text" name="url" id="url" autocomplete="off" onChange={handleInputChange} value={formData.url} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g.: Youtube Channel, Instagram Page, etc." />
                                    </div>
                                    </div>
                            <br/>
                            <div className="sm:col-span-full">
                            <label for="imageURL" className="block text-sm font-medium leading-6 text-gray-900">Creator's Image URL</label>
                            <div className="mt-2">
                                <input type="text" name="imageURL" id="imageURL" autocomplete="off" onChange={handleInputChange} value={formData.imageURL} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="e.g.: Google Images Image Address" />
                            </div>
                            </div>

                            <div className="mt-12 flex items-center justify-end gap-x-6">
                                <button type="submit" className="w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Submit Update</button>
                                <button type="button" className="w-full rounded-md bg-orange-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " onClick={handleDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                    
            )
        } else {
            navigate('/add-creator')
        }

    }