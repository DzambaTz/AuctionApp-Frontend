import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import Banner from "../../Components/banner";
import testData from "../../Helpers/test-data";
import Dropzone from "react-dropzone";
import "./index.scss";
import { useState } from "react";
import statusCodes from "../../Helpers/status-codes";
import uploadImage from "../../Helpers/uploadImage";
import itemService from "../../Services/item.service";
import redCross from "../../Assets/Images/red-cross.png";
import greenTick from "../../Assets/Images/green-tick.png";
import { PAGE_1, PAGE_2, PAGE_3 } from "../../Helpers/addItemPageUtils";

function AddItemPage() {
  const [selectedFiles, setSelectedFiles] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [subcategories, setSubcategories] = useState(
    testData.categories[0].subcategories
  );
  const [selectedCategory, setSelectedCategory] = useState(
    testData.categories[0].name
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    testData.categories[0].subcategories[0]
  );
  const [images, setImages] = useState([]);
  const [startPrice, setStartPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pageNumber, setPageNumber] = useState(PAGE_1);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState("");

  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSubcategories(
      testData?.categories?.filter(
        (category) => category.name == e.target.value
      )[0].subcategories
    );
    setSelectedSubcategory(
      testData?.categories?.filter(
        (category) => category.name == e.target.value
      )[0].subcategories[0]
    );
  };

  const onDrop = (files) => {
    if (files.length) {
      setSelectedFiles(files);
    }
    setImages([]);
  };

  const uploadImages = () => {
    selectedFiles.map((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadImage(
          reader.result.substring(reader.result.search(",") + 1)
        ).then((response) => {
          if (response.body.status == statusCodes.OK) {
            setImages((prevState) => [...prevState, response.body.data.link]);
          }
        });
      };
    });
    setPageNumber(PAGE_2);
  };

  const postItem = () => {
    const item = {
      name: itemName,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      startPrice,
      description,
      startTime: startTime + ":00.000Z",
      endTime: endTime + ":00.000Z",
      images,
    };

    itemService.addNewItem(item).then((response) => {
      if (response.status == statusCodes.OK) {
        setPageNumber(PAGE_3);
        setMessage("Item successfully posted!");
        setSuccessful(true);
      } else {
        setSuccessful(false);
        setMessage("Failed to post item!");
      }
    });
  };

  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <Banner title="ADD ITEM" base="My account" current="Add item" />
      <div className="add-item-form">
        {pageNumber == PAGE_1 && (
          <>
            <h1>ADD ITEM</h1>
            <h2>What do you sell?</h2>
            <input
              type="text"
              size={60}
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
            />
            <br />
            <select value={selectedCategory} onChange={onCategoryChange}>
              {testData.categories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
            </select>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              {subcategories.map((subcategory) => {
                return <option value={subcategory}>{subcategory}</option>;
              })}
            </select>
            <h2>Description</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <Dropzone onDrop={onDrop} multiple={true}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {selectedFiles && selectedFiles[0]?.name ? (
                      <div className="selected-file">
                        {selectedFiles &&
                          selectedFiles.map((file) => {
                            return <div>{file.name}</div>;
                          })}
                      </div>
                    ) : (
                      <div>Click to upload photos or just drag and drop</div>
                    )}
                  </div>
                  <aside className="selected-file-wrapper">
                    <button
                      className="upload-button"
                      disabled={!selectedFiles}
                      onClick={uploadImages}
                    >
                      NEXT {">"}
                    </button>
                  </aside>
                </section>
              )}
            </Dropzone>
          </>
        )}
        {pageNumber == PAGE_2 && (
          <>
            <h1>SET PRICES</h1>
            <h2>Your start price</h2>
            <div id="price-input">
              <span>$</span>
              <input
                type="number"
                onChange={(e) => setStartPrice(e.target.value)}
              />
            </div>
            <h2>Start time</h2>
            <input
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <h2>End time</h2>
            <input
              type="datetime-local"
              onChange={(e) => setEndTime(e.target.value)}
            />
            <h3>
              The auction will be automatically closed when the end time comes.
              The highest bid will win the auction.
            </h3>
            <button
              id="add-item-back-button"
              onClick={() => {
                setPageNumber(PAGE_1);
              }}
            >
              {"<"} BACK
            </button>
            <button id="post-item-button" onClick={postItem}>
              POST ITEM
            </button>
          </>
        )}
        {pageNumber == PAGE_3 && (
          <div className="add-item-page-3">
            <h1>{message}</h1>
            {successful ? (
              <img src={greenTick}></img>
            ) : (
              <img src={redCross}></img>
            )}
          </div>
        )}
      </div>
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default AddItemPage;
