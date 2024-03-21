import JSEncrypt from 'jsencrypt'

export function createEncryptIns(publicKey: string): { encrypt: (str: string) => string | false }
export function createEncryptIns(
  publicKey: string,
  privateKey?: string,
): { encrypt: (str: string) => string | false; decrypt: (str: string) => string | false }

export function createEncryptIns(publicKey: string, privateKey?: string) {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(publicKey)
  if (privateKey) jsencrypt.setPrivateKey(privateKey)
  return {
    encrypt: (str: string) => {
      return jsencrypt.encrypt(str)
    },
    decrypt: (str: string) => {
      return jsencrypt.decrypt(str)
    },
  }
}

// const encrypt = createEncryptIns('<publicKey>')
// encrypt.encrypt('1231') //加密

// const encrypt2 = createEncryptIns('<publicKey>', '<privateKey>')
// encrypt2.encrypt('1231') //加密
// encrypt2.decrypt('1231') //解密
