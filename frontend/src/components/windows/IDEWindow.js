import Window from "../Window";
import {useDispatch, useSelector} from "react-redux";
import {closePage} from "../../store/src/togglePages";
import {promise} from "../../modules/promise";
import {popItems} from "../../store/src/navItems";
import {items} from "../../store/src/fileNavigator";
import {useEffect, useState} from "react";

const IDEWindow = () => {
    const dispatch = useDispatch();

    const {ide} = useSelector(state => state.togglePages);
    const [page, setPage] = useState(items.find(state => state.path === ide.path));

    useEffect(() => {
        setPage(items.find(state => state.path === ide.path))
    }, [ide.path])

    const onClose = (e) => {
        promise().then(() => {
            dispatch(closePage('ide'))
        }).then(() => {
            dispatch(popItems('ide'))
        })
    }

    return (
        <Window onClose={onClose} name={page.name} title={page.title} thumbnail={page.thumbnail}>
            {page.contents}
        </Window>
    )
}

export default IDEWindow;