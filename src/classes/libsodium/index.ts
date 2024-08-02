export class LibSodium {
    
    private sodium;
    
    constructor(libsodium: typeof import("libsodium-wrappers")){
        this.sodium = libsodium;
    }

    async generate_key_pair() {
        await this.sodium.ready
        const keyPair = this.sodium.crypto_box_keypair();
        return keyPair;
    }

    async string_to_uint_8_array(value: string) {
        await this.sodium.ready
        return this.sodium.from_string(value);
    }

    async uint_8_array_to_string(value: Uint8Array){
        await this.sodium.ready
        return this.sodium.to_string(value);
    }

    async uint_8_array_to_hex(value: Uint8Array){
        await this.sodium.ready
        return this.sodium.to_hex(value);
    }

    async hex_to_uint_8_array(value: string){
        await this.sodium.ready
        return this.sodium.from_hex(value);
    }

    async encrypt_with_public_and_private_keys(public_key: Uint8Array, private_key: Uint8Array, value: string) {
        await this.sodium.ready
        const nonce = this.sodium.randombytes_buf(this.sodium.crypto_secretbox_NONCEBYTES);
        const encryptedValue = this.sodium.crypto_box_easy(value, nonce, public_key, private_key);
        const result = new Uint8Array(nonce.length + encryptedValue.length);
        result.set(nonce, 0);
        result.set(encryptedValue, nonce.length);
        return this.sodium.to_hex(result);
    }

    async decrypt_with_public_and_private_keys(public_key: Uint8Array, private_key: Uint8Array, encryptedValue: string) {
        await this.sodium.ready
        const nonce = this.sodium.from_hex(encryptedValue).slice(0, this.sodium.crypto_secretbox_NONCEBYTES);
        const encryptedValueBytes = this.sodium.from_hex(encryptedValue).slice(this.sodium.crypto_secretbox_NONCEBYTES);
        const decryptedValue = this.sodium.crypto_box_open_easy(encryptedValueBytes, nonce, public_key, private_key);
        return this.sodium.to_string(decryptedValue);
    }
}