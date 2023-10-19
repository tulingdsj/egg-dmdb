# egg-dmdb

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-dmdb.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-dmdb
[download-image]: https://img.shields.io/npm/dm/egg-dmdb.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-dmdb

<!--
Description here.
-->

## Install

```bash
$ npm i egg-dmdb --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.dmdb = {
  enable: true,
  package: 'egg-dmdb',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.dmdb = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
const rows = await this.app.dmdb.query('SELECT * FROM TABLE1 limit 0,3');
console.log(rows);
```

## Questions & Suggestions

Please open an issue [here](https://github.com/tulingdsj/egg-dmdb/issues).

## License

[MIT](LICENSE)
