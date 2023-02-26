// List kind of table
const OPTION_TABLE = [
    {
        id: 0,
        title: "Tất cả",
    },
    {
        id: 1,
        title: "Trống",
    },
    {
        id: 2,
        title: "Đã có món",
    },
    {
        id: 3,
        title: "Bàn Đặt",
    },
    {
        id: 4,
        title: "Đợi món",
    },
];

// List kind of fond
const OPTION_FOOD = [
    {
        id: 0,
        title: 'Tất cả',
    },
    {
        id: 1,
        title: 'Món No',
    },
    {
        id: 2,
        title: 'Món Tráng Miệng',
    },
    {
        id: 3,
        title: 'Nước Uống',
    },
    {
        id: 4,
        title: 'Món Khô',
    },
    {
        id: 5,
        title: 'Món Nước',
    },
];

const ACTIVE_TABLE = [
    {
        id: 0,
        title: "Thêm món",
        color: "#379237",
    },
    {
        id: 1,
        title: "Chuyển bàn",
        color: "#EE6F57",
    },
    {
        id: 2,
        title: "Ghép bàn",
        color: "#3E3E3E",
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
        color: '#fafafa',
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
}

export { OPTION_TABLE, OPTION_FOOD, ACTIVE_TABLE, STATUS_TABLE };