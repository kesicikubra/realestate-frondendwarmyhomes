import Spacer from '@/components/common/misc/spacer'
import PageHeader from '@/components/common/page-header'
import MyFavoriteAdvertsList from '@/components/my-favorites/my-favorites-list';
import { getAllFavoriteAdvertsFromAuth } from '@/services/favorites-service';
import React from 'react'

const MyFavoritesPage = async () => {

  const res = await getAllFavoriteAdvertsFromAuth();
  const data = await res.json();
  

  return (
    <div className='container'>
        <PageHeader title="My Favorites"/>
        <Spacer/>
        <MyFavoriteAdvertsList data={data} />
        <Spacer/>
    </div>
  )
}

export default MyFavoritesPage