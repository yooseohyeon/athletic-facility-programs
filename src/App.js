import { useState } from 'react';
import programDate from './data/programsData.json'
import ProgramList from "./page/ProgramList";
import Pagination from './component/Pagination';
import { GlobalStyles } from './styles/GlobalStyles';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(50);

  return (
    <div>
      <GlobalStyles />
      <h1> 프로그램 </h1>
      <ProgramList currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination date={programDate} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
    </div>
  );
}