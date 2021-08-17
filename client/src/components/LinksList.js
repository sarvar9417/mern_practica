import React from 'react';
import {Link} from "react-router-dom";

function LinksList({links}) {
    if (!links.length){
        return <p>Hozircha linklar mavjud emas</p>
    }
    return (
        <div className='highlight'>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Link</th>
                    <th>Short Link</th>
                    <th>Kirish</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/details/${link._id}`}>GoTo link</Link>
                            </td>
                        </tr>)
                })}

                </tbody>
            </table>
        </div>
    );
}

export default LinksList;