"use client"
import { deleteAdminAdvertListAction } from '@/actions/advert-action';
import { swalConfirm } from '@/helpers/swal';
import React from 'react'
import { GoTrash } from 'react-icons/go';

const DashboardEditAdvertTourRequestsToolbar = () => {

    const handleDelete = async () => {
        const res = await swalConfirm("Are you sure to delete");
        if (!res.isConfirmed) return;
    
        try {
          const res = await deleteAdminAdvertListAction(id);
        } catch (err) {
          console.log(err);
          swalAlert(err.message, "error");
        }
      };
    
      // if (built_in) return null;

  return (
    <button type="button" className="btn btn-link" onClick={handleDelete}>
        <GoTrash size={25} />
      </button>
  )
}

export default DashboardEditAdvertTourRequestsToolbar