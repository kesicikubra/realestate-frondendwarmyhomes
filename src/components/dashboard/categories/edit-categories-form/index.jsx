"use client";
import "./style.scss";
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/actions/category-action";
import { useEffect, useRef, useState } from "react";
import {
  createCategoryPropertyAction,
  deleteCategoryPropertyAction,
  updateCategoryPropertyAction,
} from "@/actions/category-property-action";
import Spacer from "@/components/common/misc/spacer";
import { swalConfirm } from "@/helpers/swal";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBuildingWheat,
  faCity,
  faHome,
  faHotel,
  faHouseChimneyWindow,
  faStore,
  faTractor,
  faWarehouse,
  faImage,
  faHouseLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SubmitButton from "@/components/common/buttons/submit-button";
import CancelButton from "@/components/common/buttons/cancel-button";

const EditCategoryForm = ({ dataCategory, dataPropertyKey }) => {
  const { title, icon, seq, active, id } = dataCategory;

  const [categoryState, categoryDispatch] = useFormState(
    updateCategoryAction,
    initialResponse
  );
  const [propertyKeyState, propertyKeyDispatch] = useFormState(
    updateCategoryPropertyAction,
    initialResponse
  );

  const propertyKey = {
    id: propertyKeyState?.data?.id,
    name: propertyKeyState?.data?.name,
  };
  const [propertyKeyList, setPropertyKeyList] = useState([
    propertyKey == null ? "" : propertyKey,
  ]);

  const [propertyName, setPropertyName] = useState();
  const [propertyKeyType, setPropertyKeyType] = useState();
  const [propertyUnit, setPropertyUnit] = useState();
  const [propertyId, setPropertyId] = useState();

  useEffect(() => {
    if (propertyKeyState?.data) {
      setPropertyKeyList((prevList) => [
        ...prevList,
        {
          id: propertyKeyState.data.id,
          name: propertyKeyState.data.name,
        },
      ]);
    }
  }, [propertyKeyState]);

  const handlePropertyKeyDelete = async (id) => {
    const res = await swalConfirm("Are you sure to delete");
    if (!res.isConfirmed) return;

    try {
      const res = await deleteCategoryPropertyAction(id);
    } catch (err) {
      console.log(err);
      swalAlert(err.message, "error");
    }

    let filteredId = propertyKeyList.filter((item) => item.id != id);
    setPropertyKeyList(filteredId);
  };

  const handlePropertyKeyEdit = (propertyItem) => {
    let { categoryTitle, keyType, name, id: idProperty, unit } = propertyItem;
    setPropertyName(name);
    setPropertyKeyType(keyType);
    setPropertyUnit(unit);
    setPropertyId(idProperty);
  };

  const [iconData, setIconData] = useState(icon);
  const [showIconText, setShowIconText] = useState("Choose an Icon");

  const handleSelect = (e) => {
    setIconData(e.target.children[1].innerText);
    setShowIconText(e.target.innerText);
  };
  library.add(
    faWarehouse,
    faHome,
    faTractor,
    faHotel,
    faStore,
    faBuildingWheat,
    faBuilding,
    faCity,
    faImage,
    faHouseLaptop
  );

  const mapIconToFontAwesome = {
    faWarehouse: faWarehouse,
    faHome: faHome,
    faTractor: faTractor,
    faHotel: faHotel,
    faStore: faStore,
    faBuildingWheat: faBuildingWheat,
    faBuilding: faBuilding,
    faCity: faCity,
    faHouseChimneyWindow: faHouseChimneyWindow,
    faImage: faImage,
    faHouseLaptop: faHouseLaptop,
  };

  const iconText = {
    faWarehouse: "Warehouse",
    faHome: "Home",
    faTractor: "Farm",
    faHotel: "Apartment",
    faStore: "Store",
    faBuildingWheat: "Farm",
    faBuilding: "Apartment",
    faCity: "Residance",
    faHouseChimneyWindow: "Villa",
    faImage: "faImage",
    faHouseLaptop: "faHouseLaptop",
  };
  let selectedText = iconText[iconData];

  const selectedIcon = mapIconToFontAwesome[iconData] || null;

  return (
    <>
      {!categoryState?.success && categoryState.message ? (
        <div className="alert alert-danger">{categoryState.message}</div>
      ) : (
        ""
      )}
      <form className="edit-category-form" noValidate action={categoryDispatch}>
        <fieldset className="border rounded-4">
          <legend className="float-none w-auto px-3">Category Edit</legend>
          <input type="hidden" name="id" value={id} />
          <div className="container w-75">
            <div className="row">
              <div className="col-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className={`form-control rounded-3 ${isInvalid(
                      categoryState.errors?.title
                    )}`}
                    id="title"
                    name="title"
                    defaultValue={title}
                    aria-describedby="basic-addon3"
                  />
                  <div className="invalid-feedback">
                    {categoryState.errors?.title}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="icon" className="form-label">
                  Icon
                </label>
                <div className="input-group mb-4">
                  <input
                    className={`form-control ${isInvalid(
                      categoryState.errors?.icon
                    )}`}
                    type="hidden"
                    name="icon"
                    value={iconData}
                  />
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedIcon && (
                        <FontAwesomeIcon icon={selectedIcon} size="lg" />
                      )}{" "}
                      {selectedText}
                    </button>
                    <ul className="dropdown-menu">
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faHome} size="l" /> House
                        <span className="d-none">faHome</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faHouseChimneyWindow} size="l" />{" "}
                        Villa
                        <span className="d-none">faHouseChimneyWindow</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faBuilding} size="l" /> Apartment
                        <span className="d-none">faBuilding</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faCity} size="l" /> Residance
                        <span className="d-none">faCity</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faHotel} size="l" /> Apartment
                        <span className="d-none">faHotel</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faStore} size="l" /> Store
                        <span className="d-none">faStore</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faHouseLaptop} size="l" /> Office
                        <span className="d-none">faHouseLaptop</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faWarehouse} size="l" />{" "}
                        Warehouse
                        <span className="d-none">faWarehouse</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faBuildingWheat} size="l" /> Farm
                        <span className="d-none">faBuildingWheat</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faTractor} size="l" /> Farm
                        <span className="d-none">faTractor</span>
                      </li>
                      <li onClick={(e) => handleSelect(e)}>
                        <FontAwesomeIcon icon={faImage} size="l" /> Land
                        <span className="d-none">faImage</span>
                      </li>
                    </ul>
                  </div>
                  <div className="invalid-feedback">
                    {categoryState.errors?.icon}
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <label htmlFor="seq" className="form-label">
                  Sequence
                </label>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className={`form-control rounded-3 ${isInvalid(
                      categoryState.errors?.seq
                    )}`}
                    id="seq"
                    name="seq"
                    defaultValue={seq}
                    aria-describedby="basic-addon3"
                  />
                  <div className="invalid-feedback">
                    {categoryState.errors?.seq}
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <label htmlFor="isActive" className="form-label">
                  Status
                </label>
                <div className="form-check form-switch">
                  <input
                    className={`form-check-input ${isInvalid(
                      categoryState.errors?.isActive
                    )}`}
                    type="checkbox"
                    role="switch"
                    id="isActive"
                    name="isActive"
                    defaultChecked={`${active}=="true" ? true : false`}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="buttons">
              <Spacer />
              <SubmitButton title="Update" />
            </div>
          </div>
          {categoryState?.message ? (
            <div className="alert alert-danger"> {categoryState.message} </div>
          ) : null}
        </fieldset>
      </form>
      <Spacer height={50} />
      <fieldset className="border rounded-4 py-3">
        <legend className="float-none w-auto px-3">
          Category Property Key Edit
        </legend>
        <div className="container w-75">
          <div className="row property-key-edit">
            <div className="col-12 col-xl-8">
              <form
                className="new-category-form"
                noValidate
                action={(propertyForm) => {
                  propertyKeyDispatch(propertyForm);
                }}
              >
                <input type="hidden" name="id" value={propertyId} />
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="title" className="form-label">
                      Name
                    </label>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className={`form-control rounded-3 ${isInvalid(
                          propertyKeyState?.errors?.name
                        )}`}
                        id="name"
                        name="name"
                        aria-describedby="basic-addon3"
                        defaultValue={propertyName}
                      />
                      <div className="invalid-feedback">
                        {propertyKeyState?.errors?.name}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="keyType">Key Type</label>
                    <select
                      className={`form-select mb-3 ${isInvalid(
                        propertyKeyState?.errors?.keyType
                      )}`}
                      aria-label="Default select example"
                      name="keyType"
                      value={propertyKeyType}
                    >
                      <option selected disabled>
                        Choose key type
                      </option>
                      <option value="TEXT">Text</option>
                      <option value="BOOLEAN">Boolean</option>
                      <option value="NUMBER">Number</option>
                    </select>
                    <div className="invalid-feedback">
                      {propertyKeyState?.errors?.keyType}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="unit" className="form-label">
                      Unit
                    </label>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className={`form-control rounded-3 ${isInvalid(
                          propertyKeyState?.errors?.unit
                        )}`}
                        id="unit"
                        name="unit"
                        aria-describedby="basic-addon3"
                        defaultValue={propertyUnit}
                      />
                    </div>
                  </div>
                </div>

                <div className="buttons my-3 ">
                  <CancelButton title="Return" width="100px" />
                  <SubmitButton title="Update" />
                </div>
              </form>
              {propertyKeyState?.message ? (
                <div className="alert alert-danger">
                  {propertyKeyState.message}
                </div>
              ) : null}
            </div>
            <div className="col-12 col-xl-4 d-flex align-items-center justify-content-center flex-column">
              <div className="card property-key-list w-100">
                <div className="card-body">
                  <h2>Properties</h2>

                  {dataPropertyKey.map((item) =>
                    item.id === undefined ? (
                      ""
                    ) : (
                      <ul className="list-group" key={item.id}>
                        <li className="list-group-item  d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                          </div>
                          <span
                            className="me-2"
                            onClick={() => handlePropertyKeyEdit(item)}
                          >
                            <LuClipboardEdit />
                          </span>
                          <span
                            onClick={() => handlePropertyKeyDelete(item.id)}
                          >
                            <FaRegTrashAlt />
                          </span>
                        </li>
                      </ul>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <Spacer />
    </>
  );
};

export default EditCategoryForm;
