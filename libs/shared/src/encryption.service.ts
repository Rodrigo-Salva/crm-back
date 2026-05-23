import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private masterKey: Buffer;

  constructor() {
    const envKey = process.env.ENCRYPTION_KEY;
    if (envKey) {
      this.masterKey = Buffer.from(envKey, 'hex');
      if (this.masterKey.length !== KEY_LENGTH) {
        this.masterKey = crypto.scryptSync(envKey, 'crm-salt', KEY_LENGTH);
      }
    } else {
      this.masterKey = crypto.randomBytes(KEY_LENGTH);
      this.logger.warn('ENCRYPTION_KEY not set, using random key (data will be lost on restart)');
    }
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, this.masterKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    const [ivHex, authTagHex, data] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, this.masterKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  hash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  generateKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
