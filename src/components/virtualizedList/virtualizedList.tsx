import React, { useState, useEffect, useContext } from 'react'
import TicketRow from '../ticketRow/ticketRow';
import Styles from './virtualizedList.module.scss';
import { MainContext } from '../context/MainContext';
interface Props {
    data: any;
}

function VirtualizedList(props: Props) {
    const { data } = props;
    const { isMobile } = useContext(MainContext);
    const [scrollTop, setScrollTop] = useState(0);
    const [itemsToRender, setItemsToRender] = useState<any>({});

    const itemHeight = isMobile ? 150 : 70;
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const viewportHeight = windowSize[1] * 0.7;
    const containerHeight = data.length * itemHeight;

    // on scroll function 
    const onScroll = (e: any) => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.ceil((scrollTop + viewportHeight) / itemHeight - 1);
        setScrollTop(e.currentTarget.scrollTop);
        setItemsToRender({ startIndex, endIndex })
    };
    // update list on rendering 
    useEffect(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.ceil((scrollTop + viewportHeight) / itemHeight - 1);
        setItemsToRender({ startIndex, endIndex })
    }, [])

    // get height after resize window
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div className={Styles.VirtualizedList} style={{ height: viewportHeight, }} onScroll={onScroll}>
            <div
                style={{ height: containerHeight }}

            >
                {data.slice(itemsToRender.startIndex, itemsToRender.endIndex + 1).map((item: any, index: number) =>
                    <TicketRow data={item} itemPosition={itemsToRender.startIndex} index={index} itemHeight={itemHeight} />
                )}
            </div>
        </div>
    )
}

export default VirtualizedList
