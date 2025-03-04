const GOOGLE_RECAPTCHA_KEY = '6Le7INgpAAAAAAgENVMmUi0fSW_0XDTAEHYPDE28';
const SEARCH_API_URL =
  'https://muasamcong.mpi.gov.vn/o/egp-portal-contractor-selection-v2/services/smart/search';
const DETAIL_API_URL =
  'https://muasamcong.mpi.gov.vn/o/egp-portal-contractor-selection-v2/services/lcnt_tbmt_ttc_ldt';

const maThauList = ['IB2500043458', 'IB2500052171'];

const delay = (min, max) =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min)
  );

// 🗓️ Hàm format ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return 'Không có dữ liệu';

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// 🔄 Lấy danh sách ID từ API tìm kiếm
const fetchSearchResults = async () => {
  try {
    const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_KEY, {
      action: 'submit',
    });

    const response = await fetch(`${SEARCH_API_URL}?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        Referer: 'https://muasamcong.mpi.gov.vn',
        Origin: 'https://muasamcong.mpi.gov.vn',
      },
      body: JSON.stringify([
        {
          pageNumber: 0,
          pageSize: 30,
          query: [
            {
              index: 'es-contractor-selection',
              keyWord: maThauList.join(' '),
              matchType: 'any-0',
              matchFields: ['notifyNo', 'bidName'],
              filters: [
                {
                  fieldName: 'type',
                  fieldValues: ['es-notify-contractor'],
                  searchType: 'in',
                },
                {
                  fieldName: 'caseKHKQ',
                  fieldValues: ['1'],
                  searchType: 'not_in',
                },
              ],
            },
          ],
        },
      ]),
    });

    if (!response.ok)
      throw new Error(`❌ Lỗi API tìm kiếm: ${response.status}`);

    const result = await response.json();
    const ids = result?.page.content || [];
    const sortedIds = ids.sort(
      (a, b) => new Date(b.publicDate) - new Date(a.publicDate)
    );

    console.log('📌 Danh sách ID tìm được:', ids);

    return ids;
  } catch (error) {
    console.error('❌ Lỗi khi tìm kiếm mã thầu:', error);
    return [];
  }
};

// 🔍 Lấy chi tiết gói thầu từ API
const fetchBidDetails = async (id) => {
  try {
    const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_KEY, {
      action: 'submit',
    });

    const response = await fetch(`${DETAIL_API_URL}?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok)
      throw new Error(`❌ Lỗi API chi tiết (${id}): ${response.status}`);

    const result = await response.json();
    return result || null;
  } catch (error) {
    console.error(`❌ Lỗi khi lấy thông tin chi tiết cho ID ${id}:`, error);
    return null;
  }
};

// 🔧 Xử lý format dữ liệu từ API chi tiết
const formatData = (bidDetail) => {
  if (!bidDetail) return null;

  const {
    notifyNo,
    bidName = 'Không có dữ liệu',
    projectName,
    planName,
    investorName = 'Không có dữ liệu',
    contractPeriod = 'Không xác định',
    contractPeriodUnit,
    bidEstimatePrice,
    bidPrice,
    publicDate,
    bidCloseDate,
  } = bidDetail.bidoNotifyContractorM;

  console.log(`📋 Đang lấy thông tin chi tiết cho ID: ${notifyNo}`);

  // 📍 Định dạng địa điểm
  const bidLocation =
    bidDetail.bidpBidLocationList
      ?.map(
        (item) =>
          `${item.districtName ? item.districtName + ', ' : ''}${item.provName}`
      )
      .join(' ') || 'Không có thông tin';

  // ⏳ Xử lý thời gian hợp đồng
  const contractTime = `${contractPeriod} ${
    { D: 'ngày', M: 'tháng', Y: 'năm' }[contractPeriodUnit] || 'không rõ đơn vị'
  }`;

  // 🗓️ Định dạng ngày tháng
  const formattedPublicDate = formatDate(publicDate);
  const formattedBidCloseDate = formatDate(bidCloseDate);

  // 💰 Giá dự toán
  const bidEstimate = bidEstimatePrice ?? bidPrice ?? 'Không có dữ liệu';

  return (
    `${bidName}, Thuộc dự án: ${projectName || planName}` +
    `\u2029` + // Xuống dòng trong 1 ô Excel
    `${bidLocation}` +
    '\t' + // Tab để tách sang cột khác
    `${formattedPublicDate}` +
    '\t' +
    `${formattedBidCloseDate}` +
    '\t' +
    'XN... thực hiện ' +
    `${contractTime}` +
    '\t' +
    `${investorName}` +
    '\t\t\t' +
    `${parseFloat(bidEstimate)}` +
    '\t' +
    `${notifyNo}`
  );
};

// 🔄 Tổng hợp toàn bộ dữ liệu gói thầu
const getAllBidData = async () => {
  const notifyNoList = await fetchSearchResults();
  let allBidDetails = [];

  if (maThauList.length > 30) {
    console.log('Vượt quá 30 gói thầu');
    return;
  }

  for (const notify of notifyNoList) {
    const bidDetail = await fetchBidDetails(notify.id);
    const formattedData = formatData(bidDetail);

    if (formattedData) {
      allBidDetails.push(formattedData);
    }

    await delay(500, 1000); // Tránh bị chặn request
  }

  console.log(allBidDetails.join('\n'));
  return allBidDetails;
};

// 🚀 Bắt đầu lấy dữ liệu
getAllBidData();
