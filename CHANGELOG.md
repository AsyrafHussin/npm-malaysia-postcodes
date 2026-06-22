# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-06-22

### Breaking Changes

- **Renamed the state `Penang` to `Pulau Pinang`** to match the official name.
  Any code that references the state by the string `"Penang"` (for example
  `getCities("Penang")` or matching `searchAll` results) must be updated to
  `"Pulau Pinang"`. The city named `Penang Hill` is unchanged.
- Removed 12 invalid postcodes under Pulau Pinang.

### Added

- Johor: **Ibrahim International Business District** (`80888`).
- Sabah: **Tenghilan** (`89260`).
- Sarawak: **Pusat Mel Miri** (`98070`) and **Sibu Jaya** (`96010`).
- Perak / Kampar: postcodes `31920` and `31950`.
- Johor / Iskandar Puteri: postcode `79050`.

### Changed

- Performance: the lookup engine was rewritten with indexed maps and a trie.
  Exact lookups (`findPostcode`, `findCities`, `getPostcodes`) are now O(1) and
  `getPostcodesByPrefix` is O(prefix length). The public API is unchanged.
- Data corrections / renames:
  - Johor: `Nusajaya` → `Iskandar Puteri`.
  - Negeri Sembilan: `Pusat  Bandar Palong` → `Pusat Bandar Palong`.
  - Pahang: `Bandar Pusat  Jengka` → `Bandar Pusat Jengka`.
  - Perak: `Seri Manjong` → `Seri Manjung`, `Tldm Lumut` → `TLDM Lumut`.
  - Selangor: `Klia` → `KLIA`.

### Removed

- Johor: `Ulu Choh`; postcode `71590` from `Pekan Nenas`.
- Negeri Sembilan: `Bandar Baru Serting`.
- Perak: `Mambang Di Awan` (its postcodes moved to `Kampar`); postcode `42160`
  from `Rantau Panjang`.

### Internal

- Example apps modernized to React 19, Vite 8 and TypeScript 6.
- Development dependencies and CI actions updated.

Postcode data is synced from the upstream
[malaysia-postcodes](https://github.com/AsyrafHussin/malaysia-postcodes) repository.

[3.0.0]: https://github.com/AsyrafHussin/npm-malaysia-postcodes/compare/v2.7.3...v3.0.0
