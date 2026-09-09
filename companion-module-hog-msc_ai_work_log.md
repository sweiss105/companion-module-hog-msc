# companion-module-hog-msc AI Work Log

Purpose:

- Preserve a durable, chronological working history for future AI agents.
- Record meaningful agent work and manual work reported by the user.
- Make completed, verified, pending, blocked, and proposed work unambiguous.
- Newest entries are added at the top.

Operating rules:

- Read this entire file before making project changes.
- Verify current state against project files and tools whenever practical.
- Preserve exact paths, filenames, identifiers, commands, versions, and user decisions when they matter.
- Do not record secrets, credentials, access tokens, or unnecessary personal data.
- Do not rewrite or silently delete prior history. Correct it with a newer entry that explains the change.
- Keep entries concise and evidence-based; link related work instead of copying large outputs.

## Current project snapshot

- Goal: unofficial Bitfocus Companion module, display name `ETC Hog 5 MIDI Show Control`, official support target Hog OS 5 only.
- Authoritative project root: `/Users/steve.weiss/Documents/ChatGPT/Hog 5 MSC Companion Module`.
- Public repository: `https://github.com/sweiss105/companion-module-hog-msc`, branch `main`.
- Version: `0.1.1` development scaffold; first eventual GitHub release is intended to be a pre-release.
- Known-good boundary: local lint, TypeScript build, 5 offline tests, native-prebuild package generation/content inspection, and packaged-module import pass for `hog-msc-0.1.1.tgz`; GitHub CI and Bitfocus checks for this fix are pending.
- USB packaging defect: fixed locally by declaring the `native-addons` permission and packaging `@julusian/midi` prebuilds for supported macOS, Linux, and Windows architectures. Reinstallation and enumeration inside Companion remain pending.
- Not qualified: no MSC command has been transmitted to or observed by Hog OS 5; AppleMIDI and raw TCP also remain untested.
- Immediate next step: install `hog-msc-0.1.1.tgz` in Companion and confirm that `C2MIDI Pro Port 1` appears in the USB output dropdown before sending any command.

## Work history

### [2026-09-09 08:55 CDT] Fixed USB MIDI native-addon packaging and built version 0.1.1

Actor: agent, with user authorization

Context and request:

- The user approved implementation of the diagnosed USB MIDI packaging fix.

Completed:

- Added `build-config.cjs` with the Bitfocus packager declaration `prebuilds: ['@julusian/midi']`.
- Added Companion runtime permission `native-addons: true`.
- Bumped the development package and manifest version to `0.1.1` so Companion can distinguish the repaired package from the broken `0.1.0` install.
- Corrected repository and issue URLs to `sweiss105/companion-module-hog-msc`.
- Built replacement package `hog-msc-0.1.1.tgz` at the project root.

Validation:

- `corepack yarn check`: passed (lint, TypeScript build, 5 offline tests).
- `corepack yarn package`: passed and recognized the additional build configuration.
- Archive inspection confirmed packaged `@julusian/midi` N-API binaries for macOS arm64/x64, Linux arm64/x64, and Windows arm64/x64.
- Direct import of `pkg/hog-msc/main.js` passed and returned the expected default module function.
- No MIDI or Hog MSC command was sent; Companion reinstallation and physical Hog OS 5 qualification remain pending.

Remaining / next step:

- Commit and push the fix, confirm GitHub checks, then install `hog-msc-0.1.1.tgz` in Companion.
- Confirm USB device enumeration before requesting fresh authorization for a bounded command test against Hog OS 5 Event Monitor.

### [2026-09-09 08:52 CDT] Diagnosed missing USB MIDI device as a packaging defect

Actor: user and agent

Context and request:

- During the planned attended test, the user reported that the installed Companion module did not see the USB MIDI device.
- The diagnostic scope was read-only; no MIDI or Hog command was sent.

Completed:

- Confirmed the local native MIDI library enumerates `C2MIDI Pro Port 1` along with the host's virtual MIDI ports.
- Inspected `hog-msc-0.1.0.tgz` and confirmed it contains no `midi.node` native binary or `@julusian/midi` prebuild directory.
- Compared the project with Bitfocus's current `companion-module-generic-midi` implementation and official native-dependency packaging guidance.
- Identified the missing requirements: `build-config.cjs` must declare `prebuilds: ['@julusian/midi']`, and `companion/manifest.json` must declare runtime permission `native-addons: true`.

Validation:

- Local `@julusian/midi` enumeration returned `C2MIDI Pro Port 1`; this proves macOS and the development dependency can see the output on this host.
- Package-content inspection returned no MIDI native binding; this directly explains why the installed package cannot enumerate the interface.
- No implementation fix, package rebuild, Companion reinstall, or physical Hog test was performed in this diagnostic step.

Remaining / next step:

- With user approval to implement the fix, add the two native packaging declarations, build and inspect a replacement package, run local and GitHub checks, and reinstall it in Companion.
- Confirm device enumeration before requesting fresh authorization to send a harmless MSC test command to Hog OS 5 Event Monitor.

### [2026-09-08 19:00 CDT] Scheduled attended Hog testing for September 9

Actor: user

Context and request:

- The user reported that a Hog console will be available for testing tomorrow, September 9, 2026.

Completed:

- Recorded the planned attended test window as the next project acceptance milestone.

Validation:

- User-reported availability only; not independently verified.
- No Companion or Hog test has occurred yet, and no physical-qualification status changed.

Remaining / next step:

- On September 9, load the module in Companion and begin with a bounded USB MIDI test against Hog OS 5 Event Monitor using a non-production show and harmless, explicitly selected targets.
- Record Companion version, Hog OS 5 version, host operating system, MIDI interface identity, configured MSC Device ID, exact action tested, bytes observed, and pass/fail result without including sensitive show data.
- Keep RTP-MIDI/AppleMIDI and raw TCP unqualified until each receives its own test cycle.

### [2026-09-08 18:57 CDT] Repaired and verified GitHub CI and packaged-module loading

Actor: agent

Context and request:

- Complete the authorized GitHub setup with a healthy initial `main` branch rather than leaving the repository's first automated checks failing.

Completed:

- Diagnosed the first CI failure: `actions/setup-node` attempted Yarn caching before Corepack enabled the repository's required Yarn 4 version.
- Removed the premature Yarn cache option and explicitly preapproved the scoped native dependency `@julusian/midi` in `.yarnrc.yml`.
- Diagnosed the Bitfocus module-check failure: the packaged module imported the native MIDI binding at module-load time, so package validation failed on a host without the matching native binding.
- Changed `src/transports/usb.ts` to load `@julusian/midi` only when USB MIDI is enumerated or used. TCP/RTP-only hosts and package validation can now import the module without loading a USB native binding.
- Corrected the Husky/lint-staged command to invoke Yarn 4 through Corepack.
- Pushed CI repair commit `95c7bdd` and packaged-module loading repair commit `7b0f0e94e2a8c49faa404d7d5eaac0e4507cecaa`.

Validation:

- `corepack yarn check`: passed after the repair.
- `corepack yarn package`: passed.
- Direct import of `pkg/hog-msc/main.js` confirmed the packaged default export is a function without loading the USB native binding.
- GitHub CI run `34292848953`: passed.
- Bitfocus Companion Module Checks run `34292849369`: passed.

Remaining / next step:

- Commit and push this final work-log update; live Companion UI and physical Hog OS 5 transport qualification remain pending.

### [2026-09-08 18:53 CDT] Published the initial public GitHub repository

Actor: user and agent

Context and request:

- The user authorized creation of a public GitHub repository under the already authenticated `sweiss105` account, including committing and pushing the current scaffold.

Completed:

- Reinitialized the local repository before publication so the GitHub history contains only this project and does not inherit the Bitfocus template's commit history.
- Created public repository `sweiss105/companion-module-hog-msc` with description `Unofficial Bitfocus Companion module for ETC Hog 5 MIDI Show Control`.
- Added HTTPS remote `origin`, pushed branch `main`, and configured the local branch to track `origin/main`.
- Created root commit `41aa29f60c31d34abbe0eeb56b0b6957e9b38c09` (`feat: initial Hog 5 MSC Companion module`).

Validation:

- `corepack yarn check`: passed immediately before the root commit (lint, TypeScript build, 5 offline tests).
- `git diff --cached --check`: passed before the root commit.
- GitHub repository creation and initial `main` push completed successfully.

Remaining / next step:

- Commit and push this publication record, then verify remote `main` and GitHub Actions status.
- Live Companion loading and physical Hog OS 5 transport qualification remain pending.

### [2026-09-08 18:49 CDT] Expanded the durable record of all prior project work

Actor: user and agent

Context and request:

- The user requested that all previous project work be documented in chronological order in this work log.

Completed:

- Expanded the original implementation entry below with an ordered, phase-by-phase record covering source recovery, standards verification, scaffolding, implementation, documentation, testing, packaging, and the initial handoff boundary.
- Preserved the required newest-first ordering of work-history entries; the detailed steps inside the original entry are oldest-to-newest.
- Retained the later relocation entry separately because it occurred after the initial implementation and changed the authoritative project root.

Validation:

- Re-read the complete work log and compared its claims with the current repository files and Git status.
- `corepack yarn check`: passed (lint, TypeScript build, 5 offline tests).
- No implementation files were changed for this documentation-only update.

Remaining / next step:

- Repository changes remain uncommitted, and the module still requires live Companion and physical Hog OS 5 transport qualification.

### [2026-09-08 18:48 CDT] Relocated the complete project to its authoritative folder

Actor: user and agent

Context and request:

- The user selected `/Users/steve.weiss/Documents/ChatGPT/Hog 5 MSC Companion Module` as the project folder and requested that all previously created files be moved there.

Completed:

- Moved the complete repository from the earlier generated Codex workspace into the selected project root.
- Preserved Git metadata, source, tests, documentation, dependencies, compiled output, package staging files, and `hog-msc-0.1.0.tgz`.
- Removed the old source folder only after a recursive comparison reported no differences.

Files and decisions:

- The authoritative root is now `/Users/steve.weiss/Documents/ChatGPT/Hog 5 MSC Companion Module`.
- The durable work log remains `companion-module-hog-msc_ai_work_log.md` at the project root.

Validation:

- Pre-removal `diff -qr` between the old and new project trees reported no differences.
- Confirmed the old project path no longer exists and the new root retains the Git repository.
- `corepack yarn check`: passed after relocation (lint, TypeScript build, 5 offline tests).
- Repository implementation remains uncommitted.

Remaining / next step:

- The physical/live qualification boundary is unchanged: load the module in Companion and test USB MIDI into Hog OS 5 Event Monitor in a non-show environment.

### [2026-09-08 18:45 CDT] Created and offline-validated the initial Companion module

Actor: agent, using design decisions supplied by the user in the referenced `Compare MTC And LTC` conversation

Context and request:

- Create the `companion-module-hog-msc` project root and implement the initial TypeScript repository from the completed design interview.

Completed:

- The implementation proceeded in this chronological order:
  1. Read the referenced `Compare MTC And LTC` conversation backward through its available history and treated the user's accepted design decisions as the functional source of truth.
  2. Read the `maintain-project-work-log` instructions and searched prior memory for relevant project history; no prior module implementation was found.
  3. Verified current official Bitfocus Companion module conventions and ETC Hog MSC command documentation before writing protocol code.
  4. Confirmed the original generated workspace contained only `work/` and `outputs/`, then cloned the official `bitfocus/companion-module-template-ts` repository into a new `companion-module-hog-msc` root.
  5. Replaced template identity and metadata with package name `companion-module-hog-msc`, display name `ETC Hog 5 MIDI Show Control`, development version `0.1.0`, community/unofficial manufacturer identity, Node 22 runtime, and Hog/MSC keywords.
  6. Added `src/msc.ts` with General Lighting MSC envelopes and encoders for GO, STOP, RESUME, TIMED_GO, GO_OFF/Release, OPEN_CUE_PATH/Change Page, Hog scene path 5, broadcast addressing, raw SysEx validation, and debug byte formatting.
  7. Added `src/validation.ts` to validate resolved List, Cue, Scene, and Page values; List/Scene/Page are whole non-negative numbers and Cue supports decimals.
  8. Added `src/queue.ts` with FIFO ordering, a configurable 0–500 ms inter-command delay, per-item post-transmission callbacks, and queue discard behavior.
  9. Added transport interfaces and implementations under `src/transports/`: USB MIDI via `@julusian/midi`, plain unframed raw MIDI over TCP via Node TCP sockets, and an initial manually addressed RTP-MIDI/AppleMIDI UDP session implementation.
  10. Implemented fixed two-second automatic retry for missing/disconnected transports, status transitions, and shutdown cleanup. Corrected the initial AppleMIDI retry timer so it stops after session acceptance and added extended RTP-MIDI command-section lengths up to 4095 bytes.
  11. Implemented Companion connection configuration in `src/config.ts`: one selected transport per instance, specific decimal MSC Device ID or broadcast/all-call, USB output selection, network host/port, optional local RTP session name, and inter-command delay.
  12. Implemented `src/main.ts` lifecycle handling, transport creation, queue integration, Companion status mapping, transmit logging, queue discard on disconnect, and local scene-state reset on reconnect or configuration change.
  13. Implemented actions in `src/actions.ts`: GO, STOP, RESUME, Release, Skip Forward, Skip Back, Change Page, Go Scene, Release Scene, Toggle Scene, Reset All Scene States, and Raw SysEx.
  14. Implemented binary Scene State feedback in `src/feedbacks.ts`, the simple `Connected`/`Disconnected`/`Reconnecting` transport variable in `src/variables.ts`, generic one-shot presets in `src/presets.ts`, and the empty future migration framework in `src/upgrades.ts`.
  15. Made scene tracking shared by Scene Number, allowed multiple scenes to remain active simultaneously, and changed state only from successfully transmitted Go/Release/Toggle Scene commands. Reset All Scene States remains internal-only and Raw SysEx remains opaque.
  16. Added concise field help, predictable blank defaults, generic user-editable button labels, and the Change Page preset placeholder. No last-used action learning, timestamp variable, per-scene variable, connection feedback, Test Connection, manual Reconnect/Disconnect, Panic/Release All, or multi-target behavior was added.
  17. Installed dependencies using Yarn 4 and added `@julusian/midi`, TypeScript test execution through `tsx`, lockfile generation, ESLint, Prettier, and consolidated `format`, `build`, `lint`, `test`, `check`, and `package` scripts.
  18. Added unit tests for ETC's documented GO List 1 Cue 34.4 byte string, current GO, GO List, list controls, zero-time TIMED_GO, Change Page, scene cue path 5, broadcast addressing, raw SysEx preservation/rejection, and FIFO completion order.
  19. Added GitHub Actions CI plus Bitfocus's reusable module checks, bug and feature issue forms, a pull-request checklist, `.gitignore`, and `.prettierignore`.
  20. Added `README.md`, `companion/HELP.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and the MIT `LICENSE`. The README prominently records unofficial ETC affiliation, AI-assisted/human-directed development with no independent human code verification, no warranty, Hog OS 5-only support, and test-before-live-use guidance.
  21. Documented the known protocol discrepancy for Skip Forward/Back: the accepted design described an optional List only, while ETC documents TIMED_GO as requiring zero time, cue, and cuelist. The initial safe implementation therefore requires an explicit destination Cue pending physical Hog OS 5 qualification.
  22. Removed the official template's upstream Git remote so the project would not accidentally publish back to the template repository.
  23. Ran formatting and iteratively corrected Companion API typing, variable-expression assumptions, generic action-field typing, lint configuration coverage for tests, promise lint findings, queue timer handling, and package scripts until all offline checks passed.
  24. Built the Companion distribution package `hog-msc-0.1.0.tgz` and a source archive for the initial handoff.
  25. Created this project-root work log with the exact implemented-versus-pending and offline-versus-physical validation boundary.

Files and decisions:

- `src/msc.ts` is the protocol encoder; MSC command format is fixed to General Lighting `0x01`.
- `src/queue.ts` updates scene state only from the post-transmission callback. Queued commands are discarded on disconnect.
- One transport and one Hog target are configured per module instance. Inter-command delay is 0–500 ms. Reconnect is fixed at two seconds. There are no manual connect/disconnect/test actions and no Panic/Release All.
- Scene state is binary, shared by scene number, supports multiple simultaneous active scenes, initializes inactive, and resets on reconnect/restart/configuration change.
- Raw SysEx is opaque and does not affect state; its byte values are sent unchanged after syntax and F0/F7 validation.
- Protocol correction: the design conversation described Skip Forward/Back with only an optional List, but ETC documents `TIMED_GO` as requiring time=0 plus cue and cuelist. Initial actions therefore require an explicit destination Cue; this discrepancy is documented in README and awaits Hog OS 5 physical qualification.
- RTP-MIDI is manually addressed in this initial implementation. Discovery remains pending.

Validation:

- `corepack yarn check`: passed (lint, TypeScript build, 5 tests).
- `corepack yarn package`: passed and produced `hog-msc-0.1.0.tgz`.
- MSC test includes ETC's GO List 1 Cue 34.4 example and immediate TIMED_GO encoding.
- No live or physical transport/Hog validation was performed.

Remaining / next step:

- Load and inspect the module UI in Companion; verify native MIDI installation on supported hosts.
- Test USB MIDI into Hog OS 5 Event Monitor, then raw TCP and a real AppleMIDI peer.
- Add Bonjour/AppleMIDI discovery, transport integration tests, reconnect/disconnect tests, and longer queue timing tests.
- Reconcile Skip Forward/Back behavior against observed Hog OS 5 input/output before changing the action contract.
