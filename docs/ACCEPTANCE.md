# Hardware acceptance record

## Scope and evidence

Attended, non-production testing on September 9, 2026 used a Tour Hog running Hog OS 5, Companion 5.0.3 on macOS, and C2MIDI Pro Port 1. Current installed development version is 0.1.13. Earlier cases were tested on the versions identified below; they were not all repeated on 0.1.13. Exact OS/build details and other host/interface combinations are not qualified by this record.

Physical outcomes are operator-reported. Companion screenshots/CSV exports establish configuration and send/parsed-return evidence; selected native operations were also recorded with receive-only MIDI capture. Successful sends alone do not prove console execution. No independent human code review is claimed.

## Passed bounded cases

| Case                               | Evidence / boundary                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Explicit GO, STOP, RESUME, Release | Earlier USB cycles: List47 Cue1 GO, List48 STOP/RESUME and Release.                                                                                                                         |
| Change Page                        | Page2 physically confirmed with exact send log.                                                                                                                                             |
| Scene addressing and Toggle        | v0.1.5 Scene36 GO/Release/Toggle with Scene31 chosen; corrected targeting and state feedback accepted.                                                                                      |
| Scene/list return reconciliation   | Scene36 and native List47 GO/Release; return-loss/recovery scenarios tested in earlier versions.                                                                                            |
| USB recovery                       | v0.1.10 idle loss/reconnect and disconnected-command rejection; queued interruption discarded 15 waiting commands and operator confirmed no replay after reconnect.                         |
| Release All Lists                  | v0.1.11 released Lists43/44/45/46 while Scene36 stayed active.                                                                                                                              |
| Release All Scenes                 | v0.1.11 released Scene36; no lists were active during this case.                                                                                                                            |
| Release All                        | v0.1.11 released four tracked lists and Scene36, with individual matching returns.                                                                                                          |
| USB-only package                   | v0.1.12 output/return cycle used Raw SysEx List49 Cue5 and native release.                                                                                                                  |
| Required List validation           | v0.1.13 STOP 15:22:12, RESUME 15:22:15, Release 15:23:12 logged required-List errors with no corresponding sends.                                                                           |
| Blank-List Skip Forward            | v0.1.13 Cue3 on chosen List49, sends/returns at 15:28:19 and 15:28:36; operator confirmed jump.                                                                                             |
| Blank-List Skip Back               | v0.1.13 Cue5 at 15:31:27; operator confirmed immediate jump and log shows List49 return. Earlier button labeled Backward still used Skip Forward and is not counted as Skip Back evidence.  |
| Decimal GO                         | v0.1.13 List49 Cue4.5 at 15:33:30; programmed fade confirmed, exact send and List49 return logged.                                                                                          |
| Decimal Skip Forward               | v0.1.13 List49 Cue4.5 at 15:34:56; immediate jump confirmed with send/return.                                                                                                               |
| Broadcast                          | v0.1.13 Skip Forward List49 Cue4.5 at 15:36:32, address 7F; physical result confirmed with List49 return. This was Skip, not GO. Only the test Hog was connected according to the operator. |

Times above are CDT. After broadcast testing, the operator restored and saved Specific Device ID1, return ID1, C2MIDI Pro Port1 input/output, monitoring enabled, and 0 ms delay.

## Rejected forms and implementation boundaries

List-only and targetless GO produced no observed response in controlled tests. Blank-List STOP, RESUME, and Release also produced no observed response; the module rejects these forms. This does not prove that every conceivable encoding is unsupported.

Native Main Go/Halt captures contained explicit cue/list GO or explicit-list STOP/RESUME. No generic key equivalent was established. Skip Forward and Skip Back use the same zero-time TIMED_GO encoder and require an entered destination cue; neither discovers next/previous cues.

Release All depends on operator-verified tracking completeness. Activity tracking does not establish running fades, halt state, or console inventory.

## Remaining qualification limits

- Multiple-scene Release All Scenes and scene-only release while lists remain active were not physically qualified.
- Scenes existing only in the directory without master assignment were not separately qualified.
- Broadcast GO and every combination of addressing/action/decimal cue were not individually tested. Decimal Skip Back was not separately run.
- Other operating systems, interfaces, exact Hog builds, and rapid USB interruptions remain unqualified.
- Temporary test-button cleanup is not confirmed. The desired delay was restored to 0 ms, per the saved-settings confirmation.
- Release qualification requires passing GitHub CI for the release commit; see the tagged prerelease for publication status. Earlier CI passes do not qualify a newer revision.

## Offline checks

The v0.1.13 implementation passed lint, TypeScript build, 20 offline tests, package creation, and packaged-module import before installed acceptance. Prerelease preparation repeated these checks and rebuilt the package with current documentation.
