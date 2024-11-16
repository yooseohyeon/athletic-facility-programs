import { useState } from 'react';
import styled from 'styled-components';

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 15px;
  cursor: pointer;
`;

export const PageNavi = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 40px;
  font-size: 15px;
  
  &:disabled {
    color: #999999;
  }

  &:first-of-type {
    margin-right: 15px;
  }
  
  &:last-of-type {
    margin-left: 15px;
  }
`;

export const PageLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding-left: 0;
  margin: 0 0 0 0;
`;

export const PageLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  color: ${(props) => (props.$isActive ? '#546de5' : '#111')};
  border: ${(props) => (props.$isActive ? '#546de5 1px solid' : 'transparent')};
  cursor: ${(props) => (props.$isActive ? 'default' : 'pointer')};

  &:hover {
    ${(props) => props.$isActive ? `dorder: #546de5 1px solid;` : `border: #aaa 1px solid;`}
  }

  li:last-of-type & {
    margin-right: 0;
  }
`;

export default function Pagination({ date, currentPage, setCurrentPage, itemsPerPage }) {
  const intLength = date.length - (itemsPerPage * Math.floor(date.length / itemsPerPage));
  let finalLength = 0;

  if (intLength <= itemsPerPage) {
    finalLength = Math.floor(date.length / itemsPerPage) + 1;
  } else {
    finalLength = Math.floor(date.length / itemsPerPage);
  }

  const renderPageLinks = Array.from({ length: finalLength }, (v, i) => i + 1); 
  const [startIndex, setStartIndex] = useState(1);
  const endIndex = startIndex + 9;

  const handleNavigationClick = (direction) => {
    const newStartIndex = startIndex + direction;
    setStartIndex(newStartIndex);
    setCurrentPage(newStartIndex);
  };

  return (
    <div>
      <PaginationContainer role="navigation">
        <PageNavi onClick={() => handleNavigationClick(-10)} disabled={currentPage === 1}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="26px" width="26px" fill="#999999">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
          </svg>
          이전
        </PageNavi>
        <PageLinks>
          {renderPageLinks.slice(startIndex-1, endIndex).map((link) => (
            <li key={link}>
              <PageLink
                aria-label={`페이지 ${link}로 이동`} 
                onClick={() => setCurrentPage(link)}
                $isActive={link === currentPage}
              > 
                {link} 
              </PageLink>
            </li>
          ))}
        </PageLinks>
        <PageNavi onClick={() => handleNavigationClick(10)}>
          다음
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="26px" width="26px" fill="#999999">
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
          </svg>
        </PageNavi>
      </PaginationContainer>
    </div>
  )
}