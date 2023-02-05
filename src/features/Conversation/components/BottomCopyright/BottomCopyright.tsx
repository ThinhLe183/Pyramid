import React from "react";

export default function BottomCopyright() {
  const year = new Date().getFullYear();

  return (
    <div className="footer footer-center p-4 bg-base-300 text-base-content">
      <p>Copyright © {year} - All right reserved by Thinh Le</p>
    </div>
  );
}
