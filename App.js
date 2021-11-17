import { useState } from "react";

import FileUploader from "./components/file-uploader";
import Sidebar from "./components/sidebar";
import Table from "./components/table";
import BarChart from "./components/bar-chart";
import PieChart from "./components/pie-chart";

import './App.css';

const App = () => {

  const [ rows, setRows ] = useState([]);
  const [ columns, setColumns ] = useState([]);

  const setReportData = ( generatedRows ) => {
    setRows( generatedRows );
    setColumns(Object.keys(generatedRows[0]));
  }

  const removeTagFromColumn = ( tag ) => {
    const filteredColumns = columns.filter(column => column !== tag);
    setColumns(filteredColumns);
  }

  const addTagToColumn = ( tag ) => {
    const filteredColumns = [...columns, tag];
    setColumns(filteredColumns);
  }

  return <div className='page center'>

    {
    rows.length > 0 ?
      <section className='main-section'>
        <main className='data-container'>
          <Sidebar columns = { columns } />
          <Table
            rows={ rows }
            removeTagFromColumn = {removeTagFromColumn}
            addTagToColumn = {addTagToColumn}
          />
        </main>
        <BarChart rows={rows} />
        <PieChart rows={rows} />
      </section>
      :
      <FileUploader
        onReportGenerated = { setReportData }
      />
    }
  </div>
}

export default App;