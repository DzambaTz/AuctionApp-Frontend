import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import "./index.scss";

function AddItemPage() {
  return (
    <div>
      <NavbarBlack />
      <NavbarWhite />
      <div className="clear-space-for-footer"></div>
      <Footer />
    </div>
  );
}

export default AddItemPage;
