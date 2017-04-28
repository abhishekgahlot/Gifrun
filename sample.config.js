module.exports = {
  port: 80,
  s3: {
    accessKeyId: 'xxxxx',
    secretAccessKey: 'xxxxx',
    region: 'eu-central-1',
    params: {
      Bucket: 'gifrun',
      Delimiter: '',
      EncodingType: 'url',
      Prefix: 'img/'
    },
    prefix: 'https://s3.eu-central-1.amazonaws.com/'
  },
  db: {
    name: 'gifrun',
    users: {
      name: 'users',
      indexField: 'email'
    },
    gifs: {
      name: 'gifs',
      secondaryIndexField: 'name'
    }
  },
  cloudvision: {
    "type": "service_account",
    "project_id": "gifrun-149415",
    "private_key_id": "xxxxx",
    "private_key": "xxxxx",
    "client_email": "gifrun-149415@appspot.gserviceaccount.com",
    "client_id": "xxxxx",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/"
  },
  crypto: {
    password: 'xxxxx'
  },
  auth: {
    facebook: {
      id: 'xxxxx',
      secret: 'xxxxx',
      callback: 'http://gif.run/login/facebook/callback',
      profileFields: ['id', 'emails', 'name']
    },
    twitter: {
      consumerKey: 'xxxxx',
      consumerSecret: 'xxxxx',
      callbackURL: "http://gif.run/login/twitter/callback",
      includeEmail: true
    },
    google: {
      clientID: 'xxxxx',
      clientSecret: 'xxxxx',
      callbackURL: "http://gif.run/login/google/callback"
    }
  },
  saltRounds: 11,
};
