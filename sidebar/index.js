import './index.css';

const Sidebar = (props) => {

    const handleOnDragStart = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const { columns } = props;
    const columnsMarkup = columns.map( column => (
            <div
              draggable={true}
              id={column}
              key={column}
              onDragStart={handleOnDragStart}
              className='column-tag'
            >
              <span>{column}</span>
            </div>
        )
    );

    return <div className='component sidebar'>
        { columnsMarkup }
    </div>
}

export default Sidebar;