import Spacer from "@/components/common/misc/spacer";
import ExploreByCities from "@/components/home/explore/explore-byCities";
import ExploreByTypes from "@/components/home/explore/explore-byTypes";
import HelpSection from "@/components/home/help";
import PropertiesSection from "@/components/home/properties";
import RegisterSection from "@/components/home/register-section";
import SellingSection from "@/components/home/selling-section";
import Slider from "@/components/home/slider";
import { getDictionary } from "@/dictionaries/dictionaries";
import { getAdvertsByCategories, getAdvertsByCity, getAdvertsByPopularWithAmount } from "@/services/advert-service";
import { getAllAdvertTypes } from "@/services/advert-type-service";
import { getAllCategoriesWithoutPageForAnonymous } from "@/services/categories-service";
import dynamic from "next/dynamic";

const PrivacyPolicy = dynamic(() => import('@/components/common/misc/privacy-policy/privacy-policy.jsx'), {
  ssr: false
})

export default async function Home({searchParams, params}) { 
  const t=await getDictionary(params.lang)
  
  let {qs} = searchParams
  if(qs === undefined) qs = "";

  const cityRes = (await getAdvertsByCity()).json();
  const categoryRes = (await getAdvertsByCategories()).json();
  const advertTypeRes = (await getAllAdvertTypes(qs)).json();
  const categoryNamesRes = (await getAllCategoriesWithoutPageForAnonymous(qs)).json();
  const popularRes = (await getAdvertsByPopularWithAmount(12)).json() 

  const [cityData, categoryData, advertTypeData, categoryNamesData, popularData] = await Promise.all([cityRes, categoryRes, advertTypeRes, categoryNamesRes, popularRes]);
  return (
    <main className="container">
      <Slider advertTypeData={advertTypeData.object} categoryNamesData={categoryNamesData.object} t={t}/>
      <Spacer/>
      <ExploreByTypes categoryData={categoryData.object} />
      <Spacer/>
      <ExploreByCities cityData={cityData.object}/>
      <Spacer/>
      <RegisterSection params={params}/>
      <Spacer/>
      <PropertiesSection popularData={popularData.object} />
      <Spacer/>
      <SellingSection params={params}/>
      <Spacer/>
      <HelpSection params={params}/>
      <Spacer/>
      <PrivacyPolicy/>
    </main>
  );
}
