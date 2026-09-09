# companion-module-hog-msc AI Work Log

Purpose:

- Preserve a durable, chronological working history for future AI agents.
- Record meaningful agent work and manual work reported by the user.
- Make completed, verified, pending, blocked, and proposed work unambiguous.
- Newest entries are added at the top.

Operating rules:

- Read this entire file before making project changes.
- Verify current state against project files and tools whenever practical.
- Consult `docs/Hog_v5.2.1_UserManual_revA.pdf` before looking for other Hog documentation in future sessions. Use additional sources only as needed and distinguish their software versions.
- Preserve exact paths, filenames, identifiers, commands, versions, and user decisions when they matter.
- Do not record secrets, credentials, access tokens, or unnecessary personal data.
- Do not rewrite or silently delete prior history. Correct it with a newer entry that explains the change.
- Keep entries concise and evidence-based; link related work instead of copying large outputs.

## Current project snapshot

- Current installed/source version: **0.1.13**, USB MIDI only. Published as GitHub prerelease v0.1.13 at release commit 1dbc3a23e33139dfca9dc3aaa96fa6a7da6054f7.
- Authoritative root: `/Users/steve.weiss/Documents/ChatGPT/Hog 5 MSC Companion Module`; repository `https://github.com/sweiss105/companion-module-hog-msc`, branch main.
- Next: optional broader qualification or user feedback. Prerelease packaging/CI/publication are complete; no additional physical test is currently requested. See `docs/ACCEPTANCE.md` for passed cases and remaining limits.
- Core explicit list controls, scenes, list/scene reconciliation, tracked Release All, USB recovery/discard/no-replay, blank-List Skip Forward/Back, decimal GO/Skip Forward, and broadcast Skip passed bounded attended tests across development versions. Physical results are operator-reported, with logged evidence as recorded below.
- v0.1.13 installed required-List validation passed for STOP, RESUME, and Release. Latest implementation checks: lint/build, 20 offline tests, package and import passed before documentation cleanup.
- User confirmed saved connection after broadcast testing: Specific Device ID1, return ID1, monitoring enabled, C2MIDI Pro Port1 input/output, 0 ms delay. Temporary test-button removal remains unconfirmed. Do not infer current physical playback state from these settings.
- GO requires List+Cue; STOP/RESUME/Release require List. Skip requires destination Cue and allows blank List; both Skip names perform immediate destination jumps. No main chosen-playback key equivalent established; OSC parked; network transports removed.
- Tracking is event/send-based and incomplete after missed events/reset. Release All only releases tracked active targets. No configuration-error feedback is requested; user declined that approach.
- Session remains non-production until user says otherwise. No agent MIDI sends without bounded authorization. Primary protocol reference remains `docs/Hog_v5.2.1_UserManual_revA.pdf`; its version is not the tested console build.

## Work history

### [2026-09-09] Published v0.1.13 prerelease

- Release commit 1dbc3a23e33139dfca9dc3aaa96fa6a7da6054f7 pushed to main. CI 34403166320 and Companion Module Checks 34403166870 both passed for that exact commit.
- Rebuilt package after commit hooks; packaged import passed and all six native MIDI binaries present. Published https://github.com/sweiss105/companion-module-hog-msc/releases/tag/v0.1.13 with prerelease=true and uploaded hog-msc-0.1.13.tgz (581479 bytes). GitHub asset SHA256: 96ae44fb1bfcc7445820f3cc46f952e05e43d9a3c3c1d384f734808c6dd0521e.
- Release notes identify unofficial/experimental scope, AI assistance, tested cases, and remaining limits. No installed configuration changes or MIDI sends. This subsequent work-log commit does not change the tagged runtime or package.

### [2026-09-09] Prerelease preparation authorized

- User authorized review, checks, commit/push, and prerelease publication. Reviewed changes across actions, encoding, tracking, return parsing, USB lifecycle, and presets; no release-blocking issue found. This is agent review, not independent human review.
- Fresh lint/build/all 20 tests and package generation passed. Rebuilt v0.1.13 with current help. Vendor reference PDF remains local and is excluded from Git; acceptance documentation is included.
- Next: verify packaged import/native assets, commit/push, require both GitHub checks to pass, then publish v0.1.13 as prerelease. No MIDI sent or installed configuration changed.

### [2026-09-09] Documentation cleanup and completed v0.1.13 acceptance record

- User authorized documentation cleanup. Rewrote README and Companion help around current USB-only behavior, required targets, optional-List Skip semantics, broadcast override/independent return ID, reconciled tracking, and tracked Release All. Removed stale pending/unsupported-feature contradictions; retained unofficial, AI-assisted, no-independent-human-review, no-warranty, and non-show-testing disclosures.
- Added docs/ACCEPTANCE.md with per-case evidence and remaining limits; normalized changelog headings without removing version history. Refreshed this snapshot; chronological entries below remain historical.
- Installed blank validation screenshot confirms STOP 15:22:12, RESUME 15:22:15, Release 15:23:12 errors. No corresponding sends; valid Release List49 at 15:22:16 is separate.
- Blank-List Skip Forward Cue3 passed at 15:28:19/36. Earlier Backward-labeled button actually used Skip Forward. Corrected Skip Back Cue5 at 15:31:27 passed per user with matching List49 return. Keep List optional for Skip.
- Explicit GO List49 Cue4.5 at 15:33:30 passed with programmed fade; Skip Forward List49 Cue4.5 at 15:34:56 passed immediate jump. Operator-confirmed outcomes; exact sends and List49 returns screenshot-confirmed.
- Broadcast Skip Forward List49 Cue4.5 at 15:36:32 passed (F0 7F 7F 02 01 04 00 00 00 00 00 34 2E 35 00 34 39 F7), with return. This was not broadcast GO. Operator confirmed only test Hog on output. Specific ID1 restored and saved afterward; return ID1/monitor enabled, same C2MIDI input/output and 0 ms delay shown.
- Documentation-only changes; no runtime changes, package rebuild, MIDI sends, commit, or publication. Remaining qualification limits are explicit in acceptance record; release review/current CI remain pending.

### [2026-09-09] Required explicit List controls in v0.1.13

- User authorized implementation after blank-List STOP/RESUME/Release failed and explicit Release List49 passed. Those three action callbacks now reject missing/empty/whitespace List before enqueueing, with action-specific error messages and required-field help. Existing explicit-list encoding and Release All behavior remain intact. Blank preset values remain intentional placeholders requiring configuration.
- Updated README/help/changelog and bumped package/manifest to 0.1.13. Action-level regression test verifies no queue entry for each blank variant and exact unchanged bytes for explicit List49 across all three commands.
- Lint/build and all 20 offline tests passed. Built hog-msc-0.1.13.tgz; packaged-module import passed. No agent MIDI sends, installed-module changes, commits, or publication.
- Next: install/select v0.1.13 and verify blank-field rejection in Companion. Existing configured-list buttons should retain their targets. Blank-List Skip remains separately unqualified and unchanged; other remaining USB variants/documentation reconciliation still pending.

### [2026-09-09 15:19 CDT] Explicit Release List49 positive control passed

- After blank-List STOP, RESUME, and Release produced no observed response, user set Release List to 49 and reports List49 released.
- Screenshot confirms `Sent MSC Release List 49: F0 7F 01 02 01 0B 00 34 39 F7` and matching received Release List49 at 15:19:07. Physical release is user-reported; send and parsed Hog return are screenshot-confirmed. Final reported List49 state is released.
- Completes the bounded blank-List comparison with an explicit Release positive control. Recommended correction: require List for STOP/RESUME/Release and reject blanks before enqueueing. This correction is not yet implemented; v0.1.12 remains installed. Blank-List Skip remains separately untested.
- No agent MIDI sends, source/package changes, commits, or publication.

### [2026-09-09 15:18 CDT] Blank-List STOP, RESUME, and Release produced no response

- Installed v0.1.12 bounded chosen-List49 test with 20-second fades. User reports blank-List STOP did not halt the fade, blank-List RESUME after native Main Halt did nothing, and blank-List Release likewise did nothing.
- Screenshots confirm successful-send records: STOP at 15:15:52 `F0 7F 01 02 01 02 F7`; RESUME at 15:17:18 `F0 7F 01 02 01 03 F7`; Release at 15:18:13 `F0 7F 01 02 01 0B F7`. Physical non-response is user-reported. No raw receive capture was running for this cycle; absence of a parsed STOP return is not proof of no raw MIDI response.
- These three exposed targetless forms failed under the instructed chosen-list conditions. Explicit-list variants retain earlier successful qualification. Recommend requiring an explicit List for these actions rather than describing blank fields as chosen-playback controls; implementation not yet changed.
- Next bounded check: explicit Release List49 as positive control and cleanup. Latest reported state remains halted/not released; do not assume cleanup occurred. No agent MIDI sends, package changes, commits, or publication.

### [2026-09-09 15:13 CDT] Passed installed USB-only v0.1.12 output and return check

- User reports installed/connected and verifies the instructed cue execution, active feedback, native release, and feedback-clear behavior. Screenshot confirms v0.1.12 installation at 15:12:04 and successful initialization/output/input connection at 15:12:15.
- Actual send was the temporary Raw SysEx action at 15:12:48: `F0 7F 01 02 01 01 35 00 34 39 00 F7` (List49 Cue5), not the suggested regular GO action. Received Active List49 corrected local state at the same time; received Release List49 corrected local state at 15:13:12.
- This qualifies the bounded installed USB output and return reconciliation path after network transport removal. Physical/visual results are user-reported; send and parsed returns are screenshot-confirmed. It does not separately requalify the regular GO action or confirm the configuration editor appearance. Final reported List49 state is released.
- No source/package changes, agent MIDI sends, commits, or publication. Remaining exposed USB variants and stale documentation remain pending; next recommended test is blank-List STOP/RESUME/Release with a safe chosen playback. OSC remains parked and network MIDI transports are removed.

### [2026-09-09] Removed network MIDI transports in USB-only v0.1.12

- User explicitly authorized removal of raw TCP and RTP-MIDI/AppleMIDI options after documentation review found no verified direct Hog endpoint for them. OSC remains parked and is not implemented.
- Deleted src/transports/tcp.ts and src/transports/rtp-midi.ts, removed imports/construction and host/port/session fields. Transport selector contains USB MIDI only. Retained legacy transport value checking: non-USB configurations show BadConfig and do not open output or return input until explicitly changed to USB and saved. Existing USB device names are preserved.
- Updated README/help connection guidance and changelog; bumped package/manifest to 0.1.12. Historical work-log entries remain intact and do not describe current network support.
- Lint/build and all 19 tests passed, including regression coverage blocking old network configurations before MIDI access. Built hog-msc-0.1.12.tgz; packaged import passed and all six native MIDI binaries remain. Source/dist search found no network transport classes or node:net/node:dgram imports.
- No agent MIDI sends, installed-module changes, commits, or publication. Next: user installs/selects v0.1.12, verifies USB-only editor and preserved output/input configuration, then one safe send/return acceptance cycle. Earlier physical results remain v0.1.11 or prior-version evidence.

### [2026-09-09 15:02 CDT] Explicit Cue5 positive control passed; no Main Go equivalent established

- Following the ignored empty-cue/List49/trailing-path message, user sent `F0 7F 01 02 01 01 35 00 34 39 00 F7` and reports Cue5 ran. Screenshot confirms Raw SysEx send and received Active List49 at 15:02:35; receive-only capture records matching native GO Cue5/List49 at 20:02:35.416Z.
- This positive control supports omission of cue as the distinguishing failure in the bounded comparison; the trailing empty path is accepted with explicit Cue5. It does not establish every possible targetless encoding is unsupported. Existing explicit List+Cue GO contract remains unchanged.
- Native Main Go emitted explicit GO when advancing and explicit-list RESUME when halted; Main Halt emitted explicit-list STOP. No generic chosen-master key message was found. Current binary active tracking lacks chosen/selected-master identity, next-cue ordering, and halt state needed to reproduce those keys reliably.
- Receive-only capture 56644 stopped after collecting the positive control. No agent MIDI sends, code/package changes, commits, or publication. Last user-reported target: List49 Cue5 ran; release not yet reported. Main-key MSC investigation has reached a bounded stopping point; documented OSC hardware key control remains a separately untested alternative.

### [2026-09-09 15:01 CDT] Main Go/Halt capture and rejected empty-cue GO variant

- User requested revisiting earlier targetless/list-only GO findings with raw return capture. Receive-only session 56644 on C2MIDI Pro Port 1 (ten-minute expiry) opened no MIDI Output. User configured List49 with 20-second fades and operated main keys.
- Main Go advanced to Cue3 (user-reported); captured at 19:57:28.503Z: `F0 7F 01 02 01 01 33 00 34 39 00 F7`. Next GO Cue4 at 19:58:31.494Z: `F0 7F 01 02 01 01 34 00 34 39 00 F7`. Main Halt at 19:58:44.363Z: `F0 7F 01 02 01 02 00 34 39 00 F7`; user confirms Cue4 halted. Main Go from halted state emitted RESUME at 19:59:27.463Z: `F0 7F 01 02 01 03 00 34 39 00 F7`; user confirms Cue4 resumed and subsequently finished.
- Thus these main-key operations emitted explicit list/cue GO or explicit-list STOP/RESUME, with an empty trailing path, rather than a targetless key command. No reliable chosen-master or next-cue inventory can be inferred from these events alone.
- User then sent a temporary Raw SysEx empty-cue/List49 GO with trailing path: `F0 7F 01 02 01 01 00 34 39 00 F7`. Screenshot confirms send at 15:01:17; user reports nothing happened. Raw receive poll afterward returned no additional messages. This rejects the tested variant under these conditions; it does not prove all possible targetless encodings unsupported.
- Next bounded diagnostic: explicit Cue5/List49 GO with the same trailing path as a positive control, if still safe, before further interpretation. No source/package changes, agent sends, commits, or publication. Existing requirement for explicit GO List and Cue remains.

### [2026-09-09 14:44 CDT] Passed installed v0.1.11 release actions

- Screenshots confirm installation at 14:37:28 and successful initialization/output/input connection at 14:37:37 in Companion 5.0.3.
- Release All Lists at 14:42:11 queued four lists and zero scenes; sent explicit releases for Lists46/43/45/44 and received matching Hog returns for all four. User reports all lists released while Scene36 remained active. This qualifies the bounded list-versus-scene isolation comparison.
- Release All Scenes at 14:43:11 queued zero lists and one scene, sent `F0 7F 01 02 01 0B 00 33 36 00 05 F7`, and received matching Scene36 Release. User confirms Scene36 released. No active list was present during this scene-only test, so reverse physical isolation and multiple-scene release remain untested.
- Following native activation returns for all five targets, Release All at 14:43:58 queued four lists and one scene, sent releases for Lists44/46/43/45 then Scene36, and received matching returns for each. User reports all targets released. Physical outcomes are user-reported; send/return correlation is screenshot-confirmed. Button indicator appearance was not independently pictured or separately confirmed.
- All three new actions pass these bounded target cases. They still depend on operator verification of tracked state completeness. No claim of universal console inventory or global MSC command. An earlier UI/Handler control-bank-not-found error at 14:40:25 is separate from the successful release intervals; its cause was not investigated.
- No source/package changes, agent MIDI sends, commits, or publication during acceptance. Final physical target state is released per user. Remaining: reconcile stale documentation; additional USB variants, multi-scene/reverse-isolation coverage, and network transports remain outside this acceptance cycle.

### [2026-09-09] Added three tracked-target release actions in v0.1.11

- User explicitly requested action names Release All Lists, Release All Scenes, and Release All after accepting operator verification that Companion active states match Hog. This supersedes the original no-Release-All feature scope for these three tracked-target actions only.
- Added actions and generic presets. Each press snapshots the selected active sets, queues individually addressed GO_OFF messages (lists then scenes for combined action), and retains existing FIFO/delay behavior. Targets activated later are excluded; empty tracking sends nothing. Disconnected nonempty requests are rejected. Successful-send callbacks update individual targets, preserving existing Hog return precedence; transport loss discards waiting releases.
- Help and README explain that these actions cover tracked active targets, not a complete console inventory or universal global command; startup, reconnect, resets, and missed events can leave tracking incomplete. Existing queued actions are not canceled by these actions.
- Bumped package/manifest to 0.1.11 and built hog-msc-0.1.11.tgz. Lint/build and all 18 offline tests passed, including category isolation, explicit bytes, snapshot/late-target exclusion, empty/disconnected handling, return precedence, and queued discard on failure. Packaged-module import passed and archive retains six native MIDI platform binaries.
- No agent MIDI sends, installation, commit, or publication. Installed physical acceptance of all three new actions remains pending. Next: install/select package, then separately verify list-only, scene-only, and combined releases with safe operator-verified targets.

### [2026-09-09 14:22 CDT] Captured individual native releases from Pig + Release

- User requested investigation of native release-all output. Initial receive-only capture was stopped and excluded at user request; fresh C2MIDI Pro Port 1 capture (session 13894) used only MIDI Input, with no output/echo.
- User selected Lists43/45/46, then reported List44 was also included and all lists released with Pig + Release. Physical list result is user-reported.
- Fresh capture at 19:22:00.284–.307Z shows seven individual GO_OFF messages in order: List46, List44, Scene36, Scene31, List43, List45, Scene36 again. Exact list example: `F0 7F 01 02 01 0B 00 34 36 00 F7`; scene example: `F0 7F 01 02 01 0B 00 33 36 00 05 F7`. Duplicate Scene36 release is observed; cause is not established. Scene physical outcomes were not separately reported.
- No single global release message was observed in this capture. This establishes native output for this operation, not proof that a global inbound command is unsupported. Lists43/44/45/46 each had an explicit release; scene releases confirm the operation is not lists-only on the wire.
- Capture stopped after reading the result. No agent MIDI sends, module changes, or inbound release-all test. A configured-target release sequence remains feasible; true all-list/all-scene inventory cannot be inferred reliably from the module's event-only tracking. No release-all feature implemented.

### [2026-09-09 14:14 CDT] Passed queued USB interruption and no-replay cycle

- Installed v0.1.10 tested with a temporary button containing 20 Skip Forward List49 Cue3 actions and a saved 500 ms module inter-command delay. User confirmed C2MIDI connection and safe target before testing.
- Final repeat screenshot confirms five successful-send records at 14:14:13–14, Transport reconnecting and `Discarded 15 queued command(s)` at 14:14:17, and output/return input connected at 14:14:31. No later sends are visible. Successful-send records do not independently prove all five commands reached Hog.
- After explicitly repeating the entire instructed cycle (release List49 on Hog while USB is absent, reconnect, observe without pressing), user reports List49 stayed released. Physical no-replay outcome and observation duration are user-reported; the screenshot alone does not establish the full 12-second observation period. This closes the bounded queued-at-removal acceptance case.
- Earlier 14:11 attempt sent all 20 commands before removal because the user had not saved the delay; not a queue interruption test. The 14:12 repeat discarded 14 commands but the user missed the physical no-replay observation step; retain it only as discard evidence.
- Resume validation: all 15 offline tests passed using `node --test --import tsx 'test/**/*.test.ts'`. Source remains v0.1.10 on main at 1380fff with existing local/uncommitted changes. No agent MIDI sends, source/package changes, commits, or publication.
- Remaining: remove temporary burst button and restore desired delay (not yet confirmed). Rapid interruptions and network transports remain separately unqualified. README contains stale acceptance statements; reconcile documentation before publication. Last user-reported List49 state is released.

### [2026-09-09] Session handoff: queued commands at USB disconnection

- User is ending this session and explicitly requests this next-session pickup point: **Next is testing commands already queued when USB disconnects.**
- Installed v0.1.10 passed bounded USB loss detection/reconnection and subsequent control/feedback operation. Commands pressed after detected disconnection were rejected, showed button errors (user-reported), and did not replay after reconnection. A fresh press worked.
- Pending distinction: commands already waiting in the queue when USB is removed have not been physically tested. Resume with a bounded plan for that case; do not repeat completed disconnected-command rejection as a substitute.
- Latest instructed cycle ended with List49 released; this is historical user-reported state, not a guarantee for the next session. Verify current setup before physical testing. No agent MIDI sends or further tests performed for this handoff. Changes remain local/uncommitted/unpublished; network transports remain separately unqualified.

### [2026-09-09] Confirmed visible button error during disconnection

- User additionally reports the Companion buttons displayed an error when operated while disconnected during the preceding rejection/no-replay test.
- Visible button indication is user-reported, not independently pictured. This supplements the accepted disconnected-command rejection test; no new source changes or qualification of queued-at-removal behavior.

### [2026-09-09] Passed disconnected-command rejection and no-replay test

- User verified the instructed cycle: targets released; unplug C2MIDI USB and wait for Reconnecting; press Skip Forward List49 Cue3 while disconnected; observe rejection; reconnect and wait five seconds without pressing anything; List49 stays released; a fresh press works, followed by native Release.
- All outcomes, including error and no replay, are user-reported; no new log screenshot supplied. Final reported List49 state is released.
- This qualifies rejection of a command submitted after detected disconnection. It does not qualify discard of commands already waiting at the moment of removal. That queued-command interruption test and network transports remain pending.
- No source/package changes, agent MIDI sends, commits, or publication.

### [2026-09-09] Passed installed v0.1.10 USB output/input recovery

- Screenshot confirms v0.1.10 installed at 13:59:43 and initialized at 13:59:56. During the subsequent USB test, Transport reconnecting and return input unavailable appear at 14:00:54; both report connected at 14:01:04. Earlier suspend/resume and module-switch events are separate.
- User then confirms the instructed Companion Skip Forward List49 Cue3, Hog execution/feedback, and native Release/feedback-off cycle worked as described. Post-reconnect physical/visual outcome is user-reported; no new transmission screenshot supplied for that final cycle.
- Bounded idle USB loss detection, automatic reopening, and subsequent bidirectional operation passed. Final reported List49 state is released. Queued-command discard under load, rapid interruptions, and network transports remain unqualified.
- No agent MIDI sends, source/package changes, commits, or publication in this acceptance step.

### [2026-09-09] Added idle USB output loss detection in v0.1.10

- User authorized output availability monitoring. USB transport now enumerates every two seconds while running, closes stale output on detected loss, reports Reconnecting once, and reopens the named output on return. Send failures use the same polling recovery; shutdown cancels polling and closes handles.
- Existing module transitions discard waiting commands on loss and reset tracking on reconnection. Missed events still cannot be reconstructed. Interruptions shorter than polling interval may be missed.
- Added injected fake MIDI factory and timer-controlled test for idle removal, absent port, failed open, successful recovery/send, send failure recovery, duplicate connect, and shutdown cleanup. Lint/build and 15 tests passed without opening real MIDI output. Built hog-msc-0.1.10.tgz; installed unplug/reconnect acceptance pending.
- No agent MIDI sends, installation, commit, or publication. Next: install/select0.1.10; with targets released unplug USB for at least four seconds and verify transport/input loss and recovery, then one bounded Companion send and native release.

### [2026-09-09 13:36 CDT] Output works after USB return; diagnosed missing output loss detection

- User confirms post-reconnect operation works. Screenshot records Sent MSC Skip Forward List49 Cue3 at 13:36:13 with matching received Active List49. Actual test used Skip/Cue3, not suggested GO/Cue2. Physical result is user-reported; no subsequent Release shown in this screenshot.
- Read src/transports/usb.ts: output detects loss only on sendMessage throwing; it does not poll availability while open. Input separately polls every two seconds. Thus output state can remain Connected through unplug/replug without a logged transition. Exact native-handle recovery mechanism is not established.
- Post-reconnect output execution is accepted for this test; reliable output loss detection, disconnect-driven queue discard and state reset remain unqualified. Recommended next implementation: output availability monitoring with bounded recovery tests. No source/package changes or agent MIDI sends.

### [2026-09-09 13:35 CDT] Verified USB return-input recovery; output recovery remains untested

- User reports the instructed C2MIDI Pro USB unplug/reconnect test worked as described, including native List49 GO/Release feedback afterward.
- Screenshot confirms Return MIDI input unavailable at 13:34:52, connected at 13:35:04, received Active List49/correction at 13:35:12 and Release List49/correction at 13:35:20. Visual indicator behavior is user-reported.
- No output Transport disconnected/reconnecting/connected transition or post-reconnect Companion send appears in this interval. This qualifies return-input recovery only; output reconnection and queue behavior are not established by this test.
- Next bounded check: Companion explicit GO List49 Cue2 after reconnection, verify physical execution and return, then native release. No agent MIDI sends or source/package changes.

### [2026-09-09] Passed return-cable interruption and event recovery test

- User verified the instructed List49 cycle: activate with indicator on; disconnect only Hog MIDI OUT to computer MIDI IN; release on Hog with stale indicator retained; reconnect without automatic state refresh; activate/release on Hog again and indicator returns off.
- All physical/visual outcomes are user-reported. This confirms recovery on subsequent events, not snapshot resynchronization or detection of a disconnected DIN cable. Final reported List49 state is released.
- USB and the computer-to-Hog path remained connected per the instructed test. USB-device removal/reconnect, queue discard, and network transports remain unqualified. No agent MIDI sends, source/package changes, commits, or publication.

### [2026-09-09] Passed independent List 49 and Scene 36 feedback test

- User paused to change Scene36 to use a different fixture from List49, then explicitly verified all four instructed checks: both active indicators on; releasing List49 clears only its indicator; reactivating List49 and releasing Scene36 clears only Scene36; final List49 release leaves both off.
- All physical/visual outcomes are user-reported, not independently captured. This qualifies the bounded concurrent List49/Scene36 feedback isolation cycle; final reported state is both released.
- No agent MIDI sends, code/package changes, commits, or publication. Next: bounded return-input interruption/recovery and missed-event behavior; network transports remain separately unqualified.

### [2026-09-09] Passed Companion-originated List 49 Skip cycle

- User confirms the instructed Companion Skip Forward List49 Cue3, Skip Back List49 Cue2, and native Hog Release cycle functions as expected, including destination cues and active feedback until release.
- Physical/visual outcome is user-reported. No new send-log screenshot or capture was inspected for this repeat; preceding native capture remains separate evidence.
- Bounded explicit-destination Skip execution and feedback accepted for List49 cues2/3. No agent MIDI sends, source/package changes, commits, or publication.
- Next validation: simultaneous independent list/scene feedback, followed by disconnect/reconnect and missed-event behavior. Network transports remain separately unqualified.

### [2026-09-09] Passed native List 49 Skip feedback and captured TIMED_GO

- User selected List49 because it has no follow cues. User reports feedback activates on GO, persists through forward/backward skips, and clears only on Release. Visual behavior is user-reported.
- Receive-only session 27714 captured GO Cue2 at 18:17:02.007Z, TIMED_GO Cue3 at 18:17:07.083Z (`F0 7F 01 02 01 04 00 00 00 00 00 33 00 34 39 00 F7`), TIMED_GO Cue2 at 18:17:09.243Z, and Release at 18:17:11.811Z. Second cycle included TIMED_GO destinations3,4,5,4,3,2, GO1, then Release at 18:17:36.316Z.
- Native Skip encoding confirms five zero time bytes, explicit destination cue/list, trailing empty path. This qualifies native-return feedback for the observed List49 cycle, not Companion-originated Skip execution.
- Next: configure Companion Skip Forward List49 Cue3 and Skip Back List49 Cue2; start at Cue2 and verify each destination and feedback before Release. No agent MIDI sends or code/package changes.

### [2026-09-09] Passed List 48 STOP/RESUME visual feedback cycle

- After clarifying that feedback had not yet been applied, the user configured List State for List48 and confirmed the instructed GO → STOP → RESUME → Release cycle worked as expected: indicator on through STOP/RESUME, off after Release.
- Visual/physical outcome is user-reported, not independently pictured. Native STOP/RESUME/Release bytes were captured during the preceding cycle, recorded below; do not attribute those timestamps to this repeat.
- Bounded List48 binary feedback acceptance is complete. STOP retains active state rather than representing fade motion. Skip Forward/Back, concurrent list/scene isolation, disconnect/reconnect and missed-event behavior, and network transports remain pending.
- No code/package changes, agent MIDI sends, commits, or publication.

### [2026-09-09 12:48 CDT] Captured native List 48 STOP and RESUME

- Receive-only session 85458 captured List48 STOP at 17:47:44.919Z: `F0 7F 01 02 01 02 00 34 38 00 F7`; RESUME at 17:47:53.154Z: `F0 7F 01 02 01 03 00 34 38 00 F7`; Release at 17:48:08.044Z: `F0 7F 01 02 01 0B 00 34 38 00 F7`. GO cues1–5 also captured.
- Screenshot confirms List48 active correction at 12:46:49, matching active entry at RESUME time, and Release correction at 12:48:08. STOP is intentionally ignored by binary active tracking and does not get a parsed log entry.
- Native command bytes now verified. User has not yet explicitly confirmed List48 indicator stayed lit across STOP/RESUME and extinguished on Release; visual acceptance remains pending. No module changes or MIDI sends.

### [2026-09-09 12:43 CDT] Passed installed List 47 native GO/Release feedback test

- User reports Stream Deck feedback matches after operating Hog with v0.1.9 installed.
- Screenshot confirms installation at 12:42:21, initialization and return input connected at 12:42:30, received Active List47/local state corrected at 12:42:40, and received Release List47/local state corrected at 12:42:49.
- This closes the bounded native List47 GO/Release reconciliation test. Physical Stream Deck appearance is user-reported; log evidence independently confirms both corrections. Final observed list state is released.
- No source/package changes, MIDI sends, commit, or publication. STOP/RESUME/Skip return behavior, other lists, and reconnect/missed-event behavior remain outside this acceptance cycle.

### [2026-09-09] Captured native List 47 returns and fixed empty cue path in v0.1.9

- User operated List47 GO and Release. Receive-only capture recorded GO Cue1 at 17:40:12.349Z: `F0 7F 01 02 01 01 31 00 34 37 00 F7`; subsequent GO cues2–5 also contained trailing empty path. Release at 17:40:24.944Z: `F0 7F 01 02 01 0B 00 34 37 00 F7`.
- Diagnosis: v0.1.8 rejected the trailing empty cue-path separator. v0.1.9 accepts exactly one empty path while rejecting nonempty scene paths and extra separators. Existing no-path outbound parsing retained.
- Added regression tests from captured bytes. Lint/build and 14 tests passed; package hog-msc-0.1.9.tgz built. No MIDI sent, installation, commit, or publication by agent. Installed native GO/Release visual feedback acceptance remains pending.

### [2026-09-09] List 47 native Release did not clear feedback; raw capture opened

- User confirms v0.1.8 uploaded and List 47 released directly on Hog while feedback stayed active. Screenshot confirms v0.1.8 initialization/input connected at 12:34:28 and GO List47 Cue1 sent at 12:35:32; no recognized List47 return appears. The Scene31 Release at 12:36:07 cannot be attributed to List47 without raw evidence.
- User requires Hog-return validation of internal states for all feedback. Current list parser rejects all cue paths and silently ignores unmatched messages; whether Hog emits a different layout or suppresses this event is unresolved. No speculative parser correction made.
- Opened receive-only C2MIDI Pro Port 1 capture, exec session 85458, with ten-minute expiry. No Output opened or MIDI sent. Await user-operated List47 GO then Release to capture native bytes. List feedback acceptance remains failed/pending diagnosis.

### [2026-09-09] Added unified List State feedback in v0.1.8

- User requested list feedback analogous to scenes. Added explicit-list successful GO/RESUME/Skip tracking and Release clearing; STOP retains active state. Blank targets and Raw SysEx do not directly update tracked state.
- Return parser accepts explicit list GO/RESUME/TIMED_GO/Release without cue paths, using the local Hog v5.2.1 manual printed p417 command table and existing encoders. Native list return bytes are not yet captured; installed acceptance is pending.
- Received events reconcile the same List State feedback, preserving returns that arrive before send completion. List and scene stores are isolated. Input loss retains tracked state; reconnect/config changes reset lists. No new control actions or MIDI sends by agent.
- v0.1.7 acceptance is now recorded: screenshot shows installed at 12:25:49, native GO36 correction at 12:26:09, Companion Release/GO matching returns at 12:26:37/41, native Release correction at 12:26:48. User confirmed working as expected. This supersedes pending scene acceptance above in history.
- Validation: lint/build and 13 offline tests passed; v0.1.8 package built. Changes remain local/uncommitted/unpublished. Next: installed safe-list GO/Release and return acceptance.

### [2026-09-09] Return MSC qualified; automatic reconciliation built in v0.1.7

- User installed v0.1.6 and saved input configuration (C2MIDI Pro Port 1, Device ID 1). Screenshot logs confirm input connected at 12:14:56.
- Manual Hog GO36 at 12:15:42 differed from local state; Release36 at 12:16:15 matched. Companion GO36 at 12:18:18 and Release36 at 12:19:17 each received matching return events. User confirmed existing toggle feedback followed both Companion actions.
- Separate Hog-reported indicator screenshot shows green after manual GO36 at 12:21:07, then dark after manual Release36 at 12:21:33; log comparison returned to matches.
- User explicitly requested background state validation with a single feedback. v0.1.7 now reconciles the shared Scene State/Toggle state on accepted return events, logs corrections, and retains diagnostic feedback IDs for compatibility. Return events during a send take precedence over its completion callback; next sends invalidate old observations. Input loss retains last tracked state; silence is not a state query.
- Lint/build and 11 tests passed, including reconciliation and return-before-completion behavior. Package built as hog-msc-0.1.7.tgz. Live v0.1.7 acceptance remains pending. No agent MIDI sends, commits, or publication.

### [2026-09-09] Implemented optional return MSC comparison in v0.1.6

Actor: agent, with user authorization

Completed:

- Added optional USB input monitoring, disabled by default, with separate input selection and return Device ID. The input creates no MIDI output and never echoes incoming data. It checks device availability/retries every two seconds and closes on configuration change/destroy.
- Added strict native scene GO/Release parser: exact configured Device ID, General Lighting, empty cue, numeric scene in list field, binary path 05. Other commands/devices/formats and malformed messages are ignored.
- Preserved existing local Scene State and Toggle behavior. Added separate Hog-reported active, observation available, and local/return mismatch feedbacks. Incoming events are logged but never change local state or trigger commands.
- Observations start unknown, clear on reset/lifecycle changes/detected input loss, and are invalidated for a scene before a new scene send. No timeout claims success/failure; silent physical cable loss cannot be detected from an open input.
- Updated help/README/changelog and built `hog-msc-0.1.6.tgz`.

Validation:

- `corepack yarn check` passed lint, build, and 10 tests, including captured scene parser acceptance, malformed/wrong-device rejection, per-scene isolation, and observation invalidation/reset.
- Package generation and packaged-module import passed. No live module installation or physical input qualification performed for v0.1.6; no MIDI sent by agent.

Remaining / next step:

- User installs v0.1.6 and enables input monitoring, then tests native manual Scene 36 GO/Release and feedback availability/mismatch against local tracking. Separately test returns after Companion commands and USB unplug/reconnect.
- Event observation is not a full console snapshot or guaranteed acknowledgment. Other release mechanisms and missed-event behavior remain unqualified. Local Toggle can still differ from manual Hog state by design.
- Changes remain local and uncommitted; no publication or remote CI performed.

### [2026-09-09 12:05 CDT] Verified exported v0.1.5 scene acceptance evidence

Actor: user and agent

Completed and validation:

- Parsed user-supplied `/Users/steve.weiss/Downloads/Steves-MacBook-Pro-3.local_2026-09-09-1205_companion_log.csv` without modifying it.
- Standalone Go Scene 36 at 16:54:52.211Z and Release at 16:56:03.437Z carry the corrected bytes.
- Toggle button `1/1/3` produced GO at 16:58:51.547Z, Release at 17:00:48.058Z, GO at 17:02:49.235Z, and Release at 17:04:31.693Z. Each send follows its button press by 0–2 ms and precedes button release. This establishes two logged Toggle cycles.
- All three GO entries match `F0 7F 01 02 01 01 00 33 36 00 05 F7`; all three Release entries match `F0 7F 01 02 01 0B 00 33 36 00 05 F7`.
- No Hog warning/error occurs after initialization at 16:54:12.141Z through the end of the export. The earlier 16:54:11 disconnect belongs to the version switch.
- This closes the missing exported-log evidence for the user-reported successful Scene 36 GO/Release/Toggle comparison with Scene 31 chosen. It does not turn send records into independent physical observation or qualify other scene configurations.

Remaining / next step:

- Other USB actions, directory-only scenes, reconnect/queue behavior, and network transports retain their prior qualification boundaries. Return-MIDI feedback remains unimplemented.
- Changes remain local and uncommitted; no new package or publication performed.

### [2026-09-09 12:04 CDT] Passed Toggle cycle and configured Scene State visual feedback

Actor: user and agent

Completed and validation:

- User configured one Toggle Scene 36 press action with no release action; screenshot confirms configuration.
- With Scene 31 chosen, user reports first press activated Scene 36 and second press released it. The initial report of Scene 63 was explicitly corrected by the user as a typo for Scene 36.
- User added Scene State feedback for 36 with Invert off. Border Color briefly flashed while the physical scene stayed active; no tracking defect was established from that styling behavior.
- Switching the override to Background Color showed the button and editor preview green in the supplied screenshot. After instructions to toggle off and check normal appearance, the user reports it is now showing correctly.
- Physical Toggle results are user-reported; configuration and active green appearance are screenshot-confirmed. No new Release/Toggle transmission log was supplied, and inactive appearance was not independently pictured.

Remaining / next step:

- Retain local-state semantics: this feedback follows successful module sends, not the return MIDI path. Manual Hog changes can desynchronize it.
- Consolidate Release/Toggle log evidence before closing the scene acceptance record. Directory-only operation and other scene numbers remain outside this tested comparison.
- No new source/package changes; existing changes remain local and uncommitted.

### [2026-09-09] Installed v0.1.5 Release Scene 36 passed with Scene 31 chosen

Actor: user

Completed and validation:

- User reports pressing Release Scene 36 and observing Scene 36 release while Scene 31 remained the chosen master.
- Physical Release result is user-reported, not independently observed. No new Companion log screenshot/export was supplied for this press; do not attribute a timestamp or exact observed bytes to it.
- Together with the preceding installed GO comparison, this supports corrected GO/Release operation for Scene 36 with a different scene chosen. It does not qualify Toggle, all scene numbers, or directory-only operation after removing the master assignment.

Remaining / next step:

- Test Toggle Scene 36 from the now-released state, one press at a time, keeping Scene 31 chosen. Inspect GO and Release logs and physical outcomes; internal tracking remains send-based, with no return feedback implementation.
- Changes remain local and uncommitted.

### [2026-09-09 11:55 CDT] Installed v0.1.5 GO Scene 36 passed different-chosen-master comparison

Actor: user and agent

Completed and validation:

- User reports importing and selecting v0.1.5, then Scene 36 activating while Scene 31 was the chosen master.
- Screenshot confirms installation at 11:54:04, instance restart at 11:54:11, transport connected and initialization complete at 11:54:12, and `Sent MSC Go Scene 36: F0 7F 01 02 01 01 00 33 36 00 05 F7` at 11:54:52.
- Physical activation and chosen-master identity are user-reported; corrected send bytes are screenshot-confirmed. No post-initialization Hog transport error is visible. The latest report does not separately state Scene 31's final active/released state.
- This resolves the observed inability to activate Scene 36 when another scene is chosen for this installed GO test. Release and Toggle are not qualified by this result.

Remaining / next step:

- With Scene 36 active and Scene 31 chosen, test Release Scene 36 once and verify its physical result separately.
- Work remains local and uncommitted; optional return-MIDI feedback is not implemented.

### [2026-09-09 11:51 CDT] Captured native Release and corrected scene encoder in v0.1.5

Actor: user and agent

Completed and evidence:

- User confirmed captured native GO bytes activated Scene 36 while Scene 31 remained released and chosen. This qualifies the Raw SysEx comparison, not the new installed module.
- Native Release captured at `2026-09-09T16:51:01.907Z`: `F0 7F 01 02 01 0B 00 33 36 00 05 F7`, after user reported manually releasing Scene 36 with Scene 31 still chosen.
- Corrected shared `encodeScene()` to emit empty cue, scene number in cuelist field, and binary path 05 for GO/Release (and both Toggle branches). Added regression assertions against captured Scene 36 bytes and a distinct Scene 31 target.
- Bumped package/manifest to 0.1.5, updated README/help/changelog, and built `hog-msc-0.1.5.tgz`.
- `corepack yarn check` passed lint, TypeScript build, and 8 tests; `corepack yarn package` passed; staged manifest confirms 0.1.5 and archive retains native MIDI prebuilds.

Remaining / next step:

- Install v0.1.5 and repeat the exact different-chosen-scene GO comparison, then test Release and Toggle separately. Native outgoing Release is not yet a physical inbound Release acceptance result.
- Optional return-MIDI state feedback was discussed; not implemented. It needs event-coverage and incoming-command response tests and unknown-state handling.
- Changes remain local and uncommitted; no remote CI or publication performed.

### [2026-09-09 11:47 CDT] Captured Hog's native Scene 36 GO encoding

Actor: user and agent

Completed and validation:

- Opened only a MIDI Input on `C2MIDI Pro Port 1` using @julusian/midi; no output or echo path was created. Capture session 96004 has a ten-minute automatic expiry.
- User photo confirms Device ID 1, General Lighting, and MSC In/Out enabled. Background version text appears to show v5.2.0; do not equate the running console version with the v5.2.1 reference PDF.
- After the user manually activated Scene 36, live inbound capture at `2026-09-09T16:47:45.648Z` received `F0 7F 01 02 01 01 00 33 36 00 05 F7`.
- Native GO data is empty cue, Scene 36 in the cuelist field, and binary path 05. This differs from our scene-in-cue/empty-list/ASCII-35 encoder and from the manual's prose. It supersedes the earlier assumption that binary 05 had no supporting evidence.
- This proves the console's emitted encoding for that operation, not yet its acceptance of the same bytes on input. Release encoding has not yet been captured.

Remaining / next step:

- Repeat the Scene 31-chosen/Scene 36-targeted comparison once using the captured GO bytes. If targeting passes, capture native Release before correcting and packaging the shared scene encoder.

### [2026-09-09 11:44 CDT] Explicit cuelist zero candidate produced no response

Actor: user and agent

Validation:

- User confirmed no List or Scene 0 exists; selectable numbering begins at 1.
- In the instructed comparison (Scene 31 chosen, Scenes 31 and 36 released), the user pressed a temporary Raw SysEx button and reported nothing happened.
- Screenshot at 11:44:28 confirms `Sent Raw SysEx: F0 7F 01 02 01 01 33 36 00 30 00 35 F7`. No Hog transport error is visible around the transmission.
- Explicit ASCII cuelist zero did not activate the intended scene and must not be implemented as a fix. This result does not prove the parser's internal interpretation.

Remaining / next step:

- Seek an isolated inbound capture on the computer of Hog's own outbound MSC for manual Scene 36 activation, if a MIDI return path is available. Confirm routing before enabling output; avoid MIDI echo/feedback. No output configuration change or capture has been performed.
- Scene encoder correction remains unresolved; existing scene actions remain unsuitable for configured-scene targeting. No source/package change made.

### [2026-09-09] Confirmed wrong-scene activation and investigated empty cuelist field

Actor: user and agent

Completed and evidence:

- User reports Go Scene 36 activated Scene 31 when Scene 31's master was chosen. User subsequently confirmed manual cleanup and authorized encoder diagnosis/correction followed by the same comparison.
- Consulted local `docs/Hog_v5.2.1_UserManual_revA.pdf` first: printed page 417 specifies scene number in cue field and cue path 5 but provides no complete scene wire example or explicit cuelist placeholder.
- Inspected `encodeScene`: `targetData(scene, '', '5')` produces an empty cuelist (`33 36 00 00 35` for Scene 36).
- Supplemental legacy ETC source https://support.etcconnect.com/HES/Consoles/Hog_3/Software_and_Programming/Wholehog_MIDI_Show_Control_Information states omitting the cuelist behaves like the main GO button. This matches the observed fallback but does not prove a Hog 5 correction.
- Candidate for controlled testing: supply ASCII zero in the cuelist field, giving `F0 7F 01 02 01 01 33 36 00 30 00 35 F7`. This is an unverified hypothesis, not a corrected/qualified encoder. Keep ASCII path 5 (`35`); there is no evidence to substitute binary `05`.

Remaining / next step:

- Confirm List 0 is absent or safe before candidate testing, since its interpretation is unresolved. Use one controlled transmission with Scene 31 chosen and Scenes 31/36 released; evaluate both scene outcomes before any implementation or release test.
- No encoder change, package, installation, or agent transmission performed during diagnosis. Existing scene actions remain unsuitable for configured-scene targeting.

### [2026-09-09 11:36 CDT] Scene 36 GO and Release worked with its master chosen

Actor: user and agent

Completed and validation:

- User photos of Scene 36 Playback Options show no visible Ignore MSC In setting. The user confirmed direct Scene Directory activation works and initially the scene had no master assignment.
- At the user's suggestion, compared operation after assigning Scene 36 to an unused master. The user reports GO did nothing until they chose that scene's master, after which GO worked and Release Scene 36 also worked.
- Screenshot shows GO at 11:35:23 and 11:35:29, both `F0 7F 01 02 01 01 33 36 00 00 35 F7`, then Release at 11:35:36, `F0 7F 01 02 01 0B 33 36 00 00 35 F7`. These entries align with the reported sequence; physical outcomes and Choose state are user-reported.
- No code or transport change occurred between these transmissions. Assignment alone did not resolve the failed GO; success followed choosing the assigned master.
- This does not establish whether Hog honors the encoded scene number or falls back to the chosen master. Do not describe these actions as generally qualified scene targeting. Companion's local scene state is not console acknowledgment.

Remaining / next step:

- Investigate scene addressing against the local manual and encoder; any comparison involving a different chosen master must use explicitly safe targets because chosen-master fallback is now a possibility.
- No further MIDI sent by the agent. Changes remain local and uncommitted.

### [2026-09-09 11:30 CDT] Stored user-supplied Hog v5.2.1 manual as first documentation reference

Actor: agent, at user request

Completed:

- Copied `/Users/steve.weiss/Downloads/Hog_v5.2.1_UserManual_revA.pdf` to `/Users/steve.weiss/Documents/ChatGPT/Hog 5 MSC Companion Module/docs/Hog_v5.2.1_UserManual_revA.pdf`; the Downloads original remains unchanged.
- Linked the PDF from README.md and added the user's instruction to this log's operating rules and current snapshot: future sessions must reference this PDF before looking for other documentation.

Validation:

- Source and destination SHA-256 match: `e208e07e02b6935bcbf85bd99bcf82c6367cce33f0053e8016fb026febe1e6db` (14,062,537 bytes).
- The current manual still documents Ignore MSC In using a Cuelist settings path and scene cue path 5 on printed page 417; it does not substantiate the earlier specific instruction to find Ignore MSC In on the Scene tab. The user reports no MSC option visible in Scene 36 options.

Remaining / next step:

- Scene 36 activation diagnosis remains open. Inspect the actual options and establish manual playback behavior before further MIDI tests.
- PDF and documentation changes are local, uncommitted, and unpublished.

### [2026-09-09 11:25 CDT] Go Scene 36 sent but did not activate

Actor: user and agent

Validation:

- The user selected Scene 36 as the safe test target and reported it did not activate after pressing Go Scene.
- Screenshot confirms `Sent MSC Go Scene 36: F0 7F 01 02 01 01 33 36 00 00 35 F7` at 11:25:05, matching the current encoder (scene number in cue field, empty list, ASCII cue path 5).
- Earlier entries show Release Scene 36 at 11:21:32 (`F0 7F 01 02 01 0B 33 36 00 00 35 F7`) and Go Scene 36 at 11:21:34. Their physical outcomes were not separately reported; Release is not qualified by its send entry.
- No Hog transport error is visible during these entries. Successful send does not establish console receipt or execution; Go Scene physical acceptance failed and the cause is unresolved.

Remaining / next step:

- Check Scene 36's scene-local MSC-ignore option and manual playback result before choosing another bounded MIDI test. Do not infer scene state from Companion's locally tracked feedback.
- No encoder or installed module changes made; this log update remains local and uncommitted.

### [2026-09-09 11:08 CDT] Passed USB Change Page 2

Actor: user and agent

Completed and validation:

- The user authorized continued USB action testing, established non-production state until further notice, and identified pages 1–5 as safe test targets.
- After the instructed Change Page 2 press, the user reported `Action worked`.
- Companion 5.0.3 screenshot shows `Sent MSC Change Page 2: F0 7F 01 02 01 1D 32 F7` at 11:08:27. The target and bytes match the expected OPEN_CUE_PATH command.
- Physical page change is user-reported, not independently observed. No Hog transport error is visible around this entry; current green/OK status was not separately shown.
- Qualification covers Page 2 over USB only; pages 1–5 being safe targets does not mean all five were tested.

Remaining / next step:

- Obtain a safe scene target for Go Scene / Release Scene testing, then test Toggle Scene and its local feedback separately.
- No module code or installed package changed. Work-log changes remain local and uncommitted.

### [2026-09-09 11:05 CDT] Corrected commissioning guidance in README and Companion help

Actor: agent, with user authorization

Completed:

- Removed stale Event Monitor instructions from README.md and companion/HELP.md, following the previously recorded Hog OS 5 documentation correction.
- Both documents now direct testing one action at a time in a safe non-production show, checking Companion's resolved action/exact bytes, and separately observing console behavior and unintended effects.
- Corrected README wording that implied Hog receipt: the rejected GO variants were logged as sent, with no observed Hog response. Transport send completion does not prove console receipt or execution.

Validation:

- Checked the documentation diff and confirmed no Event Monitor references remain in README.md or companion/HELP.md.
- No source code, installed module, package, Git commit, or remote publication was changed. Documentation and acceptance-log changes remain local and uncommitted.

Remaining / next step:

- Select a fresh bounded USB action test with safe-state confirmation and authorization. Remaining physical qualification boundaries are unchanged.
- Updated bundled help will require a future package build/install to appear in the installed module.

### [2026-09-09 11:02 CDT] Verified installed GO validation and successful explicit GO

Actor: user and agent

Completed:

- The user reported version 0.1.4 was already installed; the agent did not reinstall it or send MIDI.
- Companion 5.0.3 screenshot at 11:01:32 shows `GO requires both List and Cue on Hog OS 5` after the incomplete-GO test, with no corresponding successful-send entry visible.
- After confirming List 47 was safe, the user tested explicit GO and reported `Go List 47/1 ran correctly`.
- The user subsequently clarified that they had to release List 47 and then try the button again. The successful physical result therefore applies to GO after that release; the two send entries must not be counted as two independently successful cue executions. The first attempt's physical effect was not established.

Validation:

- Screenshot entries at 11:02:02 and 11:02:23 both read `Sent MSC GO List 47 Cue 1: F0 7F 01 02 01 01 31 00 34 37 F7`.
- Physical cue execution is user-reported, not independently observed. The screenshot independently confirms two successful-send records with the expected target and bytes; no subsequent Hog transport warning/error is visible.
- The incomplete-GO result agrees with the inspected validation-before-enqueue code. No independent wire capture was performed, and current green/OK status and absence of unintended effects were not separately confirmed.
- During this resume, all seven offline tests passed using `node --test --import tsx 'test/**/*.test.ts'`; Git was clean at `1380fff` before this log update. Prior build/package/CI results were read from the log, not rerun.

Remaining / next step:

- README and companion/HELP.md still instruct use of Hog Event Monitor, contrary to the 10:09 work-log correction; documentation cleanup remains pending.
- Other actions, addressing variants, queue timing, reconnect, AppleMIDI, and raw TCP retain their previous unqualified boundaries. Any further physical test needs a fresh safe target and bounded authorization.
- This work-log update is local and uncommitted.

### [2026-09-09 10:37 CDT] Rejected targetless GO and restricted GO to explicit List plus Cue

Actor: user and agent

Context and request:

- With safe List 48 attached to a playback, Choose lit, and its state controlled, the user tested GO with both List and Cue blank, reported no response, and supplied `Steves-MacBook-Pro-3.local_2026-09-09-1037_companion_log.csv`.

Completed:

- Correlated the controlled test with one additional list-only GO and two targetless GO transmissions.
- Concluded the Hog OS 5 module action should expose only the physically proven explicit List + Cue form.
- Changed version 0.1.4 so GO requires both fields and rejects incomplete actions before queueing MIDI; updated help, README, changelog, and regression tests.

Validation:

- List-only entry at `2026-09-09T15:36:17.712Z`: `Sent MSC GO List 48: F0 7F 01 02 01 01 00 34 38 F7`.
- Targetless entries at `2026-09-09T15:37:04.415Z` and `2026-09-09T15:37:07.476Z`: `Sent MSC GO: F0 7F 01 02 01 01 F7`.
- The user reported no Hog response, while Companion remained free of Hog-module or transport errors. Together with the earlier export, list-only GO was ignored six times and targetless GO twice.
- No MIDI was sent while implementing the restriction.
- `corepack yarn check` passed lint, TypeScript build, and all 7 offline tests, including the new incomplete-GO validation cases.
- `corepack yarn package` produced `hog-msc-0.1.4.tgz`; archive inspection confirmed all six supported native MIDI prebuild directories, and importing `pkg/hog-msc/main.js` succeeded.
- Pushed implementation commit `bb7b561134e5562c445aa767d8bd6ce0649473fe` to `main`.
- GitHub CI run `34372033783` and Companion Module Checks run `34372034814` both passed.

Remaining / next step:

- Install version 0.1.4 only after a bounded preflight, then verify incomplete GO is blocked and explicit List + Cue still works.
- Install version 0.1.4 only after a bounded preflight, then verify incomplete GO is blocked and explicit List + Cue still works.

### [2026-09-09 10:32 CDT] Rejected list-only GO after five ignored Hog OS 5 transmissions

Actor: user and agent

Context and request:

- The user tested GO with List 48 specified and Cue blank after removing the ambiguous automatic timing from the beginning of List 48, reported no response, repeated the test, and supplied Companion export `Steves-MacBook-Pro-3.local_2026-09-09-1031_companion_log.csv`.

Completed:

- Correlated five button presses with five identical successful-send entries.
- Confirmed the module transmitted the intended MSC encoding and remained free of Hog connection warnings/errors during the test interval.

Validation:

- Five entries between 15:26:53 and 15:30:17 UTC read `Sent MSC GO List 48: F0 7F 01 02 01 01 00 34 38 F7`.
- Each entry occurred 0–1 ms after its button press and before release.
- The user reported no Hog response. The adjusted cuelist screenshot showed Cue 1 at the start and Cue 2 without automatic timing, reducing the earlier state ambiguity.
- ETC's current MSC table describes GO data as cue number plus cuelist number and does not document an empty-cue/list-specific form.
- This evidence rejects list-only GO under the tested Hog OS 5 conditions. It does not determine whether a fully targetless GO correctly operates the currently chosen playback.

Remaining / next step:

- Test GO with both fields blank while a safe List 48 playback is chosen; expected bytes are `F0 7F 01 02 01 01 F7`.
- After resolving targetless GO, change the action contract so a supplied List also requires a Cue, unless later evidence supports list-only GO.

### [2026-09-09 10:25 CDT] Passed USB MSC Release on List 48

Actor: user and agent

Context and request:

- With List 48 active and declared safe, the user received authorization for one explicit-list Release press and supplied a Companion log screenshot afterward.

Completed:

- The user reported that List 48 released correctly.
- Confirmed the visible Companion info entry describes Release List 48 and contains the expected GO_OFF bytes.

Validation:

- Screenshot-confirmed entry: `Sent MSC Release List 48: F0 7F 01 02 01 0B 00 34 38 F7` at 10:25:01 local time.
- Physical release behavior is user-reported; the agent independently verified the visible Companion transmission evidence.
- No Hog-module warning or error is visible around the release entry, and the user reported no unintended result.

Remaining / next step:

- Qualify GO with List 48 specified and Cue blank, then inspect the resolved description/bytes and physical behavior.

### [2026-09-09 10:22 CDT] Passed repeated USB MSC STOP and RESUME tests on List 48

Actor: user and agent

Context and request:

- The user created safe test List 48, pressed the STOP and RESUME buttons several times, reported both actions worked, and supplied Companion export `Steves-MacBook-Pro-3.local_2026-09-09-1021_companion_log.csv`.

Completed:

- Correlated three STOP presses and three RESUME presses with six info-level transmission records.
- Verified every action targeted List 48 and every logged byte string matched the action.

Validation:

- STOP occurred three times with bytes `F0 7F 01 02 01 02 00 34 38 F7`.
- RESUME occurred three times with bytes `F0 7F 01 02 01 03 00 34 38 F7`.
- Each transmission followed its Stream Deck press by 1–3 ms and preceded the corresponding release.
- No Hog connection warning or error occurred during the 15:20–15:21 UTC test interval.
- Physical STOP/RESUME behavior is user-reported; the agent independently verified the exported Companion transmission evidence.

Remaining / next step:

- Qualify explicit-list Release on List 48 with one authorized press, then verify the Hog result, Companion status, and exported log.

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
