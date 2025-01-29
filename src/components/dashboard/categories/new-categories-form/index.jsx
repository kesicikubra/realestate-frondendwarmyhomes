"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { initialResponse, isInvalid } from "@/helpers/form-validation";
import { createCategoryAction } from "@/actions/category-action";
import {
  createCategoryPropertyAction,
  deleteCategoryPropertyAction,
  updateCategoryPropertyActionAtNewPage,
} from "@/actions/category-property-action";
import "./style.scss";
import { swalAlert, swalConfirm } from "@/helpers/swal";
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
  faHouseLaptop,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SubmitButton from "@/components/common/buttons/submit-button";
import CancelButton from "@/components/common/buttons/cancel-button";

const NewCategoryForm = () => {

  const [categoryState, categoryDispatch] = useFormState(createCategoryAction, 
initialResponse);
  const [propertyKeyState, propertyKeyDispatch] = useFormState(
createCategoryPropertyAction, initialResponse);
  const [propertyKeyStateUpdate, propertyKeyDispatchUpdate] = useFormState(
updateCategoryPropertyActionAtNewPage, initialResponse);

  const propertyKey = {
    id: propertyKeyState?.data?.id,
    name: propertyKeyState?.data?.name,
  };
  const [propertyKeyList, setPropertyKeyList] = useState([
    propertyKey == null ? "" : propertyKey,
  ]);

  const [icon, setIcon] = useState();
  const [show, setShow] = useState();
  const [showIconText, setShowIconText] = useState("Choose an Icon");
  const [editMode, setEditMode] = useState(false)
  const [propertyKeyName, setPropertyKeyName] = useState();
  const [propertyKeyType, setPropertyKeyType] = useState();
  const [propertyKeyUnit, setPropertyKeyUnit] = useState();
  const [propertyKeyId, setPropertyKeyId] = useState();
  const ref = useRef();

  useEffect(() => {
    setShow(!categoryState.success)
  }, [categoryState.success])
  

  useEffect(() => {
    if (propertyKeyState?.data) {
      setPropertyKeyList((prevList) => [
        ...prevList,
        {
          id: propertyKeyState.data.object.id,
          name: propertyKeyState.data.object.name,
          keyType:propertyKeyState.data.object.keyType,
          unit:propertyKeyState.data.object.unit
        },
      ]);
    }
  }, [propertyKeyState.data]);

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
    swalToast("Property Key has been deleted.", "success")
  };

  const handleSelect = (e) => {
    setIcon(e.target.children[1].innerText);
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
    faHouseChimneyWindow,
    faHouseLaptop,
    faImage
  );

  const mapIconToFontAwesome = {
    "faWarehouse": faWarehouse,
    "faHome": faHome,
    "faTractor": faTractor,
    "faHotel": faHotel,
    "faStore": faStore,
    "faBuildingWheat": faBuildingWheat,
    "faBuilding": faBuilding,
    "faCity": faCity,
    "faHouseChimneyWindow": faHouseChimneyWindow,
    "faHouseLaptop":faHouseLaptop,
    "faImage":faImage
  };
  const selectedIcon = mapIconToFontAwesome[icon] || null;
  const handlePropertyKeyEdit = (item) => { 
    setEditMode(true)
    setPropertyKeyName(item.name);
    setPropertyKeyType(item.keyType);
    setPropertyKeyUnit(item.unit);
    setPropertyKeyId(item.id)
   }
   
  return (
    <>
      {show ? (
        <fieldset className="border rounded-4 py-3">
        <legend className="float-none w-auto px-3">Create Category</legend>
        {!categoryState?.success && categoryState.message ? (
								<div className="alert alert-danger">
									{categoryState.message}
								</div>
							) : (
								""
							)}
        <form
          className="new-category-form"
          noValidate
          action={(formValues) => {
            categoryDispatch(formValues);
          }}
        >
          <input type="hidden" name="icon" value={icon} />
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
                      categoryState?.errors?.title
                    )}`}
                    id="title"
                    name="title"
                    aria-describedby="basic-addon3"
                  />
                  <div className="invalid-feedback">
                    {categoryState?.errors?.title}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="icon" className="form-label">
                  Icon
                </label>
                <div className="input-group mb-4">
                  <input 
                    className={`form-control rounded-3 ${isInvalid(
                      categoryState?.errors?.icon
                    )}`}
                    type="hidden" 
                    name="icon" 
                    value={icon} />
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedIcon && (
                        <FontAwesomeIcon icon={selectedIcon} size="l" />
                      )}
                      {"  "}
                      {showIconText}
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
                    {categoryState?.errors?.icon}
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
                      categoryState?.errors?.seq
                    )}`}
                    id="seq"
                    name="seq"
                    aria-describedby="basic-addon3"
                  />
                  <div className="invalid-feedback">
                    {categoryState?.errors?.seq}
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <label htmlFor="active" className="form-label">
                  Status
                </label>
                <div className="form-check form-switch">
                  <input
                    className={`form-check-input ${isInvalid(
                      categoryState?.errors?.active
                    )}`}
                    type="checkbox"
                    role="switch"
                    id="active"
                    name="active"
                  />
                  <label className="form-check-label" htmlFor="active">
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="buttons">
              <CancelButton title="Return" />
              <SubmitButton title="Save" />
            </div>
          </div>
        </form>
        </fieldset>
      ) : (
        <div className="container">
            <fieldset className="border rounded-4 p-3">
        <legend className="float-none w-auto px-3">Create Property Keys Of The <span className="text-primary fw-bold">{categoryState?.data?.object.title.charAt(0).toUpperCase() + categoryState?.data?.object.title.slice(1)}</span> Category</legend>
          <div className="row g-3 property-key">
            <div className="col-12 col-lg-8">
        
              <form
                className="new-category-form"
                noValidate
                ref={ref}
                action={(propertyForm) => {
                  editMode ? propertyKeyDispatchUpdate(propertyForm) : propertyKeyDispatch(propertyForm);
                  ref.current?.reset();
                  setEditMode(false);
                }}
              >
                <input
                  type="hidden"
                  name="id"
                  value={propertyKeyId}
                />
                <input
                  type="hidden"
                  name="categoryId"
                  value={categoryState?.data?.object.id}
                />
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label htmlFor="title" className="form-label">
                        Name
                      </label>
                      <div className="input-group mb-4">
                        <input
                          type="text"
                          className={`form-control rounded-3 ${isInvalid(
                            editMode ?  propertyKeyStateUpdate?.errors?.name : propertyKeyState?.errors?.name
                          )}`}
                          id="name"
                          name="name"
                          aria-describedby="basic-addon3"
                          defaultValue={editMode ? propertyKeyName : ""}
                        />
                        <div className="invalid-feedback">
                          {editMode ?  propertyKeyStateUpdate?.errors?.name : propertyKeyState?.errors?.name}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <label htmlFor="keyType">Key Type</label>
                      <select
                        className={`form-select mt-2 ${isInvalid(
                          editMode ?  propertyKeyStateUpdate?.errors?.keyType : propertyKeyState?.errors?.keyType
                        )}`}
                        aria-label="Default select example"
                        name="keyType"
                        defaultValue={editMode ? propertyKeyType : null}
                      >
                        <option selected disabled>
                          Choose key type
                        </option>
                        <option value="TEXT">Text</option>
                        <option value="BOOLEAN">Boolean</option>
                        <option value="NUMBER">Number</option>
                      </select>
                      <div className="invalid-feedback">
                          {editMode ?  propertyKeyStateUpdate?.errors?.keyType : propertyKeyState?.errors?.keyType}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="prefix" className="form-label">
                        Unit
                      </label>
                      <div className="input-group mb-4">
                        <input
                          type="text"
                          className={`form-control rounded-3 ${isInvalid(
                            editMode ?  propertyKeyStateUpdate?.errors?.unit : propertyKeyState?.errors?.unit
                          )}`}
                          id="unit"
                          name="unit"
                          defaultValue={editMode ? propertyKeyUnit : ""}
                          aria-describedby="basic-addon3"
                        />
                        <div className="invalid-feedback">
                          {editMode ?  propertyKeyStateUpdate?.errors?.unit : propertyKeyState?.errors?.unit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className={`btn btn-success text-white`}
                      onClick={() => setShow(true)}
                    >
                      Return
                    </button>
                    <SubmitButton title={editMode ? "Update" : "Create"} />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-4 d-flex alig-items-center justify-content-center">
              <div className="card property-key-list">
                <div className="card-body">
                  <h2>Properties</h2>

                  {propertyKeyList.map((item) =>
                    item.id === undefined ? (
                      ""
                    ) : (
                      <ul className="list-group" key={item.id}>
                        <li className="list-group-item  d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                          </div>
                          <span
                            onClick={()=> handlePropertyKeyEdit(item)}
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
          </fieldset>
        </div>
      )}
    </>
  );
};

export default NewCategoryForm;
