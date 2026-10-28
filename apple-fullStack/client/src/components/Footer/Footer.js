
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <footer className="footer-wrapper">
        <div className="upper-text-wrapper">
          <p>
            1. Trade In: Trade-in values vary. Promotional pricing and
            eligibility depend on the device, condition, availability,
            and applicable terms. Additional terms may apply.
            {" "}
            <a href="https://www.apple.com/shop/trade-in">
              Full terms apply
            </a>.
          </p>
        </div>

        <div className="footer-links-wrapper">
          <div className="footer-links-wrapper1">
            <h3>Shop and Learn</h3>
            <ul>
              <li><a href="https://www.apple.com/mac/">Mac</a></li>
              <li><a href="https://www.apple.com/ipad/">iPad</a></li>
              <li><a href="https://www.apple.com/iphone/">iPhone</a></li>
              <li><a href="https://www.apple.com/watch/">Watch</a></li>
              <li><a href="https://www.apple.com/tv-home/">TV & Home</a></li>
              <li><a href="https://www.apple.com/apple-music/">Music</a></li>
              <li><a href="https://www.apple.com/airpods/">AirPods</a></li>
              <li><a href="https://www.apple.com/homepod/">HomePod</a></li>
              <li><a href="https://www.apple.com/shop/accessories/all">Accessories</a></li>
              <li><a href="https://www.apple.com/shop/gift-cards">Gift Cards</a></li>
            </ul>
          </div>

          <div className="footer-links-wrapper2">
            <h3>Services</h3>
            <ul>
              <li><a href="https://www.apple.com/apple-music/">Apple Music</a></li>
              <li><a href="https://www.apple.com/apple-news/">Apple News+</a></li>
              <li><a href="https://www.apple.com/apple-tv-plus/">Apple TV+</a></li>
              <li><a href="https://www.apple.com/apple-arcade/">Apple Arcade</a></li>
              <li><a href="https://www.apple.com/apple-card/">Apple Card</a></li>
              <li><a href="https://www.apple.com/icloud/">iCloud</a></li>
            </ul>

            <h3>Account</h3>
            <ul>
              <li><a href="https://account.apple.com/">Manage Your Apple ID</a></li>
              <li><a href="https://www.apple.com/shop/account">Apple Store Account</a></li>
              <li><a href="https://www.icloud.com/">iCloud.com</a></li>
            </ul>
          </div>

          <div className="footer-links-wrapper3">
            <h3>Apple Store</h3>
            <ul>
              <li><a href="https://www.apple.com/retail/">Find a Store</a></li>
              <li><a href="https://www.apple.com/retail/geniusbar/">Genius Bar</a></li>
              <li><a href="https://www.apple.com/today/">Today at Apple</a></li>
              <li><a href="https://www.apple.com/apple-camp/">Apple Camp</a></li>
              <li><a href="https://www.apple.com/retail/">Field Trip</a></li>
              <li><a href="https://www.apple.com/retail/">Apple Store App</a></li>
              <li><a href="https://www.apple.com/shop/refurbished">Refurbished and Clearance</a></li>
              <li><a href="https://www.apple.com/shop/browse/financing">Financing</a></li>
              <li><a href="https://www.apple.com/shop/trade-in">Apple Trade In</a></li>
              <li><a href="https://www.apple.com/shop/order/list">Order Status</a></li>
              <li><a href="https://www.apple.com/shop/help">Shopping Help</a></li>
            </ul>
          </div>
        </div>

        <div className="flag-wrapper">
          <p>
            More ways to shop:{" "}
            <a href="https://www.apple.com/retail/">
              Find an Apple Store or other retailer
            </a>{" "}
            near you, or call 1-800-MY-APPLE.
          </p>
        </div>

        <div className="copyright-wrapper">
          <p>Copyright © 2019 Apple Inc. All rights reserved.</p>

          <p>
            <a href="https://www.apple.com/legal/privacy/">Privacy Policy</a>{" "}
            <a href="https://www.apple.com/legal/internet-services/terms/site.html">
              Terms of Use
            </a>{" "}
            <a href="https://www.apple.com/shop/open/salespolicies">
              Sales and Refunds
            </a>{" "}
            <a href="https://www.apple.com/legal/">Legal</a>{" "}
            <a href="https://www.apple.com/sitemap/">Site Map</a>
          </p>

          <p>United States</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
