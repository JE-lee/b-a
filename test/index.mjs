import { encode, decode } from '../index.mjs'
import { expect } from 'chai'

function test(buffer) {
  const uint8 = new Uint8Array(buffer)
    const base64 = encode(uint8.buffer)
    const buf = decode(base64)
    expect(uint8).to.deep.equal(new Uint8Array(buf))
}

describe('#b-a', function() {
  it('#1', async function() {
    test([0x34])
  })
  it('#2', async function() {
    test[0x34, 0x44]
  })
  it('#2', async function() {
    test[0x34, 0x44, 0x88]
  })
  it('#2', async function() {
    test[0x34, 0x44, 0x23, 0x00]
  })
})