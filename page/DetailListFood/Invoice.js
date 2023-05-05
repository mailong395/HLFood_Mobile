import * as Print from 'expo-print';
import { formatCurrency } from "react-native-format-currency";

export const print = async (isTemp, data, auth, money) => {
  const title = isTemp ? 'Hóa Đơn Tạm Tính' : 'Hóa Đơn'

  const d = new Date(data?.time_booking);
  const dateStr = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

  const getListTable = () => {
    const array = data?.tables?.map(element => {
      return element?.table_num;
    })
    return array?.join();
  }

  const getTotal = () => {
    let total = 0;
    data?.order_details?.map((item) => {
      total += item?.total_detail_price;
    })
    return total;
  }

  const getVAT = () => {
    return data?.vat * getTotal();
  }

  const getTotalPrice = () => {
    return getTotal() + getVAT();
  }

  const getMoneyReturn = () => {
    return +resetMoney() - +getTotalPrice();
  }

  const resetMoney = () => {return money.split(' ').join('')};

  const listDetail = data?.order_details?.map((element, index) => {
    return `
      <tr>
        <th>`+ index++ +`</th>
        <th>` + element?.food.name + `</th>
        <th>` + element?.quantity + `</th>
        <th>` + formatCurrency({ amount:  element?.food.price, code: "VND" })[0] + `</th>
        <th>` + formatCurrency({ amount:  element?.total_detail_price, code: "VND" })[0] + `</th>
      </tr>
    `;
  });
  const cus_pay = !isTemp ?
  `<hr style="width: 100%;" />
  <table class="table-price">
    <tr>
      <td><b>Tiền khách trả:</b></td>
      <td class="text-right">` + formatCurrency({ amount:  resetMoney(), code: "VND" })[0] + `</td>
    </tr>
    <tr>
      <td><b>Tiền thối lại:</b></td>
      <td class="text-right">` + formatCurrency({ amount:  getMoneyReturn(), code: "VND" })[0] + `</td>
    </tr>
  </table>` : ``;
  const html = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 16px;
          }
          .table-info {
            width: 100%;
            border-spacing: 10px;
          }
          .label-info {
            width: 100px;
          }
          .table-detail {
            width: 100%;
            text-align: center;
          }
          .table-price {
            width: 100%;
          }
          .text-right {
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nhà Hàng Đồng Quê</h1>
          <p>920/73 Quang Trung, P.8, Gò Vấp, TP.HCM</p>
          <br>
          <h2>` + title + `</h2>
          <h3>Bàn: ` + getListTable() + `</h3>
          <br><hr style="width: 100%;" />
          <table class="table-info">
            <tr>
              <td class="label-info"><b>Số HĐ:</b></td>
              <td>` + data?._id + `</td>
            </tr>
            <tr>
              <td class="label-info"><b>Thời gian:</b></td>
              <td>` + dateStr + `</td>
            </tr>
            <tr>
              <td class="label-info"><b>MSNV:</b></td>
              <td>`+ auth?.data?._id + `</td>
            </tr>
          </table>
          <hr style="width: 100%;" />
          <table class="table-detail">
            <tr>
              <th>STT</th>
              <th>Tên món</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
            ` + listDetail.join('') + `
          </table>
          <br><hr style="width: 100%;" />
          <table class="table-price">
            <tr>
              <td><b>Tổng tiền:</b></td>
              <td class="text-right">` + formatCurrency({ amount: data?.total_order_price, code: "VND" })[0] + `</td>
            </tr>
            <tr>
              <td><b>VAT:</b></td>
              <td class="text-right">` + formatCurrency({ amount: getVAT(), code: "VND" })[0] + `</td>
            </tr>
            <tr>
              <td><b>Phải thanh toán:</b></td>
              <td class="text-right">` + formatCurrency({ amount: getTotalPrice(), code: "VND" })[0] + `</td>
            </tr>
          </table>
          ` + cus_pay + `
        </div>
      </body>
    </html>
  `
  await Print.printAsync({
    html,
  });
};