"use client"
import DataTable, { Column } from "@/components/common/data-table/data-table";
import "./style.scss";
import AddNewCategoryButton from "./new-categories-button";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import CategorySearchBar from "./category-searchbar";
import CategoriesToolbar from "./category-toolbar";
import { faBuilding, faBuildingWheat, faCity, faHome, faHotel, faHouseChimneyWindow, faStore, faTractor, faWarehouse, faHouseLaptop, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoriesList =  ({ data }) => {

  const {totalPages, size, number} = data.object

  const handleToolbar = (row) => {
    return <CategoriesToolbar row={row} />;
  };

  const handleActive = (row) => { 
    const { isActive } = row
    return isActive == true ? <FaCheck /> : <ImCross />
   }

   const handleIcon = (row) => { 
    const mapIconToFontAwesome  = {
      "faWarehouse": faWarehouse,
      "faHome": faHome,
      "faTractor": faTractor,
      "faHotel" : faHotel,
      "faStore": faStore,
      "faBuildingWheat": faBuildingWheat,
      "faBuilding": faBuilding,
      "faCity": faCity,
      "faHouseChimneyWindow": faHouseChimneyWindow,
      "faHouseLaptop":faHouseLaptop,
      "faImage":faImage
    };
    const selectedIcon = mapIconToFontAwesome[row.icon] || null;
    return  <span className="d-flex alig-items-center justify-content-center">{selectedIcon && <FontAwesomeIcon icon={selectedIcon} size="xl"/>}</span> 
    }


  return (
    <>
      <div className="container d-flex gap-3 w-75">
        <CategorySearchBar/>
        <AddNewCategoryButton />
      </div>
      <div className="container category-table">
        <DataTable 
            dataSource={data.object.content} 
            dataKey="id"
            pagination={true}
				    totalPages={totalPages}
				    pageNumber={number}
				    pageSize={size}>
          <Column title="Icon" template={handleIcon} />
          <Column title="Name" fields="title" />
          <Column title="Sequence" fields="seq" />
          <Column title="Active" template={handleActive} />
          <Column title="Action" template={handleToolbar} />
        </DataTable>
      </div>
    </>
  );
};

export default CategoriesList;