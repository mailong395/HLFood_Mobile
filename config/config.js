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
  }
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
    backgroundColor: '#379237',
  },
  done: {
    title: 'Hoàn thành',
    color: '#fafafa',
    backgroundColor: '#379237',
  },
};

export { OPTION_TABLE, OPTION_FOOD, ACTIVE_TABLE, STATUS_TABLE, CMS, ACTIVE_EMP };
