import { join } from 'path';
import env from '../src';

describe('dotenv-flexible', () => {
	describe('no options tests', () => {
		beforeAll(() => {
			env();
		});
		test('exports', () => {
			expect(env).toBeDefined();
			expect(typeof env).toEqual('function');
		});
		test('basic value', () => {
			expect(process.env.PORT).toEqual('8080');
		});
		test('interpolations', () => {
			expect(process.env.HOST).toEqual('http://localhost:8080');
		});
		test('multiple interpolation', () => {
			expect(process.env.COMBINATION).toEqual('something8080/else|http://localhost:8080');
		});
		test('overrides', () => {
			expect(process.env.DEF).toEqual('otherthing');
		});
		test('interpolation overrides', () => {
			expect(process.env.INTERPOLATE_BASE).toEqual('http://localhost:8080');
		});
		test('interpolation with missing values', () => {
			expect(process.env.MISSING).toEqual('');
		});
	});
	describe('custom dir tests', () => {
		beforeAll(() => {
			env({ dir: join(process.cwd(), 'fixtures') });
		});
		test('basic value', () => {
			expect(process.env.ONE).toEqual('two');
		});
	});
	describe('custom dir, custom env', () => {
		beforeAll(() => {
			process.env.NODE_ENV = 'stage';
			env({ dir: join(process.cwd(), 'fixtures') });
		});
		test('basic value', () => {
			expect(process.env.TWO).toEqual('three');
		});
		test('overrides', () => {
			expect(process.env.THREE).toEqual('five');
		});
	});
	describe('default env', () => {
		beforeAll(() => {
			process.env.NODE_ENV = '';
			env({ dir: join(process.cwd(), 'fixtures') });
		});
		test('basic value', () => {
			expect(process.env.FIVE).toEqual('ten');
		});
	});
});
