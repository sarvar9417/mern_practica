import React from 'react';

function LinkCard({link}) {
    return (
        <div>
            <h2>Links</h2>
            <p>Sizning linkingiz: <a href={link.to} target='_blank' rel='noreferrer noopener'>{link.to}</a> </p>
            <p>Qayerdan: <a href={link.from} target='_blank' rel='noreferrer noopener'>{link.from}</a></p>
            <p>Clicks: <b>{link.clicks}</b></p>
            <p>Yaratilgan vaqti: <b>{new Date(link.date).toLocaleDateString()} {new Date(link.date).toLocaleTimeString()}</b></p>
        </div>
    );
}

export default LinkCard;