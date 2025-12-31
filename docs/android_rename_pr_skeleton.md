# PR: Android package/applicationId rename - Skeleton

This PR will contain the staged, reversible changes for renaming the Android native package and/or 
.

Contents:
- Inventory snapshot (linked): docs/android_inventory_*.md
- Migration plan: docs/android_native_rename_plan.md
- Checklist:
  - [ ] Confirm keystore backup and access
  - [ ] Confirm Play Console owner coordination
  - [ ] Update android/app/build.gradle applicationId (if changing)
  - [ ] Refactor Java/Kotlin package directories and update package statements
  - [ ] Update AndroidManifest.xml package and authorities
  - [ ] Update google-services.json and Firebase settings
  - [ ] Update CI build job to run assembleRelease and sign with keystore
  - [ ] Local build and instrumentation test verification
  - [ ] Staged rollout to internal testing track
  - [ ] Monitor crashes and metrics post-release

Notes:
- This PR is intentionally split: the first commit will only add documentation and automated checks. Subsequent commits will implement code changes with thorough CI.

