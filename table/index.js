import React from "react";
import './index.css';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedColumns: []
        }
    }

    handleOnDrop = (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        this.setState( prevState => {
            return {
                selectedColumns: [...prevState.selectedColumns, data]
            }
        }, () => {
            this.props.removeTagFromColumn( data );
        } );
    }

    removeColumnFromTable = ( data ) => {

        debugger;

        const { selectedColumns } = this.state;

        const modifiedColumns = selectedColumns.filter(column => column !== data);

        this.setState({
            selectedColumns: modifiedColumns
        }, () => {
            this.props.addTagToColumn( data );
        } );
    }

    handleAllowDrop = (ev) => {
        ev.preventDefault();
    }

    render() {
        const { rows } = this.props;
        const { selectedColumns } = this.state;
        const tableHeader = selectedColumns.map( column => (
            <span
                className='sp-th'
                key={column}> { column }
                <img
                    alt=''
                    className='delete-icon'
                    src='/delete.svg'
                    onClick={() => this.removeColumnFromTable(column)}
                /> </span>
        )
        );
        const tableBody = rows.map( (row, index) => <div className='sp-tr' key={index}>
            {
                selectedColumns.map( column => <span className='sp-td' key={column}> { row[column] } </span> )
            }
        </div> );

        return <div className='component table'>
        <div
            className='table-holder'
            onDrop={this.handleOnDrop}
            onDragOver={this.handleAllowDrop}
            >
        {
            selectedColumns.length === 0
            ?
            <div className='empty-message'>
                Please drag and drop the columns you want to see
            </div>
            :
            <div className='table-contents'>
                <div className='sp-table'>
                    <div className='sp-thead'>
                        { tableHeader }
                    </div>
                    <div className='sp-tbody'>
                        { tableBody }
                    </div>
                </div>
            </div>
        }
        </div>
    </div>
    }
}

export default Table;