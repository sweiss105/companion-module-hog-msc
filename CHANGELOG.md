# Changelog

All notable changes will be documented here. This project follows Semantic Versioning while releases remain experimental.

## [Unreleased]

- Reconcile setup, tracking, recovery, and action documentation with attended USB testing; add a bounded hardware acceptance record. No runtime changes.

## [0.1.13] - 2026-09-09

- Require explicit List for STOP, RESUME, and Release; reject blank targets before queueing, following failed targetless USB tests and a successful explicit Release comparison.

## [0.1.12] - 2026-09-09

- Remove raw TCP and RTP-MIDI/AppleMIDI transports and network configuration fields. USB MIDI is the only supported transport. Older network configurations require explicit USB selection before connecting.

## [0.1.11] - 2026-09-09

- Add Release All Lists, Release All Scenes, and Release All actions and presets using snapshots of tracked active targets, individual queued releases, and existing return reconciliation. Operator verification of tracked state is required.

## [0.1.10] - 2026-09-09

- Detect USB MIDI output removal while idle and automatically reopen the selected output, with connection status transitions and handle cleanup.

## [0.1.9] - 2026-09-09

- Accept the empty cue-path field captured in native Hog list GO/Release returns, fixing reconciliation after console-operated list changes.

## [0.1.8] - 2026-09-09

- Add List State feedback with explicit-list send tracking and automatic return MSC reconciliation. STOP retains state; scenes and unidentified targets remain separate.

## [0.1.7] - 2026-09-09

- Automatically reconcile Scene State and Toggle with accepted return Hog GO/Release events. Existing feedback configurations continue working.
- Preserve a return event received during a send when its completion callback updates state.

## [0.1.6] - 2026-09-09

### Added

- Optional receive-only USB return MSC monitoring with exact device and native scene format filtering.
- Separate Hog-reported active, observation availability, and local/return mismatch feedbacks; no automatic changes to local Toggle state.
- Clear observations on lifecycle changes and invalidate a scene observation before a new send.

## [0.1.5] - 2026-09-09

### Fixed

- Correct scene GO/Release/Toggle addressing to match captured Hog output: empty cue, scene number in the cuelist field, and binary path `05`. The previous encoding could operate the chosen scene instead of the configured target.
- Replace stale Event Monitor guidance with Companion transmission logs and separate physical verification.

## [0.1.4] - 2026-09-09

### Changed

- Require both List and Cue for GO. Controlled Hog OS 5 USB testing found that six list-only and two targetless GO transmissions were ignored.
- Block incomplete GO actions with a clear validation error before MIDI is queued or transmitted.

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
