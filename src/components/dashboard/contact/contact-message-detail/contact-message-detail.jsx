import React from 'react'
import "./style.scss"
import DeleteButton from './delete-btn';
import ReturnButton from '@/components/common/buttons/return-button';

const ContactMessageDetail = async ({data}) => {   
    
    const { id, firstName, lastName, email, message} = data.object;

  return (
    <div className='message-detail'>
        <div className='message-detail-box'>
            <span className='detail-key'>Name</span>
            <span className='detail-value'>{firstName} {lastName}</span>
        </div>
        <div className='message-detail-box'>
            <span className='detail-key'>Email</span>
            <span className='detail-value'>{email}</span>
        </div>
        <div className='message-detail-box'>
            <span className='detail-key'>Message</span>
            <span className='detail-value'>{message}</span>
        </div>
        <div className='buttons'>
            <ReturnButton path="/dashboard/contact-messages"/>
            <DeleteButton id={id}/>
        </div>
    </div>
  )
}

export default ContactMessageDetail