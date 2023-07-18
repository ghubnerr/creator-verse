import React from 'react';
import { useParams } from 'react-router-dom';
import { redirect } from 'react-router-dom'; 

export default function EditCreator({creators}){

    const { id } = useParams();
    const creator = creators.filter(creator => creator.id == id)
    if (creator) {
        creator = creator[0]
        return(
            <div className='bg-gradient-to-b from-slate-900 to-slate-700'>
                
            </div>
        )
    } else {
        redirect('/add-creator');
    }

}