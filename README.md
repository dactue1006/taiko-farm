Hướng dẫn chạy project:

### TAIKO FARM

1. Cài đặt nodejs: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
2. Sau khi cài đặt thành công kiểm tra bằng lệnh `node -v`
3. Cài đặt yarn: `npm install -g yarn`
4. Chạy lệnh `yarn install`
5. Copy file `.env.example` ra file mới là `.env` sau đó sửa lại là danh sách các private key, cách nhau bởi dấu phẩy `,`
6. Cuối cùng thì chạy lệnh `yarn start:rubyVote`
7. Update: Trường hợp muốn chạy lending meridian thì làm các bước sau:

   a. Swap sẵn một lượng USDC.e (stargate)

   b. chạy lệnh: `yarn start:meridian`

Note: hiện tại mạng taiko như cc nên có thể đổi rpc url trong file `meridian/index.js` từ chainlist.org

8. chaỵ robot farm: `yarn start:robotFarm`
9. chaỵ wrap eth: `yarn start:wrapETH`

### LISK FARM

1. Làm từ bước 1 tới bước 5 giống như trên
2. Chạy các lệnh sau để farm:

   a. Chạy farm dmail (30 tx): `yarn lisk:start:sendMail`

   b. Chạy farm wrap and unwrap eth(40 tx): `yarn lisk:start:wrapETH`

3. Có thể sửa số tx trong file này

   a. Đối với dmail: `lisk/protocols/dmail.js` dòng 46

   b. Đối với wrap ETH: `lisk/protocols/wrapETH.js` dòng 90
