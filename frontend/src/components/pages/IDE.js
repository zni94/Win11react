import {ide} from "../../store/src/fileNavigator";
import Icon from "../Icon";
import {changePath} from "../../store/src/togglePages";
import {useDispatch} from "react-redux";
import {findParentNode} from "../../modules/activeControl";

const IDE = () => {
    const dispatch = useDispatch();

    const onDoubleClick = (e) => {
        const target = findParentNode(e.target, 'windowContainer').dataset.target;
        const path = e.currentTarget.dataset.path;

        dispatch(changePath(target, path));
    }

    return (
        <div className={'contents-container'}>
            <div className={'contents'}>
                <ul>
                    {ide.items.length > 0 &&
                        ide.items.map((item, index) => (
                            item.type === 'folder' ?
                                <li key={index}>
                                    <Icon onDoubleClick={onDoubleClick} title={item.title} thumbnail={item.thumbnail}
                                          path={item.path}/>
                                </li> :
                                <li key={index}>
                                    <Icon onDoubleClick={onDoubleClick} title={item.title} thumbnail={item.thumbnail}
                                          path={item.path}/>
                                </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default IDE;