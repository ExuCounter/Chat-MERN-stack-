import React from 'react';

export const AuthNavigation = (props) => {
    let id = 0;
    const list = []
    for(let link in props.links){
        list.push(<a href={'/'+link} key={id}>{props.links[link]}</a>)
        id++;
    }
    return(
        <div className='auth-navigation'>
            {list}
        </div>
    )
}