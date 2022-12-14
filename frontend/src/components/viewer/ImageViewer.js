import '../css/window.css';
import {useState} from "react";
import {promise} from "../modules/promise";
import {addActiveById, addHideById, findParentNode, removeActive} from "../modules/activeControl";
import {Document_Icons} from "../../icons";

const ImageViewer = (props) => {
    const {onClose, view, target, children} = props;

    const [isMax, setIsMax] = useState(false);

    // DRAG
    const [currPosition, setCurrPosition] = useState({x: 0, y: 0});
    const [position, setPosition] = useState({x: 0, y: 0});
    const [nextPosition, setNextPosition] = useState({x: 0, y: 0});

    const dragHandler = {
        onDragStart(e) {
            e.dataTransfer.setDragImage(new Image(), 0, 0);

            if (isMax) return;

            setCurrPosition({x: e.clientX, y: e.clientY});
        },
        onDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move'

            if (isMax) return;

            setPosition({
                x: nextPosition.x + e.clientX - currPosition.x,
                y: nextPosition.y + e.clientY - currPosition.y,
            });
        },
        onDragEnd() {
            if (isMax) return;

            setNextPosition({x: position.x, y: position.y});
        }
    }

    const hideHandler = (e) => {
        addHideById(e.target, 'windowContainer')
        removeActive('icon-container');
    }

    const maximizeHandler = (e) => {
        const parent = findParentNode(e.target, 'windowContainer');

        promise().then(() => {
            setIsMax(true)
        }).then(() => {
            parent.classList.add('max')
        })
    }

    const minimizeHandler = (e) => {
        const parent = findParentNode(e.target, 'windowContainer');

        promise().then(() => {
            setIsMax(false)
        }).then(() => {
            parent.classList.remove('max')
        })
    }

    const activeHandler = (e) => {
        removeActive('window-container');
        addActiveById(e.target, 'windowContainer');
    }

    return (
        <div className={'window-container'}
             id={'windowContainer'}
             name={'window-' + target}
             style={{
                 left: position.x + 'px',
                 top: position.y + 'px'
             }}
             onMouseDown={activeHandler}
             draggable={true}
             data-target={target}
        >
            <div className={'window-body'}>
                <div className={'window-header'}
                     onDragStart={dragHandler.onDragStart}
                     onDragOver={dragHandler.onDragOver}
                     onDragEnd={dragHandler.onDragEnd}
                     onDoubleClick={!isMax ? maximizeHandler : minimizeHandler}
                     draggable={true}>
                    <div className={'window-title'}>
                        <svg width={18} height={18}>
                            <image width={18} height={18} href={Document_Icons.Picture}/>
                        </svg>
                        {view.title}
                    </div>
                    <ul>
                        <li onMouseDown={hideHandler}>
                        <span className="material-symbols-outlined">
                            minimize
                        </span>
                        </li>
                        <li onMouseDown={!isMax ? maximizeHandler : minimizeHandler}>
                            {!isMax ?
                                <span className="material-symbols-outlined">
                                magnification_large
                            </span> :
                                <span className="material-symbols-outlined">
                                magnification_small
                            </span>
                            }
                        </li>
                        <li onClick={onClose}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                        </li>
                    </ul>
                </div>
                <div className={'window-section'}>
                    <div className={'window-contents'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageViewer