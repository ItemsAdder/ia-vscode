import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as zlib from 'zlib';

import { firstFramePngPath } from '../../itemsadder/animatedPngFirstFrame';

suite('Animated PNG first frame', () => {
	test('crops vertically stacked animated texture to first square frame', () => {
		const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-vscode-png-'));
		const texturePath = path.join(tempDir, 'animated.png');
		fs.writeFileSync(texturePath, createRgbaPng(2, 4));
		fs.writeFileSync(`${texturePath}.mcmeta`, '{"animation":{}}');

		const resolved = firstFramePngPath(texturePath, path.join(tempDir, 'cache'));
		const output = fs.readFileSync(resolved);

		assert.notStrictEqual(resolved, texturePath);
		assert.strictEqual(output.readUInt32BE(16), 2);
		assert.strictEqual(output.readUInt32BE(20), 2);
	});
});

function createRgbaPng(width: number, height: number): Buffer {
	const rows: Buffer[] = [];
	for (let y = 0; y < height; y++) {
		const row = Buffer.alloc(1 + width * 4);
		row[0] = 0;
		for (let x = 0; x < width; x++) {
			const offset = 1 + x * 4;
			row[offset] = y * 50;
			row[offset + 1] = x * 50;
			row[offset + 2] = 0;
			row[offset + 3] = 255;
		}
		rows.push(row);
	}

	const ihdr = Buffer.alloc(13);
	ihdr.writeUInt32BE(width, 0);
	ihdr.writeUInt32BE(height, 4);
	ihdr[8] = 8;
	ihdr[9] = 6;

	return Buffer.concat([
		Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
		writePngChunk('IHDR', ihdr),
		writePngChunk('IDAT', zlib.deflateSync(Buffer.concat(rows))),
		writePngChunk('IEND', Buffer.alloc(0))
	]);
}

function writePngChunk(type: string, data: Buffer): Buffer {
	const typeBuffer = Buffer.from(type, 'ascii');
	const output = Buffer.alloc(12 + data.length);
	output.writeUInt32BE(data.length, 0);
	typeBuffer.copy(output, 4);
	data.copy(output, 8);
	output.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
	return output;
}

function crc32(buffer: Buffer): number {
	let crc = 0xffffffff;
	for (const byte of buffer) {
		crc ^= byte;
		for (let bit = 0; bit < 8; bit++) {
			crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
		}
	}
	return (crc ^ 0xffffffff) >>> 0;
}
