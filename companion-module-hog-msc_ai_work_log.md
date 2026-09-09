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
- Version: `0.1.3` development scaffold; first eventual GitHub release is intended to be a pre-release.
- Known-good boundary: local lint, TypeScript build, 6 offline tests, package generation/content inspection, packaged-module import, packaged-layout USB enumeration, GitHub CI, and Bitfocus Companion Module Checks pass for version 0.1.3 fix commit `60878dce30cabfac618947df310af68d97dd08ac`; Companion 5.0.3 CSV export confirms its info-level successful-send log with exact bytes. USB enumeration and port-open/OK status are screenshot-confirmed, and the user reports successful Hog OS 5 execution of GO List 47 Cue 1 over USB MIDI.
- USB packaging defect: version 0.1.1 installed its native binaries but omitted the bundled JavaScript loader because USB used an opaque runtime `createRequire()` call. Version 0.1.2 uses the package's statically bundled lazy entry and enumerates `C2MIDI Pro Port 1` from the packaged layout.
- Physically qualified only for the exact USB MIDI GO test to List 43 Cue 1; other MSC actions, addressing variants, queue timing, reconnect behavior, AppleMIDI, and raw TCP remain untested on Hog OS 5.
- Logging defect: resolved and CSV-export verified in 0.1.3; successful transmissions are retained at info level with resolved action description and exact bytes.
- Resolved target clarification: the user confirmed List 47 Cue 1 was intentional; the live description and encoded bytes are correct.
- Immediate next step: inspect the CSV export when supplied, then choose the next bounded USB action test.

## Work history

### [2026-09-09 10:16 CDT] Closed the successful-transmission logging milestone with CSV evidence

Actor: user and agent

Context and request:

- The user supplied Companion export `Steves-MacBook-Pro-3.local_2026-09-09-1015_companion_log.csv` after the physically successful version 0.1.3 GO test.

Completed:

- Confirmed the info-level successful-transmission entry survives Companion CSV export.
- Correlated the Stream Deck press, exact module transmission record, and user-reported correct Hog result.

Validation:

- At `2026-09-09T15:12:44.126Z`, the CSV records Stream Deck button `1/0/1` pressed.
- At `2026-09-09T15:12:44.131Z`, five milliseconds later, it records `Sent MSC GO List 47 Cue 1: F0 7F 01 02 01 01 31 00 34 37 F7`.
- The button release follows at `2026-09-09T15:12:44.265Z`.
- No Hog-module warning or error occurs around the transmission. Earlier disconnect/reconnect entries in the full export correspond to installation, sleep/resume, or prior module versions and are not evidence of a failure during this test.
- The user confirmed List 47 was intentional and that the cue ran correctly.

Remaining / next step:

- Choose and authorize the next bounded USB action test. Recommended next cycle: explicit-list STOP and RESUME during a deliberately safe long-running cue or fade.

### [2026-09-09 10:13 CDT] Verified live successful-send logging and found a target discrepancy

Actor: user and agent

Context and request:

- After installing version 0.1.3 and reporting that the cue ran correctly, the user supplied a Companion 5.0.3 log screenshot.

Completed:

- Confirmed the new info-level successful-transmission entry is visible in Companion.
- Confirmed the logged bytes match the resolved action description exactly.

Validation:

- Screenshot-confirmed entry: `Sent MSC GO List 47 Cue 1: F0 7F 01 02 01 01 31 00 34 37 F7`.
- The encoded cue is ASCII `31` (Cue 1) and the encoded list is ASCII `34 37` (List 47).
- This differs from the previously planned and recorded repeat target, List 43 Cue 1. Whether List 47 was intentional is not yet confirmed.
- Follow-up correction: the user confirmed List 47 was intentional, resolving the discrepancy without a code change.
- The Companion UI proves live visibility; the CSV export itself has not yet been supplied or inspected.

Remaining / next step:

- Inspect the promised CSV export to confirm the info entry survives export, then proceed to the next bounded test.

### [2026-09-09 10:09 CDT] Implemented exportable successful-transmission logging in version 0.1.3

Actor: agent, with user approval

Context and request:

- The user approved the recommended validation plan beginning with the missing exported transmission-log milestone.

Completed:

- Changed successful transmission logging from debug to info level.
- Added the `Sent` prefix and retained the resolved action description plus exact uppercase hexadecimal MIDI bytes.
- Added a focused regression test using GO List 43 Cue 1 and bumped the package/manifest version to 0.1.3.
- Built replacement package `hog-msc-0.1.3.tgz`.

Files and decisions:

- `src/transmission-log.ts` owns the successful-send log format and fixes the severity at `info`.
- `src/main.ts` logs only after `transport.send()` completes successfully.
- The expected first live verification entry is `Sent MSC GO List 43 Cue 1: F0 7F 01 02 01 01 31 00 34 33 F7`.
- Correction to earlier test guidance: ETC's current Hog v5.2.1 manual does not document the legacy Hog 3/4 Event Monitor. Physical behavior and external/Companion-side evidence must be used instead.

Validation:

- `corepack yarn check`: passed (lint, TypeScript build, 6 offline tests).
- The new regression test passed and asserted info severity, the resolved action, and exact expected bytes.
- `corepack yarn package`: passed; archive inspection confirmed native prebuilds remain present.
- Packaged-layout USB enumeration under Companion's bundled Node 22 runtime still returned `C2MIDI Pro Port 1`.
- Packaged-code inspection confirmed the info-level `Sent` log path is included.
- GitHub CI run `34368517671`: passed for fix commit `60878dce30cabfac618947df310af68d97dd08ac`.
- Bitfocus Companion Module Checks run `34368519311`: passed for the same commit.
- No MIDI command was sent during implementation or offline validation.

Remaining / next step:

- Install version 0.1.3, repeat one authorized harmless GO, export the Companion log, and confirm the exact `Sent` entry.

### [2026-09-09 10:07 CDT] Recorded missing exported transmission logging and the remaining validation scope

Actor: user and agent

Context and request:

- The user supplied Companion export `Steves-MacBook-Pro-3.local_2026-09-09-1005_companion_log.csv` and asked whether it contained the successful GO List 43 Cue 1 action, then requested that the result be recorded as a to-do.

Completed:

- Searched the export for the Hog connection, action description, target, GO command, expected SysEx bytes, and transmission language.
- Recorded a to-do to emit successful transmissions at info level, including the resolved action description and exact bytes, so they are visible and exportable from Companion.

Validation:

- The CSV shows the Hog transport connected and records Stream Deck button presses/releases, but contains no `GO List 43 Cue 1` or expected `F0 7F ... F7` transmission entry.
- The physical GO result remains user-reported and successful; the missing log does not negate the observed Hog response, but it prevents the export from independently correlating the button press with the module's exact transmitted bytes.

Remaining / next step:

- Implement and test info-level successful-transmission logging in a future package.
- Continue bounded physical USB acceptance tests for the remaining actions and failure/reconnect behavior before qualifying AppleMIDI or raw TCP.

### [2026-09-09 10:03 CDT] Passed the first physical Hog OS 5 USB MSC GO test

Actor: user and agent

Context and request:

- The user confirmed the show file was safe for testing, configured Companion action GO List 43 Cue 1, and received authorization for one button press after the exact target was read back.
- Hog MIDI Options had been screenshot-confirmed with Device ID `1`, Command Format `01: General Lighting`, and `MSC In` enabled. Companion had been screenshot-confirmed green/OK with the matching Device ID and `C2MIDI Pro Port 1` selected.

Completed:

- The user pressed the Companion button once.
- The user reported that Hog OS 5 ran List 43 Cue 1, nothing unintended occurred, and Companion remained green/OK.

Validation:

- User-reported physical result; not independently observed by the agent.
- This qualifies only the exact GO command to a specified list/cue over USB MIDI. It does not qualify current-list GO, STOP, RESUME, Release, Skip, Page, Scene, Raw SysEx, queue pacing, reconnect, AppleMIDI, or raw TCP behavior.

Remaining / next step:

- Select one bounded follow-up command, confirm its target and resulting console state are safe, then obtain fresh authorization immediately before transmission.
- Preserve the no-unintended-effects and Companion-health checks for every physical acceptance step.

### [2026-09-09 09:48 CDT] Confirmed Companion opens the selected USB MIDI output

Actor: user, verified by agent from supplied screenshot

Context and request:

- The user supplied a follow-up screenshot after selecting and saving `C2MIDI Pro Port 1`.

Completed:

- Confirmed module version 0.1.2 is enabled with USB MIDI transport, Specific Device ID `1`, zero-millisecond inter-command delay, and `C2MIDI Pro Port 1` selected.
- Confirmed the connection row displays Companion's green OK status, establishing that the module successfully opened the selected USB MIDI output in Companion 5.0.3.

Validation:

- Live connection configuration and green OK status are screenshot-confirmed.
- No module action, MSC transmission, Hog Event Monitor receipt, or physical Hog behavior is evidenced by this screenshot.

Remaining / next step:

- Put Hog OS 5 in a non-production safe test state with Event Monitor visible and verify that its MSC receive Device ID matches `1` (or deliberately choose broadcast).
- Obtain fresh authorization immediately before triggering one harmless, explicitly selected MSC action.

### [2026-09-09 09:04 CDT] Confirmed USB MIDI enumeration inside Companion 5.0.3

Actor: user, verified by agent from supplied screenshot

Context and request:

- The user installed version 0.1.2 and reported that MIDI devices now appear.

Completed:

- Confirmed from the supplied Companion 5.0.3 connection-editor screenshot that module version 0.1.2 is selected and the USB MIDI output dropdown includes `C2MIDI Pro Port 1` plus the host's virtual MIDI outputs.
- This resolves the USB enumeration and installed-package loader blockers.

Validation:

- Live UI enumeration is screenshot-confirmed in Companion 5.0.3.
- No output was selected or saved in the supplied evidence, and no MIDI or Hog MSC command has been transmitted or observed.

Remaining / next step:

- Select `C2MIDI Pro Port 1`, save the connection, and confirm that the connection changes from Loading/Reconnecting to Connected/OK.
- Before triggering any module action, establish a fresh safe-state checkpoint with Hog OS 5 Event Monitor and a non-production show.

### [2026-09-09 09:01 CDT] Corrected the packaged MIDI loader and verified packaged USB enumeration

Actor: user and agent

Context and request:

- After installing version 0.1.1, the user supplied a Companion 5.0.3 screenshot showing the module initialized at version 0.1.1 but the USB MIDI output dropdown still reported `No options found`.
- Diagnosis and validation remained non-transmitting; no MIDI command was sent.

Completed:

- Read the current Companion log and confirmed the module process registered and initialized successfully, then remained in `Transport reconnecting`; this ruled out a module startup crash.
- Confirmed the installed module contained the expected native `.node` prebuilds.
- Compared the installed bundle with Companion's working `generic-midi` module and found that version 0.1.1's runtime `createRequire('@julusian/midi')` prevented the package's JavaScript native-loader from being bundled. The config code swallowed the resulting resolution error and returned an empty device list.
- Replaced the opaque runtime require with the statically bundled `@julusian/midi/lazy` entry, retaining deferred native initialization for non-USB transports and package checks.
- Bumped the development package and manifest to version `0.1.2` and built `hog-msc-0.1.2.tgz`.

Validation:

- `corepack yarn check`: passed (lint, TypeScript build, 5 offline tests).
- `corepack yarn package`: passed and produced `hog-msc-0.1.2.tgz` with the JavaScript loader and native prebuilds.
- Invoked `getConfigFields()` directly from `pkg/hog-msc/main.js` using Companion's bundled Node 22 runtime; packaged-layout enumeration returned all local outputs, including `C2MIDI Pro Port 1`.
- GitHub CI run `34360975794`: passed for fix commit `a847d7724fe6f80b543de610ea5fccd761efaa58`.
- Bitfocus Companion Module Checks run `34360976436`: passed for the same commit.
- No MIDI or Hog MSC command was sent. Installation into Companion and physical Hog OS 5 qualification remain pending.

Remaining / next step:

- Install `hog-msc-0.1.2.tgz` and confirm the dropdown in Companion.
- Do not send an MSC command until a fresh safe-state checkpoint is established.

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
- GitHub CI run `34360319023`: passed for fix commit `258f407ceb01d956f614c368d8d6c6dd84a998dc`.
- Bitfocus Companion Module Checks run `34360320093`: passed for the same commit.
- No MIDI or Hog MSC command was sent; Companion reinstallation and physical Hog OS 5 qualification remain pending.

Remaining / next step:

- Install `hog-msc-0.1.1.tgz` in Companion.
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
