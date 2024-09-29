import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { LangChange } from "../context/context";
import { changeLanguage } from "../redux/Slice/language"; // التأكد من مسار الاستيراد الصحيح

const MyNavbar = () => {
  const favoritesCount = useSelector(
    (state) => state.favorites.favorites.length
  );
  const { lang, setlang } = useContext(LangChange);
  const translation = useSelector((state) => state.language.translate);
  const dispatch = useDispatch();
  const history = useHistory(); 
  const [isActive, setIsActive] = useState(false); 

  const checkActiveStatus = () => {
    const activeStatus = localStorage.getItem("isActive") === "true";
    setIsActive(activeStatus);
  };

  useEffect(() => {
    // تحقق من  المستخدم عند تحميل الصفحة
    checkActiveStatus();

    // استمع إلى تغييرات الـ localStorage
    const handleStorageChange = (e) => {
      if (e.key === "isActive") {
        checkActiveStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    //  is active إمتابعه 
        const intervalId = setInterval(() => {
      checkActiveStatus(); 
    }, 500);

    // تنظيف: إزالة الحدث وتوقيف الـ Interval عند إزالة المكون
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleLanguageChange = () => {
    if (lang === "EN") {
      setlang("AR");
      dispatch(changeLanguage("ar")); // استخدم action بشكل صحيح
    } else {
      setlang("EN");
      dispatch(changeLanguage("en")); // استخدم action بشكل صحيح
    }
  };

  const handleLogout = () => {
    // جعل المستخدم غير نشط وإعادة التوجيه إلى صفحة تسجيل الدخول
    localStorage.setItem("isActive", "false");
    setIsActive(false); // تحديث حالة isActive
    history.push("/"); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-light">
      <div className="container-fluid">
        {/* Always show navbarBrand */}
        <Link className="navbar-brand text-white" to="#">
          {translation.navbarBrand}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isActive ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-white"
                    aria-current="page"
                    to="/home"
                  >
                    {translation.home}
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    role="button"
                    className="nav-link active text-white"
                    onClick={handleLanguageChange}
                  >
                    {translation.lang} ({lang})
                  </p>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active text-white" to="/favorites">
                    {translation.favorites} ({favoritesCount})
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    role="button"
                    className="nav-link active text-white"
                    onClick={handleLogout}
                  >
                    {translation.logout}
                  </p>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    {translation.login}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    {translation.register}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
