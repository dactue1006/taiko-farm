Hướng dẫn chạy project:
1. Cài đặt nodejs: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
2. Sau khi cài đặt thành công kiểm tra bằng lệnh `node -v`
3. Cài đặt yarn: `npm install -g yarn`
4. Chạy lệnh `yarn install`
5. Copy file `.env.example` ra file mới là `.env` sau đó sửa lại là danh sách các private key, cách nhau bởi dấu phẩy `,`
6. Cuối cùng thì chạy lệnh `yarn start:rubyVote`
7. Update: Trường hợp muốn chạy lending meridian thì làm các bước sau:

    a. Swap sẵn một lượng USDC.e (stargate)

    b. chạy lệnh: ```yarn start:meridian```

Note: hiện tại mạng taiko như cc nên có thể đổi rpc url trong file ```meridian/index.js``` từ chainlist.org

8. chaỵ robot farm: ```yarn start:robotFarm```
9. chaỵ wrap eth: ```yarn start:wrapETH```