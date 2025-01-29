"use client";

import { deleteAdminAdvertListAction } from "@/actions/advert-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { BiPencil } from "react-icons/bi";
import { GoTrash } from "react-icons/go";

const AdminAdvertToolbar = ({ row }) => {
  const { id, slug } = row;

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
    <div>
      <Link
        type="button"
        className="btn btn-link"
        href={`/dashboard/adverts/${slug}?id=${id}`}
      >
        <BiPencil size={25} />
      </Link>

      <button type="button" className="btn btn-link" onClick={handleDelete}>
        <GoTrash size={25} />
      </button>
    </div>
  );
};

export default AdminAdvertToolbar;
