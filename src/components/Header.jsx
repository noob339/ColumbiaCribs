import logo from "../assets/logo.svg";
import { useState } from "react";
import "./Header.css";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import buildings from "../data/buildings";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const location = useLocation();

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToReviewFlow = () => {
        const match = location.pathname.match(/^\/buildings\/([^/]+)$/);
        const currentSlug = match?.[1];

        if (currentSlug) {
            navigate(`/review?building=${currentSlug}`);
        } else {
            navigate("/review");
        }

        setIsMenuOpen(false);
    };

    const buildingOptions = buildings.map((b) => ({
        label: b.name?.trim() ? b.name : b.address,
        value: `/buildings/${b.slug}`,
    }));

    const handleSelect = (opt) => {
        setSelected(opt);
        if (opt?.value) navigate(opt.value);
    };

    return (
        <div className='header'>
            <div className='navBar'>
                <div className='logo'>
                    <img src={logo} alt='Columbia Cribs Logo' />
                    <h1>
                        Columbia<span>Cribs</span>
                    </h1>
                </div>
                <div className='hamburger' onClick={toggleMenu}>
                    <div
                        className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
                <nav className='menu-nav'>
                    <Link to='/' className='menu-item'>
                        Home
                    </Link>
                    <Link to='/OurMission' className='menu-item'>
                        Our Mission
                    </Link>
                    <Link to='/FAQs' className='menu-item'>
                        FAQs
                    </Link>
                    <a href='#contact' className='menu-item'>
                        Contact Us
                    </a>
                </nav>
                <div className='menu-footer'>
                    <button
                        className='btnReview'
                        type='button'
                        onClick={goToReviewFlow}
                    >
                        Review
                    </button>
                </div>
            </div>

            <div className='searchContainer'>
                <div className='searchBar'>
                    <div className='searchForm'>
                        <Select
                            className='ccSelect'
                            classNamePrefix='ccSelect'
                            options={buildingOptions}
                            value={selected}
                            onChange={handleSelect}
                            isClearable
                            placeholder='Search a building...'
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 2000,
                                }),
                            }}
                            components={{
                                DropdownIndicator: null,
                                IndicatorSeparator: null,
                                ClearIndicator: null,
                            }}
                        />
                        <IoSearchOutline className='searchIcon' />
                    </div>

                    <button
                        className='btnReview'
                        type='button'
                        onClick={goToReviewFlow}
                    >
                        Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
