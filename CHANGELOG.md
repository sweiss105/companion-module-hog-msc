# Changelog

All notable changes will be documented here. This project follows Semantic Versioning while releases remain experimental.

## [Unreleased]

## [0.1.3] - 2026-09-09

### Fixed

- Log each successful transmission at info level with its resolved action description and exact MIDI bytes so Companion log exports retain the event.

## [0.1.2] - 2026-09-09

### Fixed

- Bundle the `@julusian/midi` JavaScript native-loader while deferring native initialization until USB MIDI is enumerated or used.
- Restore USB output enumeration from an installed Companion package; version 0.1.1 included native binaries but omitted the loader that resolves them.

## [0.1.1] - 2026-09-09

### Fixed

- Package the `@julusian/midi` native prebuilt binaries so installed Companion modules can enumerate USB MIDI devices.
- Declare the required Companion `native-addons` runtime permission.
- Correct repository and issue URLs to the `sweiss105` GitHub repository.

## [0.1.0] - Unreleased

### Added

- Initial TypeScript Companion module scaffold.
- MSC encoding, FIFO pacing, three transports, actions, presets, scene feedback, transport variable, docs, tests, and community files.

First development release. Any GitHub release should be marked as a pre-release until transport and Hog OS 5 behavior are physically qualified.
