import {useSelector} from "react-redux";
import '../css/nav.css'
import TimeZone from "./TimeZone";
import {promise} from "../modules/promise";
import {removeActive} from "../modules/activeControl";
import Calendar from "./Calendar";

const NavBar = () => {
    const {items} = useSelector(state => state.navItems);

    const hideHandler = (e) => {
        const name = e.currentTarget.dataset.value;
        if (name === 'search') return;

        const container = document.getElementsByName('window-' + name)[0];

        promise().then(() => {
            container.classList.remove('hide');
        }).then(() => {
            removeActive('icon-container')
        })
    }

    return (
        <>
            <Calendar/>
            <div className={'nav-container'}>
                <ul className={'menu-items'}>
                    {items.length > 0 &&
                        items.map((contents, index) => (
                            <li key={index}
                                className={'menu-item'}
                                data-value={contents.name}
                                onMouseDown={hideHandler}
                            >
                                <svg width={28} height={28}>
                                    <image width={28} height={28} href={contents.thumbnail}/>
                                </svg>
                            </li>)
                        )}
                </ul>
                <TimeZone/>
            </div>
        </>
    )
}

export default NavBar;