import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { name, version } from '../package.json';

const log = message => console.log(`${name}@${version} - ${message}`);

const isDefined = value => (typeof value !== 'undefined' && value !== null && value !== '' ? true : false);

export default (options: any = {}) => {
	const env = isDefined(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

	const cwd = isDefined(options) && isDefined(options.dir) ? options.dir : process.cwd();

	const _cache = {};

	[`.env`, `.env.${env}`].forEach(relative => {
		const absolute = join(cwd, relative);

		if (existsSync(absolute)) {
			const content = readFileSync(absolute, 'utf-8').toString();

			content.split(/\n|\r|\r\n/).forEach(line => {
				if (isDefined(line)) {
					const keyVal = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

					if (isDefined(keyVal)) {
						// tslint:disable-next-line:prefer-const
						let [, key, value] = keyVal;

						if (!isDefined(process.env[key]) || _cache[key]) {
							while (value.match(/\$\{process.env.(.*?)\}/)) {
								value = value.replace(/\$\{process.env.(.*?)\}/, (_, b) => {
									if (isDefined(process.env[b])) {
										return process.env[b];
									} else {
										log(
											`Attempt to use 'undefined' value in interpolations. key: ${key}, interpolation: ${b}, value: ${process.env[b]}`,
										);
										return '';
									}
								});
							}
							_cache[key] = value;
							process.env[key] = value;
						}
					}
				}
			});
		}
	});
};
