import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client.js';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function EditCreator({creators, setCreators}){
    const navigate = useNavigate();
    const { id } = useParams();
    let creator = creators.filter(creator => creator.id == id)

    if (creator) {
        creator = creator[0]
        const [formData, setFormData] = useState(creator);
        const [error, setError] = useState(null); 
        const [modal, setModal] = useState(false)
        const cancelButtonRef = useRef(null)

        const handleFormSubmit = async (element) => {
            element.preventDefault();

            const { data, error } = await supabase.from('creators').update({name: formData.name, description: formData.description, url: formData.url, imageURL: formData.imageURL}).eq('id', id).select();   

            if (error) {
                alert('Error updating data')
                setError('Error updating data')

            } else {
                setError(null)
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

        const handleDeleteAttempt = () => {
            setModal(true)
        }

        const handleDelete = async () => {
            setModal(false)

            const { error } = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

            if (error) {
                alert('Error deleting data')
                setError('Error deleting data')
            } else {
                setError(null)
                setCreators((prevCreators) => {
                    const updatedCreators = prevCreators.filter((prevCreator) => prevCreator.id !== formData.id);
                    
                    return updatedCreators;
                    });

                navigate('/show-creators')
            }
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
                            <button type="button" className="w-full rounded-md bg-orange-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " onClick={handleDeleteAttempt}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
            <Transition.Root show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
                    <Transition.Child as={Fragment} 
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <img src='https://static.vecteezy.com/system/resources/previews/017/172/379/original/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-triangle-png.png' className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Delete Creator from Creatorverse?
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this creator's record from your Creatorverse? This action cannot be undone.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setModal(false)}
                                ref={cancelButtonRef}
                            >
                                Cancel
                            </button>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
                </Transition.Root>
            </div>
                
        )
    } else {
        navigate('/add-creator')
    }

}