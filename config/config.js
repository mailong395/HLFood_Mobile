const backgroundColor = {
  white: '#fff',
  orange: '#EE6F57',
  gray: '#d9d9d9',
};
const color = {
  white: '#fafafa',
  black: '#343434',
};

const CMS = {
  logo: 'HLFood',
  nChair: 'Chỗ',
  search: 'Tìm kiếm',
  add: 'Thêm Món',
  cook: 'Chế biến',
  emp: 'Quản lý nhân viên',
  cus: 'Quản lý khách hàng',
  addFood: 'Thêm món ăn',
  food: 'Quản lý món ăn',
  editFood: 'Sửa thông tin món ăn',
  addEmp: 'Thêm nhân viên',
  editEmp: 'Sửa thông tin nhân viên',
  editCus: 'Sửa thông tin khách hàng',
  statistical: 'Thống kê doanh thu',
  dayStatistical: 'Thống kê theo ngày',
  nowStatistical: 'Thống kê ngày hôm nay',
  monthStatistical: 'Thống kê theo tháng',
  yearStatistical: 'Thống kê theo năm',
  table: 'Quản lý bàn',
  list_table: 'Danh sách bàn',
};

// List kind of table
const OPTION_TABLE = [
  {
    _id: -1,
    title: 'Tất cả',
  },
  {
    _id: 0,
    title: 'Trống',
  },
  {
    _id: 1,
    title: 'Bàn Đặt',
  },
  {
    _id: 2,
    title: 'Đợi món',
  },
  {
    _id: 3,
    title: 'Đã có món',
  },
  {
    _id: 4,
    title: 'Hoàng thành',
  },
];

// List kind of fond
const OPTION_FOOD = [
  {
    _id: -1,
    title: 'Tất cả',
  },
  {
    _id: 0,
    title: 'Món No',
  },
  {
    _id: 1,
    title: 'Món Tráng Miệng',
  },
  {
    _id: 2,
    title: 'Nước Uống',
  },
  {
    _id: 3,
    title: 'Món Khô',
  },
  {
    _id: 4,
    title: 'Món Nước',
  },
];

const ACTIVE_TABLE = [
  {
    id: 0,
    title: 'Thêm món',
    icon: 'plus',
  },
  {
    id: 1,
    title: 'Ghép/Chuyển bàn',
    icon: 'arrow-all',
  },
  {
    id: 2,
    title: 'Món đã đặt',
    icon: 'food',
  },
  {
    id: 3,
    title: 'Xem chi tiết',
    icon: 'information',
  },
  {
    id: 4,
    title: 'Xác nhận chuyển món',
    icon: 'check-bold',
  },
];

const ACTIVE_FOOD = [
  {
    id: 0,
    title: 'Chỉnh sửa thông tin',
    icon: 'cookie-edit',
  },
  {
    id: 1,
    title: 'Xoá món ăn',
    icon: 'delete',
  },
  {
    id: 2,
    title: 'Ngừng bán món ăn',
    icon: 'food-drumstick-off',
  },
  {
    id: 3,
    title: 'Bán món ăn',
    icon: 'food-drumstick',
  },
];

const ACTIVE_EMP = [
  {
    id: 0,
    title: 'Chỉnh sửa thông tin',
    icon: 'account-edit',
  },
  {
    id: 1,
    title: 'Xoá nhân viên',
    icon: 'delete',
  },
  {
    id: 2,
    title: 'Giao phó nhân viên quản lý bàn',
    icon: 'food',
  },
];

const ACTIVE_CUS = [
  {
    id: 0,
    title: 'Chỉnh sửa thông tin',
    icon: 'account-edit',
  },
  {
    id: 1,
    title: 'Xoá khách hàng',
    icon: 'delete',
  },
];

const STATUS_TABLE = {
  clean: {
    title: 'Bàn Trống',
    color: '#343434',
    backgroundColor: '#fff',
  },
  booked: {
    title: 'Đã đặt',
    color: '#fafafa',
    backgroundColor: '#3E3E3E',
  },
  wait: {
    title: 'Đợi món',
    color: '#343434',
    backgroundColor: '#F9E060',
  },
  ship: {
    title: 'Đã có món',
    color: '#fafafa',
    backgroundColor: '#EE6F57',
  },
  done: {
    title: 'Hoàn thành',
    color: '#fafafa',
    backgroundColor: '#379237',
  },
};

const FLOOR = [
  {
    key: 1,
    value: '1',
  },
  {
    key: 2,
    value: '2',
  },
  {
    key: 3,
    value: '3',
  },
  {
    key: 4,
    value: '4',
  },
];

const CHAIR = [
  {
    key: 2,
    value: '2',
  },
  {
    key: 4,
    value: '4',
  },
  {
    key: 6,
    value: '6',
  },
  {
    key: 8,
    value: '8',
  },
  {
    key: 10,
    value: '10',
  },
];

export {
  OPTION_TABLE,
  OPTION_FOOD,
  ACTIVE_TABLE,
  STATUS_TABLE,
  CMS,
  ACTIVE_EMP,
  ACTIVE_FOOD,
  FLOOR,
  CHAIR,
  ACTIVE_CUS,
};
