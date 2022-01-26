import Footer from "../../Components/footer";
import NavbarBlack from "../../Components/navbar-black";
import NavbarWhite from "../../Components/navbar-white";
import greenTick from "../../Assets/Images/green-tick.png";
import "./index.scss";

function PaymentSuccessPage() {
  return (
    <>
      <NavbarBlack />
      <NavbarWhite />
      <div className="payment-success">
        <h1>Item successfully purchased!</h1>
        <img src={greenTick} />
        <h2>Expected delivery: 3-5 business days</h2>
        <h3>
          For any additional information contact us at:{" "}
          <a href="mailto:support@auction.com">support@auction.com</a>
        </h3>
      </div>
      <div className="clear-space-for-footer" />
      <Footer />
    </>
  );
}

export default PaymentSuccessPage;
