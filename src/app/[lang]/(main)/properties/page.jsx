import Spacer from "@/components/common/misc/spacer";
import PageHeader from "@/components/common/page-header";
import SearchAdvertForm from "@/components/properties/search-advert";
import SearchSlider from "@/components/properties/search-slider";
import { getDictionary } from "@/dictionaries/dictionaries";
import { getAdvertsByCity, getAllAdvert } from "@/services/advert-service";
import { getAllAdvertTypes } from "@/services/advert-type-service";
import { getAllCategoriesWithoutPageForAnonymous } from "@/services/categories-service";
import React from "react";

const PropertiesPage = async ({ searchParams, params }) => {
  const { q, advert_type_id, category_id, price_start, price_end, city_id } =
    searchParams;

  const allAdvertsRes = (await getAllAdvert(
    q,
    category_id,
    advert_type_id,
    price_start,
    price_end,
    city_id
  )).json();
  const advertTypeRes = (await getAllAdvertTypes("")).json();
  const advertsByCityRes = (await getAdvertsByCity()).json();
  const categoryNamesRes = (
    await getAllCategoriesWithoutPageForAnonymous("")
  ).json();

  const [allAdverts, advertTypeData, categoryNamesData, advertsCityData] =
    await Promise.all([allAdvertsRes, advertTypeRes, categoryNamesRes, advertsByCityRes]);
const t=await getDictionary(params.lang)
  return (
    <div className="container">
      <PageHeader title="Properties" />
      <Spacer height={30} />
      <div className="row g-4">
        <SearchAdvertForm
        t={t}
          searchParams={searchParams}
          advertTypeData={advertTypeData.object}
          categoryNamesData={categoryNamesData.object}
          advertsCityData={advertsCityData.object}
        />
        <SearchSlider allAdverts={allAdverts.object} />
      </div>
      <Spacer />
    </div>
  );
};

export default PropertiesPage;
