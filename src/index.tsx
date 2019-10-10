import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { name, version } from '../package.json';

const log = message => console.log(`${name}@${version} - ${message}`);

const isDefined = value => (typeof value !== 'undefined' && value !== null ? true : false);

export default (options: any = {}) => {
	const env = isDefined(process.env.NODE_ENV) && process.env.NODE_ENV !== '' ? process.env.NODE_ENV : 'development';

	const wd = isDefined(options) && isDefined(options.dir) ? options.dir : process.cwd();

	[`.env.${env}`, `.env`].forEach(relative => {
		const absolute = join(wd, relative);

		if (existsSync(absolute)) {
			const content = readFileSync(absolute, 'utf-8').toString();

			content.split(/\n|\r|\r\n/).forEach(line => {
				if (isDefined(line) && line !== '') {
					const keyVal = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

					if (isDefined(keyVal)) {
						// tslint:disable-next-line:prefer-const
						let [, key, value] = keyVal;

						while (value.indexOf('process.env.') !== -1) {
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

						if (!isDefined(process.env[key])) {
							process.env[key] = value;
						}
					}
				}
			});
		}
	});
};
