import * as process from 'node:process';

const configData = () => ({
  google: {
    apiKey: process.env.MF_GOOGLE_API_KEY,
  },
  db: {
    mongo: {
      connectionString: process.env.CRESCO_DB_MONGO_CONNECTION_STRING,
    },
  },
  cresco: {
    adminEmail: 't.proshkinas@crescofinance.ru',
    ethUSDTReceiverWallet:"0x543599cc2fd332a8091490a66c63c3"
  },
  exchange:{
    huobi:{
      key:process.env.CRESCO_HUOBI_KEY,
      secret:process.env.CRESCO_HUOBI_SECRET_KEY
    }
  },
  extapis:{
    dashamail:{
      api_key:"189ca1a786d368a5d58850b",
      from_email:"info@cresco.capital"
    },
    biance:{
      key:"xeSNk1ZQ5UKIfWj0CVYzO9JtOWkBINtNuLDIk6AXAACIODuV",
      secret: "G5n59l7afyrKh8BWELymaXZbGSn2uvf3129GKzsgm8rPqdCDhRxnrw45C2HE"
    },
    bytehand:{
      token:"mcL7QULDQxcFHR0WHAAaqyVJ",
      sender:"SMS-INFO"
    }
  },

  sender: {
    smtp: {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'info@cresco.capital',
        pass: process.env.CRESCO_SENDER_SMTP_PASSWORD,
      },
    },
  },
  jwt: { secretKey: process.env.CRESCO_JWT_SECRET_KEY },
  storage: {
    s3: {
      endpoint: process.env.CRESCO_STORAGE_S3_BUCKET_ENDPOINT,
      bucketName: process.env.CRESCO_STORAGE_S3_BUCKET_NAME,
      accessKeyId: process.env.CRESCO_STORAGE_S3_BUCKET_ACCESS_KEY_ID,
      secretKey: process.env.CRESCO_STORAGE_S3_BUCKET_SECRET_KEY,
    },
  },
});

export default configData;
