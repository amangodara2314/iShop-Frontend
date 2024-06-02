import React from "react";

function Footer(props) {
  return (
    <div className="w-full border-y">
      <div className="px-6 md:px-16 lg:px-48 py-8 md:py-16 w-full border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-32">
          <div className="">
            <img src="img/ishop.svg" alt="" />
            <p className="mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever. Since the 1500s, when an unknown printer.
            </p>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Follow Us</span>
            <p className="mt-4 mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="flex items-center gap-4">
              <img src="img/facebook.svg" alt="" />
              <img src="img/twitter.svg" alt="" />
            </div>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Contact Us</span>
            <p className="mt-4 mb-8">
              iShop: address @building 124 <br /> Call us now: 0123-456-789{" "}
              <br />
              Email: support@whatever.com
            </p>
          </div>
        </div>
        <hr className="mt-12" />
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="">
            <span className="font-semibold mt-2 text-xl">Information</span>
            <ul className="">
              <li className="mt-4 mb-2">About Us</li>
              <li className="mb-2">Information</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
