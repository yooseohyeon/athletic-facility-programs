import programDate from '../data/programsData.json'

const keyMap = {
  FCLTY_NM: "시설 이름",
  FCLTY_TY_NM: "시설 유형",
  CTPRVN_NM: "시도명",
  SIGNGU_NM: "시군구명",
  FCLTY_TEL_NO: "시설 전화번호",
  PROGRM_TY_NM: "프로그램 유형",
  PROGRM_NM: "프로그램 이름",
  PROGRM_TRGET_NM: "대상",
  PROGRM_BEGIN_DE: "수강기간",
  PROGRM_ESTBL_WKDAY_NM: "요일",
  PROGRM_ESTBL_TIZN_VALUE: "시간대",
  PROGRM_RCRIT_NMPR_CO: "정원",
  PROGRM_PRC: "수강료(원)",
  PROGRM_PRC_TY_NM: "가격유형",
  SAFE_MANAGT_CN: "안전조치 내용",
  EDC_GOAL_CN: "교육목표 내용",
  PRTC_NMPR_PARTCPT_AT: "보호인원 참가 여부",
  LDR_QUALF_CN: "지도자 자격 내용"
};

function renderContent(item, key, value) {
  switch (key) {
    case 'FCLTY_NM':
      return <a href={item.HMPG_URL} target="_blank" rel="noreferrer"> {item[key]} </a>
    case 'PROGRM_BEGIN_DE':
      return `${item.PROGRM_BEGIN_DE} ~ ${item.PROGRM_END_DE}`
    case 'PROGRM_PRC':
      return parseInt(value).toLocaleString('ko-KR')
    default:
      return value
  }
}

export default function DataList({ currentPage, itemsPerPage }) {
  const keysToExclude = ["FCLTY_TY_NM", "FCLTY_TEL_NO", "CTPRVN_CD", "SIGNGU_CD", "HMPG_URL", "FCLTY_ADDR", "PROGRM_END_DE", "PROGRM_PRC_TY_NM", "SAFE_MANAGT_CN", "EDC_GOAL_CN", "PRTC_NMPR_PARTCPT_AT", "LDR_QUALF_CN"]; 
  const keys = Object.keys(programDate[0]).filter(key => !keysToExclude.includes(key)); 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key}>{keyMap[key] || key}</th> 
          ))}
        </tr>
      </thead>
      <tbody>
        {programDate.slice(startIndex, endIndex).map((item, index) => ( 
          <tr key={index}>
            {keys.map((key) => (
              <td key={key}>
                  {renderContent(item, key, item[key])} 
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
