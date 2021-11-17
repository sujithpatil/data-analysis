import React from "react";
import * as XLSX from "xlsx";
import './index.css';

export default class FileUploader extends React.Component {

  constructor( props ) {
    super(props);
    this.state = {
      filePath: '',
    };
  }

  setFilePath = (event) => {

    const filePath = event.target.files[0];

    this.setState({
      filePath: filePath
    });

  }

  readFile = () => {
    const { filePath } = this.state;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const rows = this.convertToJson( data );
      this.props.onReportGenerated( rows );
    };
    reader.readAsBinaryString(filePath);
  }

  convertToJson = (csv) => {
    const lines = csv.split("\n");

    const result = [];

    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].replace(', ', ':').split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }

  render() {

    const { filePath } = this.state;

    return <div className='component file-uploader'>
      <div className='file-upload-holder' >
        <input
            type='file'
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className='primary-btna file-upload'
            onChange={this.setFilePath}
        />
      </div>
      <div className='file-generator'>
        <button
            onClick={ this.readFile }
            className='primary-btn'
            disabled={ !filePath }
            >
                Generate Report
            </button>
      </div>
    </div>
  }
}
