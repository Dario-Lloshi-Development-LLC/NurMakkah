# Android Native Package / applicationId Rename — Atomic Plan

Purpose
- Provide a safe, reviewable, and reversible plan to rename the Android `applicationId` and Java/Kotlin package namespace for the Nur Makkah app.

When to run
- Only after: remote CI on `feature/modernization` is green, Play Store owners and keystore custodians are coordinated, and a maintenance window is approved.

High-level steps
1. Prepare and communicate
   - Notify maintainers and Play Store owners; create an issue linking this plan.
   - Ensure access to the release keystore and Play Console permissions.
   - Decide whether the change will be a package rename (source-level) or an appId change on Play (rare and risky). This plan covers a package/appId rename that preserves app identity on Play if desired.

2. Create backups and branch
   - Create a backup branch from `main` and another from `feature/modernization`:
     ```bash
     git checkout main
     git pull origin main
     git checkout -b rename/android-prep-<timestamp>
     git checkout feature/modernization
     git pull origin feature/modernization
     git checkout -b feature/android-rename
     ```
   - Export the release keystore and securely store a copy (encrypted) for rollback.

3. Inventory current package/applicationId locations
   - Search for occurrences:
     ```bash
     rg "applicationId\s*\"|package\s+com\." -n android || true
     rg "com\.oldpackage" || true
     ```
   - Record files: `android/app/build.gradle`, `AndroidManifest.xml`(s), `MainActivity` sources, any Java/Kotlin package directories, `google-services.json`, and CI workflow files.

4. Update Gradle applicationId and variant configs
   - Modify `android/app/build.gradle` (or Gradle Kotlin DSL) `defaultConfig.applicationId` to the new `applicationId`.
   - If productFlavors exist, update per-flavor `applicationIdSuffix` as needed.
   - Do not change `android:sharedUserId` (deprecated) unless strictly necessary.

5. Refactor Java/Kotlin source package names (safe approach)
   - Prefer IDE (Android Studio/IntelliJ) refactor -> Rename package to preserve imports and generated classes.
   - Alternatively, perform controlled `git mv` moves for directories and update `package` statements with a scripted replacement, then run Java/Kotlin compile to catch missing refs.
   - Example scripted approach (use with care):
     ```bash
     # move directory
     git mv android/app/src/main/java/com/old/package android/app/src/main/java/com/new/package
     # update package declarations
     rg "^package com\.old\.package" -l | xargs sed -i 's/package com.old.package/package com.new.package/g'
     ```

6. Update AndroidManifest and resources
   - Update `<manifest package="...">` and any `<provider android:authorities>` entries referencing the old package.
   - Update `MainActivity` fully-qualified references in Gradle, manifest placeholders, and deep link configs.

7. Update Google/Firebase and third-party configs
   - Regenerate or update `google-services.json` if Firebase project/package mapping is affected (often required).
   - Update any backend OAuth redirect URIs, SHA-1 fingerprints, and Play Console linked services.

8. Update CI workflows and signing configuration
   - Ensure `.github/workflows/ci-cd-android-native.yml` uses the correct `applicationId` for artifact names, and that secrets for keystore (base64) match.
   - Add a temporary CI job that builds `assembleRelease` and `bundleRelease` and runs instrumentation tests if available.

9. Build and test locally
   - Run:
     ```bash
     cd android
     ./gradlew clean :app:assembleRelease :app:bundleRelease
     ```
   - Run unit tests and connected tests (emulator):
     ```bash
     ./gradlew test
     ./gradlew connectedAndroidTest
     ```
   - Manually install on a device or emulator and validate critical flows.

10. Open PR with rollout and rollback plan
    - PR checklist:
      - Describe Play Store impact and whether `applicationId` change will treat app as a new install or preserve package on Play.
      - Include a step-by-step upgrade plan (staged rollout recommended).
      - Attach screenshots and artifact names for reviewers.

11. Merge, CI, and Play Console steps
    - Merge once CI is green and reviewers approve.
    - Upload new bundle to Play Console internal testing first; verify install and crash-free behavior.
    - Use staged rollout; monitor crash reports and analytics.

12. Rollback plan
    - If issues arise, revert the merge and create a hotfix branch. Keep keystore and Play Console access ready.
    - Maintain both old and new package builds for a short overlap if necessary.

Risks & mitigations
- Play Store: changing `applicationId` will create a new app identity on Play — coordinate with owners to avoid accidental new app creation. Mitigation: if the goal is to rename internal packages only, keep `applicationId` unchanged and refactor only source package names.
- OAuth/Firebase breakage: update all fingerprints and redirect URIs before publishing.
- Third-party integrations (analytics, crash reporters) must be reconfigured.

Reference checklist (to include in PR description)
- [ ] Confirm keystore access and backup
- [ ] Confirm Play Console owner coordination
- [ ] CI `assembleRelease` successful
- [ ] Firebase / google-services.json updated and tested
- [ ] All unit and instrumentation tests pass
- [ ] Staged rollout verified in internal testing

Notes
- This plan intentionally separates `applicationId` change from source package refactors; choose the minimal approach that achieves product goals. For most branding changes you only need to change `applicationId` and leave source package names unchanged.

Contact
- If you want, I can implement the first two inventory steps now and create the PR skeleton.
