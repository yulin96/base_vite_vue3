import cryptoJS from 'crypto-js'

/**
 * 测试加密
 */

const md5 = cryptoJS.MD5(Date()).toString()
const md52 = md5.slice(8, 24)
console.log(md5, md52, md52.length)

const key = cryptoJS.enc.Utf8.parse('91a48a8af7e580d8401514c01e2dda22')

const iv = cryptoJS.enc.Utf8.parse('f7e580d8401514c0')

const encrypted = cryptoJS.AES.encrypt(JSON.stringify({ name: 'yuyu', age: '12111' }), key, { iv }).toString()

console.log(encrypted)

const data = cryptoJS.AES.decrypt(encrypted, key, { iv: cryptoJS.enc.Utf8.parse('f7e580d8401614c0') }).toString(
  cryptoJS.enc.Utf8
)
console.log(data)
