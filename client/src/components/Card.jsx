import React from 'react'


export default function Card({name, image, types, id}){

        return (
            <div>
                <h2>ID: {id}</h2>
                <img src={image ? image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.salonlfc.com%2Fen%2Fimage-not-found%2F&psig=AOvVaw1ELS5Arbap6rkyyMNhFGgX&ust=1667664628981000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIjRxYD1lPsCFQAAAAAdAAAAABAE"}  alt="img not found" width="200px" height="250vh"/>
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <div>
                    {
                        types?.map((e, d) =>{
                            return (
                                <div>
                                    <img src={e.img} alt="" />
                                    <p>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
}