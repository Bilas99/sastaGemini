import React from 'react';
import loading from '../../assets/images/loading-dot-5250537-4380086.gif'

export default function Spinner(){
    return (
        <>
            <div>
                <img src={loading} alt='loading' 
                style={{width: '45px', height: '25px'}}
                />
            </div>
        </>
    );
}
