import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

interface PngChunk {
	type: string;
	data: Buffer;
}

export function firstFramePngPath(texturePath: string, cacheRoot: string): string {
	if (!fs.existsSync(`${texturePath}.mcmeta`)) {
		return texturePath;
	}

	try {
		const sourceStat = fs.statSync(texturePath);
		const cacheKey = crypto
			.createHash('sha1')
			.update(`${texturePath}:${sourceStat.mtimeMs}:${sourceStat.size}`)
			.digest('hex');
		const cachePath = path.join(cacheRoot, 'animated-texture-frames', `${cacheKey}.png`);
		if (fs.existsSync(cachePath)) {
			return cachePath;
		}

		const cropped = cropTopSquareFrame(fs.readFileSync(texturePath));
		if (!cropped) {
			return texturePath;
		}

		fs.mkdirSync(path.dirname(cachePath), { recursive: true });
		fs.writeFileSync(cachePath, cropped);
		return cachePath;
	} catch {
		return texturePath;
	}
}

function cropTopSquareFrame(source: Buffer): Buffer | undefined {
	if (!source.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
		return undefined;
	}

	const chunks = readPngChunks(source);
	const ihdr = chunks.find(chunk => chunk.type === 'IHDR');
	if (!ihdr || ihdr.data.length !== 13) {
		return undefined;
	}

	const width = ihdr.data.readUInt32BE(0);
	const height = ihdr.data.readUInt32BE(4);
	const bitDepth = ihdr.data[8];
	const colorType = ihdr.data[9];
	const compression = ihdr.data[10];
	const filter = ihdr.data[11];
	const interlace = ihdr.data[12];
	if (height <= width || compression !== 0 || filter !== 0 || interlace !== 0) {
		return undefined;
	}

	const bitsPerPixel = pngBitsPerPixel(bitDepth, colorType);
	if (!bitsPerPixel) {
		return undefined;
	}

	const idatData = Buffer.concat(chunks.filter(chunk => chunk.type === 'IDAT').map(chunk => chunk.data));
	const inflated = zlib.inflateSync(idatData);
	const bytesPerRow = 1 + Math.ceil((width * bitsPerPixel) / 8);
	const frameHeight = width;
	const frameByteLength = bytesPerRow * frameHeight;
	if (inflated.length < frameByteLength) {
		return undefined;
	}

	const newIhdrData = Buffer.from(ihdr.data);
	newIhdrData.writeUInt32BE(frameHeight, 4);

	const outputChunks: Buffer[] = [PNG_SIGNATURE];
	for (const chunk of chunks) {
		if (chunk.type === 'IHDR') {
			outputChunks.push(writePngChunk('IHDR', newIhdrData));
			continue;
		}

		if (chunk.type === 'IDAT') {
			continue;
		}

		if (chunk.type === 'IEND') {
			outputChunks.push(writePngChunk('IDAT', zlib.deflateSync(inflated.subarray(0, frameByteLength))));
			outputChunks.push(writePngChunk('IEND', Buffer.alloc(0)));
			continue;
		}

		outputChunks.push(writePngChunk(chunk.type, chunk.data));
	}

	return Buffer.concat(outputChunks);
}

function readPngChunks(source: Buffer): PngChunk[] {
	const chunks: PngChunk[] = [];
	let offset = PNG_SIGNATURE.length;

	while (offset + 12 <= source.length) {
		const length = source.readUInt32BE(offset);
		const type = source.toString('ascii', offset + 4, offset + 8);
		const dataStart = offset + 8;
		const dataEnd = dataStart + length;
		if (dataEnd + 4 > source.length) {
			break;
		}

		chunks.push({ type, data: source.subarray(dataStart, dataEnd) });
		offset = dataEnd + 4;
		if (type === 'IEND') {
			break;
		}
	}

	return chunks;
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

function pngBitsPerPixel(bitDepth: number, colorType: number): number | undefined {
	switch (colorType) {
		case 0:
			return bitDepth;
		case 2:
			return bitDepth * 3;
		case 3:
			return bitDepth;
		case 4:
			return bitDepth * 2;
		case 6:
			return bitDepth * 4;
		default:
			return undefined;
	}
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
