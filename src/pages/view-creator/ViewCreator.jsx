import React from 'react';
import { useParams } from 'react-router-dom';

export default function ViewCreator({ creators }){

    const { id } = useParams();
    const creator = creators.filter(creator => creator.id == id)

    if (creator.length === 0) {
        return (
            <div>
                
            </div>
        )
    } else {
        return(
            <div>
                
            </div>
        )
    }

}