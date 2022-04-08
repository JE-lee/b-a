const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const lookup = {}
for (let i = 0; i < chars.length; i++) {
  lookup[chars[i]] = i
}

export function encode(buf) {
  const uint8 = new Uint8Array(buf)
  const len = uint8.length
  let base64 = ''
  let b1, b2, b3
  for (let i = 0; i < len; i += 3) {
    b1 = uint8[i]
    b2 = uint8[i + 1] || 0
    b3 = uint8[i + 2] || 0
    base64 += chars[b1 >> 2]
    base64 += chars[(b1 & 3) << 4 | b2 >> 4]
    base64 += chars[(b2 & 15) << 2 | b3 >> 6]
    base64 += chars[b3 & 63]
  }
  if (len % 3 === 1) {
    base64 = base64.slice(0, -2) + '=='
  }
  if (len % 3 === 2) {
    base64 = base64.slice(0, -1) + '='
  }
  return base64
}

export function decode(base64) {
  const base64Len = base64.length
  let len = base64Len * 6 / 8
  if (base64[base64Len - 1] === '=') {
    len -= 1
    if (base64[base64Len - 2] === '=') {
      len -= 1
    }
  }

  const uint8 = new Uint8Array(len)
  let p = 0
  let bs1, bs2, bs3, bs4
  for (let i = 0; i < base64Len; i += 4) {
    bs1 = lookup[base64[i]]
    bs2 = lookup[base64[i + 1]]
    bs3 = lookup[base64[i + 2]]
    bs4 = lookup[base64[i + 3]]

    uint8[p] = bs1 << 2 | bs2 >> 4
    uint8[++p] = (bs2 & 15) << 4 | bs3 >> 2
    uint8[++p] = (bs3 & 3) << 6 | bs4
  }
  return uint8.buffer
}