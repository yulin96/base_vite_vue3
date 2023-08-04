import JSEncrypt from 'jsencrypt'

const pubKey = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD+O8c7RhkUXmHaQ47GUmujoutFOW5Yo8CI6fVeptQWg7djc/l94xizZV7Im7+1PlUeZUZPZ+iV4qDEN7iA1MzcQPU0qkO8TcuUNBkRIgnqR1v1HGXpsKxVO1Nt2ZFVa2kg0RXweZH1++71R4YHg0XWz5uyUqzP6n8ikP43nCIgrwIDAQAB-----END PUBLIC KEY-----`

export const publicEncrypt = (str: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(pubKey)
  return encrypt.encrypt(str)
}

const privKey = `-----BEGIN PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAP47xztGGRReYdpDjsZSa6Oi60U5blijwIjp9V6m1BaDt2Nz+X3jGLNlXsibv7U+VR5lRk9n6JXioMQ3uIDUzNxA9TSqQ7xNy5Q0GREiCepHW/UcZemwrFU7U23ZkVVraSDRFfB5kfX77vVHhgeDRdbPm7JSrM/qfyKQ/jecIiCvAgMBAAECgYAskYw2vu4snPMokUlZSR+nmysFgrDuhx58og8q3bI2lDa1D6LAR+yPnojEQFGWU2wWnQh7aSrkA8vNOjt1ElkrNiFwxqQjcoLATll4WTmH2Fgj01nGk2O4TOCaP2FQJ0QYNaz2fjXY4Tz7w7qiNYBpVcAAT6UsRUWoXgtCYP8c+QJBAP8g7IbRkdIFyg6/H8CsfNT/18wANH+KJyJi4syDXWLbXQSo+7LtYQSAUcmRVZEj29Ns4lH4fxtgAN5+sxp9UqsCQQD/GhJY8ogZR+vyG3hqywJ+ug1qefEPexfHluvjxoUzTsjoAdHVaI07kvsW9W6KCfELK9j9h415ObM04SYRnsoNAkEA0xuWPFSrOcNKl/s0NgVEYie1k/tTdXmGumBi1OGaY5Oqm5GMfFkKH2RiyMy2phuq6X6+ox9hZfCBp5nlb/TlcwJBAMAwBi6Y2cwiETIfXAMo2sJarQzQvbnqBKpLm3/I6kUTT+zqogljcTO2shBD63l3r++4owuuefkgbVCjZyjTNmkCQHAbJIWzYLsN9Gu2cZrRKHHKyb6AmRs4ZTj9O9WhIBzguvATo+3pTuIkcCYpM1zd/ikS+oO4rfg4Ak3K4zfg/ZQ=-----END PRIVATE KEY-----`

export const privDecrypt = (str: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPrivateKey(privKey)
  return encrypt.decrypt(str)
}
